
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { File, ExternalLink, Edit, Trash2, FileVideo, BookOpen, BookText } from 'lucide-react';
import { Resource } from '@/types';
import DeleteDialog from './DeleteDialog';
import { getFileUrl } from '@/lib/supabase';

type ResourceCardProps = {
  resource: Resource;
  onDelete: (id: number) => void;
};

const ResourceCard = ({ resource, onDelete }: ResourceCardProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const getIcon = () => {
    switch (resource.type) {
      case 'Article':
        return <BookText className="h-5 w-5" />;
      case 'Video':
        return <FileVideo className="h-5 w-5" />;
      case 'Tutorial':
        return <BookOpen className="h-5 w-5" />;
      default:
        return <File className="h-5 w-5" />;
    }
  };

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <>
      <div className="resource-card glass-panel rounded-lg p-5 overflow-hidden">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center space-x-2">
            <div className={`${getTypeColor()} p-1.5 rounded-md`}>
              {getIcon()}
            </div>
            <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getTypeColor()}`}>
              {resource.type}
            </span>
          </div>
          <div className="flex space-x-2">
            <Link 
              to={`/edit/${resource.id}`} 
              className="p-1.5 text-gray-500 hover:text-primary transition-colors rounded-md hover:bg-gray-100"
              aria-label="Edit resource"
            >
              <Edit className="h-4 w-4" />
            </Link>
            <button
              onClick={() => setShowDeleteDialog(true)}
              className="p-1.5 text-gray-500 hover:text-destructive transition-colors rounded-md hover:bg-gray-100"
              aria-label="Delete resource"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold mb-2 line-clamp-1">{resource.title}</h3>
        
        <p className="text-muted-foreground mb-3 line-clamp-2">{resource.description}</p>
        
        <div className="flex justify-between items-center mt-4">
          <span className="text-xs text-muted-foreground">
            Updated {formatDate(resource.updated_at)}
          </span>
          
          {resource.url && (
            <a 
              href={resource.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-sm text-primary hover:underline"
            >
              <ExternalLink className="h-3.5 w-3.5 mr-1" />
              <span>Open Link</span>
            </a>
          )}
          
          {resource.file_path && (
            <a 
              href={getFileUrl(resource.file_path)} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-sm text-primary hover:underline"
            >
              <ExternalLink className="h-3.5 w-3.5 mr-1" />
              <span>View File</span>
            </a>
          )}
        </div>
      </div>
      
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
