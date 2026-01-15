import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, Trash2, Film, Book } from 'lucide-react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface Rating {
  id: number;
  user_id: number;
  item_id: string;
  item_type: 'movie' | 'book';
  rating: number;
  created_at: string;
  title?: string;
  poster_url?: string;
}

export default function MyRatings() {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [filter, setFilter] = useState<'all' | 'movie' | 'book'>('all');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, avgRating: 0, movies: 0, books: 0 });

  useEffect(() => {
    fetchRatings();
  }, [filter]);

  const fetchRatings = async () => {
    setLoading(true);
    try {
      const params = filter !== 'all' ? `?item_type=${filter}` : '';
      const response = await api.get(`/ratings/my${params}`);
      const ratingsData = response.data;
      
      // Fetch item details for each rating
      const ratingsWithDetails = await Promise.all(
        ratingsData.map(async (rating: Rating) => {
          try {
            const endpoint = rating.item_type === 'movie' 
              ? `/movies/${rating.item_id}`
              : `/books/${rating.item_id}`;
            const itemRes = await api.get(endpoint);
            return {
              ...rating,
              title: itemRes.data.title,
              poster_url: itemRes.data.poster_url || itemRes.data.thumbnail_url
            };
          } catch (error) {
            return rating;
          }
        })
      );
      
      setRatings(ratingsWithDetails);
      
      // Calculate stats
      const total = ratingsWithDetails.length;
      const avgRating = total > 0 
        ? ratingsWithDetails.reduce((sum, r) => sum + r.rating, 0) / total 
        : 0;
      const movies = ratingsWithDetails.filter(r => r.item_type === 'movie').length;
      const books = ratingsWithDetails.filter(r => r.item_type === 'book').length;
      
      setStats({ total, avgRating, movies, books });
    } catch (error) {
      console.error('Failed to fetch ratings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (ratingId: number) => {
    if (!confirm('Are you sure you want to delete this rating?')) return;
    
    try {
      await api.delete(`/ratings/${ratingId}`);
      setRatings(ratings.filter(r => r.id !== ratingId));
      // Recalculate stats
      const newRatings = ratings.filter(r => r.id !== ratingId);
      const total = newRatings.length;
      const avgRating = total > 0 
        ? newRatings.reduce((sum, r) => sum + r.rating, 0) / total 
        : 0;
      const movies = newRatings.filter(r => r.item_type === 'movie').length;
      const books = newRatings.filter(r => r.item_type === 'book').length;
      setStats({ total, avgRating, movies, books });
    } catch (error) {
      console.error('Failed to delete rating:', error);
      alert('Failed to delete rating');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">My Ratings</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-gray-600 text-sm">Total Ratings</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-yellow-600">
              {stats.avgRating.toFixed(1)}
            </div>
            <div className="text-gray-600 text-sm">Average Rating</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-purple-600">{stats.movies}</div>
            <div className="text-gray-600 text-sm">Movies</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-green-600">{stats.books}</div>
            <div className="text-gray-600 text-sm">Books</div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md font-medium transition ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('movie')}
            className={`px-4 py-2 rounded-md font-medium transition flex items-center gap-2 ${
              filter === 'movie'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Film size={18} />
            Movies
          </button>
          <button
            onClick={() => setFilter('book')}
            className={`px-4 py-2 rounded-md font-medium transition flex items-center gap-2 ${
              filter === 'book'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Book size={18} />
            Books
          </button>
        </div>

        {/* Ratings List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : ratings.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <Star className="mx-auto text-gray-300 mb-4" size={64} />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No ratings yet</h2>
            <p className="text-gray-600 mb-6">Start rating movies and books to see them here</p>
            <Link
              to="/"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 inline-block"
            >
              Explore Movies
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {ratings.map((rating) => (
              <div
                key={rating.id}
                className="bg-white rounded-lg shadow p-4 flex items-center gap-4 hover:shadow-lg transition"
              >
                {/* Poster */}
                <Link to={`/movies/${rating.item_id}`} className="flex-shrink-0">
                  {rating.poster_url ? (
                    <img
                      src={rating.poster_url}
                      alt={rating.title}
                      className="w-20 h-28 object-cover rounded"
                    />
                  ) : (
                    <div className="w-20 h-28 bg-gradient-to-br from-blue-50 to-blue-100 rounded flex items-center justify-center">
                      {rating.item_type === 'movie' ? (
                        <Film className="text-blue-300" size={32} />
                      ) : (
                        <Book className="text-blue-300" size={32} />
                      )}
                    </div>
                  )}
                </Link>

                {/* Details */}
                <div className="flex-1">
                  <Link
                    to={`/movies/${rating.item_id}`}
                    className="text-lg font-semibold hover:text-blue-600"
                  >
                    {rating.title || 'Unknown Title'}
                  </Link>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-gray-500 capitalize">
                      {rating.item_type}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-sm text-gray-500">
                      {new Date(rating.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={20}
                        className={
                          star <= rating.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }
                      />
                    ))}
                  </div>
                  <span className="text-lg font-semibold">{rating.rating}</span>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(rating.id)}
                  className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded transition"
                  title="Delete rating"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
