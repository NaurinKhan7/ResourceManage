
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wceszevhxwoffvblbwho.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjZXN6ZXZoeHdvZmZ2Ymxid2hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5NDA3MDksImV4cCI6MjA1ODUxNjcwOX0.2S90VTZbTKGT3AbzRJpOfe2abyDv4_GcrkHPb2wdgR4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const uploadFile = async (file: File, path: string) => {
  try {
    console.log('Uploading file to path:', path);
    const { data, error } = await supabase.storage
      .from('resource-files')
      .upload(path, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) {
      console.error('Storage upload error:', error);
      throw new Error(error.message);
    }

    if (!data) {
      throw new Error('Upload failed - no data returned');
    }

    // Get public URL for the uploaded file
    const { data: urlData } = supabase.storage
      .from('resource-files')
      .getPublicUrl(data.path);
    
    console.log('File uploaded successfully, public URL:', urlData.publicUrl);
    return urlData.publicUrl;
  } catch (error) {
    console.error('File upload failed:', error);
    throw error;
  }
};

export const getFileUrl = (path: string) => {
  const { data } = supabase.storage
    .from('resource-files')
    .getPublicUrl(path);
  
  return data.publicUrl;
};

export const deleteFile = async (path: string) => {
  const { error } = await supabase.storage
    .from('resource-files')
    .remove([path]);
  
  if (error) {
    throw new Error(error.message);
  }

  return true;
};
