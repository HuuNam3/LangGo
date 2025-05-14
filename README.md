# Mandarin Learning

## Introduction
Mandarin Learning is a modern web application designed to help users learn Mandarin Chinese effectively. Built with Next.js and React, it offers a responsive, user-friendly interface with multilingual support and structured learning paths.

**Project Status**: In Development (Version 0.1.0)

## Core Features
- **Multilingual Interface**
  - Support for English, Chinese (Mandarin), and Vietnamese
  - Language preference persistence using cookies
  - Automatic browser language detection
  - Easy language switching

- **Learning Content**
  - Structured lesson categories:
    - Beginner lessons (pronunciation, characters)
    - HSK test preparation
    - Practical communication
  - Professional instructor-led content
  - Duration-tracked lessons
  - Difficulty level indicators

- **User System**
  - Secure authentication with NextAuth.js
  - User profiles with progress tracking
  - Achievement system
  - Course enrollment management

## Tech Stack
### Frontend
- **Next.js 15.3.0**: React framework for production
- **React 19**: UI library
- **Tailwind CSS**: Utility-first styling
- **Radix UI**: Accessible component primitives
- **Framer Motion**: Animation library
- **Lucide React**: Icon system

### Authentication & State Management
- **NextAuth.js**: Authentication system
- **Bcrypt**: Password hashing
- **js-cookie**: Cookie management
- **Zod**: Schema validation

### Development Tools
- **TypeScript**: Type safety
- **ESLint**: Code linting
- **React Hook Form**: Form handling

## Getting Started

### Prerequisites
- Node.js (LTS version recommended)
- npm or yarn package manager

### Installation
1. **Clone the repository**
   ```bash
   git clone https://github.com/HuuNam3/Mandarin-Learning.git
   cd mandarin-learning
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   NEXTAUTH_SECRET=your_auth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```
   Access the application at `http://localhost:3000`

## Project Structure
```
mandarin-learning/
├── src/
│   ├── app/           # Next.js 13+ app directory
│   ├── components/    # Reusable UI components
│   └── lib/          # Utilities and data
│       ├── data/     # Content and user data
│       └── i18n/     # Internationalization
├── public/           # Static assets
└── package.json      # Project dependencies
```

## Available Scripts
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm start`: Run production server
- `npm run lint`: Run ESLint

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Contact
- **Developer**: Huu Nam
- **Email**: nhnam4411@gmail.com
- **GitHub**: [HuuNam3](https://github.com/HuuNam3)

## License
This project is private and not licensed for public use.