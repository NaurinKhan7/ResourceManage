import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, X } from 'lucide-react';
import { Resource } from '@/types';
import DeleteDialog from './DeleteDialog';

type ResourceCardProps = {
  resource: Resource; // Resource data to display
  onDelete: (id: string) => void; // Callback to delete a resource
};

const ResourceCard = ({ resource, onDelete }: ResourceCardProps) => {
  // State for delete dialog and detail view
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDetailView, setShowDetailView] = useState(false);

 // Get color class based on resource type
  const getTypeColor = () => {
    switch (resource.type) {
      case 'Article':
        return 'bg-blue-100 text-blue-800';
      case 'Video':
        return 'bg-red-100 text-red-800';
      case 'Tutorial':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
// Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <>
      {/* Main card container */}
      <div 
        className="resource-card glass-panel rounded-lg p-5 overflow-hidden cursor-pointer"
        onClick={() => setShowDetailView(true)} // Show detail view on click
      >
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center space-x-2">
            <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getTypeColor()}`}>
              {resource.type}
            </span>
          </div>
          <div className="flex space-x-2">
            <Link 
              to={`/edit/${resource.id}`} 
              className="p-1.5 text-gray-500 hover:text-primary transition-colors rounded-md hover:bg-gray-100"
              aria-label="Edit resource"
              onClick={(e) => e.stopPropagation()}
            >
              <Edit className="h-4 w-4" />
            </Link>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowDeleteDialog(true);
              }}
              className="p-1.5 text-gray-500 hover:text-destructive transition-colors rounded-md hover:bg-gray-100"
              aria-label="Delete resource"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold mb-2 line-clamp-1">{resource.title}</h3>
        <p className="text-muted-foreground mb-3 line-clamp-2">{resource.description}</p>
        
        {/* Media preview (image or video) */}
        {resource.file_url && (
          <div className="mt-4 rounded-lg overflow-hidden border">
            {resource.file_url.match(/\.(mp4|webm|ogg)$/i) ? (
              <video 
                src={resource.file_url}
                controls
                className="w-full h-auto max-h-96"
              />
            ) : (
              <img 
                src={resource.file_url} 
                alt={resource.title}
                className="w-full h-auto max-h-96 object-contain"
              />
            )}
          </div>
        )}
        
        <div className="flex justify-between items-center mt-4">
          <span className="text-xs text-muted-foreground">
            Updated {formatDate(resource.updated_at)}
          </span>
        </div>
      </div>

      {showDetailView && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold">{resource.title}</h2>
                </div>
                <button
                  onClick={() => setShowDetailView(false)}
                  className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getTypeColor()}`}>
                  {resource.type}
                </span>
                <span className="text-xs text-gray-500">
                  Updated {formatDate(resource.updated_at)}
                </span>
              </div>
              
              {resource.description && (
                <p className="text-gray-700 mb-6 whitespace-pre-line">
                  {resource.description}
                </p>
              )}
              
              {resource.file_url && (
                <div className="mt-6">
                  {resource.file_url.match(/\.(mp4|webm|ogg)$/i) ? (
                    <video 
                      src={resource.file_url}
                      controls
                      autoPlay
                      className="max-h-[70vh] w-full rounded-lg"
                    />
                  ) : (
                    <img 
                      src={resource.file_url} 
                      alt={resource.title}
                      className="max-h-[70vh] w-auto mx-auto rounded-lg"
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <DeleteDialog 
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={() => {
          onDelete(resource.id);
          setShowDeleteDialog(false);
        }}
        title={resource.title}
      />
    </>
  );
};

export default ResourceCard;