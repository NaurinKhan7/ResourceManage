import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Search, Filter, Loader2 } from 'lucide-react';
import { Resource, ResourceType } from '@/types';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import ResourceCard from '@/components/ResourceCard';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const { data: resources, isLoading, isError, refetch } = useQuery({
    queryKey: ['resources'],
    queryFn: async () => {
      console.log('Fetching resources...');
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .order('updated_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching resources:', error);
        throw new Error(error.message);
      }
      
      console.log('Resources fetched successfully:', data);
      return data as Resource[];
    },
  });

  const handleDelete = async (id: string) => {
    try {
      const { data: resource } = await supabase
        .from('resources')
        .select('file_url')
        .eq('id', id)
        .single();
      
      const { error } = await supabase
        .from('resources')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      if (resource?.file_url) {
        await supabase.storage
          .from('resource-files')
          .remove([resource.file_url]);
      }
      
      refetch();
      toast.success('Resource deleted successfully');
    } catch (error) {
      console.error('Error deleting resource:', error);
      toast.error('Failed to delete resource');
    }
  };

  const filteredResources = resources?.filter(resource => {
    const matchesSearch = searchQuery === '' || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = typeFilter === 'all' || resource.type === typeFilter;
    
    return matchesSearch && matchesType;
  });

  const resourceTypes: ResourceType[] = ["Article", "Video", "Tutorial"];

  return (
    <div className="min-h-screen pb-12">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-10 page-transition">
        <div className="glass-panel rounded-lg p-6 mb-8">
          <h1 className="text-3xl font-bold mb-2">Resource Manager</h1>
          <p className="text-muted-foreground">Manage your learning resources in one place</p>
          
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <div className="w-full sm:w-48">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <div className="flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="All Types" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {resourceTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : isError ? (
          <div className="text-center py-10">
            <p className="text-destructive">Failed to load resources. Please try again.</p>
          </div>
        ) : filteredResources?.length === 0 ? (
          <div className="text-center py-16 bg-muted/50 rounded-lg">
            <h3 className="text-lg font-medium mb-2">No resources found</h3>
            <p className="text-muted-foreground">
              {searchQuery || typeFilter !== 'all' ? 'Try adjusting your filters' : 'Add your first resource to get started'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources?.map((resource) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;

