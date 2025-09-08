# VAULT HUNTER

_Hunt the source. Contain the glow. Join Special Agent Rat in a tile-scanning thriller across infamous hotspots._

[▶ Play on GitHub Pages](https://ironsignalworks.github.io/vaulthunter/) •  
[🧰 Press Kit](presskit/presskit.html) •  
✉️ web@ironsignalworks.com

![VAULT HUNTER](vh_card.png)

---

## What is it?

**VAULT HUNTER** is a fast, grid-based web game. Scan tiles to trace a hidden contamination source before the mission clock runs out. Read the heat numbers, dodge radiation pockets, grab intel, and make each location blissfully boring again.

**Features**
- 10×10 tactical grid with Manhattan-distance “heat” hints (0–6)
- Multiple locations with unique lore & intel drops
- Mission timer, energy management, and Geiger feedback
- Keyboard & touch friendly, mobile-first layout
- No frameworks—just HTML/CSS/JS

---

## How to play

- **Click / tap** a tile to scan.
- Numbers (0–6) = heat toward the source (higher = closer).
- **≈** Radiation (hurts energy), **✶** Intel (pauses timer), **☢** Source.
- **Space / Enter** scans the focused tile.  
- **MUTE** toggles audio. **MENU** returns to the main menu.

---

## Run locally (no build step)

This is a static site. You can open `index.html` directly, but a local server is recommended for audio and path behavior.

**Option A — Python**
```bash
# From repo root
python -m http.server 8000
# Visit:
http://localhost:8000/vaulthunter/
