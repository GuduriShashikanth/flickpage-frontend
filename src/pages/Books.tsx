import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Book as BookIcon, Search } from 'lucide-react';
import api from '../services/api';
import type { Book } from '../types';
import useDebounce from '../hooks/useDebounce';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const debouncedQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    if (debouncedQuery.trim().length >= 3) {
      searchBooks(debouncedQuery);
    } else if (debouncedQuery.trim().length === 0) {
      // Load default books when no search query
      loadDefaultBooks();
    } else {
      setBooks([]);
      setError('');
    }
  }, [debouncedQuery]);

  const loadDefaultBooks = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/books?limit=20');
      setBooks(response.data.books || []);
    } catch (err: any) {
      console.error('Failed to load books:', err);
      setError('Failed to load books');
    } finally {
      setLoading(false);
    }
  };

  const searchBooks = async (query: string) => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/search/semantic', {
        params: {
          q: query,
          type: 'book',
          limit: 20,
          threshold: 0.4
        }
      });
      
      setBooks(response.data.results || []);
    } catch (err: any) {
      console.error('Search failed:', err);
      setError(err.response?.data?.detail || 'Search failed. Please try again.');
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Discover Books</h1>
          <p className="text-gray-600">Search for books using AI-powered semantic search</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for books... (min 3 characters)"
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
        ) : books.length > 0 ? (
          <>
            {debouncedQuery.trim().length >= 3 ? (
              <p className="text-gray-600 mb-4">Found {books.length} results for "{debouncedQuery}"</p>
            ) : (
              <p className="text-gray-600 mb-4">Showing {books.length} books</p>
            )}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {books.map((book) => (
                <Link
                  key={book.id}
                  to={`/books/${book.id}`}
                  className="group"
                >
                  <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition">
                    {book.thumbnail_url ? (
                      <img
                        src={book.thumbnail_url}
                        alt={book.title}
                        className="w-full h-72 object-cover"
                      />
                    ) : (
                      <div className="w-full h-72 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                        <BookIcon className="text-blue-300" size={64} />
                      </div>
                    )}
                    <div className="p-3">
                      <h3 className="font-semibold text-sm truncate">
                        {book.title}
                      </h3>
                      {book.authors && (
                        <p className="text-xs text-gray-500 truncate">
                          {book.authors}
                        </p>
                      )}
                      {book.published_date && (
                        <p className="text-xs text-gray-400 mt-1">
                          {book.published_date.split('-')[0]}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        ) : searchQuery.trim().length >= 3 && !loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No results found for "{searchQuery}"</p>
            <p className="text-sm text-gray-500 mt-2">Try a different search term</p>
          </div>
        ) : searchQuery.trim().length > 0 && searchQuery.trim().length < 3 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Type at least 3 characters to search</p>
          </div>
        ) : null}
      </div>
      <Footer />
    </div>
  );
}
