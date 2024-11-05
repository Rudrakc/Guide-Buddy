import { Link } from 'react-router-dom';
import { User } from 'lucide-react';

const Navigation = () => {
  return (
    <nav className="bg-white shadow-md w-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              Guide Buddy
            </Link>
          </div>
          <div className="flex items-center">
            <Link
              to="/profile"
              className="p-2 rounded-full hover:bg-gray-100 transition duration-200"
            >
              <User className="w-6 h-6 text-gray-600" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;