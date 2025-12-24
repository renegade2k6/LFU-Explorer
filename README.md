# LFU Explorer - Deployment Package

This folder contains the optimized deployment package for LFU Explorer.

## What's Included

- All HTML pages
- CSS and JavaScript files
- JSON data files (Refrence/ and Export/)
- **Only the 608 images actually used** (16 MB instead of ~1.5 GB)

## Deployment Instructions

### Option 1: GitHub Pages
1. Create a new repository on GitHub
2. Copy all contents of this `deploy` folder to the repository
3. Enable GitHub Pages in repository settings
4. Your site will be live at: https://yourusername.github.io/repo-name

### Option 2: Netlify
1. Drag and drop this entire `deploy` folder to Netlify
2. Your site will be deployed instantly

### Option 3: Any Web Server
Simply upload all files from this `deploy` folder to your web server's public directory.

## Structure

```
deploy/
├── index.html              # Home page
├── *.html                  # All other pages
├── *.css                   # Stylesheets
├── *.js                    # JavaScript files
├── *.json                  # Configuration files
├── assets/
│   ├── Sprite/            # Used sprite images (608 files, ~16MB)
│   └── Texture2D/         # Used texture images (if any)
├── Refrence/              # Game data JSON files
├── Export/                # Exported game data
└── equipment/             # Equipment detail pages

```

## Size Optimization

- Original project: ~1.5 GB (51,804 images)
- Deployed package: ~17 MB (608 images)
- **99% size reduction** while maintaining full functionality

## Notes

- All image paths use relative URLs and will work on any domain
- No server-side code required (pure static site)
- Works offline after initial load (can be made into PWA)
