import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ArrowLeft, LogOut } from 'lucide-react';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  backPath?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  showBackButton = false, 
  backPath 
}) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleBack = () => {
    if (backPath) {
      navigate(backPath);
    } else {
      navigate(-1);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {showBackButton && (
            <button
              onClick={handleBack}
              className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">
            {title}
          </h1>
        </div>
        
        <button
          onClick={handleLogout}
          className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors"
          aria-label="Logout"
        >
          <LogOut size={18} />
          <span className="hidden sm:inline text-sm font-medium">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;