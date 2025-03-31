# Curve Dashboard

A modern employee management dashboard built with React, Tailwind CSS, and Supabase.

## Features

- User Authentication with Supabase
- Employee Management
- Announcements System
- Real-time Updates
- Responsive Design

## Tech Stack

- React
- Tailwind CSS
- Supabase (Backend as a Service)
- React Router
- Vite

## Getting Started

1. Clone the repository:
```bash
git clone [your-repository-url]
```

2. Install dependencies:
```bash
cd curve-dashboard
cd frontend
npm install
```

3. Set up environment variables:
Create a `.env` file in the frontend directory with your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
```

## Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable components
│   ├── pages/         # Page components
│   ├── context/       # React context
│   ├── services/      # API services
│   └── config/        # Configuration files
├── public/            # Static assets
└── index.html         # Entry point
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request 