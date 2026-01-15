import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Globe, ArrowLeft, Book as BookIcon } from 'lucide-react';
import api from '../services/api';
import type { Book } from '../types';
import Navbar from '../components/Navbar';
import StarRating from '../components/StarRating';
import { useStore } from '../store/useStore';

export default function BookDetail() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [similarBooks, setSimilarBooks] = useState<Book[]>([]);
  const [userRating, setUserRating] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useStore();

  useEffect(() => {
    if (id) {
      fetchBookDetails();
      fetchSimilarBooks();
      if (isAuthenticated) {
        fetchUserRating();
      }
    }
  }, [id, isAuthenticated]);

  const fetchBookDetails = async () => {
    try {
      const response = await api.get<Book>(`/books/${id}`);
      setBook(response.data);
      
      // Track interaction
      if (isAuthenticated) {
        await api.post('/interactions', {
          item_id: id,
          item_type: 'book',
          interaction_type: 'view'
        });
      }
    } catch (error) {
      console.error('Failed to fetch book:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSimilarBooks = async () => {
    try {
      const response = await api.get(`/recommendations/similar/book/${id}?limit=6`);
      setSimilarBooks(response.data.similar_items || []);
    } catch (error) {
      console.error('Failed to fetch similar books:', error);
    }
  };

  const fetchUserRating = async () => {
    try {
      const response = await api.get('/ratings/my?item_type=book');
      const rating = response.data.find((r: any) => r.item_id === id);
      if (rating) {
        setUserRating(rating.rating);
      }
    } catch (error) {
      console.error('Failed to fetch user rating:', error);
    }
  };

  const handleRate = async (rating: number) => {
    if (!isAuthenticated) {
      alert('Please login to rate books');
      return;
    }

    try {
      await api.post('/ratings', {
        item_id: id,
        item_type: 'book',
        rating: rating
      });
      setUserRating(rating);
    } catch (error) {
      console.error('Failed to rate book:', error);
      alert('Failed to save rating');
    }
  };

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

  if (!book) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Book not found</h1>
          <Link to="/books" className="text-blue-600 hover:underline mt-4 inline-block">
            Go back to books
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <Link to="/books" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6">
          <ArrowLeft size={20} />
          <span>Back to Books</span>
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Thumbnail */}
            <div className="md:w-1/3">
              {book.thumbnail_url ? (
                <img
                  src={book.thumbnail_url}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-96 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                  <BookIcon className="text-blue-300" size={96} />
                </div>
              )}
            </div>

            {/* Details */}
            <div className="md:w-2/3 p-8">
              <h1 className="text-4xl font-bold mb-4">{book.title}</h1>
              
              {book.authors && (
                <p className="text-xl text-gray-700 mb-4">by {book.authors}</p>
              )}
              
              <div className="flex flex-wrap gap-4 mb-6 text-gray-600">
                {book.published_date && (
                  <div className="flex items-center gap-2">
                    <Calendar size={18} />
                    <span>{book.published_date.split('-')[0]}</span>
                  </div>
                )}
                {book.language && (
                  <div className="flex items-center gap-2">
                    <Globe size={18} />
                    <span>{book.language.toUpperCase()}</span>
                  </div>
                )}
                {book.categories && (
                  <div className="flex items-center gap-2">
                    <BookIcon size={18} />
                    <span>{book.categories}</span>
                  </div>
                )}
              </div>

              {book.description && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">Description</h2>
                  <p className="text-gray-700 leading-relaxed">{book.description}</p>
                </div>
              )}

              {/* Rating Section */}
              <div className="border-t pt-6">
                <h2 className="text-xl font-semibold mb-3">Your Rating</h2>
                {isAuthenticated ? (
                  <div className="flex items-center gap-4">
                    <StarRating rating={userRating} onRate={handleRate} />
                    {userRating > 0 && (
                      <span className="text-gray-600">You rated: {userRating}/5</span>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-600">
                    <Link to="/login" className="text-blue-600 hover:underline">
                      Login
                    </Link>{' '}
                    to rate this book
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Similar Books */}
        {similarBooks.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Similar Books</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {similarBooks.map((similar) => (
                <Link
                  key={similar.id}
                  to={`/books/${similar.id}`}
                  className="group"
                >
                  <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition">
                    {similar.thumbnail_url ? (
                      <img
                        src={similar.thumbnail_url}
                        alt={similar.title}
                        className="w-full h-64 object-cover"
                      />
                    ) : (
                      <div className="w-full h-64 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                        <BookIcon className="text-blue-300" size={48} />
                      </div>
                    )}
                    <div className="p-3">
                      <h3 className="font-semibold text-sm truncate">
                        {similar.title}
                      </h3>
                      {similar.authors && (
                        <p className="text-xs text-gray-500 truncate">
                          {similar.authors}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
