# Writerly

A modern community blogging platform built with React, Node.js, and TypeScript.

## Overview

Writerly is a social blogging platform that allows users to share their thoughts, stories, and experiences with a community of writers. Built with modern web technologies, it provides a clean, intuitive interface for writing and reading posts.

## Features

- 🔐 User authentication (Email & Password)
- 👤 User profiles with dashboards
- ✍️ Create and publish posts
- 💭 Comment on posts
- 👍 Like posts
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
- Turso (SQLite) database
- TypeScript

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- pnpm

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
DATABASE_URL=your_turso_database_url
DATABASE_TOKEN=your_turso_database_token
SECRET_KEY=your_jwt_secret
```

4. Initialize the database
```bash
cd server
pnpm run init-db
```

5. Start the development servers
```bash
# Start the client (in client directory)
pnpm dev

# Start the server (in server directory)
pnpm dev
```

## Database Schema

The application uses a Turso (SQLite) database with the following tables:

```sql
CREATE TABLE Users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT DEFAULT 'user',
    bio TEXT DEFAULT '',
    avatar TEXT DEFAULT 'https://api.dicebear.com/7.x/avataaars/svg',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT NOT NULL,
    image_url TEXT,
    author_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES Users(id) ON DELETE CASCADE
);

CREATE TABLE Likes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    post_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES Posts(id) ON DELETE CASCADE,
    UNIQUE(user_id, post_id)
);

CREATE TABLE Comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    post_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES Posts(id) ON DELETE CASCADE
);
```

### Entity Relationship Diagram

```
Users 1 ----< Posts
Users 1 ----< Likes
Users 1 ----< Comments
Posts 1 ----< Likes
Posts 1 ----< Comments
```

## Project Structure

```
writerly/
├── client/                    # Frontend React application
│   ├── app/
│   │   ├── components/       # Reusable components
│   │   ├── hooks/           # Custom hooks
│   │   ├── routes/          # Page components
│   │   ├── types/           # TypeScript types
│   │   ├── utils/           # Utility functions
│   │   ├── app.css         # Global styles
│   │   └── routes.ts       # Route definitions
│   ├── public/             # Static assets
│   └── package.json
└── server/                  # Backend Node.js application
    ├── db/                 # Database initialization
    │   └── init.js        # Database schema
    ├── server.js          # Main server file
    └── package.json
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.