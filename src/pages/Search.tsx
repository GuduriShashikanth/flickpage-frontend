import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search as SearchIcon, Film } from 'lucide-react';
import api from '../services/api';
import type { Movie } from '../types';
import useDebounce from '../hooks/useDebounce';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Search() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery.trim().length >= 3) {
      searchMovies(debouncedQuery);
    } else if (debouncedQuery.trim().length === 0) {
      // Load default movies when no search query
      loadDefaultMovies();
    } else {
      setMovies([]);
      setError('');
    }
  }, [debouncedQuery]);

  const loadDefaultMovies = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/movies?limit=20');
      setMovies(response.data.movies || []);
    } catch (err: any) {
      console.error('Failed to load movies:', err);
      setError('Failed to load movies');
    } finally {
      setLoading(false);
    }
  };

  const searchMovies = async (searchQuery: string) => {
    setLoading(true);
    setError('');
    try {
      // Use 'q' parameter as per API spec, 'type' for item type
      const response = await api.get('/search/semantic', {
        params: {
          q: searchQuery,
          type: 'movie',
          limit: 20,
          threshold: 0.4
        }
      });
      
      // API returns { query: string, results: Movie[] }
      setMovies(response.data.results || []);
    } catch (err: any) {
      console.error('Search failed:', err);
      setError(err.response?.data?.detail || 'Search failed. Please try again.');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto mb-8">
          <h1 className="text-4xl font-bold mb-6 text-center">Search Movies</h1>
          <p className="text-center text-gray-600 mb-6">AI-powered semantic search</p>
          
          {/* Search Input */}
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for movies... (min 3 characters)"
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-3xl mx-auto mb-6">
            <div className="bg-red-50 text-red-600 p-4 rounded-lg">
              {error}
            </div>
          </div>
        )}

        {/* Results */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Searching...</p>
          </div>
        ) : movies.length > 0 ? (
          <>
            {debouncedQuery.trim().length >= 3 ? (
              <p className="text-gray-600 mb-4">Found {movies.length} results for "{debouncedQuery}"</p>
            ) : (
              <p className="text-gray-600 mb-4">Showing {movies.length} movies</p>
            )}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {movies.map((movie) => (
                <Link
                  key={movie.id}
                  to={`/movies/${movie.id}`}
                  className="group"
                >
                  <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition">
                    {movie.poster_url ? (
                      <img
                        src={movie.poster_url}
                        alt={movie.title}
                        className="w-full h-72 object-cover"
                      />
                    ) : (
                      <div className="w-full h-72 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <Film className="text-gray-400" size={64} />
                      </div>
                    )}
                    <div className="p-3">
                      <h3 className="font-semibold text-sm truncate">
                        {movie.title}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {movie.release_date?.split('-')[0]} • {movie.language?.toUpperCase()}
                      </p>
                      {movie.vote_average && (
                        <p className="text-xs text-yellow-600 mt-1">
                          ⭐ {movie.vote_average.toFixed(1)}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        ) : query.trim().length >= 3 && !loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No results found for "{query}"</p>
            <p className="text-sm text-gray-500 mt-2">Try a different search term</p>
          </div>
        ) : query.trim().length > 0 && query.trim().length < 3 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Type at least 3 characters to search</p>
          </div>
        ) : null}
      </div>
      <Footer />
    </div>
  );
}
