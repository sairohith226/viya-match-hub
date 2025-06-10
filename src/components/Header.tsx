
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, User, Menu } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Header = ({ currentPage, onNavigate }: HeaderProps) => {
  const { isAuthenticated, setIsAuthenticated, currentUser } = useApp();

  const handleLogin = () => {
    // Mock login
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button 
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 font-bold text-xl text-primary"
            >
              <Heart className="w-6 h-6 text-red-500" />
              Viya
            </button>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Button
              variant={currentPage === 'home' ? 'default' : 'ghost'}
              onClick={() => onNavigate('home')}
            >
              Browse Profiles
            </Button>
            {isAuthenticated && (
              <Button
                variant={currentPage === 'matches' ? 'default' : 'ghost'}
                onClick={() => onNavigate('matches')}
              >
                My Matches
              </Button>
            )}
            <Button
              variant={currentPage === 'help' ? 'default' : 'ghost'}
              onClick={() => onNavigate('help')}
            >
              Help & FAQ
            </Button>
          </nav>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onNavigate('profile')}
                >
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button onClick={handleLogin}>
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
