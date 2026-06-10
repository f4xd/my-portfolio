# 🚀 Quick Start Guide - Dynamic Portfolio

Your portfolio is now fully dynamic! Here's how to use it:

## ✅ What's Done
✓ Express.js backend with REST API  
✓ SQLite database (auto-created)  
✓ Admin panel for managing content  
✓ Project upload with image support  
✓ Profile management  
✓ Dynamic frontend loading all data from API  

## 🏃 Get Started in 30 Seconds

### 1. Start the server (already running on port 3000)
```bash
npm start
```

### 2. Visit your portfolio
- **Public Site**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin

### 3. Login to admin with default key
```
API Key: your-secret-key-change-this
```

## 🔑 Change Your API Key (Important!)

Create a `.env` file:
```bash
PORT=3000
API_KEY=my-super-secret-key-12345
```

Then restart the server. Use this key in the admin panel.

## 📋 What You Can Do Now

### Public Portfolio
- ✅ View all projects (loads from database)
- ✅ Filter by category
- ✅ Click to GitHub repos
- ✅ Fully responsive

### Admin Panel
**Profile Tab:**
- Edit your name, role, tagline
- Update about/bio section
- Change email, phone
- Update GitHub & LinkedIn links

**Projects Tab:**
- ➕ Add new projects with title, description, tags
- 📸 Upload project images
- 🏷️ Select category (Backend, Security, CTF)
- 🔗 Add GitHub and live demo URLs
- 🗑️ Delete old projects

## 💡 Examples

### Add a New Project
1. Go to http://localhost:3000/admin
2. Enter API key
3. Click "Projects" tab
4. Fill in project details:
   - Title: "My Awesome API"
   - Description: "A fast REST API built with Node.js"
   - Category: Backend
   - Tags: "Node.js, Express, PostgreSQL"
   - GitHub: https://github.com/f4xd/my-api
5. Upload an image
6. Click "Add Project"
7. Refresh public site to see it!

### Update Your Profile
1. Go to http://localhost:3000/admin
2. Click "Profile" tab
3. Edit your info
4. Click "Save Profile"
5. Changes appear instantly on public site

## 📁 Files Created

```
server.js      - Express backend
admin.html     - Admin dashboard
portfolio.db   - Your database (auto-created)
.env           - Your API key (keep secret!)
uploads/       - Project images
```

## 🐛 Having Issues?

**Server not starting?**
- Check port 3000: `lsof -i :3000`
- Reinstall: `npm install`

**Admin login not working?**
- Use API key from `.env`
- Make sure server is running: `npm start`

**Want to reset database?**
- Delete `portfolio.db` and restart server

## 📚 Next Steps

1. ✅ Start adding your projects
2. ✅ Update your profile info
3. ✅ Customize colors in `styles.css`
4. ✅ Deploy to production (see README.md)
5. ✅ Add more sections if needed

## 🎯 Pro Tips

- Images are stored in `/uploads/` (git-ignored)
- Database is `portfolio.db` (git-ignored)
- Keep your API key in `.env` (git-ignored)
- Use descriptive project descriptions
- Test the filtering by category

---

**Your portfolio is now dynamic!** 🎉

Start by visiting http://localhost:3000/admin and managing your content.
