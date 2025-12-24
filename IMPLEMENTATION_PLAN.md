# LFU Explorer - Implementation Plan

## Summary

This document outlines the implementation plan for:
1. **Enhanced Relic System** with buff cards
2. **Guide Pages** from TODO folder documentation
3. **Automated Deployment** system

---

## 1. Enhanced Relic System

### Current Status
✓ Basic relics page exists (`relics.html`)
✗ Missing detailed buff information on relic cards

### Available Data Sources

#### Cultural_relicsTable.json
- Base relic data: Id, Quality, Name (localization key), Icon
- LevelGroup, StarGroup (for buff lookups)
- Max Level: 60, Max Stars: 5

#### Cultural_relics_levelTable.json
- Level-up buffs per LevelGroup
- EffectArray: Buff type and value (e.g., `["20501;5"]`)
- ShowDes: Localization key for buff description
- Power values per level

#### Cultural_relics_starTable.json
- Star-up buffs per StarGroup
- CommonEffectArray: Buff type and value (e.g., `["10145;3"]`)
- ShowDes: Localization key for buff description
- LevelMax per star level

#### Cultural_relics_buffTable.json
- Collection tier buffs (milestones)
- Stage: Total points required
- Para: Buff parameters
- ShowDes: Buff description key

### Implementation Tasks

**Task 1: Create Relic Data Processor**
```python
# tools/process_relic_data.py
- Read all 4 relic JSON tables
- Merge data by LevelGroup/StarGroup
- Resolve localization keys
- Generate enriched JSON for page generation
```

**Task 2: Update generate_relics_page.py**
```python
- Add buff display cards
- Show level-up progression (per level)
- Show star-up bonuses (per star)
- Display collection tier milestones
- Add quality-based color coding
```

**Task 3: Enhance Relic Cards**
- Add expandable buff sections
- Show progression tables
- Include collection points
- Add quality tier badges

### Data Mapping

**Effect IDs → Buff Types**
Need to map effect IDs to human-readable names:
- 20501, 20502, 20503, 20504 → Stat types (need localization)
- 10145, 10133, 894, 10054 → Common effects
- etc.

**Localization Keys**
All text uses numeric keys - need to map to actual text:
- Name: 802002140 → "Tri-color Pottery"
- ShowDes: 162007 → Buff description
- Use: `Localization_LocalizationComponent_dictionary.json`

---

## 2. Guide Pages from TODO Folder

### Available Guides

| Guide File | Topic | Status | Priority |
|------------|-------|--------|----------|
| `Cultural_Relics_System_Documentation.md` | Relics system mechanics | ✓ Complete | HIGH |
| `Hero_System_Documentation.md` | Hero progression | ✓ Complete | HIGH |
| `APC_Vehicle_Parts_System_Documentation.md` | APC modules | ✓ Complete | MEDIUM |
| `Warbeast_System_Documentation.md` | War machines | ✓ Complete | MEDIUM |
| `Fortress_Skins.md` | Fortress decorations | ✓ Complete | LOW |
| `Player_Frames.md` | Profile frames | ✓ Complete | LOW |

### Guide Page Structure

Each guide should become:
1. **Standalone HTML page** (e.g., `guides/relics-system.html`)
2. **Navigation section** in main index
3. **Cross-references** to data pages

### Recommended Page Layout

```
┌─────────────────────────────────────┐
│ Header (consistent with site)      │
├─────────────────────────────────────┤
│ Page Title & Subtitle               │
├─────────────────────────────────────┤
│ Quick Navigation (TOC)              │
├─────────────────────────────────────┤
│ Section 1: Overview                 │
│   - System summary                  │
│   - Key mechanics                   │
│   - Quick reference tables          │
├─────────────────────────────────────┤
│ Section 2: Detailed Mechanics       │
│   - Subsystem explanations          │
│   - Visual diagrams/tables          │
│   - Cross-links to data pages       │
├─────────────────────────────────────┤
│ Section 3: Strategy Tips            │
│   - Optimal progression             │
│   - Resource efficiency             │
│   - Common pitfalls                 │
├─────────────────────────────────────┤
│ Footer with related links           │
└─────────────────────────────────────┘
```

### Implementation Tasks

**Task 1: Create Markdown→HTML Converter**
```python
# tools/generate_guides.py
- Parse markdown files from TODO/
- Convert to HTML with:
  * Consistent styling
  * Syntax highlighting for tables
  * Cross-references to data pages
  * Navigation breadcrumbs
- Output to guides/ folder
```

**Task 2: Create Guides Index Page**
```html
<!-- guides.html -->
- Grid layout of guide cards
- Category filtering
- Search functionality
- Recent updates section
```

