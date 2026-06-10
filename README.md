# Dynamic Portfolio - Admin System

Your portfolio is now fully dynamic! You can add, edit, and delete projects from the admin panel, and all changes are instantly reflected on the public site.

## 🚀 Quick Start

### Installation
```bash
npm install
```

### Running the Server
```bash
# Production
npm start

# Development (with auto-reload)
npm run dev
```

The server runs on `http://localhost:3000`

## 🔐 Admin Panel Access

Visit `http://localhost:3000/admin` to manage your portfolio.

### Default API Key
The default API key is: `your-secret-key-change-this`

**⚠️ IMPORTANT: Change this in production!**

### Setting Your Own API Key

1. Create a `.env` file in the project root (copy from `.env.example`):
```bash
PORT=3000
API_KEY=your-super-secret-key-here
```

2. Restart the server for changes to take effect

## 🎯 Features

### Public Site (`http://localhost:3000`)
- View all portfolio content
- Project filtering by category
- Fully responsive design
- All data loaded dynamically from API

### Admin Panel (`http://localhost:3000/admin`)
- **Profile Management**
  - Update name, role, tagline
  - Edit bio/about section
  - Manage contact info
  - Update social links (GitHub, LinkedIn)

- **Project Management**
  - Add new projects with title, description, category
  - Upload project images
  - Add tech stack tags
  - Link to GitHub and live demo URLs
  - Filter projects by category (Backend, Security, CTF)
  - Delete projects

## 📁 File Structure

```
portfolio/
├── server.js              # Express server
├── admin.html             # Admin panel interface
├── index.html             # Public portfolio
├── script.js              # Frontend + API integration
├── styles.css             # Styling
├── package.json           # Dependencies
├── .env.example           # Environment variables template
├── .env                   # Your actual env vars (git-ignored)
├── portfolio.db           # SQLite database (auto-created)
└── uploads/               # Project images (auto-created)
```

## 🔌 API Endpoints

All admin endpoints require the `X-API-Key` header.

### Public (No Auth)
- `GET /api/portfolio` - Get all profile and project data
- `GET /api/profile` - Get profile info
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project

### Admin (Requires API Key)
```bash
# Profile
PUT /api/profile
  Headers: X-API-Key: your-api-key
  Body: { name, role, tagline, about, email, phone, github_url, linkedin_url }

# Projects
POST /api/projects
  Headers: X-API-Key: your-api-key
  Body: FormData { title, description, category, tags, github_url, live_url, image }

PUT /api/projects/:id
  Headers: X-API-Key: your-api-key
  Body: FormData { title, description, category, tags, github_url, live_url, image }

DELETE /api/projects/:id
  Headers: X-API-Key: your-api-key
```

## 💾 Database

SQLite database (`portfolio.db`) stores:
- **profile** table - Your personal info and bio
- **projects** table - All your projects with metadata

Database is created automatically on first run.

## 📸 Image Upload

Images uploaded to projects are stored in `/uploads/` directory and served at `/uploads/image-name.ext`

## 🚢 Deployment

### For Production:

1. **Set environment variables**
   ```bash
   export PORT=3000
   export API_KEY=your-production-secret-key
   ```

2. **Install dependencies**
   ```bash
   npm install --production
   ```

3. **Run with process manager (recommended)**
   ```bash
   npm install -g pm2
   pm2 start server.js
   pm2 save
   pm2 startup
   ```

4. **Set up reverse proxy** (nginx/Apache) pointing to localhost:3000

## 🔒 Security Notes

- Change the default API key in `.env`
- The `.env` file is git-ignored (don't commit it)
- Images are stored locally - manage disk space
- Add rate limiting for production
- Consider HTTPS in production

## 📝 Example Admin Usage

1. Go to `http://localhost:3000/admin`
2. Enter API key from `.env`
3. Edit profile section with your info
4. Go to Projects tab
5. Fill in project details and upload image
6. Click "Add Project"
7. Refresh public site to see changes

## 🐛 Troubleshooting

**Server won't start**
- Check if port 3000 is already in use: `lsof -i :3000`
- Ensure Node.js 16+ is installed: `node --version`

**Database errors**
- Delete `portfolio.db` to reset database
- Ensure `node_modules` is installed: `npm install`

**API Key not working**
- Restart server after changing `.env`
- Check header is `X-API-Key` (case-sensitive)

**Images not loading**
- Ensure `/uploads` directory exists
- Check file permissions
- Verify upload was successful in browser console

## 📚 Next Steps

- Add more projects through admin panel
- Customize the design by editing `styles.css`
- Add more sections (testimonials, blog, etc.)
- Deploy to hosting (Heroku, Railway, VPS, etc.)

---

Built with ❤️ using Node.js, Express, and SQLite
