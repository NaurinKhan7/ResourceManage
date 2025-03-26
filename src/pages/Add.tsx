
import { nanoid } from 'nanoid';
import { ResourceFormData } from '@/types';
import { supabase } from '@/lib/supabase';
import { uploadFile } from '@/lib/supabase';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ResourceForm from '@/components/ResourceForm';

const Add = () => {
  const navigate = useNavigate();
  
  const handleSubmit = async (data: ResourceFormData) => {
    try {
      let filePath = null;
      
      // Upload file if provided
      if (data.file) {
        const fileExt = data.file.name.split('.').pop();
        const fileName = `${nanoid()}.${fileExt}`;
        const folderPath = `uploads/${fileName}`;
        
        filePath = await uploadFile(data.file, folderPath);
      }
      
      // Save resource to database
      const { error } = await supabase.from('resources').insert({
        title: data.title,
        description: data.description,
        type: data.type,
        url: data.url || null,
        file_path: filePath,
      });
      
      if (error) {
        console.error('Supabase error:', error);
        toast.error(`Error adding resource: ${error.message}`);
        throw error;
      }
      
      toast.success('Resource added successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to add resource. Please try again.');
    }
  };

  return (
    <div className="min-h-screen pb-12">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-10 page-transition">
        <div className="glass-panel rounded-lg p-6 max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Add New Resource</h1>
          <ResourceForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Add;
