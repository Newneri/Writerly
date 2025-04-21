import express from 'express';
import { createClient } from '@libsql/client';
import dotenv from 'dotenv';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';


dotenv.config();
const db = createClient({
    url: process.env.DATABASE_URL,
    authToken: process.env.DATABASE_TOKEN,
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3001', // or your frontend URL
    credentials: true
}));
app.use(cookieParser());

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        req.user = null;
        return next();
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            req.user = null;
        } else {
            req.user = user;
        }
        next();
    });
};

app.get('/', (req, res) => {
    res.send('Server is running');
});


// Middleware to check if user is logged in
app.get('/api/auth/check', verifyToken, async (req, res) => {
    if (!req.user) {
        return res.status(200).json({ isLoggedIn: false });
    }

    try {
        const result = await db.execute(
            'SELECT username, first_name, last_name, email, avatar FROM Users WHERE id = ?',
            [req.user.userId]
        );
        const user = result.rows[0];

        res.status(200).json({
            isLoggedIn: true,
            user: {
                id: req.user.userId,
                username: user.username,
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
                avatar: user.avatar
            }
        });
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Registration
app.post('/api/register', verifyToken, async (req, res) => {
    if (req.user) {
        return res.status(200).json({ message: 'Already registered', user: req.user });
    }
    const { firstName, lastName, username, email, password } = req.body;
    try {
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const query = `INSERT INTO Users (username, first_name, last_name, email, password_hash) VALUES (?, ?, ?, ?, ?)`;
        await db.execute(query, [username, firstName, lastName, email, hashedPassword]);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Failed to register the user' });
    }
});

// Login
app.post('/api/login', verifyToken, async (req, res) => {
    if (req.user) {
        return res.status(200).json({ message: 'Already logged in', user: req.user });
    }
    const { email, password } = req.body; // Use email instead of username
    try {
        const result = await db.execute('SELECT * FROM Users WHERE email = ?', [email]); // Query by email
        const user = result.rows[0];

        if (!user) {
            console.error('User not found:', email);
            return res.status(401).json({ error: 'This email is not assigned to any account' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password_hash);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Incorrect password' });
        }

        const token = jwt.sign(
            { userId: user.id, username: user.username },
            process.env.SECRET_KEY,
            { expiresIn: '24h' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });
        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user.id,
                username: user.username,
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Logout
app.post('/api/auth/logout', async (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });
    res.status(200).json({ message: 'Logged out' });
});

// Create a new post
app.post("/api/createpost", verifyToken, async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    const { content, image_url } = req.body;
    const author_id = req.user?.userId; // confirm this matches your token

    if (!content) {
        return res.status(400).json({ error: "Content is required." });
    }

    try {
        const result = await db.execute(
            `INSERT INTO Posts (content, image_url, author_id, created_at, updated_at)
             VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
            [content, image_url || null, author_id]
        );

        console.log("✅ Post inserted:", result);
        res.status(201).json({
            message: "Post created",
            post: {
                content,
                image_url: image_url || null,
                author_id,
            },
        });
    } catch (err) {
        console.error("🔥 Error during post creation:", err); // this is key!
        res.status(500).json({ error: "Internal server error" });
    }
});

// Fetch all posts
app.get('/api/posts', verifyToken, async (req, res) => {
    try {
        const result = await db.execute(`
            SELECT 
                p.id,
                p.content,
                p.image_url,
                p.created_at,
                u.username,
                u.first_name,
                u.last_name,
                u.avatar,
                (SELECT COUNT(*) FROM Likes WHERE post_id = p.id) as likes_count,
                (SELECT COUNT(*) FROM Comments WHERE post_id = p.id) as comments_count,
                (CASE 
                    WHEN ? IS NULL THEN FALSE 
                    ELSE (SELECT EXISTS(
                        SELECT 1 FROM Likes 
                        WHERE post_id = p.id AND user_id = ?
                    ))
                END) as is_liked
            FROM Posts p
            JOIN Users u ON p.author_id = u.id
            ORDER BY p.created_at DESC
        `, [req.user?.userId || null, req.user?.userId || null]);

        const posts = result.rows.map(post => ({
            id: post.id,
            content: post.content,
            image_url: post.image_url,
            created_at: post.created_at,
            author: {
                username: post.username,
                firstName: post.first_name,
                lastName: post.last_name,
                avatar: post.avatar
            },
            likes_count: post.likes_count,
            comments_count: post.comments_count,
            is_liked: Boolean(post.is_liked)
        }));

        res.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
});


// Get number of likes of a post and whether the user has liked it, handle like/unlike
app.post('/api/posts/:postId/like', verifyToken, async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const { postId } = req.params;
    const userId = req.user.userId;

    try {
        // Check if post exists
        const postExists = await db.execute('SELECT id FROM Posts WHERE id = ?', [postId]);
        if (postExists.rows.length === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Check if already liked
        const existingLike = await db.execute(
            'SELECT * FROM Likes WHERE user_id = ? AND post_id = ?',
            [userId, postId]
        );

        if (existingLike.rows.length > 0) {
            // Unlike
            await db.execute(
                'DELETE FROM Likes WHERE user_id = ? AND post_id = ?',
                [userId, postId]
            );
        } else {
            // Like
            await db.execute(
                'INSERT INTO Likes (user_id, post_id) VALUES (?, ?)',
                [userId, postId]
            );
        }

        // Get updated like count
        const { rows } = await db.execute(
            'SELECT COUNT(*) as count FROM Likes WHERE post_id = ?',
            [postId]
        );

        res.json({
            likeCount: rows[0].count,
            isLiked: existingLike.rows.length === 0 // Returns true if we just liked, false if we just unliked
        });

    } catch (error) {
        console.error('Error handling like:', error);
        res.status(500).json({ error: 'Server error' });
    }
});


// COMMENTS

// Get comments for a post
app.get('/api/posts/:postId/comments', verifyToken, async (req, res) => {
    try {
        const { postId } = req.params;

        const result = await db.execute(`
            SELECT 
                c.id,
                c.content,
                c.created_at,
                u.id as user_id,
                u.username,
                u.first_name,
                u.last_name,
                u.avatar
            FROM Comments c
            JOIN Users u ON c.user_id = u.id
            WHERE c.post_id = ?
            ORDER BY c.created_at DESC
        `, [postId]);

        const comments = result.rows.map(comment => ({
            id: comment.id,
            content: comment.content,
            created_at: comment.created_at,
            user: {
                id: comment.user_id,
                username: comment.username,
                firstName: comment.first_name,
                lastName: comment.last_name,
                avatar: comment.avatar
            }
        }));

        res.json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Add a comment to a post
app.post('/api/posts/:postId/comments', verifyToken, async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const { postId } = req.params;
    const { content } = req.body;
    const userId = req.user.userId;

    if (!content?.trim()) {
        return res.status(400).json({ error: 'Comment content is required' });
    }

    try {
        // Insert comment
        await db.execute(
            'INSERT INTO Comments (content, user_id, post_id) VALUES (?, ?, ?)',
            [content, userId, postId]
        );

        // Fetch the inserted comment with user details
        const result = await db.execute(`
            SELECT 
                c.id,
                c.content,
                c.created_at,
                u.id as user_id,
                u.username,
                u.first_name,
                u.last_name,
                u.avatar
            FROM Comments c
            JOIN Users u ON c.user_id = u.id
            WHERE c.id = LAST_INSERT_ID()
        `);

        const comment = result.rows[0];
        res.status(201).json({
            id: comment.id,
            content: comment.content,
            created_at: comment.created_at,
            user: {
                id: comment.user_id,
                username: comment.username,
                firstName: comment.first_name,
                lastName: comment.last_name,
                avatar: comment.avatar
            }
        });
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ error: 'Server error' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port "http://localhost:${PORT}"`);
});