**Task 3: Update Main Navigation**
- Add "Guides" link to header
- Create guides landing page
- Update index.html with guides section

**Task 4: Enhanced Features**
- Collapsible sections for long guides
- Print-friendly CSS
- Share buttons
- "Last Updated" timestamps

---

## 3. Automated Deployment System

### ✅ COMPLETED
- `auto_update.py` - Change detection & regeneration
- `deploy.py` - Unified deployment script
- `sync_to_deploy.py` - Folder synchronization
- Manifest tracking (`.update_manifest.json`)

### How It Works

```
[1] User drops new JSON → Export/
        ↓
[2] Python deploy.py
        ↓
[3] auto_update.py detects changes
        ↓
[4] Runs appropriate generators
        ├→ generate_hero_index.py
        ├→ generate_equipment_pages.py
        ├→ generate_relics_page.py (TO UPDATE)
        └→ generate_warmachine_pages.py
        ↓
[5] add_seo_tags.py updates meta tags
        ↓
[6] sync_to_deploy.py copies to deploy/
        ↓
[7] Ready for git commit & push!
```

### Usage

```bash
# Smart deploy (only what changed)
python tools/deploy.py

# Force regenerate everything
python tools/deploy.py --force

# Just sync, no generation
python tools/deploy.py --skip-generate
```

---

## 4. Phased Implementation Plan

### Phase 1: Enhanced Relics (Week 1)
**Priority: HIGH**

1. Create `process_relic_data.py`
   - Merge all relic JSON tables
   - Resolve localization keys
   - Output enriched data structure

2. Update `generate_relics_page.py`
   - Add buff display sections
   - Create progression tables
   - Implement collection milestones

3. Test & Deploy
   - Run `python tools/deploy.py`
   - Verify relic cards show buffs
   - Check mobile responsiveness

**Deliverables:**
- ✓ Relics show level-up buffs
- ✓ Relics show star-up buffs
- ✓ Collection milestones displayed
- ✓ Quality-based color coding

### Phase 2: Guide System (Week 2)
**Priority: HIGH**

1. Create `generate_guides.py`
   - Markdown parser with extensions
   - HTML template system
   - TOC auto-generation

2. Create guides structure
   - `guides/` folder
   - `guides.html` index page
   - Individual guide pages

3. Convert existing guides
   - Cultural Relics guide
   - Hero System guide
   - APC/Vehicle Parts guide
   - War Machines guide

4. Navigation updates
   - Add Guides to main menu
   - Update index.html
   - Cross-reference links

**Deliverables:**
- ✓ All 6 guides converted to HTML
- ✓ Guides index page
- ✓ Navigation integrated
- ✓ Mobile-friendly layout

### Phase 3: Advanced Features (Week 3)
**Priority: MEDIUM**

1. Search functionality
   - Client-side search for guides
   - Fuzzy matching
   - Result highlighting

2. Enhanced relic features
   - Comparison tool (compare 2 relics)
   - Collection planner
   - Buff calculator

3. Guide enhancements
   - Interactive tables
   - Progress trackers
   - Bookmark system

**Deliverables:**
- ✓ Search works across all content
- ✓ Relic comparison tool
- ✓ Interactive guide features

### Phase 4: Polish & Optimization (Week 4)
**Priority: LOW**

1. Performance optimization
   - Lazy loading images
   - Minimize CSS/JS
   - Service worker caching

2. SEO improvements
   - Structured data markup
   - Sitemap generation
   - Rich snippets

3. Accessibility
   - ARIA labels
   - Keyboard navigation
   - Screen reader testing

**Deliverables:**
- ✓ Lighthouse score > 90
- ✓ Full accessibility compliance
- ✓ Complete SEO optimization

---

## 5. Technical Specifications

### Guide Page Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{Guide Title} | LFU Explorer</title>

    <!-- Favicon -->
    <link rel="icon" href="/LFU-Explorer/favicon.ico" type="image/x-icon">

    <!-- SEO Meta Tags -->
    <meta name="description" content="{Guide Description}">
    <meta name="keywords" content="{Keywords}">

    <!-- OpenGraph -->
    <meta property="og:title" content="{Guide Title}">
    <meta property="og:description" content="{Guide Description}">
    <meta property="og:image" content="/LFU-Explorer/assets/og-image.png">

    <link rel="stylesheet" href="../styles.css">
    <link rel="stylesheet" href="../guide-styles.css">
