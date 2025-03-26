
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-muted/50">
      <div className="glass-panel rounded-lg p-8 text-center max-w-md animate-fade-in">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-6">The page you're looking for doesn't exist</p>
        <Link 
          to="/" 
          className="inline-flex items-center text-primary hover:text-primary/90 transition-colors font-medium"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return to Resources
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
