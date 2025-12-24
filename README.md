# LFU Explorer

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
