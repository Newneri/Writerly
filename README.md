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

## Database Setup

### Database Schema

The application uses a MySQL database with the following tables:

#### Users Table
```sql
CREATE TABLE Users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    avatar VARCHAR(255) DEFAULT 'default-avatar.png',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### Posts Table
```sql
CREATE TABLE Posts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    content TEXT NOT NULL,
    image_url VARCHAR(255),
    author_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES Users(id) ON DELETE CASCADE
);
```

### Entity Relationship Diagram

```
Users 1 ----< Posts
```

### Relationships
- One User can have many Posts (1:N)
- Each Post must belong to one User (N:1)

### Setting up the Database

1. Create a new MySQL database:
```bash
mysql -u root -p
CREATE DATABASE writerly;
USE writerly;
```

2. Create the tables using the SQL schemas above

3. Configure your environment variables in `/server/.env`:
```env
DATABASE_URL=mysql://username:password@localhost:3306/writerly
```

4. Run the initial migration (if using a migration tool):
```bash
cd server
pnpm migrate
```

## Project Structure

```
```
writerly/
├── client/                    # Frontend React application
│   ├── app/
│   │   ├── components/       # Reusable components
│   │   │   ├── CreatePost.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── ImageUploader.tsx
│   │   │   └── Posts.tsx
│   │   ├── hooks/           # Custom hooks
│   │   │   └── useAuth.ts
│   │   ├── routes/          # Page components
│   │   │   ├── home.tsx
│   │   │   ├── login.tsx
│   │   │   ├── register.tsx
│   │   │   └── welcome.tsx
│   │   ├── app.css         # Global styles
│   │   ├── root.tsx        # Root layout component
│   │   └── routes.ts       # Route definitions
│   ├── public/              # Static assets
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
└── server/                   # Backend Node.js application
    ├── server.js            # Main server file with all routes
    ├── package.json
    └── .env                 # Environment variables
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.