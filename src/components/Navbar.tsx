import { Link, useLocation } from 'react-router-dom';
import { PlusCircle, BookOpen } from 'lucide-react';

const Navbar = () => {
  // Call useLocation unconditionally at the top level
  const location = useLocation();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 glass-panel border-b shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo and Home Link */}
        <Link
          to="/"
          className="flex items-center space-x-2 font-medium text-xl transform transition-all hover:scale-[1.02]"
          aria-label="Go to Home"
        >
          <BookOpen className="h-6 w-6 text-primary" />
          <span>Resource Manager</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-4">
          {location.pathname !== '/add' && (
            <Link
              to="/add"
              className="flex items-center space-x-2 bg-primary text-primary-foreground px-4 py-2 rounded-md transition-all hover:bg-primary/90"
              aria-label="Add Resource"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Add Resource</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;