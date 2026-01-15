import { Link } from 'react-router-dom';
import { Sparkles, Users, Database, Zap, Heart, Shield, Award } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section - Full Width */}
      <div className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About CineLibre
            </h1>
            <p className="text-xl md:text-2xl text-blue-100">
              AI-powered movie and book recommendations that understand what you're looking for
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Mission Section - Two Column Layout */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                We believe that finding great content shouldn't be difficult. Traditional 
                search relies on exact keyword matching, but we understand context and meaning.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our AI-powered semantic search lets you describe what you're looking for in 
                natural language, and we'll find the perfect match.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Sparkles className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Smart Search</h3>
                    <p className="text-gray-600 text-sm">Understands context, not just keywords</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="text-purple-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Personalized</h3>
                    <p className="text-gray-600 text-sm">Recommendations based on your taste</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="text-green-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Lightning Fast</h3>
                    <p className="text-gray-600 text-sm">Results in under 500 milliseconds</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid - 2x3 Layout */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What Makes Us Different
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="text-blue-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                AI-Powered Search
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Semantic search that understands context and meaning, not just keywords. 
                Search naturally and get relevant results.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
              <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="text-purple-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Collaborative Filtering
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Get recommendations based on users with similar taste. The more you rate, 
                the better your recommendations become.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Database className="text-green-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Rich Content Library
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Access thousands of movies across multiple languages and hundreds of books 
                across diverse genres.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
              <div className="w-14 h-14 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="text-yellow-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Lightning Fast
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Sub-second search results powered by optimized vector similarity and 
                efficient database queries.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
              <div className="w-14 h-14 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Heart className="text-red-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Free Forever
              </h3>
              <p className="text-gray-600 leading-relaxed">
                No subscriptions, no hidden fees. CineLibre is completely free to use 
                for everyone, forever.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
              <div className="w-14 h-14 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="text-indigo-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Privacy Focused
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Your data is secure. We only collect what's necessary and never share 
                your information.
              </p>
            </div>
          </div>
        </div>

        {/* Technology Section - Side by Side */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="bg-blue-600 text-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-10">
                <div className="flex items-center gap-3 mb-6">
                  <Award className="text-white" size={32} />
                  <h2 className="text-3xl font-bold">Advanced Technology</h2>
                </div>
                <p className="text-blue-100 text-lg leading-relaxed">
                  We use state-of-the-art AI and machine learning to deliver the best 
                  recommendations. Our hybrid approach combines multiple algorithms for 
                  superior accuracy.
                </p>
              </div>
              <div className="bg-blue-700 p-10">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-lg mb-2">🧠 Semantic Search</h3>
                    <p className="text-blue-100 text-sm">
                      Sentence transformers understand meaning behind queries
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">📊 Vector Similarity</h3>
                    <p className="text-blue-100 text-sm">
                      384-dimensional vectors for precise matching
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">🤝 Collaborative Filtering</h3>
                    <p className="text-blue-100 text-sm">
                      Pearson correlation finds similar users
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">⚡ Hybrid Approach</h3>
                    <p className="text-blue-100 text-sm">
                      Combines content-based and collaborative methods
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section - Horizontal Layout */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            By The Numbers
          </h2>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-blue-600 mb-2">2000+</div>
                <div className="text-gray-600 font-medium">Movies</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-purple-600 mb-2">500+</div>
                <div className="text-gray-600 font-medium">Books</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-green-600 mb-2">8</div>
                <div className="text-gray-600 font-medium">Languages</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-orange-600 mb-2">&lt;500ms</div>
                <div className="text-gray-600 font-medium">Search Speed</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section - Centered */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-lg shadow-lg p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join CineLibre today and discover your next favorite movie or book
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-lg font-semibold transition text-lg"
              >
                Sign Up Free
              </Link>
              <Link
                to="/how-it-works"
                className="bg-white hover:bg-gray-50 text-gray-700 px-10 py-4 rounded-lg font-semibold border-2 border-gray-300 transition text-lg"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
