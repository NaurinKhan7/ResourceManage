import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { ResourceFormData, ResourceType } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  type: z.enum(["Article", "Video", "Tutorial"]),
  url: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  file: z.any().optional(),
});

type ResourceFormProps = {
  initialData?: ResourceFormData;
  onSubmit: (data: ResourceFormData) => Promise<void>;
  isEditMode?: boolean;
};

const ResourceForm = ({ initialData, onSubmit, isEditMode = false }: ResourceFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isVideo, setIsVideo] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm<ResourceFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      type: "Article" as ResourceType,
      url: "",
      file: null,
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('video/')) {
        setIsVideo(true);
        setPreviewUrl(URL.createObjectURL(file));
      } else if (file.type.startsWith('image/')) {
        setIsVideo(false);
        setPreviewUrl(URL.createObjectURL(file));
      }
      form.setValue('file', file);
    } else {
      setPreviewUrl(null);
      form.setValue('file', undefined);
    }
  };

  const handleSubmit = async (data: ResourceFormData) => {
    try {
      setIsSubmitting(true);
      await onSubmit(data);
      toast.success(isEditMode ? "Resource updated successfully" : "Resource created successfully");
      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resourceTypes: ResourceType[] = ["Article", "Video", "Tutorial"];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 animate-fade-up">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Resource title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="A brief description of this resource"
                  className="resize-none min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resource Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a resource type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {resourceTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL (optional)</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com" {...field} />
              </FormControl>
              <FormDescription>
                The URL where this resource can be accessed
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Media (optional)</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  <Input
                    type="file"
                    accept="image/*, video/*"
                    onChange={handleFileChange}
                    {...fieldProps}
                    className="file:mr-4 file:px-4 file:py-2 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                  />
                  {previewUrl && isVideo && (
                    <video 
                      src={previewUrl} 
                      controls
                      className="max-h-64 w-full rounded-lg border mt-2"
                    />
                  )}
                  {previewUrl && !isVideo && (
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      className="max-h-64 w-full object-contain rounded-lg border mt-2"
                    />
                  )}
                  {initialData?.file_url && isEditMode && (
                    initialData.file_url.match(/\.(mp4|webm|ogg)$/i) ? (
                      <video
                        src={initialData.file_url}
                        controls
                        className="max-h-64 w-full rounded-lg border mt-2"
                      />
                    ) : (
                      <img 
                        src={initialData.file_url} 
                        alt="Current file" 
                        className="max-h-64 w-full object-contain rounded-lg border mt-2"
                      />
                    )
                  )}
                </div>
              </FormControl>
              <FormDescription>
                Upload an image or video to display with this resource
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/")}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEditMode ? "Update Resource" : "Create Resource"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ResourceForm;