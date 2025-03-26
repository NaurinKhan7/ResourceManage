
// export type ResourceType = 'Article' | 'Video' | 'Tutorial';

// export interface Resource {
//   id: number;
//   title: string;
//   description: string;
//   type: ResourceType;
//   url?: string;
//   file_url?: string; // Keeping this as file_url to match the database
//   created_at: string;
//   updated_at: string;
// }

// export type NewResource = Omit<Resource, 'id' | 'created_at' | 'updated_at'>;

// export type ResourceFormData = {
//   title: string;
//   description: string;
//   type: ResourceType;
//   url?: string;
//   file?: File | null;
//   file_url?: string; // Keeping this as file_url to match the database
// };
export type ResourceType = 'Article' | 'Video' | 'Tutorial';

export interface Resource {
  id: string; // Changed from number to string
  title: string;
  description: string;
  type: ResourceType;
  url?: string;
  file_url?: string;
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
  file_url?: string;
};