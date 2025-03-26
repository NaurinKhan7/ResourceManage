
import { supabase } from '@/lib/supabase';

export const createResourceBucket = async () => {
  // Check if bucket exists
  const { data: buckets } = await supabase.storage.listBuckets();
  const bucketExists = buckets?.some(bucket => bucket.name === 'resource-files');
  
  if (!bucketExists) {
    // Create bucket if it doesn't exist
    const { error } = await supabase.storage.createBucket('resource-files', {
      public: true, // Make files publicly accessible
    });
    
    if (error) {
      console.error('Error creating storage bucket:', error);
      throw error;
    }
    
    console.log('Storage bucket created successfully');
  }
};
