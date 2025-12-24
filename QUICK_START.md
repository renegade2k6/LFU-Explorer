# LFU Explorer - Quick Start Guide

## 🚀 Publish Game Updates in 3 Steps

### When You Get New Game Data

**Step 1: Copy Export Files**
```
Get new export files from game data
→ Copy to F:/LFWEB/Export/
→ Replace existing files
```

**Step 2: Run Publish Script**
```batch
Double-click: publish.bat
```

**Step 3: Wait 2 Minutes**
```
Your site updates automatically at:
https://renegade2k6.github.io/LFU-Explorer/
```

**That's it!** ✅

---

## 📁 What Files to Update

| Game Data | Export File | Updates Page |
|-----------|-------------|--------------|
| Heroes | `HeroesTable.json` | `heroes.html` |
| Equipment | `EquipmentTable.json` | `equipment.html` |
| Relics | `Cultural_relicsTable.json`<br>`Cultural_relics_levelTable.json`<br>`Cultural_relics_starTable.json`<br>`Cultural_relics_buffTable.json` | `relics.html` |
| War Machines | `WarmachineTable.json` | `warmachine.html` |

**The system auto-detects which pages need updating!**

---

## 🎯 Common Workflows

### New Game Update (Most Common)
```batch
1. Copy new Export files
2. publish.bat "Game update v2.5"
3. Done! ✅
```

### Just Test Locally (No Publish)
```batch
1. Copy new Export files
2. update.bat
3. Check F:/LFWEB/relics.html locally
4. When ready: push.bat
```

### Quick CSS Fix
```batch
1. Edit styles.css
2. quick-deploy.bat
3. push.bat "Fixed styling"
```

### Something Broke - Start Fresh
```batch
publish.bat --force
```

---

## 🔧 Available Scripts

| Script | What It Does | When to Use |
|--------|--------------|-------------|
| **publish.bat** 🌟 | Everything! (detect → regenerate → push) | **USE THIS** for most updates |
| update.bat | Detect changes → regenerate → deploy | Test before pushing to GitHub |
| deploy.bat | Smart deploy (only changed files) | Manual control workflow |
| push.bat | Commit and push to GitHub | After manual changes |
| force-regenerate.bat | Regenerate everything from scratch | When things break |

---

## 💡 Pro Tips

**✅ DO:**
- Use `publish.bat` for game updates (easiest!)
- Review changes before confirming publish
- Keep Export files organized
- Use meaningful commit messages

**❌ DON'T:**
- Edit files in `deploy/` folder directly (they get overwritten)
- Delete `.update_manifest.json` (tracks changes)
- Push without reviewing changes first

---

## 🆘 Troubleshooting

### "No changes detected"
→ Files might not have actually changed
→ Check Export folder has new data

### "Script failed"
→ Check error message
→ Try `publish.bat --force`
→ Check JSON files are valid

### "Changes not showing on website"
→ GitHub Pages takes 1-2 minutes to rebuild
→ Hard refresh browser (Ctrl+F5)
→ Check git push succeeded

---

## 📊 What Happens Behind the Scenes

```
publish.bat
    ↓
[1] Scan Export/ folder for changes (SHA256 hash check)
    ↓
[2] If HeroesTable.json changed → run generate_hero_index.py
    If Cultural_relicsTable.json changed → run process_relic_data.py
                                        → run generate_relics_page.py
    (and so on for each changed file)
    ↓
[3] Update SEO meta tags on all pages
    ↓
[4] Sync everything to deploy/ folder
    ↓
[5] Git: add → commit → push
    ↓
[6] GitHub Pages automatically rebuilds site
    ↓
[7] Your site is LIVE! 🎉
```

**It's SMART:** Only regenerates what actually changed!

---

## 📝 Example: Adding New Relics

**Scenario:** Game added 5 new relics in v2.5 update

```batch
# 1. Get export files
You receive:
- Cultural_relicsTable.json (has 68 relics now, was 63)
- Cultural_relics_levelTable.json (updated)
- Cultural_relics_starTable.json (updated)
- Cultural_relics_buffTable.json (same)

# 2. Copy to working directory
Copy all 4 files to F:/LFWEB/Export/

# 3. Run publish
publish.bat "Game update v2.5: Added 5 new relics"

# System automatically:
✓ Detects 3 files changed
✓ Runs process_relic_data.py (creates enriched data)
✓ Runs generate_relics_page.py (creates HTML)
✓ Updates relics.html with all 68 relics
✓ Commits: "Game update v2.5: Added 5 new relics"
✓ Pushes to GitHub
✓ Site rebuilds with new relics!

# 4. Wait 2 minutes
Check: https://renegade2k6.github.io/LFU-Explorer/relics.html
All 68 relics are now showing! ✅
```

**Time:** ~30 seconds work + 2 minutes GitHub rebuild = **Total: < 3 minutes**

---

## 🎓 Learning Path

**Week 1 - Beginner:**
- Just use `publish.bat` for everything
- Get comfortable with the workflow

**Week 2 - Intermediate:**
- Try `update.bat` to test before publishing
- Use `push.bat` separately
- Understand what each script does

**Week 3 - Advanced:**
- Use `--force` when needed
- Customize commit messages
- Understand the generator scripts

**Week 4 - Expert:**
- Modify generator scripts
- Add new data sources
- Create custom workflows

---

## 📞 Need Help?

Check the detailed guides:
- `README_BATCH_FILES.md` - Complete batch file reference
- `README_DEPLOYMENT.md` - Deployment system details
- `IMPLEMENTATION_PLAN.md` - Technical architecture

---

**Version:** 1.0
**Last Updated:** 2025-12-24
**Your Site:** https://renegade2k6.github.io/LFU-Explorer/
