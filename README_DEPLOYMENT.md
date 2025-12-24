# LFU Explorer - Deployment Workflow

## Overview

This project uses an **automatic change detection and regeneration system** to keep the website up-to-date when new game data is exported.

## Quick Start

### Option 1: Smart Deploy (Recommended)
Automatically detects changes and only regenerates what's needed:

```bash
python tools/deploy.py
```

### Option 2: Force Regenerate Everything
```bash
python tools/deploy.py --force
```

### Option 3: Just Sync (No Regeneration)
```bash
python tools/deploy.py --skip-generate
```

## How It Works

### 1. Data Flow

```
Game Export
    ↓
Export/ folder (raw JSON data)
    ↓
Refrence/ folder (processed data)
    ↓
Generator Scripts (Python)
    ↓
HTML Pages (root & subdirectories)
    ↓
deploy/ folder (final output)
    ↓
GitHub Pages
```

### 2. Auto-Detection System

The `auto_update.py` script:
- **Tracks file changes** using SHA256 hashes
- **Detects new exports** in Export/ folder
- **Monitors Refrence/ changes** for processed data
- **Runs only necessary generators** to save time
- **Updates manifest** (`.update_manifest.json`) to track state

### 3. Generator Mappings

| Generator | Triggers | Export Dependencies | Output |
|-----------|----------|---------------------|--------|
| `generate_hero_index.py` | `book_heroes_list.json` | `HeroesTable.json` | `heroes.html` + `heroes/*.html` |
| `generate_equipment_pages.py` | `book_equipment_sets_list.json` | `EquipmentTable.json` | `equipment.html` + `equipment/*.html` |
| `generate_relics_page.py` | - | `Cultural_relicsTable.json` | `relics.html` |
| `generate_warmachine_pages.py` | `book_warbeast_list.json` | `WarmachineTable.json` | `warmachine.html` |

## Workflow for New Game Data

### Step 1: Export New Game Data
When you export new JSON data from the game, place it in:
```
Export/
  ├── HeroesTable.json           (if heroes updated)
  ├── EquipmentTable.json         (if equipment updated)
  ├── Cultural_relicsTable.json   (if relics updated)
  └── WarmachineTable.json        (if war machines updated)
```

### Step 2: Update Refrence Files (if needed)
Process Export data into Refrence folder:
```
Refrence/
  ├── book_heroes_list.json       (filtered/processed heroes)
  ├── book_equipment_sets_list.json
  ├── book_warbeast_list.json
  └── ...
```

### Step 3: Deploy
Run the deploy script:
```bash
python tools/deploy.py
```

The script will:
1. ✓ Detect which files changed
2. ✓ Run only the necessary generators
3. ✓ Update SEO tags on modified pages
4. ✓ Sync everything to `deploy/` folder

### Step 4: Push to GitHub
```bash
cd deploy
git status                           # Review changes
git add .
git commit -m "Update game data"
git push origin master
```

## Manual Commands

### Check for Changes (Without Regenerating)
```bash
python tools/auto_update.py
```

### Force Regenerate Specific Pages
```bash
# Heroes only
python tools/generate_hero_index.py

# Equipment only
python tools/generate_equipment_pages.py

# Relics only
python tools/generate_relics_page.py

# War Machines only
python tools/generate_warmachine_pages.py
```

### Update SEO Tags Only
```bash
python tools/add_seo_tags.py
```

### Sync to Deploy Only
```bash
python tools/sync_to_deploy.py
```

## Advanced Options

### Skip SEO Updates
```bash
python tools/deploy.py --no-seo
```

### Auto-Update with Immediate Deploy
```bash
python tools/auto_update.py --deploy
```

### Force Regenerate + Deploy
```bash
python tools/deploy.py --force
```

## File Structure

```
F:/LFWEB/
├── Export/                  # Raw game data exports
├── Refrence/               # Processed data for generators
├── tools/                  # Build scripts
│   ├── deploy.py          # Main deployment script
│   ├── auto_update.py     # Auto-detection & regeneration
│   ├── sync_to_deploy.py  # Folder sync
│   ├── add_seo_tags.py    # SEO meta tag injection
│   ├── generate_hero_index.py
│   ├── generate_equipment_pages.py
│   ├── generate_relics_page.py
│   └── generate_warmachine_pages.py
├── deploy/                 # Final output (Git tracked)
├── *.html                  # Generated pages
├── equipment/              # Generated equipment pages
├── heroes/                 # Generated hero pages
└── assets/                 # Images, CSS, JS
```

## Troubleshooting

### "No changes detected" but I added new files
- Make sure files are in `Export/` or `Refrence/` folders
- Check file extensions (must be `.json`)
- Try `--force` flag to regenerate everything

### Generator fails
- Check Python dependencies are installed
- Verify JSON file format is correct
- Look for error messages in the output

### Deploy folder not updating
- Run `sync_to_deploy.py` manually
- Check folder permissions
- Verify deploy folder exists

### SEO tags not appearing
- Run `add_seo_tags.py` manually
- Check if HTML files have `<head>` section
- Look for "already has meta tags" messages

## Best Practices

1. **Always use deploy.py**: Don't manually copy files to deploy/
2. **Review changes**: Check `git status` in deploy/ before pushing
3. **Test locally**: Open HTML files in browser before deploying
4. **Keep exports**: Don't delete Export/ folder, it's your source of truth
5. **Backup Refrence/**: These processed files may require manual work

## Questions?

Check the individual script help:
```bash
python tools/deploy.py --help
python tools/auto_update.py --help
```
