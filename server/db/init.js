import { createClient } from '@libsql/client';
import dotenv from 'dotenv';

dotenv.config();

const db = createClient({
    url: process.env.DATABASE_URL,
    authToken: process.env.DATABASE_TOKEN,
});

async function initializeDatabase() {
    try {
        // Enable foreign key support
        await db.execute('PRAGMA foreign_keys = ON;');

        // Drop tables if they exist (in correct order due to foreign key constraints)
        await db.execute('DROP TABLE IF EXISTS Comments;');
        await db.execute('DROP TABLE IF EXISTS Likes;');
        await db.execute('DROP TABLE IF EXISTS Posts;');
        await db.execute('DROP TABLE IF EXISTS Users;');

        // Create Users table
        await db.execute(`
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
        `);

        // Create Posts table
        await db.execute(`
            CREATE TABLE Posts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                content TEXT NOT NULL,
                image_url TEXT,
                author_id INTEGER NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (author_id) REFERENCES Users(id) ON DELETE CASCADE
            );
        `);

        // Create Likes table
        await db.execute(`
            CREATE TABLE Likes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                post_id INTEGER NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
                FOREIGN KEY (post_id) REFERENCES Posts(id) ON DELETE CASCADE,
                UNIQUE(user_id, post_id)
            );
        `);

        // Create Comments table
        await db.execute(`
            CREATE TABLE Comments (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                content TEXT NOT NULL,
                user_id INTEGER NOT NULL,
                post_id INTEGER NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
                FOREIGN KEY (post_id) REFERENCES Posts(id) ON DELETE CASCADE
            );
        `);

        console.log('✅ Database initialized successfully');
    } catch (error) {
        console.error('🔥 Error initializing database:', error);
        throw error;
    } finally {
        await db.close();
    }
}

// Run the initialization
initializeDatabase().catch(console.error);