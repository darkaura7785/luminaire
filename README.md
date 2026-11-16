# WOBlISK INDUSTRIES — LUMINAIRE

Scientific Computing & Planetary Data Analysis

A browser-based scientific computing platform for planetary research, orbital mechanics, image analysis, mission simulation, and astronomical data interpretation.

## Deployment

### GitHub Pages Deployment

1. Create a GitHub repository named `luminaire`
2. Upload the complete project files
3. Navigate to repository Settings → Pages
4. Under "Build and deployment":
   - Source: `main` branch
   - Branch: `/ (root)`
5. Save the configuration
6. Wait for GitHub Pages to build and publish

**Expected URL:** `https://YOUR-GITHUB-USERNAME.github.io/luminaire/`

### Important Deployment Notes

- All asset paths use relative paths (not root-relative URLs like `/css/global.css`)
- No Node.js server required at runtime — pure static HTML/CSS/JS
- All JavaScript uses external CDN imports (Three.js, etc.)
- Test by visiting the actual published URL

## Project Structure

```
luminaire/
├── index.html              # Homepage / Scientific Laboratory Dashboard
├── about.html              # Methodology & Scientific Models
├── instruments/
│   ├── orrery.html         # Kepler Orrery (00) — 3D solar system
│   ├── sky.html            # Tonight's Sky (05) — Observatory tool
│   ├── marswalk.html       # Marswalk Planner (06) — Mission planning
│   ├── anomaly.html        # Anomaly Hunter (01) — Image analysis
│   ├── mission.html        # Mission Survival (02) — Rover simulation
│   ├── landing.html        # Landing Sites (03) — Location evaluation
│   └── discovery.html      # Discovery Engine (04) — Data analysis
├── assets/
│   ├── images/
│   ├── icons/              # Lucide icon set
│   └── data/               # Sample orbital/CSV data
├── css/
│   └── global.css          # Design system, variables, base styles
├── js/
│   ├── main.js             # App initialization (currently inline in pages)
│   ├── navigation.js       # Persistent nav, instrument switching
│   ├── components.js       # Reusable UI components
│   ├── core/
│   │   └── orbital.js      # Orbital mechanics, Keplerian calculations
│   └── instruments/
│       ├── orrery.js       # (placeholder — inline in orrery.html)
│       ├── sky.js          # (placeholder — inline in sky.html)
│       ├── marswalk.js     # (placeholder — inline in marswalk.html)
│       ├── anomaly.js      # (placeholder — inline in anomaly.html)
│       ├── mission.js      # (placeholder — inline in mission.html)
│       ├── landing.js      # (placeholder — inline in landing.html)
│       └── discovery.js    # (placeholder — inline in discovery.html)
└── README.md               # This file
```

## Features

### Seven Scientific Instruments

1. **00 — Kepler Orrery** — Interactive 3D solar system with orbital calculations
   - JPL orbital elements, Kepler's equation solver (Newton-Raphson)
   - Kepler's three laws: elliptical orbits, equal areas, T² ∝ a³
   - Areal velocity visualization, motion event detection
   - Time controls: play/pause, speed slider (0.5×–60×), reset

2. **01 — Anomaly Hunter** — Image difference analysis
   - Upload two planetary images, compute pixel-wise difference
   - Threshold segmentation: Anomaly(x,y) = 1 if D(x,y) > τ
   - Connected-component analysis, morphological operations
   - Exportable analysis results with confidence scores

3. **02 — Mission Survival** — Monte Carlo rover reliability simulation
   - Rover configuration: battery, power, thermal, comms, dust, wear
   - Exponential reliability: R(t) = e^(-λt)
   - Multiple failure modes with probabilistic lifetimes
   - Survival percentage, average duration, failure distribution

4. **03 — Landing Sites** — Multi-criteria landing evaluation
   - Scoring model: S = w1·S_slope + w2·S_roughness + w3·S_elevation + w4·S_hazard
   - Terrain analysis: slope, elevation, roughness, hazard identification
   - Candidate ranking with explanation of methodology
   - Exportable results CSV

