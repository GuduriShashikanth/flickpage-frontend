import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Globe, Star, ArrowLeft, Film } from 'lucide-react';
import api from '../services/api';
import interactionService from '../services/interaction.service';
import type { Movie } from '../types';
import Navbar from '../components/Navbar';
import StarRating from '../components/StarRating';
import { useStore } from '../store/useStore';

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
  const [userRating, setUserRating] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useStore();

  useEffect(() => {
    if (id) {
      fetchMovieDetails();
      fetchSimilarMovies();
      if (isAuthenticated) {
        fetchUserRating();
      }
    }
  }, [id, isAuthenticated]);

  const fetchMovieDetails = async () => {
    try {
      // Fetch with include_details=true to get cast, crew, genres
      const response = await api.get<Movie>(`/movies/${id}?include_details=true`);
      setMovie(response.data);
      
      // Track view interaction
      if (isAuthenticated && id) {
        interactionService.trackView(id, 'movie');
      }
    } catch (error) {
      console.error('Failed to fetch movie:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSimilarMovies = async () => {
    try {
      const response = await api.get(`/recommendations/similar/movie/${id}?limit=6`);
      setSimilarMovies(response.data.similar_items || []);
    } catch (error) {
      console.error('Failed to fetch similar movies:', error);
    }
  };

  const fetchUserRating = async () => {
    try {
      const response = await api.get('/ratings/my?item_type=movie');
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
      alert('Please login to rate movies');
      return;
    }

    try {
      await api.post('/ratings', {
        item_id: id,
        item_type: 'movie',
        rating: rating
      });
      setUserRating(rating);
    } catch (error) {
      console.error('Failed to rate movie:', error);
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

  if (!movie) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Movie not found</h1>
          <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6">
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Poster */}
            <div className="md:w-1/3">
              {movie.poster_url ? (
                <img
                  src={movie.poster_url}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-96 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <Film className="text-gray-400" size={96} />
                </div>
              )}
            </div>

            {/* Details */}
            <div className="md:w-2/3 p-8">
              <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
              
              <div className="flex flex-wrap gap-4 mb-6 text-gray-600">
                {movie.release_date && (
                  <div className="flex items-center gap-2">
                    <Calendar size={18} />
                    <span>{new Date(movie.release_date).getFullYear()}</span>
                  </div>
                )}
                {movie.runtime && (
                  <div className="flex items-center gap-2">
                    <span>{movie.runtime} min</span>
                  </div>
                )}
                {movie.language && (
                  <div className="flex items-center gap-2">
                    <Globe size={18} />
                    <span>{movie.language.toUpperCase()}</span>
                  </div>
                )}
                {movie.vote_average && (
                  <div className="flex items-center gap-2">
                    <Star size={18} className="fill-yellow-400 text-yellow-400" />
                    <span>{movie.vote_average.toFixed(1)}/10</span>
                    {movie.vote_count && (
                      <span className="text-sm text-gray-500">({movie.vote_count.toLocaleString()} votes)</span>
                    )}
                  </div>
                )}
              </div>

              {/* Genres */}
              {movie.genres && movie.genres.length > 0 && (
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {movie.genres.map((genre, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {movie.overview && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">Overview</h2>
                  <p className="text-gray-700 leading-relaxed">{movie.overview}</p>
                </div>
              )}

              {/* Additional Info */}
              {(movie.budget || movie.revenue) && (
                <div className="mb-6 grid grid-cols-2 gap-4">
                  {movie.budget && movie.budget > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-600 mb-1">Budget</h3>
                      <p className="text-lg font-bold text-gray-900">
                        ${(movie.budget / 1000000).toFixed(1)}M
                      </p>
                    </div>
                  )}
                  {movie.revenue && movie.revenue > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-600 mb-1">Revenue</h3>
                      <p className="text-lg font-bold text-gray-900">
                        ${(movie.revenue / 1000000).toFixed(1)}M
                      </p>
                    </div>
                  )}
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
                    to rate this movie
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Cast & Crew Section */}
        {((movie.cast && movie.cast.length > 0) || (movie.crew && movie.crew.length > 0)) && (
          <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Cast & Crew</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Crew */}
              {movie.crew && movie.crew.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">Crew</h3>
                  <div className="space-y-2">
                    {movie.crew.map((member, index) => (
                      <div key={index} className="text-gray-600">
                        <span className="font-medium text-gray-900">{member.name}</span>
                        <span className="text-sm"> - {member.job}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Cast */}
              {movie.cast && movie.cast.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">Cast</h3>
                  <div className="space-y-2">
                    {movie.cast.map((actor, index) => (
                      <div key={index} className="text-gray-600">
                        <span className="font-medium text-gray-900">{actor.name}</span>
                        {actor.character && (
                          <span className="text-sm"> as {actor.character}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Similar Movies */}
        {similarMovies.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Similar Movies</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {similarMovies.map((similar) => (
                <Link
                  key={similar.id}
                  to={`/movies/${similar.id}`}
                  onClick={() => isAuthenticated && interactionService.trackClick(similar.id, 'movie')}
                  className="group"
                >
                  <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition">
                    {similar.poster_url ? (
                      <img
                        src={similar.poster_url}
                        alt={similar.title}
                        className="w-full h-64 object-cover"
                      />
                    ) : (
                      <div className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <Film className="text-gray-400" size={48} />
                      </div>
                    )}
                    <div className="p-3">
                      <h3 className="font-semibold text-sm truncate">
                        {similar.title}
                      </h3>
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
