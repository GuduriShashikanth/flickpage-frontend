import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { User, LogOut } from 'lucide-react';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useStore();

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700">
            FlickPage
          </Link>

          {/* Main Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/search"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Movies
            </Link>
            <Link
              to="/books"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Books
            </Link>
            <Link
              to="/recommendations"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Recommendations
            </Link>
            {isAuthenticated && (
              <Link
                to="/my-ratings"
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                My Ratings
              </Link>
            )}
            <Link
              to="/about"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              About
            </Link>
            <Link
              to="/how-it-works"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              How It Works
            </Link>
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
               
                  <User size={18} />
                  <span className="hidden sm:inline">{user?.name}</span>
              
                <button
                  onClick={logout}
                  className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition"
                  title="Logout"
                >
                  <LogOut size={18} />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
