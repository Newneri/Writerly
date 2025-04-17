# Writerly

A modern community blogging platform built with React, Node.js, and TypeScript.

## Overview

Writerly is a social blogging platform that allows users to share their thoughts, stories, and experiences with a community of writers. Built with modern web technologies, it provides a clean, intuitive interface for writing and reading posts.

## Features

- 🔐 User authentication (Email & Password)
- 👤 User profiles
- ✍️ Create and publish posts
- 📸 Image upload support
- 🌐 Responsive design
- 🎨 Modern UI with Tailwind CSS

## Tech Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- Axios for API calls
- React Router for navigation

### Backend
- Node.js
- Express
- JSON Web Tokens for authentication
- MySQL database
- TypeScript

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MySQL
- npm or pnpm

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/writerly.git
cd writerly
```

2. Install dependencies
```bash
# Install client dependencies
cd client
pnpm install

# Install server dependencies
cd ../server
pnpm install
```

3. Set up environment variables

Create `.env` files in both client and server directories:

Client `.env`:
```env
VITE_API_URL=http://localhost:3000
```

Server `.env`:
```env
PORT=3000
DATABASE_URL=your_database_url
DATABASE_TOKEN=your_database_token
SECRET_KEY=your_jwt_secret
```

4. Start the development servers

```bash
# Start the client (in client directory)
pnpm dev

# Start the server (in server directory)
pnpm dev
```

## Project Structure

```
writerly/
├── client/                 # Frontend React application
│   ├── app/
│   │   ├── components/    # Reusable components
│   │   ├── hooks/        # Custom hooks
│   │   ├── routes/       # Page components
│   │   └── styles/       # Global styles
│   └── public/           # Static assets
└── server/               # Backend Node.js application
    ├── routes/           # API routes
    ├── middleware/       # Custom middleware
    └── config/          # Configuration files
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.