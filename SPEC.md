# Developer Portfolio Specification

## Project Overview

- **Project Name**: Portfolio for Student Backend Developer & CTF Player
- **Type**: Single-page portfolio website
- **Core Functionality**: Showcase technical skills, projects, CTF achievements, and provide contact information
- **Target Users**: Recruiters, potential employers, fellow developers, CTF community members

---

## UI/UX Specification

### Layout Structure

**Page Sections (top to bottom):**
1. Navigation bar (fixed)
2. Hero section with terminal-style intro
3. About Me section
4. Skills section
5. Projects section (with filtering)
6. CTF Achievements / Writeups section
7. Contact section
8. Footer

**Responsive Breakpoints:**
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Visual Design

**Color Palette:**
- Background Primary: `#0a0a0a` (near black)
- Background Secondary: `#111111` (dark gray)
- Background Tertiary: `#1a1a1a` (card backgrounds)
- Text Primary: `#e4e4e7` (off-white)
- Text Secondary: `#a1a1aa` (muted gray)
- Accent Primary: `#22c55e` (terminal green)
- Accent Secondary: `#3b82f6` (blue for links)
- Accent Tertiary: `#f59e0b` (amber for highlights)
- Border Color: `#27272a` (subtle borders)
- Error/Alert: `#ef4444` (red)

**Typography:**
- Headings: `'JetBrains Mono', monospace` - weights 700, 600
- Body: `'IBM Plex Sans', sans-serif` - weights 400, 500
- Code/Terminal: `'JetBrains Mono', monospace` - weight 400
- Font Sizes:
  - H1 (Hero): 3.5rem (desktop), 2.5rem (mobile)
  - H2 (Section titles): 2rem (desktop), 1.5rem (mobile)
  - H3 (Card titles): 1.25rem
  - Body: 1rem
  - Small: 0.875rem

**Spacing System:**
- Section padding: 6rem vertical (desktop), 4rem (mobile)
- Container max-width: 1200px
- Card padding: 1.5rem
- Element gaps: 1rem, 1.5rem, 2rem

**Visual Effects:**
- Card hover: subtle lift with `translateY(-4px)` and border glow
- Terminal cursor blink animation
- Fade-in on scroll (using Intersection Observer)
- Smooth transitions: 0.3s ease

### Components

**Navigation:**
- Fixed top, transparent background with blur
- Logo/Name on left
- Nav links on right (About, Skills, Projects, CTFs, Contact)
- Mobile: hamburger menu

**Hero Section:**
- Terminal window styling with title bar (three dots)
- Typing animation for intro text
- Name in large text
- Role subtitle
- Two CTA buttons: "View Projects" and "Download CV"
- Background: subtle grid pattern

**About Section:**
- Two-column layout (text + decorative element)
- Brief bio paragraph
- Key attributes as highlighted tags

**Skills Section:**
- Grid of skill cards
- Categories: Languages, Frameworks, Tools, Security
- Each card shows icon + name
- Hover effect with accent border

**Projects Section:**
- Filter buttons (All, Backend, Security, CTF)
- Grid of project cards (3 columns desktop, 2 tablet, 1 mobile)
- Card content: title, description, tech stack tags, GitHub link, live link (if applicable)

**CTF Section:**
- Timeline-style layout
- Achievement cards with: event name, date, placement/notes, writeup link
- Focus on problem-solving description

**Contact Section:**
- Centered layout
- Email (mailto link)
- Social links with icons (GitHub, LinkedIn, Twitter/X)
- Optional: simple contact form

**Footer:**
- Minimal: copyright + "Built with terminal love"

---

## Functionality Specification

### Core Features

1. **Smooth scrolling navigation** - Click nav links to scroll to sections
2. **Terminal typing animation** - Hero text types out character by character
3. **Project filtering** - Filter projects by category (Backend, Security, CTF)
4. **Scroll animations** - Elements fade in as they enter viewport
5. **Mobile navigation** - Hamburger menu toggle
6. **Download CV** - Button links to PDF (placeholder for now)
7. **External links** - All social/project links open in new tabs

### User Interactions

- Nav links: smooth scroll to section
- Filter buttons: show/hide projects by category
- Project cards: hover for lift effect
- Social icons: hover for color change
- Mobile menu: toggle open/close

### Edge Cases

- If no projects in a category, show "No projects yet" message
- CV button shows alert if no PDF available (placeholder behavior)
- Navigation works with JavaScript disabled (anchor links)

---

## Acceptance Criteria

1. ✅ Page loads with dark theme by default
2. ✅ Terminal-style hero with typing animation plays on load
3. ✅ All 7 sections are present and properly styled
4. ✅ Navigation scrolls to correct sections
5. ✅ Project filtering works (click filter, see relevant projects)
6. ✅ Responsive: looks good on mobile (375px), tablet (768px), desktop (1200px+)
7. ✅ Hover effects work on cards and buttons
8. ✅ All external links (GitHub, LinkedIn) are functional
9. ✅ No console errors on page load
10. ✅ Typography is consistent (JetBrains Mono for headings/code, IBM Plex Sans for body)

---

## Content

### Hero
- **Name**: Alex Chen (placeholder name)
- **Role**: Backend Developer & CTF Player
- **Intro**: "Building robust systems by day, breaking them by night."

### About
- Computer Science student
- Passionate about backend architecture, API design, and security research
- CTF player with focus on pwn, reverse engineering, and crypto
- Problem-solver first, coder second

### Skills
- **Languages**: Python, JavaScript/Node.js, Go, C/C++, SQL
- **Backend**: REST APIs, GraphQL, Docker, Kubernetes, AWS
- **Databases**: PostgreSQL, MongoDB, Redis
- **Security Tools**: GDB, Radare2, Burp Suite, Wireshark
- **Linux**: System administration, Bash scripting, networking

### Projects (placeholder)
1. **API Gateway** - Python/Go - Microservices gateway with rate limiting
2. **CTF Toolkit** - Python - Custom security tooling framework
3. **Secure Chat** - Node.js/PostgreSQL - E2E encrypted messaging app
4. **Shellcode Loader** - C - Educational sandbox for malware analysis

### CTF Achievements
- DEF CON CTF 2025 - 47th place
- PicoCTF 2024 - 3rd place (University division)
- Several active participation in HackTheBox, TryHackMe

### Contact
- Email: fouedmecelti0@gmail.com
- GitHub: github.com/f4xd
- LinkedIn: www.linkedin.com/in/foued-mecelti-a131462b0
