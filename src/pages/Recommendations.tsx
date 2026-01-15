import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, TrendingUp, Heart, LogIn, Film, Book } from 'lucide-react';
import api from '../services/api';
import interactionService from '../services/interaction.service';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useStore } from '../store/useStore';

interface RecommendationItem {
  item_id: string;
  item_type: string;
  title: string;
  predicted_rating?: number;
  similarity?: number;
  poster_url?: string;
  thumbnail_url?: string;
  avg_rating?: number;
  rating_count?: number;
  release_date?: string;
  language?: string;
  based_on?: string;
}

export default function Recommendations() {
  const [personalized, setPersonalized] = useState<RecommendationItem[]>([]);
  const [popular, setPopular] = useState<RecommendationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { isAuthenticated } = useStore();



  useEffect(() => {
  
    if (!isAuthenticated) {
     
      fetchPopular();
    } else {
      
      fetchRecommendations();
    }
  }, [isAuthenticated]);

  const fetchPopular = async () => {
    setLoading(true);
 
    try {
      const popularRes = await api.get('/recommendations/popular?limit=12');
      setPopular(popularRes.data.popular_items || []);
    } catch (error: any) {
      console.error('Failed to fetch popular items:', error);
      setError('Failed to load recommendations');
    } finally {
      setLoading(false);
    }
  };

  const fetchRecommendations = async () => {
    setLoading(true);
    setError('');
    try {
      // Fetch popular items (always available)
      const popularRes = await api.get('/recommendations/popular?limit=12');
      setPopular(popularRes.data.popular_items || []);

      // Try to fetch personalized recommendations
      try {
        const personalizedRes = await api.get('/recommendations/personalized?limit=12');
        
        // Backend might return 'recommendations' or 'popular_items' depending on method
        const recs = personalizedRes.data.recommendations || personalizedRes.data.popular_items || [];
        const method = personalizedRes.data.method || 'unknown';
        
        
        // Only set personalized if it's actually collaborative filtering or content-based
        if ((method === 'collaborative_filtering' || method === 'content_based') && recs.length > 0) {
          setPersonalized(recs);
        } else {
        }
      } catch (err: any) {
        console.error('Personalized recommendations error:', err.response?.data);
      }
    } catch (error: any) {
      console.error('Failed to fetch recommendations:', error);
      setError(error.response?.data?.detail || 'Failed to load recommendations');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <div className="container mx-auto px-4 py-12">
          {/* Login Prompt */}
          <div className="max-w-2xl mx-auto text-center mb-12">
            <LogIn className="mx-auto text-blue-600 mb-4" size={64} />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Sign In for Personalized Recommendations
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Create an account and rate movies to get recommendations tailored just for you
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                to="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-semibold transition"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-white hover:bg-gray-50 text-gray-700 px-8 py-3 rounded-md font-semibold border-2 border-gray-300 transition"
              >
                Sign Up
              </Link>
            </div>
          </div>

          {/* Popular Items (available to everyone) */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          ) : popular.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="text-orange-600" size={28} />
                <h2 className="text-2xl font-bold">Popular Now</h2>
              </div>
              <p className="text-gray-600 mb-6">
                Trending movies and books loved by the community
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {popular.map((item) => (
                  <Link
                    key={item.item_id}
                    to={`/movies/${item.item_id}`}
                    onClick={() => isAuthenticated && interactionService.trackClick(item.item_id, item.item_type as 'movie' | 'book')}
                    className="group bg-white rounded-lg shadow hover:shadow-xl transition-all"
                  >
                    {item.poster_url || item.thumbnail_url ? (
                      <img
                        src={item.poster_url || item.thumbnail_url}
                        alt={item.title}
                        className="w-full h-64 object-cover rounded-t-lg"
                      />
                    ) : (
                      <div className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center rounded-t-lg">
                        {item.item_type === 'book' ? (
                          <Book className="text-gray-400" size={64} />
                        ) : (
                          <Film className="text-gray-400" size={64} />
                        )}
                      </div>
                    )}
                    <div className="p-3">
                      <h3 className="font-semibold text-sm truncate group-hover:text-blue-600">
                        {item.title}
                      </h3>
                      {item.avg_rating && (
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-yellow-600 font-medium">
                            ⭐ {item.avg_rating.toFixed(1)}
                          </span>
                          <span className="text-xs text-gray-500">
                            ({item.rating_count})
                          </span>
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
       

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Recommendations</h1>
          <p className="text-gray-600">Discover your next favorite movie or book</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-8">
            {error}
          </div>
        )}

        {/* Personalized Recommendations */}
        {personalized.length > 0 ? (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="text-purple-600" size={28} />
              <h2 className="text-2xl font-bold">For You</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Based on your ratings and preferences
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {personalized.map((item) => (
                <Link
                  key={item.item_id}
                  to={`/movies/${item.item_id}`}
                  onClick={() => isAuthenticated && interactionService.trackClick(item.item_id, item.item_type as 'movie' | 'book')}
                  className="group bg-white rounded-lg shadow hover:shadow-xl transition-all"
                >
                  {item.poster_url || item.thumbnail_url ? (
                    <img
                      src={item.poster_url || item.thumbnail_url}
                      alt={item.title}
                      className="w-full h-64 object-cover rounded-t-lg"
                    />
                  ) : (
                    <div className="w-full h-64 bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center rounded-t-lg">
                      {item.item_type === 'book' ? (
                        <Book className="text-purple-300" size={64} />
                      ) : (
                        <Film className="text-purple-300" size={64} />
                      )}
                    </div>
                  )}
                  <div className="p-3">
                    <h3 className="font-semibold text-sm truncate group-hover:text-blue-600">
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-between mt-1">
                      {item.release_date && (
                        <span className="text-xs text-gray-500">
                          {item.release_date.split('-')[0]}
                        </span>
                      )}
                      {item.predicted_rating ? (
                        <span className="text-xs text-purple-600 font-medium">
                          {item.predicted_rating.toFixed(1)}★
                        </span>
                      ) : item.similarity ? (
                        <span className="text-xs text-blue-600 font-medium">
                          {(item.similarity * 100).toFixed(0)}% match
                        </span>
                      ) : null}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : (
          <section className="mb-12 bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
            <Heart className="mx-auto text-blue-600 mb-4" size={48} />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Rate More Movies to Get Personalized Recommendations
            </h2>
            <p className="text-gray-600 mb-6">
              You need to rate at least 3 movies to receive personalized recommendations
            </p>
            <Link
              to="/search"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
            >
              Browse Movies
            </Link>
          </section>
        )}

        {/* Popular Items */}
        {popular.length > 0 ? (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="text-orange-600" size={28} />
              <h2 className="text-2xl font-bold">Popular Now</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Trending movies and books loved by the community
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {popular.map((item) => (
                <Link
                  key={item.item_id}
                  to={`/movies/${item.item_id}`}
                  onClick={() => isAuthenticated && interactionService.trackClick(item.item_id, item.item_type as 'movie' | 'book')}
                  className="group bg-white rounded-lg shadow hover:shadow-xl transition-all"
                >
                  {item.poster_url || item.thumbnail_url ? (
                    <img
                      src={item.poster_url || item.thumbnail_url}
                      alt={item.title}
                      className="w-full h-64 object-cover rounded-t-lg"
                    />
                  ) : (
                    <div className="w-full h-64 bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center rounded-t-lg">
                      {item.item_type === 'book' ? (
                        <Book className="text-orange-300" size={64} />
                      ) : (
                        <Film className="text-orange-300" size={64} />
                      )}
                    </div>
                  )}
                  <div className="p-3">
                    <h3 className="font-semibold text-sm truncate group-hover:text-blue-600">
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-between mt-1">
                      {item.release_date && (
                        <span className="text-xs text-gray-500">
                          {item.release_date.split('-')[0]}
                        </span>
                      )}
                      {item.avg_rating && (
                        <span className="text-xs text-yellow-600 font-medium">
                          ⭐ {item.avg_rating.toFixed(1)}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : (
          <section className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
            <TrendingUp className="mx-auto text-yellow-600 mb-4" size={48} />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Not Enough Data Yet
            </h2>
            <p className="text-gray-600 mb-4">
              The recommendation system needs more users and ratings to work effectively.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Movies need at least 5 ratings to appear in "Popular". 
              Personalized recommendations need multiple users rating the same movies.
            </p>
            <Link
              to="/search"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
            >
              Browse All Movies
            </Link>
          </section>
        )}
      </div>
      <Footer />
    </div>
  );
}
