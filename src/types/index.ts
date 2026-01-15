export interface User {
  id: number;
  email: string;
  name: string;
  created_at?: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface Movie {
  id: string;
  tmdb_id?: number;
  title: string;
  language?: string;
  poster_url?: string;
  overview?: string;
  release_date?: string;
  vote_average?: number;
  created_at?: string;
}

export interface Book {
  id: string;
  google_id?: string;
  title: string;
  authors?: string;
  description?: string;
  thumbnail_url?: string;
  published_date?: string;
  categories?: string;
  language?: string;
  created_at?: string;
}

export interface MoviesResponse {
  movies: Movie[];
  total?: number;
  page?: number;
  limit?: number;
  skip?: number;
}

export interface Rating {
  id: number;
  user_id: number;
  item_id: string;
  item_type: 'movie' | 'book';
  rating: number;
  created_at: string;
  updated_at?: string;
}

export interface Interaction {
  id: number;
  user_id: number;
  item_id: string;
  item_type: 'movie' | 'book';
  interaction_type: 'view' | 'click' | 'search';
  created_at: string;
}

export interface SearchResult {
  query: string;
  results: Movie[] | Book[];
}

export interface RecommendationItem {
  item_id: string;
  item_type: 'movie' | 'book';
  title: string;
  predicted_rating?: number;
  poster_url?: string;
  thumbnail_url?: string;
  avg_rating?: number;
  rating_count?: number;
  similarity?: number;
}

export interface RecommendationsResponse {
  recommendations?: RecommendationItem[];
  popular_items?: RecommendationItem[];
  similar_items?: Movie[] | Book[];
  method?: string;
}
