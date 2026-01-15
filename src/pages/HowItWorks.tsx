import { Link } from 'react-router-dom';
import { Search, Star, Sparkles, TrendingUp, Users, Zap } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              How FlickPage Works
            </h1>
            <p className="text-xl md:text-2xl text-blue-100">
              Discover how our AI-powered platform helps you find your next favorite
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* 3-Step Process - Horizontal Timeline */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Get Started in 3 Simple Steps
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                1
              </div>
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Search className="text-blue-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Search & Discover
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Use our AI-powered semantic search to find movies and books. 
                Describe what you're looking for in natural language.
              </p>
              <div className="bg-blue-50 rounded-lg p-4 text-sm text-left">
                <p className="text-blue-900 font-semibold mb-2">Try searching:</p>
                <ul className="space-y-1 text-blue-700">
                  <li>• "romantic comedy in Paris"</li>
                  <li>• "sci-fi with time travel"</li>
                </ul>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                2
              </div>
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Star className="text-purple-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Rate What You Love
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Rate movies and books from 0.5 to 5 stars. Your ratings help us 
                understand your unique taste.
              </p>
              <div className="bg-purple-50 rounded-lg p-4 text-sm text-left">
                <p className="text-purple-900 font-semibold mb-2">Why rate?</p>
                <ul className="space-y-1 text-purple-700">
                  <li>• Builds your taste profile</li>
                  <li>• Improves recommendations</li>
                </ul>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                3
              </div>
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Sparkles className="text-green-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Get Recommendations
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Receive personalized recommendations based on your ratings and 
                similar users' preferences.
              </p>
              <div className="bg-green-50 rounded-lg p-4 text-sm text-left">
                <p className="text-green-900 font-semibold mb-2">You'll get:</p>
                <ul className="space-y-1 text-green-700">
                  <li>• Personalized picks</li>
                  <li>• Similar content</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendation Types - Grid Layout */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Three Types of Recommendations
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Personalized */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="text-purple-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Personalized (For You)
              </h3>
              <p className="text-gray-600 mb-4">
                Based on collaborative filtering - we find users with similar taste 
                and recommend what they loved.
              </p>
              <div className="bg-purple-50 rounded p-3 text-sm">
                <strong>Requirements:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                  <li>Rate at least 3 items</li>
                  <li>Other users with similar taste</li>
                </ul>
              </div>
            </div>

            {/* Similar Items */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Similar Items
              </h3>
              <p className="text-gray-600 mb-4">
                Content-based recommendations using AI to find items with similar 
                themes, genres, and characteristics.
              </p>
              <div className="bg-blue-50 rounded p-3 text-sm">
                <strong>How it works:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                  <li>Vector similarity matching</li>
                  <li>Based on content analysis</li>
                </ul>
              </div>
            </div>

            {/* Popular */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="text-orange-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Popular Now
              </h3>
              <p className="text-gray-600 mb-4">
                Trending items based on community ratings. Discover what others 
                are loving right now.
              </p>
              <div className="bg-orange-50 rounded p-3 text-sm">
                <strong>Criteria:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                  <li>Minimum 5 ratings</li>
                  <li>Sorted by average rating</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Semantic Search - Two Column Layout */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="bg-white rounded-lg shadow-lg p-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              How Semantic Search Works
            </h2>
            
            {/* Comparison */}
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="font-semibold text-red-900 mb-2 text-lg">❌ Traditional Search</h3>
                <p className="text-gray-700">
                  Matches exact keywords only. Search for "scary movie" and you'll 
                  only get results with those exact words.
                </p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="font-semibold text-green-900 mb-2 text-lg">✅ Semantic Search</h3>
                <p className="text-gray-700">
                  Understands meaning and context. Search for "scary movie" and get 
                  horror, thriller, suspense - anything that matches the intent.
                </p>
              </div>
            </div>

            {/* Process Steps */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                The Technology Behind It
              </h3>
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div className="flex-1">
                  <strong className="text-gray-900">Text Embedding:</strong>
                  <p className="text-gray-600">
                    Your search query is converted into a 384-dimensional vector 
                    that captures its semantic meaning.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div className="flex-1">
                  <strong className="text-gray-900">Vector Comparison:</strong>
                  <p className="text-gray-600">
                    We compare your query vector with all content vectors using 
                    cosine similarity.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div className="flex-1">
                  <strong className="text-gray-900">Ranked Results:</strong>
                  <p className="text-gray-600">
                    Results are ranked by similarity score and returned in 
                    milliseconds.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Example Searches - Side by Side */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="bg-blue-600 text-white rounded-lg shadow-lg p-10">
            <h2 className="text-3xl font-bold mb-8 text-center">Try These Searches</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">🎬 Movies</h3>
                <ul className="space-y-2">
                  <li className="bg-blue-700 rounded p-3">"action thriller with car chases"</li>
                  <li className="bg-blue-700 rounded p-3">"romantic comedy set in Paris"</li>
                  <li className="bg-blue-700 rounded p-3">"sci-fi movie about time travel"</li>
                  <li className="bg-blue-700 rounded p-3">"heartwarming family drama"</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">📚 Books</h3>
                <ul className="space-y-2">
                  <li className="bg-blue-700 rounded p-3">"mystery novel with plot twists"</li>
                  <li className="bg-blue-700 rounded p-3">"self-help book about productivity"</li>
                  <li className="bg-blue-700 rounded p-3">"fantasy adventure with magic"</li>
                  <li className="bg-blue-700 rounded p-3">"biography of a scientist"</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Performance - Horizontal Stats */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="bg-white rounded-lg shadow-lg p-10">
            <div className="flex items-center justify-center gap-3 mb-8">
              <Zap className="text-yellow-600" size={32} />
              <h2 className="text-3xl font-bold text-gray-900">
                Lightning Fast Performance
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-5xl font-bold text-blue-600 mb-2">&lt;50ms</div>
                <div className="text-gray-600">Embedding Generation</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-purple-600 mb-2">&lt;200ms</div>
                <div className="text-gray-600">Vector Search</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-green-600 mb-2">&lt;500ms</div>
                <div className="text-gray-600">Total Response Time</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA - Centered */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-lg shadow-lg p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Try It Yourself?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Sign up now and start discovering amazing content with AI
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-lg font-semibold transition text-lg"
              >
                Get Started Free
              </Link>
              <Link
                to="/search"
                className="bg-white hover:bg-gray-50 text-gray-700 px-10 py-4 rounded-lg font-semibold border-2 border-gray-300 transition text-lg"
              >
                Try Search Now
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
