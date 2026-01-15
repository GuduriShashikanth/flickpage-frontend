import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import interactionService from '../services/interaction.service';
import type { Movie } from '../types';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Search, TrendingUp, Sparkles } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useStore();

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await api.get('/movies?limit=18');
      setMovies(response.data.movies || []);
    } catch (error) {
      console.error('Failed to fetch movies:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section - MovieLens Style */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              FlickPage
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Personalized movie and book recommendations powered by AI
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/search"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium transition"
              >
                <Search size={20} />
                Search Movies
              </Link>
              <Link
                to="/recommendations"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-8 py-3 rounded-md font-medium border-2 border-gray-300 transition"
              >
                <Sparkles size={20} />
                Get Recommendations
              </Link>
            </div>
          </div>
        </div>
      </div>

   

      {/* Featured Movies Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Featured Movies</h2>
          <Link to="/search" className="text-blue-600 hover:text-blue-700 font-medium">
            View all →
          </Link>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow animate-pulse">
                <div className="w-full h-64 bg-gray-200"></div>
                <div className="p-3">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {movies.map((movie) => (
              <Link
                key={movie.id}
                to={`/movies/${movie.id}`}
                onClick={() => isAuthenticated && interactionService.trackClick(movie.id, 'movie')}
                className="group bg-white rounded-lg shadow hover:shadow-xl transition-all"
              >
                {movie.poster_url ? (
                  <img
                    src={movie.poster_url}
                    alt={movie.title}
                    className="w-full h-64 object-cover rounded-t-lg"
                  />
                ) : (
                  <div className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center rounded-t-lg">
                    <Sparkles className="text-gray-400" size={48} />
                  </div>
                )}
                <div className="p-3">
                  <h3 className="font-semibold text-sm text-gray-900 truncate group-hover:text-blue-600">
                    {movie.title}
                  </h3>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-500">
                      {movie.release_date?.split('-')[0]}
                    </span>
                    {movie.vote_average && (
                      <span className="text-xs text-yellow-600 font-medium">
                        ⭐ {movie.vote_average.toFixed(1)}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* How It Works Section */}
      <div className="bg-white border-t py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How FlickPage Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                1. Search & Discover
              </h3>
              <p className="text-gray-600">
                Use AI-powered semantic search to find movies and books that match your interests
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                2. Rate What You Love
              </h3>
              <p className="text-gray-600">
                Rate movies and books to help us understand your taste and preferences
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                3. Get Recommendations
              </h3>
              <p className="text-gray-600">
                Receive personalized recommendations based on collaborative filtering and AI
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to discover your next favorite?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join FlickPage today and get personalized recommendations
          </p>
          <Link
            to="/register"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
          >
            Sign Up - It's Free
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
