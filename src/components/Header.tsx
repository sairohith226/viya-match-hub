import React from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '../context/AppContext';
import { useToast } from '@/hooks/use-toast';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Header = ({ currentPage, onNavigate }: HeaderProps) => {
  const { isAuthenticated, setIsAuthenticated, currentUser } = useApp();
  const { toast } = useToast();

  const handleLogin = () => {
    setIsAuthenticated(true);
    toast({
      title: "Login Successful",
      description: "You are now logged in.",
    });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    toast({
      title: "Logout Successful",
      description: "You have been logged out.",
    });
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button 
              onClick={() => onNavigate('home')}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Viya</span>
            </button>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => onNavigate('home')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === 'home'
                  ? 'text-pink-600 bg-pink-50'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Browse Profiles
            </button>
            {isAuthenticated && (
              <button
                onClick={() => onNavigate('matches')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === 'matches'
                    ? 'text-pink-600 bg-pink-50'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                My Matches
              </button>
            )}
            <button
              onClick={() => onNavigate('help')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === 'help'
                  ? 'text-pink-600 bg-pink-50'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Help & FAQ
            </button>
            {isAuthenticated && (
              <button
                onClick={() => onNavigate('admin')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === 'admin'
                    ? 'text-pink-600 bg-pink-50'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Admin Dashboard
              </button>
            )}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {!isAuthenticated ? (
              <Button onClick={handleLogin} variant="default">
                Login
              </Button>
            ) : (
              <>
                {currentUser && (
                  <span className="text-gray-700 text-sm">
                    Welcome, {currentUser.name}
                  </span>
                )}
                <Button onClick={handleLogout} variant="outline">
                  Logout
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-500"
              aria-expanded="false"
              onClick={() => {
                // Handle mobile menu toggle
              }}
            >
              <span className="sr-only">Open menu</span>
              {/* Heroicon name: outline/menu */}
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
