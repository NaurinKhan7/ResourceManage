
export type ResourceType = 'Article' | 'Video' | 'Tutorial';

export interface Resource {
  id: number;
  title: string;
  description: string;
  type: ResourceType;
  url?: string;
  file_path?: string;
  created_at: string;
  updated_at: string;
}

export type NewResource = Omit<Resource, 'id' | 'created_at' | 'updated_at'>;

export type ResourceFormData = {
  title: string;
  description: string;
  type: ResourceType;
  url?: string;
  file?: File | null;
};
