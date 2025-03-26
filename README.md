
# Resource Manager - A simple way to organize and access all your learning resources in one place

A developer-friendly knowledge-sharing platform built with Vite + React, TypeScript, and Supabase, allowing users to manage learning resources like articles, videos, and tutorials.

## Features

- 📚 CRUD operations for learning resources
- 🔍 Search and filter capabilities
- 🎨 Beautiful, responsive UI using Tailwind CSS
- 📱 Mobile-friendly design
- 🔒 Data persistence with Supabase
- 🎯 Form validation with React Hook Form


## Tech Stack

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Forms**: React Hook Form
- **Backend/Database**: Supabase
- **Icons**: Lucide React
- **Validation**: Zod

## Getting Started

### Prerequisites

- Node.js 16.8 or later
- A Supabase account

### Setting up Supabase

1. Create a new project on [Supabase](https://supabase.com)

2. Once created, go to Project Settings > API to find your:
   - Project URL
   - Project API Key (anon/public)

3. Create a `.env.local` file in your project root with these values:
   
  * VITE_SUPABASE_URL= your_project_url
    
  * VITE_SUPABASE_PUBLISHABLE_KEY = your_anon_key
 

5. Create Required Database Tables :
 
   You need to create a table in your Supabase dashboard: 

   - Go to your Supabase project dashboard
   - Navigate to "Table Editor" in the left sidebar
   - Click "Create a new table"
   - Give it a name
   - Add the following columns:

  * id (type: uuid, primary key)
  * title (type: text, not null)
  * description (type: text)
  * type (type: text, not null)
  * url (type: text)
  * file_url (type: text)
  * created_at (type: timestamp with time zone, default: now())
  * updated_at (type: timestamp with time zone, default: now())

  - Enable Row Level Security (RLS)
  - Click "Save" to create the table

5. Set Up Storage Bucket 

- Go to "Storage" in your Supabase dashboard
- Click "Create a new bucket"
- Name it "resource-files" (matching your code's STORAGE_BUCKET constant)
- You can set it to public or private depending on your needs
- Configure any bucket policies as needed
  

### Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Run the development server
   ```bash
   npm run dev
   ```

4. Open [http://localhost:8080](http://localhost:8080) in your browser

### Code Style

- Use TypeScript for all new files
- Follow the existing project structure
- Use meaningful component and variable names
- Add comments for complex logic
- Use proper TypeScript types and interfaces






