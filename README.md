# Passport Data Collection Website

A modern, secure web application for collecting passport application data with multi-step forms, file uploads, and an admin dashboard.

## Features

- ✅ **Multi-step Form**: User-friendly application process
- ✅ **File Upload**: Secure photo upload to Supabase Storage
- ✅ **Admin Dashboard**: Manage applications and update statuses
- ✅ **Email Notifications**: Automatic confirmation emails via Resend
- ✅ **WhatsApp Integration**: Floating contact button
- ✅ **Security**: Row Level Security (RLS) and private storage buckets

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **Form Handling**: React Hook Form + Zod
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **Email**: Resend
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account ([supabase.com](https://supabase.com))
- A Resend account for emails ([resend.com](https://resend.com)) (optional)

### 1. Clone and Install

\`\`\`bash
npm install
\`\`\`

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the schema from `schema.sql`
3. Go to **Storage** and create a bucket named `documents`
4. Set the bucket to **Private** (important for security)
5. Add a storage policy to allow public uploads:

\`\`\`sql
-- Allow anyone to upload
create policy "Allow public uploads"
on storage.objects for insert
to anon
with check (bucket_id = 'documents');

-- Allow authenticated users (admins) to read
create policy "Allow authenticated reads"
on storage.objects for select
to authenticated
using (bucket_id = 'documents');
\`\`\`

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

\`\`\`env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Resend (Email) - Optional
RESEND_API_KEY=your_resend_api_key

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password
\`\`\`

**Get your Supabase credentials:**
- Go to your Supabase project → Settings → API
- Copy the **Project URL** and **anon/public** key

### 4. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000)

## Usage

### User Flow

1. Visit the landing page
2. Click "Apply Now"
3. Fill out the 4-step form:
   - Step 1: Personal Information
   - Step 2: Contact Information
   - Step 3: Document Information
   - Step 4: Photo Upload
4. Submit and receive confirmation email

### Admin Flow

1. Go to `/admin/login`
2. Login with credentials from `.env.local`
3. View all applications
4. Update application status (Pending → Processing → Completed)

## Project Structure

\`\`\`
├── app/
│   ├── page.tsx                 # Landing page
│   ├── apply/page.tsx           # Application form
│   ├── admin/
│   │   ├── page.tsx             # Admin dashboard
│   │   └── login/page.tsx       # Admin login
│   └── api/
│       ├── apply/route.ts       # Form submission API
│       └── admin/
│           ├── login/route.ts   # Admin auth
│           ├── logout/route.ts  # Admin logout
│           └── update-status/   # Status update API
├── components/
│   ├── MultiStepForm/           # Form step components
│   ├── ui/                      # Reusable UI components
│   └── WhatsAppButton.tsx       # Floating WhatsApp button
├── lib/
│   ├── schema.ts                # Zod validation schemas
│   ├── supabase.ts              # Supabase client
│   └── utils.ts                 # Utility functions
└── schema.sql                   # Database schema
\`\`\`

## Security Considerations

⚠️ **Important Security Notes:**

1. **Admin Authentication**: The current implementation uses simple cookie-based auth. For production, implement proper authentication using Supabase Auth or NextAuth.js.

2. **Environment Variables**: Never commit `.env.local` to version control. Use strong passwords.

3. **Storage Policies**: Ensure the `documents` bucket is set to **Private** and only admins can read files.

4. **Rate Limiting**: Consider adding rate limiting to prevent spam (see Task 4.1 in task.md).

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the project to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

\`\`\`bash
npm run build  # Test production build locally
\`\`\`

## Customization

### Change WhatsApp Number

Edit `components/WhatsAppButton.tsx`:

\`\`\`typescript
const phoneNumber = "+1234567890" // Your number with country code
\`\`\`

### Customize Email Template

Edit `app/api/apply/route.ts` in the Resend section.

### Add More Countries

Edit the country dropdown in `components/MultiStepForm/Step2Contact.tsx`.

## Troubleshooting

### "Cannot find module" errors
\`\`\`bash
npm install
\`\`\`

### Supabase connection issues
- Check your `.env.local` file
- Verify your Supabase project is active
- Check the browser console for CORS errors

### File upload fails
- Ensure the `documents` bucket exists in Supabase Storage
- Check storage policies are correctly set

## Next Steps

See `task.md` for remaining tasks:
- [ ] Enhanced security (Rate limiting, better auth)
- [ ] File validation improvements
- [ ] Admin dashboard enhancements

## License

MIT

## Support

For issues or questions, contact via WhatsApp button on the site.
