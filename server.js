const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY || 'your-secret-key-change-this';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files from root

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Initialize SQLite database
const db = new sqlite3.Database('./portfolio.db', (err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to SQLite database');
    initializeDatabase();
  }
});

// Initialize database schema
function initializeDatabase() {
  db.serialize(() => {
    // Create projects table
    db.run(`
      CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        category TEXT,
        tags TEXT,
        github_url TEXT,
        live_url TEXT,
        image_url TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create profile table
    db.run(`
      CREATE TABLE IF NOT EXISTS profile (
        id INTEGER PRIMARY KEY,
        name TEXT,
        role TEXT,
        tagline TEXT,
        about TEXT,
        email TEXT,
        phone TEXT,
        github_url TEXT,
        linkedin_url TEXT,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Insert default profile if it doesn't exist
    db.get('SELECT id FROM profile WHERE id = 1', (err, row) => {
      if (!row) {
        db.run(`
          INSERT INTO profile (id, name, role, tagline, about, email, phone, github_url, linkedin_url)
          VALUES (1, 'Mecelti Foued', 'Backend Developer & CTF Player', 'Building robust systems by day, breaking them by night.', 
            'I am a Computer Science student who sees code as a tool for solving real problems—not just an end in itself.', 
            'fouedmecelti0@gmail.com', '+216 56 216 2249', 'https://github.com/f4xd', 'https://www.linkedin.com/in/foued-mecelti-a131462b0/')
        `);
      }
    });

    // Insert default project if table is empty
    db.get('SELECT COUNT(*) as count FROM projects', (err, row) => {
      if (row.count === 0) {
        db.run(`
          INSERT INTO projects (title, description, category, tags, github_url, image_url)
          VALUES ('DZ-Kitab', 'Web platform enabling students and readers in Algeria to buy, sell, or exchange used books easily.', 
            'backend', 'Node.js,Express,Prisma,PostgreSQL', 'https://github.com/f4xd/Dz-kitab.git', '')
        `);
      }
    });
  });
}

// Authentication middleware
const authenticate = (req, res, next) => {
  const apiKey = req.headers['x-api-key'] || req.query.api_key;
  if (apiKey !== API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

// ========================================
// API Routes
// ========================================

// Get all portfolio data
app.get('/api/portfolio', (req, res) => {
  db.serialize(() => {
    db.get('SELECT * FROM profile WHERE id = 1', (err, profile) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      db.all('SELECT * FROM projects ORDER BY created_at DESC', (err, projects) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json({ profile, projects });
      });
    });
  });
});

// Get all projects
app.get('/api/projects', (req, res) => {
  db.all('SELECT * FROM projects ORDER BY created_at DESC', (err, projects) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(projects);
  });
});

// Get single project
app.get('/api/projects/:id', (req, res) => {
  db.get('SELECT * FROM projects WHERE id = ?', [req.params.id], (err, project) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  });
});

// Add new project
app.post('/api/projects', authenticate, upload.single('image'), (req, res) => {
  const { title, description, category, tags, github_url, live_url } = req.body;
  const image_url = req.file ? `/uploads/${req.file.filename}` : '';

  const query = `
    INSERT INTO projects (title, description, category, tags, github_url, live_url, image_url)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(query, [title, description, category, tags, github_url, live_url, image_url], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID, message: 'Project added successfully' });
  });
});

// Update project
app.put('/api/projects/:id', authenticate, upload.single('image'), (req, res) => {
  const { title, description, category, tags, github_url, live_url } = req.body;
  let image_url = req.body.image_url;

  if (req.file) {
    image_url = `/uploads/${req.file.filename}`;
  }

  const query = `
    UPDATE projects 
    SET title = ?, description = ?, category = ?, tags = ?, github_url = ?, live_url = ?, image_url = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;

  db.run(query, [title, description, category, tags, github_url, live_url, image_url, req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json({ message: 'Project updated successfully' });
  });
});

// Delete project
app.delete('/api/projects/:id', authenticate, (req, res) => {
  db.run('DELETE FROM projects WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully' });
  });
});

// Get profile
app.get('/api/profile', (req, res) => {
  db.get('SELECT * FROM profile WHERE id = 1', (err, profile) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(profile);
  });
});

// Update profile
app.put('/api/profile', authenticate, (req, res) => {
  const { name, role, tagline, about, email, phone, github_url, linkedin_url } = req.body;

  const query = `
    UPDATE profile 
    SET name = ?, role = ?, tagline = ?, about = ?, email = ?, phone = ?, github_url = ?, linkedin_url = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = 1
  `;

  db.run(query, [name, role, tagline, about, email, phone, github_url, linkedin_url], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Profile updated successfully' });
  });
});

// Admin panel access (password protected with simple prompt)
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Admin panel: http://localhost:${PORT}/admin`);
  console.log(`API Key: ${API_KEY}`);
});
