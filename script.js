// ========================================
// Terminal Typing Animation
// ========================================
const terminalOutput = document.getElementById('typing-output');

const whoamiResponse = `foued
├── Backend Developer
├── CTF Player
└── Problem Solver`;

let charIndex = 0;
let lineIndex = 0;
const lines = whoamiResponse.split('\n');
let currentLine = '';

function typeWriter() {
    if (lineIndex < lines.length) {
        const currentLineText = lines[lineIndex];
        
        if (charIndex < currentLineText.length) {
            currentLine += currentLineText[charIndex];
            terminalOutput.textContent = lines.slice(0, lineIndex).join('\n') + (lineIndex > 0 ? '\n' : '') + currentLine;
            charIndex++;
            setTimeout(typeWriter, 30 + Math.random() * 30);
        } else {
            lineIndex++;
            charIndex = 0;
            currentLine = '';
            setTimeout(typeWriter, 200);
        }
    }
}

// Start typing animation after a short delay
setTimeout(typeWriter, 800);


// ========================================
// Mobile Navigation Toggle
// ========================================
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Animate hamburger to X
    const spans = navToggle.querySelectorAll('span');
    if (navLinks.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});


// ========================================
// Load Portfolio Data from API
// ========================================
let allProjects = [];

async function loadPortfolioData() {
    try {
        const response = await fetch('/api/portfolio');
        const data = await response.json();
        
        // Update profile info
        updateProfileInfo(data.profile);
        
        // Load projects
        allProjects = data.projects;
        renderProjects(allProjects);
    } catch (error) {
        console.error('Error loading portfolio data:', error);
    }
}

function updateProfileInfo(profile) {
    // Update hero name and role
    const heroName = document.querySelector('.hero-name');
    const heroRole = document.querySelector('.hero-role');
    if (heroName) heroName.textContent = profile.name || 'Developer';
    if (heroRole) heroRole.textContent = profile.role || 'Backend Developer';
}

function renderProjects(projects) {
    const projectsGrid = document.getElementById('projectsGrid');
    
    if (!projects || projects.length === 0) {
        projectsGrid.innerHTML = '<p class="no-projects">No projects yet.</p>';
        return;
    }

    projectsGrid.innerHTML = projects.map(project => `
        <article class="project-card" data-category="${project.category}">
            <div class="project-header">
                <h3 class="project-title">${project.title}</h3>
                <div class="project-links">
                    ${project.github_url ? `
                        <a href="${project.github_url}" target="_blank" rel="noopener" aria-label="GitHub">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                            </svg>
                        </a>
                    ` : ''}
                </div>
            </div>
            <p class="project-desc">${project.description || ''}</p>
            <div class="project-tags">
                ${project.tags ? project.tags.split(',').map(tag => `<span class="project-tag">${tag.trim()}</span>`).join('') : ''}
            </div>
        </article>
    `).join('');

    // Re-attach filtering logic after rendering
    attachFilterListeners();
}

function attachFilterListeners() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const noProjectsMessage = document.querySelector('.no-projects');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            let visibleCount = 0;

            projectCards.forEach(card => {
                const category = card.dataset.category;
                
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    visibleCount++;
                } else {
                    card.classList.add('hidden');
                }
            });

            if (visibleCount === 0) {
                noProjectsMessage.style.display = 'block';
            } else {
                noProjectsMessage.style.display = 'none';
            }
        });
    });
}

// Load portfolio data on page load
document.addEventListener('DOMContentLoaded', loadPortfolioData);


// ========================================
// Scroll Animations (Fade In)
// ========================================
const fadeElements = document.querySelectorAll('.about, .skills, .projects, .ctf, .contact');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

fadeElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});


// ========================================
// Smooth Scroll for Navigation
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#" or if it's the download CV button
        if (href === '#' || this.id === 'download-cv') {
            return;
        }
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});


// ========================================
// Download CV Button (Placeholder)
// ========================================
const downloadCvBtn = document.getElementById('download-cv');

downloadCvBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // In a real implementation, this would link to a PDF file
    // For now, show a friendly message
    alert('CV download coming soon! Check back later or contact me directly.');
});


// ========================================
// Active Navigation Highlighting
// ========================================
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.style.color = '';
        if (item.getAttribute('href') === `#${current}`) {
            item.style.color = 'var(--accent-green)';
        }
    });
});


// ========================================
// Keyboard Navigation Support
// ========================================
// Allow pressing Enter on filter buttons for accessibility
filterButtons.forEach(btn => {
    btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            btn.click();
        }
    });
});


// ========================================
// Reduce Motion Preference
// ========================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable animations for users who prefer reduced motion
    document.querySelectorAll('.fade-in').forEach(el => {
        el.classList.remove('fade-in');
        el.style.opacity = '1';
        el.style.transform = 'none';
    });
    
    // Stop cursor blink
    document.querySelectorAll('.cursor').forEach(cursor => {
        cursor.style.animation = 'none';
    });
    
    // Stop typing animation
    terminalOutput.textContent = whoamiResponse;
}