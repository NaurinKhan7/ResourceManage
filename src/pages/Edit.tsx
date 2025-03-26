
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { nanoid } from 'nanoid';
import { Loader2 } from 'lucide-react';
import { ResourceFormData } from '@/types';
import { supabase } from '@/integrations/supabase/client';
import { uploadFile, deleteFile } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import ResourceForm from '@/components/ResourceForm';

const Edit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Fetch resource data
  const { data: resource, isLoading, isError } = useQuery({
    queryKey: ['resource', id],
    queryFn: async () => {
      if (!id) throw new Error('Resource ID is required');
      
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      if (!data) throw new Error('Resource not found');
      
      return data;
    },
  });
  
  // Redirect if resource not found
  useEffect(() => {
    if (isError) {
      toast.error('Resource not found');
      navigate('/');
    }
  }, [isError, navigate]);
  
  const handleSubmit = async (data: ResourceFormData) => {
    if (!id) return;
    
    try {
      let fileUrl = resource?.file_url;
      
      // Upload new file if provided
      if (data.file) {
        const fileExt = data.file.name.split('.').pop();
        const fileName = `${nanoid()}.${fileExt}`;
        const folderPath = `uploads/${fileName}`;
        
        // Delete old file if exists
        if (resource?.file_url) {
          try {
            const filePath = resource.file_url.split('/').pop();
            if (filePath) {
              await deleteFile(`uploads/${filePath}`);
            }
          } catch (deleteError) {
            console.error('Error deleting old file:', deleteError);
            // Continue with update even if deletion fails
          }
        }
        
        // Upload new file
        try {
          fileUrl = await uploadFile(data.file, folderPath);
        } catch (uploadError) {
          console.error('Error uploading new file:', uploadError);
          toast.error('Failed to upload file. Continuing with other updates.');
          // Continue with update even if upload fails
        }
      }
      
      // Update resource in database
      const { error } = await supabase
        .from('resources')
        .update({
          title: data.title,
          description: data.description,
          type: data.type,
          url: data.url || null,
          file_url: fileUrl,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);
      
      if (error) {
        console.error('Error updating resource:', error);
        toast.error(`Error updating resource: ${error.message}`);
        throw error;
      }
      
      toast.success('Resource updated successfully');
      navigate('/');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to update resource. Please try again.');
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  const initialData: ResourceFormData = resource
    ? {
        title: resource.title,
        description: resource.description,
        type: resource.type as ResourceFormData['type'],
        url: resource.url || '',
        file_url: resource.file_url,
      }
    : {
        title: '',
        description: '',
        type: 'Article',
        url: '',
      };
  
  return (
    <div className="min-h-screen pb-12">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-10 page-transition">
        <div className="glass-panel rounded-lg p-6 max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Edit Resource</h1>
          {resource && (
            <ResourceForm 
              initialData={initialData} 
              onSubmit={handleSubmit} 
              isEditMode 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Edit;