</head>
<body>
    <header class="app-header">
        <!-- Standard header -->
    </header>

    <nav class="breadcrumbs">
        <a href="../index.html">Home</a> ›
        <a href="../guides.html">Guides</a> ›
        <span>{Guide Title}</span>
    </nav>

    <main class="guide-content">
        <div class="guide-header">
            <h1>{Guide Title}</h1>
            <p class="guide-meta">Last Updated: {Date}</p>
        </div>

        <aside class="guide-toc">
            <!-- Auto-generated TOC -->
        </aside>

        <article class="guide-body">
            <!-- Converted markdown content -->
        </article>

        <nav class="guide-navigation">
            <a href="{Previous Guide}" class="prev-guide">← Previous</a>
            <a href="{Next Guide}" class="next-guide">Next →</a>
        </nav>
    </main>
</body>
</html>
```

### Relic Card Enhanced Structure

```javascript
{
  "id": 1001,
  "name": "Tri-color Pottery",
  "quality": 1,
  "icon": "relics_item_syc",
  "description": "Clay figures and vessels...",

  // NEW: Level buffs
  "levelBuffs": [
    {
      "level": 10,
      "effect": "20501",
      "value": 5,
      "description": "Troop Attack +5%",
      "power": 825
    },
    // ... levels 11-60
  ],

  // NEW: Star buffs
  "starBuffs": [
    {
      "star": 0,
      "effect": "10145",
      "value": 3,
      "description": "Troop Health +3%",
      "power": 900
    },
    // ... stars 1-5
  ],

  // Collection tier it contributes to
  "pointValue": 1,
  "levelGroup": 1001,
  "starGroup": 1001
}
```

---

## 6. File Structure After Implementation

```
F:/LFWEB/
├── guides/
│   ├── index.html                    # Guides landing page
│   ├── relics-system.html           # Cultural Relics guide
│   ├── hero-system.html             # Hero progression guide
│   ├── apc-modules.html             # APC/Vehicle guide
│   ├── war-machines.html            # War Machines guide
│   ├── fortress-skins.html          # Fortress decorations
│   └── player-frames.html           # Profile frames
│
├── tools/
│   ├── deploy.py                    # ✓ Main deployment script
│   ├── auto_update.py               # ✓ Change detection
│   ├── sync_to_deploy.py            # ✓ Folder sync
│   ├── add_seo_tags.py              # ✓ SEO injection
│   ├── generate_hero_index.py       # ✓ Existing
│   ├── generate_equipment_pages.py  # ✓ Existing
│   ├── generate_relics_page.py      # ⚠ TO UPDATE
│   ├── generate_warmachine_pages.py # ✓ Existing
│   ├── generate_guides.py           # ✗ TO CREATE
│   └── process_relic_data.py        # ✗ TO CREATE
│
├── assets/
│   ├── guide-styles.css             # ✗ TO CREATE
│   └── og-image.png                 # ✓ Exists
│
└── TODO/                            # Source documents
    └── *.md                         # Guides to convert
```

---

## 7. Next Steps

### Immediate Actions

1. **Approve this plan** ✓
   - Review phased approach
   - Confirm priorities
   - Adjust timeline if needed

2. **Start Phase 1: Enhanced Relics**
   ```bash
   # Create the new scripts
   python tools/process_relic_data.py
   python tools/generate_relics_page.py
   python tools/deploy.py --force
   ```

3. **Start Phase 2: Guide System**
   ```bash
   # Create guide generator
   python tools/generate_guides.py
   python tools/deploy.py
   ```

### Questions to Answer

1. **Localization**: Should we resolve all localization keys now, or show IDs temporarily?
2. **Guide Categories**: Should we add more categories beyond the 6 existing guides?
3. **Interactive Features**: Priority for calculators/planners in Phase 3?
4. **Mobile-First**: Should we prioritize mobile layout from the start?

---

## 8. Success Metrics

### Phase 1 Completion
- [ ] Relics show all buff types (level, star, collection)
- [ ] Buffs resolve to human-readable text
- [ ] Color coding by quality tier
- [ ] Responsive card layout

### Phase 2 Completion
- [ ] All 6 guides converted to HTML
- [ ] Navigation integrated
- [ ] Cross-references working
- [ ] Mobile-friendly

### Phase 3 Completion
- [ ] Search functionality works
- [ ] At least 1 interactive tool live
- [ ] User feedback collected

### Phase 4 Completion
- [ ] Lighthouse score > 90 on all pages
- [ ] All pages accessible (WCAG 2.1 AA)
- [ ] Sitemap generated
- [ ] Deploy fully automated

---

**Document Version:** 1.0
**Last Updated:** 2025-12-24
**Next Review:** After Phase 1 completion