5. **04 — Discovery Engine** — Planetary data analysis
   - CSV upload and preview (max 10,000 rows)
   - Statistical summaries: mean, median, std dev, variance, IQR
   - Z-score outlier detection: z = (x - μ) / σ
   - Correlation analysis, cross-instrument comparison
   - Interactive charts (histograms, box plots, scatter plots)

6. **05 — Tonight's Sky** — Astronomical observation tool
   - City selection with latitude/longitude input
   - Date/time selection, play dynamic sky simulation
   - Planet visibility calculations, rise/set times
   - Altitude/azimuth, Moon phase, ecliptic plane
   - Hindi/English language support

7. **06 — Marswalk Planner** — Mars mission planning
   - Jezero Crater terrain visualization (MOLA shaded relief)
   - Waypoint system with route planning
   - Haversine distance calculation, oxygen consumption
   - Walk-back rule feasibility, daylight constraints
   - Safety assessment: Go / No-Go

### Shared Design Language

- **Color palette:** Near-black (#080B10) background, technical cyan accents (#54D6E8)
- **Typography:** Space Grotesk (headings), Inter (UI), IBM Plex Mono (technical)
- **Iconography:** Consistent Lucide SVG icons, 1.5-2px stroke width
- **Layout:** 12-column grid, max-width 64rem, minimal 0.25rem card radius
- **Responsive:** Mobile-first, hamburger menu, stacked layout under 640px
- **Accessibility:** Focus-visible styles, ARIA labels, reduced motion support

## Technologies

- **HTML5** — Semantic markup structure
- **CSS3** — Custom properties, dark theme, responsive design
- **JavaScript ES Modules** — Modular, maintainable code
- **Three.js** — 3D planetary visualization (Orrery, Marswalk)
- **Chart.js / Canvas API** — Scientific graphs and charts
- **Leaflet** — Mapping (where appropriate)

## Scientific Methodology

All instruments implement documented mathematical formulations:

- **Kepler's Laws:** First (elliptical orbits with Sun at focus), Second (equal areas in equal times), Third (T² ∝ a³)
- **Kepler's Equation:** M = E - e·sin(E), solved via Newton-Raphson iteration
- **True Anomaly:** Calculated from eccentric anomaly using tangent half-angle formula
- **Coordinate Transformations:** Equatorial to horizontal (altitude/azimuth), including
  - Julian Date calculation
  - Local Sidereal Time
  - Hour angle
- **Haversine Formula:** Distance between two coordinates on a sphere
- **Reliability Theory:** Exponential distribution R(t) = e^(-λt) for component lifetimes
- **Image Processing:** Pixel-wise difference, threshold segmentation, connected-components
- **Statistics:** Mean, median, std dev, variance, IQR, z-score, correlation analysis

All synthetic datasets are clearly labeled. No claims are made regarding NASA affiliation or certified assessments.

## Data Sources

- JPL Solar System Dynamics — orbital elements (J2000 reference)
- NASA MOLA — Mars Global Surveyor elevation data
- HiRISE imaging database
- Standard astronomical references (J2000 catalogue)
- Synthetic demonstration datasets for initial testing

## Limitations

- Simplified educational models — not flight-qualified ephemerides
- Synthetic datasets are labeled as such — not real mission observations
- Simulations are educational — not real-world operational predictions
- Landing scores are analytical models, not certified spacecraft assessments
- All values clearly labeled with assumptions and parameter ranges

## Credits

- Reference website: https://shanshantanusingh113-max.github.io/kepler-orrery/
- Three.js — 3D JavaScript library
- Lucide — icon set
- JPL Solar System Dynamics — orbital elements
- NASA — Mars elevation data (MOLA)
- Space Grotesk & Inter — typefaces (Google Fonts)

---

**WOBlISK INDUSTRIES** · **LUMINAIRE** · Scientific Computing & Planetary Data Analysis