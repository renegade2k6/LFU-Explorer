# LFU Explorer - Batch File Guide

## Quick Reference

| Batch File | When to Use | What It Does |
|------------|-------------|--------------|
| **update.bat** | After dropping new files in Export/ | Auto-detects changes, regenerates pages, deploys |
| **deploy.bat** | Regular deployment | Smart deploy (only changed files) |
| **quick-deploy.bat** | After manual HTML/CSS edits | Just syncs to deploy, no regeneration |
| **push.bat** | Ready to publish to GitHub | Commits and pushes to GitHub Pages |
| **force-regenerate.bat** | When things go wrong | Regenerates EVERYTHING from scratch |

---

## Detailed Guide

### 🔄 update.bat - Auto-Update When Export Changes

**Use this when:** You've dropped new JSON files into the Export folder

**What it does:**
1. Scans Export and Refrence folders for changes
2. Runs appropriate generator scripts (heroes, equipment, relics, etc.)
3. Updates SEO meta tags
4. Syncs everything to deploy folder

**Usage:**
```batch
# Just double-click the file
update.bat

# Or from command line
cd F:\LFWEB
update.bat
```

**Example workflow:**
1. Export new game data → `Export/HeroesTable.json`
2. Double-click `update.bat`
3. Wait for completion
4. Review and commit changes

---

### 🚀 deploy.bat - Smart Deployment

**Use this when:** Regular deployment (general use)

**What it does:**
1. Checks for any changes
2. Regenerates only what's needed
3. Syncs to deploy folder

**Usage:**
```batch
deploy.bat
```

**This is the default go-to script for most deployments.**

---

### ⚡ quick-deploy.bat - Sync Only

**Use this when:**
- You manually edited HTML/CSS/JS files
- You just need to sync to deploy folder
- You don't want to wait for page regeneration

**What it does:**
1. Skips all generation steps
2. Just syncs files to deploy folder

**Usage:**
```batch
quick-deploy.bat
```

**Example workflow:**
1. Edit `styles.css` manually
2. Run `quick-deploy.bat`
3. Changes copied to deploy folder instantly

---

### 📤 push.bat - GitHub Pages Deployment

**Use this when:**
- You've deployed changes to the deploy folder
- You're ready to publish to https://renegade2k6.github.io/LFU-Explorer/
- Changes are tested and ready for production

**What it does:**
1. Shows git status in deploy folder
2. Commits all changes with a message
3. Pushes to GitHub
4. Updates your live website

**Usage:**
**Example workflow:**
1. Run deploy.bat (or update.bat)
2. Review changes in deploy folder
3. Run push.bat
4. Enter commit message when prompted
5. Confirm push to GitHub
6. Wait for GitHub Pages to rebuild (1-2 minutes)

**Safety features:**
- Shows git status before committing
- Asks for confirmation before pushing
- Uses interactive prompts to prevent accidents

---

### 🔨 force-regenerate.bat - Nuclear Option

**Use this when:**
- Previous update failed
- Generator scripts were updated
- You want a complete refresh
- Something's not working right

**What it does:**
1. Forces regeneration of ALL pages
2. Ignores change detection
3. Takes longer but ensures everything is fresh

**Usage:**
```batch
force-regenerate.bat
```

**Warning:** This takes several minutes to complete!

---

## Complete Workflow Examples

### Scenario 1: New Game Data Export

```batch
# 1. Place new files in Export folder
#    Export/HeroesTable.json (updated)
#    Export/EquipmentTable.json (new)

# 2. Run update script
update.bat

# Output:
#   [SCAN] Found 2 changed files
#   [GENERATE] Running hero generator...
#   [GENERATE] Running equipment generator...
#   [SEO] Updating meta tags...
#   [DEPLOY] Syncing to deploy folder...
#   [SUCCESS] Deployment completed!

# 3. Review changes
cd deploy
git status
git diff

# 4. Push to GitHub
push.bat "Update heroes and equipment data"

# Or manually:
# cd deploy
# git add .
# git commit -m "Update heroes and equipment data"
# git push origin master
```

