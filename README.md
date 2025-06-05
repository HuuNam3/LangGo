# LangGo - Language Learning Platform

LangGo is a modern language learning platform built with Next.js 15, TypeScript, and MongoDB. The platform provides an interactive environment for users to learn languages through structured courses and lessons.

## 🚀 Features

- **User Authentication**
  - Secure login and registration system
  - Protected routes for authenticated users
  - Profile management

- **Course Management**
  - Browse available courses
  - Track learning progress
  - Personalized course recommendations

- **Interactive Lessons**
  - Structured learning content
  - Progress tracking
  - Interactive exercises

- **Modern UI/UX**
  - Responsive design
  - Dark/Light theme support
  - Smooth animations with Framer Motion
  - Beautiful UI components using Radix UI

## 🛠️ Tech Stack

- **Frontend**
  - Next.js 15
  - React 19
  - TypeScript
  - Tailwind CSS
  - Radix UI Components
  - Framer Motion for animations

- **Backend**
  - Next.js API Routes
  - MongoDB for database
  - NextAuth.js for authentication
  - bcrypt for password hashing

- **Development Tools**
  - ESLint for code linting
  - TypeScript for type safety
  - Tailwind CSS for styling

## 📦 Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd LangGo
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:
```env
MONGODB_URI=your_mongodb_uri
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

4. Run the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🏗️ Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── api/            # API routes
│   ├── (user)/         # User routes
│   ├── (admin)/        # Admin routes
│   └── login/          # Authentication pages
├── components/         # Reusable UI components
├── contexts/          # React contexts
├── hooks/             # Custom React hooks
├── lib/               # Utility functions and configurations
└── types/             # TypeScript type definitions
```

## 🔒 Authentication

The application uses NextAuth.js for authentication with the following features:
- Protected routes for authenticated users
- Automatic redirection for unauthenticated users
- Session management
- Secure password hashing with bcrypt

## 🎨 UI Components

The project uses a combination of:
- Radix UI for accessible components
- Tailwind CSS for styling
- Framer Motion for animations
- Custom components for specific functionality

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.