### Scenario 2: CSS Styling Update

```batch
# 1. Edit CSS files manually
#    styles.css (updated colors)
#    theme-fix.css (added dark mode)

# 2. Quick deploy
quick-deploy.bat

# Output:
#   [SYNC] Syncing files...
#   [OK] styles.css
#   [OK] theme-fix.css
#   [SUCCESS] Files synced!

# 3. Push to GitHub
push.bat "Update styling for dark mode"
```

### Scenario 3: Something Went Wrong

```batch
# Previous deploy failed or pages look broken

# 1. Force complete regeneration
force-regenerate.bat

# Output:
#   [FORCE] Regenerating all pages...
#   [RUN] generate_hero_index.py
#   [RUN] generate_equipment_pages.py
#   [RUN] generate_relics_page.py
#   [RUN] generate_warmachine_pages.py
#   [SEO] Updating all pages...
#   [DEPLOY] Syncing everything...
#   [SUCCESS] All pages regenerated!

# 2. Verify everything looks good
# 3. Commit if satisfied
```

---

## Troubleshooting

### "Python is not installed or not in PATH"

**Solution:**
1. Install Python 3.7+ from https://www.python.org/
2. During installation, check "Add Python to PATH"
3. Restart command prompt
4. Try again

### "Script failed with errors"

**Solutions:**
1. Read the error message carefully
2. Check that all JSON files are valid
3. Try `force-regenerate.bat` to start fresh
4. Check Python script logs in tools/

### "Changes not appearing in deploy folder"

**Solutions:**
1. Make sure you ran the bat file to completion
2. Check that deploy folder exists
3. Try `quick-deploy.bat` to force sync
4. Verify file paths are correct

### "Generator scripts are slow"

**Normal behavior:**
- First run: Slower (building manifest)
- Subsequent runs: Faster (only changed files)
- Force regenerate: Always slow (regenerates everything)

**To speed up:**
- Use `deploy.bat` (smart mode) instead of force
- Only use `force-regenerate.bat` when necessary

---

## Advanced Usage

### Running with Custom Options

All batch files internally call Python scripts. For advanced options:

```batch
# Auto-update without SEO tags
python tools\auto_update.py --deploy --no-seo

# Deploy without any generation
python tools\deploy.py --skip-generate

# Force regenerate without SEO
python tools\deploy.py --force --no-seo
```

### Scheduling Automatic Updates

You can use Windows Task Scheduler to run `update.bat` automatically:

1. Open Task Scheduler
2. Create Basic Task
3. Trigger: When files change in Export folder
4. Action: Start a program → `F:\LFWEB\update.bat`

---

## File Locations

```
F:/LFWEB/
├── update.bat                # Main update script
├── deploy.bat                # Smart deployment
├── quick-deploy.bat          # Sync only
├── push.bat                  # GitHub Pages deployment
├── force-regenerate.bat      # Nuclear option
│
├── tools/                    # Python scripts (called by bat files)
│   ├── auto_update.py
│   ├── deploy.py
│   └── sync_to_deploy.py
│
├── Export/                   # Drop new JSON files here
├── deploy/                   # Final output (Git tracked)
└── README_BATCH_FILES.md     # This file
```

---

## Best Practices

1. **For new game data:** Always use `update.bat`
2. **For CSS/JS edits:** Use `quick-deploy.bat`
3. **When in doubt:** Use `deploy.bat` (safe default)
4. **When broken:** Try `force-regenerate.bat`

5. **Always review before pushing:**
   ```batch
   cd deploy
   git status
   git diff
   ```

6. **Keep commits focused:**
   - One commit for data updates
   - Separate commit for style changes
   - Separate commit for new features

---

**Last Updated:** 2025-12-24
**Version:** 1.0
