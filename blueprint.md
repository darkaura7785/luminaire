# WOBlISK INDUSTRIES — LUMINAIRE Implementation Blueprint

## Project Overview
**Organization:** WOBlISK INDUSTRIES  
**Product:** LUMINAIRE  
**Subtitle:** Scientific Computing & Planetary Data Analysis  
**Reference:** https://shanshantanusingh113-max.github.io/kepler-orrery/  
**Goal:** Recreate the reference website's experience with distinct WOBlISK branding while preserving all seven scientific instruments and their full functionality.

---

## STEP 1: Visual System & Design Language

### 1.1 Color Palette (from reference + WOBlISK adaptation)
| Role | Reference | WOBlISK Adaptation |
|------|-----------|-------------------|
| Primary background | Near-black | #080B10 |
| Secondary background | Deep charcoal | #0D121A |
| Card background | Dark surface | #111923 |
| Border | #25313D | #2A3848 |
| Primary accent | Cyan/aqua | #54D6E8 |
| Secondary accent | Muted cyan | #8A9AAA |
| Warning | Yellow-orange | #E7AD54 |
| Error | Red | #E16C73 |
| Success | Green | #65C99A |
| Primary text | White/light | #E8EDF2 |
| Secondary text | Muted | #8998A7 |

### 1.2 Typography
- **Display/Headings:** Space Grotesk — large-scale, technical, uppercase for section labels
- **Interface text:** Inter — UI body, labels, metadata
- **Technical/scientific:** IBM Plex Mono — orbital elements, coordinates, measurements
- **Scale:** Heading scale 2xl→xl→lg→base→sm→xs; body base 1rem (16px); mono 0.875rem

### 1.3 Iconography (Lucide SVG — consistent stroke width 1.5-2px)
| Instrument | Icon | Meaning |
|------------|------|---------|
| 00 Kepler Orrery | `corner-up-left` | Orbit / solar system |
| 05 Tonight's Sky | `star` | Telescope / sky observation |
| 06 Marswalk Planner | `map` | Route / terrain |
| 01 Anomaly Hunter | `scan-search` | Scan / defect detection |
| 02 Mission Survival | `shield-check` | Shield / reliability |
| 03 Landing Sites | `map-pin` | Landing / coordinates |
| 04 Discovery Engine | `microscope` | Analysis / data |

### 1.4 Layout Grid
- 12-column grid for instrument cards
- 8-column grid for homepage hero/sections
- Consistent gutter: 1rem (16px)
- Maximum content width: 64rem (1024px)
- Card radius: 0.25rem (minimal, technical)

### 1.5 Global Design Rules
- Near-black (#080B10) full-page background
- No excessive gradients → subtle dark-blue undertones only
- Minimal rounded cards → 0.25rem max
- No glassmorphism
- Cyan highlights (#54D6E8) restrained for active states
- Technical tooltips with dark background
- Thin borders (1px, #2A3848)
- Consistent spacing: 0.5rem, 1rem, 1.5rem, 2rem

---

## STEP 2: Navigation System

### 2.1 Persistent Top Navigation
```
[WOBlISK LOGO] LUMINAIRE  |  INSTRUMENT #  |  CURRENT INSTRUMENT INDICATOR  |  HOME  |  ABOUT
```
- Brand: "WOBlISK INDUSTRIES" + "LUMINAIRE" on separate lines or stacked
- Instrument directory: Compact pills showing #00–#04 range with current highlighted
- Current instrument: Prominent indicator (e.g., "01 — ANOMALY HUNTER" in breadcrumb trail)

### 2.2 Breadcrumb Navigation
- Always shows: Home → Current Instrument
- Example: Home → 04 — DISCOVERY ENGINE

### 2.3 Mobile Navigation (max-width 640px)
- Hamburger menu → slide-over panel
- Same instrument directory + Home + About
- Full-width instrument cards stacked vertically

### 2.4 Navigation Persistence
- Active instrument highlighted throughout page
- Breadcrumb updates on instrument switch
- "Open instrument" panel slides in from left on mobile

---

## STEP 3: Project Architecture

```
luminaire/
├── index.html              # Homepage / Scientific Laboratory Dashboard
├── about.html              # Methodology / Scientific Models
├── instruments/
│   ├── orrery.html         # Kepler Orrery (00)
│   ├── sky.html            # Tonight's Sky (05)
│   ├── marswalk.html       # Marswalk Planner (06)
│   ├── anomaly.html        # Anomaly Hunter (01)
│   ├── mission.html        # Mission Survival (02)
│   ├── landing.html        # Landing Sites (03)
│   └── discovery.html      # Discovery Engine (04)
├── assets/
│   ├── images/
│   ├── icons/              # Lucide SVG set
│   └── data/               # Sample orbital/CSV data
├── css/
│   ├── global.css          # Variables, base reset, dark theme
│   ├── components.css      # Buttons, inputs, cards, modals
│   ├── animations.css      # Keyframes, transitions
│   └── instruments.css     # Instrument-specific layouts
├── js/
│   ├── main.js             # App initialization, nav routing
│   ├── navigation.js       # Persistent nav, breadcrumb, instrument switching
│   ├── data/               # Orbital data, sample CSV files
│   ├── core/               # Three.js setup, coordinate math, utils
│   ├── components/         # Reusable UI components
│   └── instruments/
│       ├── orrery.js       # 3D solar system, orbital calculations
│       ├── sky.js          # Sky visibility, coordinate transforms
│       ├── marswalk.js     # Jezero terrain, route planning
│       ├── anomaly.js      # Image processing, difference analysis
│       ├── mission.js      # Monte Carlo rover simulation
│       ├── landing.js      # Terrain scoring, multi-criteria ranking
│       └── discovery.js    # CSV analysis, statistics, charts
└── README.md
```

### GitHub Pages Subpath Compatibility
- All asset paths use relative paths (not /css/...)
- Index.html serves as root; sub-pages use relative links
- Base tag in head for subpath support if needed: `<base href="/luminaire/">>`
- Test: `npm run test:paths` or manual verification

---

## STEP 4: Design System Implementation

### 4.1 CSS Variables (global.css)
```css
:root {
  --bg-primary: #080B10;
  --bg-secondary: #0D121A;
  --bg-card: #111923;
  --border: #2A3848;
  --accent-primary: #54D6E8;
  --accent-secondary: #8A9AAA;
  --warning: #E7AD54;
  --error: #E16C73;
  --success: #65C99A;
  --text-primary: #E8EDF2;
  --text-secondary: #8998A7;
  --font-display: "Space Grotesk", system-ui, sans-serif;
  --font-inter: "Inter", system-ui, sans-serif;
  --font-mono: "IBM Plex Mono", monospace;
}
```

### 4.2 Base Styles
- `*, *::before, *::after { box-sizing: border-box; }`
- `body { margin: 0; font-family: var(--font-inter); background: var(--bg-primary); color: var(--text-primary); }`
- Reduced motion support: `@media (prefers-reduced-motion: reduce) { * { transition: none !important; } }`
- Focus visible styles for keyboard accessibility

### 4.3 Component Library
- **Button:** Primary (accent), secondary (border), danger (error), small (mono label)
- **Card:** Card with minimal border, header + content + footer structure
- **Input:** Styled text inputs, number inputs for scientific values
- **Select:** Custom dropdown for instrument selection, city lists
- **Tooltip:** Dark background with light text, auto-dismiss
- **Modal:** Centered, scientific parameter editor

### 4.4 Loading States
- Spinner with thin stroke (2px) in accent color
- Skeleton cards with same bg-primary stripe pattern
- Progress bar for file uploads

### 4.5 Empty States
- Illustrated empty state (technical line art)
- Message: "No data uploaded" / "No anomalies detected"
- CTA: "Upload CSV" / "Begin analysis"

### 4.6 Error Messages
- Inline: Red text, small size
- Modal: Full error with dismiss
- Toast: Transient error notification

---

## STEP 5: Homepage & Solar System Overview

### 5.1 Header
```
WOBlISK INDUSTRIES
LUMINAIRE
SCIENTIFIC COMPUTING & PLANETARY DATA ANALYSIS
```
- Instrument pills: #00 through #04 (clickable)
- System status indicator (green dot = all instruments operational)

### 5.2 Hero Section
- **Main heading:** EXPLORING THE MECHANICS OF OUR UNIVERSE
- **Supporting text:** "An interactive scientific computing environment for planetary exploration, orbital mechanics, image analysis, mission simulation, and astronomical data interpretation."
- **CTA Buttons:** "Open Orrery" → navigate to orrery.html, "View All Instruments" → grid

### 5.3 Interactive Solar System Visualization
- **3D scene:** Three.js with PerspectiveCamera
- **Celestial bodies:**
  - Sun (yellow-orange, enlarged for visibility)
  - Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune
- **Orbital paths:** Elliptical trajectories in accent color
- **Planet selection:** Click → info panel opens
- **Controls:**
  - Orbit camera around Sun
  - Zoom scroll / pinch
  - Speed control slider (0.5× → 60×)
  - Play/pause toggle
  - Reset to initial positions

### 5.4 Solar System Data (JPL elements)
| Planet | Semi-major axis (AU) | Orbital period (days) | Eccentricity | Inclination |
|--------|----------------------|----------------------|--------------|-------------|
| Mercury | 0.387 | 88.0 | 0.206 | 7.00° |
| Venus | 0.723 | 224.7 | 0.007 | 3.40° |
| Earth | 1.000 | 365.2 | 0.017 | 0.00° |
| Mars | 1.524 | 687.0 | 0.093 | 1.85° |
| Jupiter | 5.203 | 4333.0 | 0.049 | 1.30° |
| Saturn | 9.537 | 10759.0 | 0.056 | 2.49° |
| Uranus | 19.191 | 30687.0 | 0.046 | 0.77° |
| Neptune | 30.070 | 60190.0 | 0.010 | 1.77° |

### 5.5 Planet Information Panel (on click)
- Name
- Mean orbital distance (AU)
- Orbital period (days)
- Orbital eccentricity
- Orbital inclination (°)
- Current simulated position (°)
- Current distance from Sun (AU)

### 5.6 Time Controls
- **Speed slider:** 0.5× → 60× (logarithmic scale)
- **Play/pause:** Animated orbital movement
- **Reset:** Return to t=0 positions
- **Time display:** Elapsed simulation time

---

## STEP 6: Kepler Orrery (Instrument 00)

### 6.1 Page Structure
- Header with persistent navigation + "00 — KEPLER ORRERY" indicator
- Main content split:
  - Left: 3D Three.js canvas (solar system)
  - Right: Live state panel + Kepler's equation panel + Orbit parameters + Kepler III + Areal velocity + Rotation + Motion events

### 6.2 3D Visualization (Three.js)
- **Scene:** `new THREE.Scene()` with `new THREE.WebGLRenderer({ antialias: true })`
- **Camera:** `new THREE.PerspectiveCamera(60, width/height, 0.1, 1000)`
- **Lighting:** Ambient + directional light (Sun simulation)
- **Sun:** Large yellow sphere at origin
- **Planets:** 8 planets as spheres at correct relative distances
- **Orbital paths:** `THREE.BufferGeometry` with ellipse curve points

### 6.3 Orbital Calculation Pipeline
1. **Initialize from JPL elements** (semi-major axis a, eccentricity e, inclination i)
2. **Mean anomaly M:** `M = n × (t - t_peri)` where n = mean motion = 2π/T
3. **Solve Kepler's equation** M = E - e·sin(E) using Newton-Raphson:
   - Initial guess: E₀ = M
   - Iteration: Eₙ₊₁ = Eₙ - (Eₙ - e·sin(Eₙ) - M) / (1 - e·cos(Eₙ))
   - Convergence: |residual| < 10⁻⁶ (max 10 iterations)
4. **True anomaly ν:** 
   - cos(ν) = (cos(E) - e) / (1 - e·cos(E))
   - sin(ν) = √(1-e²) · sin(E) / (1 - e·cos(E))
5. **Orbital position** in orbital plane:
   - x' = a · (cos(E) - e)
   - y' = a · √(1-e²) · sin(E)
6. **Rotate by inclination:**
   - Apply rotation matrices for orbital plane tilt
7. **Heliocentric coordinates:** (x, y, z)

### 6.4 Live State Panel (right side)
```
Distance from Sun: 1.00 AU
Orbital speed: 29.78 km/s
Radial velocity: +0.12 km/s
Heliocentric x: 0.00 AU
Heliocentric y: 1.00 AU
Heliocentric z: 0.00 AU
Distance from Earth: 0.00 AU
Light travel time: 8.3 min
Geocentric longitude: 0.00°
```

### 6.5 Kepler's Equation Section
```
M = E − e·sin E
Mean anomaly M: [input] rad
Eccentricity e: [display] 0.017
Eccentric anomaly E: [computed] rad
True anomaly ν: [computed] °
Newton iterations: [count]
Residual: [10⁻⁷]
```

### 6.6 Orbit Parameters
```
Semi-major axis a: 1.00 AU
Eccentricity e: 0.017
Inclination i: 0.00°
Perihelion q: 0.983 AU
Aphelion Q: 1.017 AU
Sidereal period: 365.25 days
Next perihelion: [date]
```

### 6.7 Kepler III Verification
```
a³ / T² = 1.00³ / 365.25² ≈ 7.50 × 10⁻⁶
```
- Display: "Kepler's Third Law verified: T² ∝ a³"

### 6.8 Areal Velocity Visualization
- Shaded wedge from Sun to planet
- Area swept in 1/12 period
- Wider near perihelion, narrower near aphelion
- Annotation: "Kepler's Second Law — equal areas in equal times"

### 6.9 Motion Events Detection
- **Perihelion:** Closest approach to Sun (q)
- **Aphelion:** Farthest distance from Sun (Q)
- **Retrograde stations:** When apparent motion reverses direction
- Detection: Track planet position over time; flag when:
  - r(t) reaches minimum (perihelion)
  - r(t) reaches maximum (aphelion)
  - Heliocentric longitude changes direction (retrograde)

### 6.10 Controls
- Speed slider (0.5× → 60×, logarithmic)
- Play/pause button
- Labels toggle: "True distances" / "Distances compressed as r0.6" / "Sizes enlarged"
- Planet selection panel

### 6.11 Sample Data Verification
- Earth: Known values within educational tolerance
- Mars: Period ~687 days, e ~0.093
- Results labeled: "Sample orbital elements from JPL/SD"

---

## STEP 7: Tonight's Sky (Instrument 05)

### 7.1 Page Structure
- Header + "05 — TONIGHT'S SKY" indicator
- Three main sections:
  - City selector + date/time controls
  - Sky visualization (dark/light toggle)
  - Sidebar with observation logs + methodology

### 7.2 City Selector
- Dropdown with major cities (London, New York, Tokyo, etc.)
- "📍 Use my location" (browser geolocation)
- Latitude/longitude manual input fields

### 7.3 Date & Time Controls
- Date picker: "Tonight," "Tomorrow," "+7 days"
- Time selector: Hour/minute dropdown or slider
- "Play the night — Now" button initiates dynamic simulation

### 7.4 Sky Visualization
- **Canvas/HTML projection:** Observer facing south
- **Ecliptic:** Dashed line marking Sun/Moon/planet path
- **Stars:** Fixed points (J2000 catalogue)
- **Planets:** Dots with hover tooltips naming them
- **Moon:** Phase visualization with illumination fraction

### 7.5 Coordinate Transformations (from reference)
1. **Julian Date:** `JD = ...` calculation from Gregorian date
2. **Local Sidereal Time:** `LST = GST + longitude` 
3. **Equatorial to Horizontal:**
   - Hour angle: `H = LST - RA`
   - Altitude: `sin(h) = sin(φ)sin(δ) + cos(φ)cos(δ)cos(H)`
   - Azimuth: computed from altitude and quadrant
4. **Right Ascension & Declination:** From JPL equatorial elements

### 7.6 Planet Visibility Calculations
- Compute altitude/azimuth for each planet
- Determine rise/set times (altitude = 0)
- Display: "Jupiter rises at 22:14, sets at 07:31"

### 7.7 Moon Phase
- Illumination fraction from lunar phase angle
- Phase name: New/Waxing Crescent/First Quarter/Waxing Gibbous/Full/Waning Gibbous/Last Quarter/Waning Crescent
- Display: Crescent shape + illumination %

### 7.8 Observation Logs
```
Through the night:
20:00 - Venus visible, altitude 12°, azimuth 245°
21:00 - Jupiter visible, altitude 34°, azimuth 182°
22:00 - Moon visible, altitude 45°, phase: Waxing Gibbous (73%)
23:00 - Saturn visible, altitude 8°, azimuth 310°
00:00 - Mars not visible (below horizon)
```

### 7.9 Hindi/English Interface Support
- Toggle switch: "Hindi / English"
- Key labels translated:
  - South → दक्षिण (Dakshin)
  - East → पूर्व (Purva)
  - West → पश्चिम (Paschim)
  - Altitude → ऊँचाई (Uñchāi)
  - Azimuth → पक्ष (Pakṣa)

### 7.10 Sky Filters
- Bright stars toggle
- Ecliptic toggle (dashed line)
- Height grid toggle

### 7.11 Sample Data
- Labeled: "Sample sky data — synthetic for demonstration"
- Known city: "Sample: Mauna Kea Observatory, Hawaii"

---

## STEP 8: Marswalk Planner (Instrument 06)

### 8.1 Page Structure
- Header + "06 — MARSWALK PLANNER" indicator
- Three-column layout or tabbed interface:
  - Map view (Jezero Crater western floor, 8×8 km)
  - Waypoint table + mission parameters
  - Safety assessment + Go/no-go

### 8.2 Map Interface
- **Base layer:** Shaded relief from NASA MOLA (simulated grayscale terrain)
- **Data layers:** Toggleable:
  - Orbital elevation (shaded relief)
  - Geology (mineral composition annotations)
  - Safety hazards (steep slopes, radio shadows)
  - Rock cover (science value annotations)
- **Interaction:**
  - Click map to add stop/waypoint
  - Snap to predefined science targets
  - Drag waypoints to adjust position

### 8.3 Waypoint System
- **Add stop:** Click map → waypoint auto-numbers
- **Table tracks:** Arrive / Walk / What to do there for each segment
- **Pre-defined targets:** Jezero Crater rim, sedimentary outcrop, carbonate deposit, etc.
- **Management:** Undo, clear all, return to base camp

### 8.4 Mission Parameters
```
Life Support:
• Usable suit oxygen: [display] bar value
• Oxygen held in reserve: [display] fixed value
• Remaining after EVA: [calculated]

Survival Logic:
• Walk-back rule: remaining oxygen + time ≥ direct return requirement
• Go / no-go assessment based on real-time conditions

Environmental Factors:
• Local solar time: [display]
• Sunrise/sunset: [display]
• Daylight availability: [yes/no]

Crew Capabilities:
• Walking pace: [default 1.5 km/h, adjustable]
• Maximum traversable slope: [default 15°, adjustable]
```

### 8.5 Distance & Travel Time
- **Haversine formula** for initial great-circle distance
- **Terrain-adjusted distance:** Multiply by slope penalty factor
- **Travel time:** `t = d / v` where v = assumed walking speed
- **Oxygen consumption:** `O_remaining = O_initial - (r × t)` where r = consumption rate

### 8.6 Safety Constraints
- **Oxygen check:** `remaining ≥ reserve_required`
- **Slope check:** All waypoints within max traversable slope
- **Daylight check:** No waypoint in darkness without artificial light
- **Return feasibility:** Can direct path return to base within oxygen limits

### 8.7 Go / No-Go Assessment
- Visual indicator: Green "Go" or Red "No-Go"
- Tooltip explains limiting factor(s)
- Example: "Limited by: oxygen reserve (23 min remaining)"

### 8.8 Terrain Elevation Profile
- Cross-section chart along planned route
- Elevation gain/loss display
- Steepest slope segment highlighted

### 8.9 Sample Data
- Jezero Crater region (documented NASA reference)
- Pre-placed science targets with known coordinates
- Labeled: "Sample terrain data — MOLA elevation model"

---

## STEP 9: Anomaly Hunter (Instrument 01)

### 9.1 Page Structure
- Header + "01 — ANOMALY HUNTER" indicator
- Two-panel layout: Left image upload + Right comparison

### 9.2 Image Processing Pipeline
1. **Upload first image** (planetary image, .png/.jpg/.jpeg)
2. **Upload second image** (same area, different time/orbit)
3. **Image preview** thumbnails display
4. **Before-and-after comparison** slider or toggle
5. **Image alignment** (registration)
6. **Difference calculation**
7. **Anomaly highlighting**
8. **Threshold adjustment**
9. **Detected region count**
10. **Export analysis results**

### 9.3 Technical Implementation
```javascript
// Difference calculation
D(x,y) = |I1(x,y) - I2(x,y)|

// Anomaly mask
Anomaly(x,y) = 1 if D(x,y) > τ
Anomaly(x,y) = 0 otherwise

// Threshold τ: user-configurable, default based on image statistics
// Connected-component analysis
// Count: number of distinct anomaly regions

// Noise reduction
// Morphological operations (opening/closing)

// Confidence score
// Based on pixel count above threshold / total pixels
```

### 9.4 Image Processing Details
- **Grayscale conversion:** `0.299R + 0.587G + 0.114B`
- **Image normalization:** Scale to 0-1 range
- **Registration:** Phase correlation or feature-based alignment
- **Pixel-wise difference:** Absolute value per channel
- **Threshold segmentation:** Above τ → anomaly
- **Connected-component labeling:** Find distinct regions
- **Morphological operations:**
  - Opening: remove small noise
  - Closing: fill small holes

### 9.5 User Interface
- **Original image:** Left panel, with info panel
- **Comparison image:** Middle, side-by-side
- **Difference map:** Right, false-color visualization
- **Highlighted anomalies:** Overlay on original (semi-transparent red)
- **Threshold slider:** 0-255 (or 0-1 as decimal)
- **Region count:** "3 anomalies detected"
- **Confidence score:** "47% match across 214 anomaly pixels"

### 9.6 Export Functionality
- **Downloadable report:** JSON with:
  - Threshold used
  - Anomaly pixel count
  - Region coordinates
  - Original image metadata
  - Difference statistics
- **Export images:** PNG of annotated original + difference map

### 9.7 Sample Data
- **Synthetic demonstration images** for initial testing
- **Labeled clearly:** "Sample data is synthetic and labeled as such"
- Two uploaded planetary images with planted anomalies
- Known truth: "Anomaly planted at coordinates (124, 88) with τ=30"

### 9.8 Never Present Synthetic as Verified
- All detections labeled: "Synthetic detection — not a verified scientific discovery"
- Confidence scores shown with appropriate caveats

---

## STEP 10: Mission Survival (Instrument 02)

### 10.1 Page Structure
- Header + "02 — MISSION SURVIVAL" indicator
- Configuration panel + simulation control + results visualization

### 10.2 Rover Configuration
```
Rover Parameters:
• Battery capacity: [Wh] — user adjustable
• Power consumption: [W] — average draw
• Thermal protection rating: [Kelvin threshold]
• Communication reliability: [0.9-1.0]
• Dust accumulation rate: [0.01-0.1 / sol]
• Mechanical wear: [0.001-0.01 / sol]
```

### 10.3 Environmental Variables (per sol)
```
• Temperature: [°C range] — stochastic per mission
• Dust intensity: [optical depth] — stochastic per mission
• Power consumption: [W] — varies with activity
• Communication interruptions: [stochastic based on reliability]
• Mechanical failures: [stochastic based on wear]
```

### 10.4 Monte Carlo Simulation
- **Run N simulations** (user selects: 100/500/1000/5000)
- **Random seed:** Optional user input for reproducibility
- **Per-simulation tracking:**
  - Mission duration (sols)
  - Survival status: survived / failed
  - Failure cause: battery depletion / thermal failure / comms loss / mechanical
  - Cumulative damage

### 10.5 Failure Models
```
Exponential reliability: R(t) = e^(-λt)
• Battery degradation rate λ_batt
• Thermal failure rate λ_thermal  
• Comms failure rate λ_comms
• Mechanical wear rate λ_mech
```

### 10.6 Results Visualization
- **Survival percentage:** Bar chart across parameter sets
- **Average operational duration:** Distribution plot
- **Failure distribution:** Pie chart of most common causes
- **Parameter comparison:** Side-by-side rover config results
- **Monte Carlo details:** Table of individual run outcomes

### 10.7 Parameter Modification
- Sliders for each rover config parameter
- "Compare configurations" toggle
- Two rovers side-by-side bar chart

### 10.8 Sample Data
- Reference rover configurations with documented parameters
- Labeled: "Sample simulation parameters — educational purposes"

---

## STEP 11: Landing Sites (Instrument 03)

### 11.1 Page Structure
- Header + "03 — LANDING SITES" indicator
- Multi-criteria scoring model display + terrain analysis + candidate ranking

### 11.2 Scoring Model
```
S = w1·S_slope + w2·S_roughness + w3·S_elevation + w4·S_hazard
```
- **Lower hazard scores contribute positively** (inverted normalization)
- **Weights:** User-adjustable, default w1=w2=w3=w4=0.25
- **Display each component score** 0-100 with explanation

### 11.3 Terrain Analysis
- **DEM data:** Simulated or uploaded Digital Elevation Model
- **Slope calculation:** `arctan(√(p² + q²))` where p,q = elevation gradients
- **Elevation variation:** Min/max/mean along candidate area
- **Surface roughness:** Standard deviation of elevation within window
- **Hazard identification:** Slope > threshold, boulder detection

### 11.4 Candidate Ranking
- Table with columns:
  - Candidate name/location
  - S_slope (0-100, lower=better)
  - S_roughness (0-100, lower=better)  
  - S_elevation (0-100, optimal range)
  - S_hazard (0-100, lower=better)
  - **Total S** (weighted sum)
  - Risk indicators (color-coded)

### 11.5 Comparative Analysis
- Two-candidate side-by-side comparison
- "Why Candidate A scores higher than B"
- Export ranking data

### 11.6 Scientific Analysis Display
- **Terrain map:** Color-coded elevation (green low, brown high)
- **Slope map:** Red = steep, green = gentle
- **Profile tool:** Click-drag for elevation profile
- **Explanation of ranking methodology** below the table

### 11.7 Data Export
- CSV download of full ranking with all scores
- JSON with scoring model parameters
- Terrain map PNG export

### 11.8 Sample Data
- Simulated landing site dataset with 8-12 candidates
- Documented scoring weights and normalization
- Labeled: "Sample terrain data — synthetic for demonstration"

---

## STEP 12: Discovery Engine (Instrument 04)

### 12.1 Page Structure
- Header + "04 — DISCOVERY ENGINE" indicator
- Three-tab interface: CSV upload + Statistical analysis + Anomaly detection + Cross-instrument comparison

### 12.2 CSV Upload & Data Preview
- **File accept:** `.csv` only
- **Max rows:** 10,000 (client-side preview)
- **Column auto-detection:** Numeric, categorical, date/time
- **Sample data:** Built-in CSV with known columns for immediate exploration

### 12.3 Statistical Summaries
```
Central Tendency:
• Mean: μ = (Σx) / n
• Median: middle value of sorted observations

 dispersion:
• Standard deviation: σ = √(Σ(x-μ)² / n)
• Variance: σ²
• Interquartile range: Q3 - Q1

Distribution:
• Range: max - min
• Midrange: (max + min) / 2
```

### 12.4 Z-Score & Outlier Detection
```
z = (x - μ) / σ
```
- Display each observation's z-score
- Configure threshold: |z| > 2 (typical) or |z| > 3 (strict)
- Outlier count: "3 observations with |z| > 2"

### 12.5 Correlation Analysis
- **Pearson r:** `r = Σ((x-μ_x)(y-μ_y)) / (n·σ_x·σ_y)`
- **Display correlation matrix** for all numeric columns
- **Scatter plot matrix** (pairplot)
- **Confidence interval** for r

### 12.6 Anomaly Detection
- **Z-score based:** |z| > threshold
- **IQR-based:** Below Q1 - 1.5·IQR or Above Q3 + 1.5·IQR
- **Configurable threshold** per column
- **Anomaly table:** Row index, value, z-score, detection method

### 12.7 Cross-Instrument Comparison
- When multiple CSV datasets uploaded
- **Agreement test:** Do independent observations agree within tolerances?
- **Display:** Correlation + bias + agreement plot
- **Pass/fail:** "Observations agree within 5% tolerance"

### 12.8 Interactive Charts
- **Distribution plots:** Histogram + KDE for each numeric column
- **Box plots:** Per column, show median, IQR, outliers
- **Scatter plots:** Pairwise relationships with regression line
- **Time series:** If date column present

### 12.9 Data Cleaning
- **Missing value handling:** Remove / median impute / mean impute
- **Outlier treatment:** Filter / Winsorize / clip
- **Applied transformations:** Log, sqrt, Box-Cox

### 12.10 Exportable Analysis
- **Download report:** JSON/PDF with:
  - All statistical calculations
  - Chart images (embedded)
  - Data provenance
  - Methodology notes
- **Export cleaned data:** CSV of processed dataset

### 12.11 Sample Data
- Built-in CSV with 50+ rows, 8 columns (mixed types)
- Known statistical properties (mean, std dev known to user)
- Labeled: "Sample data — synthetic for testing"

---

## STEP 13: About / Methodology

### 13.1 Page Structure
- Header + "About LUMINAIRE" indicator
- Scientific methodology sections for each instrument

### 13.2 Methodology Sections
Each instrument gets a dedicated methodology subsection explaining:
- **Scientific models used**
- **Mathematical formulations**
- **Data sources and references**
- **Assumptions and limitations**
- **Educational vs. high-precision disclaimer**

### 13.3 Global Scientific Principles
- **Kepler's Laws** (from Orrery)
- **Coordinate transformations** (from Sky)
- **Haversine formula** (from Marswalk)
- **Reliability theory** (from Mission Survival)
- **Multi-criteria scoring** (from Landing Sites)
- **Image processing pipeline** (from Anomaly Hunter)
- **Statistical methods** (from Discovery Engine)

### 13.4 Data Sources
- JPL Solar System Dynamics (orbital elements)
- NASA MOLA (Mars elevation)
- HiRISE imaging
- Standard astronomical references
- All labeled with access/licensing info

### 13.5 Limitations & Disclaimers
- "Simplified educational models"
- "Synthetic datasets for demonstration"
- "Not for mission-critical planning"
- "Reference JPL elements, not flight-qualified ephemerides"

### 13.6 Credits
- Reference website inspiration
- Data source acknowledgments
- Library credits (Three.js, Chart.js, etc.)

---

## STEP 14: Global Navigation Integration

### 14.1 Persistent Header (all pages)
```
[WOBlISK] LUMINAIRE INSTRUMENT # CURRENT  ◀ HOME  •  ABOUT
```
- Instrument pill grid always visible
- Current instrument highlighted
- Click instrument pill → navigate to that page
- Home → index.html
- About → about.html

### 14.2 Breadcrumb Trail
- Home → 04 — DISCOVERY ENGINE (example)
- Updates dynamically on instrument switch

### 14.3 Mobile Navigation
- Hamburger ≡ → slide-over panel
- Full-width instrument cards
- Close button ×

### 14.4 Active State Management
- JavaScript tracks current instrument
- Updates header pill, breadcrumb, page title
- Persists across page refresh (localStorage)

---

## STEP 15: Testing & Verification

### 15.1 Checklist (from project requirements)
```
[ ] Homepage loads correctly.
[ ] Navigation works.
[ ] All seven instruments open.
[ ] No broken images.
[ ] No missing icons.
[ ] No JavaScript console errors.
[ ] No broken relative paths.
[ ] Planetary animation works.
[ ] Planet selection works.
[ ] Orbital calculations return numerical values.
[ ] Date and time calculations work.
[ ] Mars route planning works.
[ ] Image uploads work.
[ ] Difference analysis works.
[ ] Mission simulation runs.
[ ] Landing candidates can be ranked.
[ ] CSV upload works.
[ ] Charts update correctly.
[ ] Export functions work.
[ ] Mobile navigation works.
[ ] Responsive design works.
[ ] No placeholder buttons.
[ ] No fake operational statuses.
[ ] Sample data is clearly identified.
```

### 15.2 Mathematical Verification
- **Kepler's First Law:** Verify elliptical orbit equation `r = a(1-e²)/(1+e·cos ν)` matches computed positions
- **Kepler's Second Law:** Verify area swept is constant across equal time intervals
- **Kepler's Third Law:** Verify `a³/T²` constant across all planets
- **Altitude calculation:** `sin(h) = sin(φ)sin(δ) + cos(φ)cos(δ)cos(H)` — verify against known observer locations
- **Haversine distance:** Verify against known city pairs
- **Z-score:** Verify `z = (x-μ)/σ` against manually computed values
- **Monte Carlo:** Compare survival percentages against analytical reliability bounds

### 15.3 Browser Compatibility
- Chrome, Firefox, Safari, Edge (latest versions)
- Three.js WebGL2 support check
- Responsive breakpoints: 320px, 640px, 1024px, 1440px

### 15.4 GitHub Pages Deployment
- Test all relative paths under `/luminaire/` subpath
- Verify no root-relative URLs (`/css/global.css` → `./css/global.css`)
- Run `npm run build` (if using build step) or just copy files
- Deploy from `main` branch, `/root` directory
- Wait for GitHub Actions to publish

---

## STEP 16: Responsive & Compatibility

### 16.1 Breakpoints
| Width | Layout |
|-------|--------|
| 320px (phone) | Single column, hamburger menu, full-width buttons |
| 640px (small phone) | Instrument pills stack, hero text stacks |
| 1024px (tablet) | 2-column layout for data tables, sidebar collapsible |
| 1440px (desktop) | Full 3-column, complete instrument panels |

### 16.2 Touch Support
- Minimum tap target: 44×44px
- Swipe gestures for image comparison slider
- pinch-to-zoom on solar system canvas (where supported)

### 16.3 Accessibility
- `aria-label` on all interactive elements
- Color contrast: AA for normal text, AAA for large text against bg-primary
- Focus management for modals and instrument switching
- Reduced motion preference honored

### 16.4 Error Handling
- Graceful fallbacks when WebGL unavailable (2D canvas alternative)
- File upload error messages (type/size)
- Network error handling for data loading

---

## STEP 17: GitHub Pages Deployment

### 17.1 Procedure (from project requirements)
1. Create GitHub repository: `luminaire`
2. Upload complete project
3. Navigate to repository Settings → Pages
4. Under Build and deployment:
   - Source: `main` branch
   - Branch: `/ (root)`
5. Save configuration
6. Wait for GitHub Pages to build and publish
7. URL: `https://YOUR-GITHUB-USERNAME.github.io/luminaire/`

### 17.2 Subpath Verification
- All internal links: relative (not starting with `/`)
- Asset paths: `./css/global.css`, `../images/icon.svg`, not `/css/global.css`
- Base tag consideration: `<base href="/luminaire/">` if deploying to subpath
- Test by visiting actual published URL

### 17.3 Post-Deployment Verification
- Visit live URL
- Test every instrument
- Verify mathematical calculations
- Check responsive layout at browser widths
- Confirm no console errors
- Verify export/download functions

---

## STEP 18: Final Quality Assurance

### 18.1 Scientific Integrity
- All simulations labeled "educational"
- Synthetic data clearly marked
- No NASA/affiliation claims
- Disclaimers on all modeled values

### 18.2 Code Quality
- No `console.error` output
- Semantic HTML5 structure
- Modular JavaScript (ES modules)
- CSS specificity avoided (use classes, not IDs for styling)
- Comments only where non-obvious

### 18.3 Documentation
- README.md complete with all required sections
- Inline code comments for mathematical formulas
- Methodology section explains all models

### 18.4 User Experience
- No placeholder text remaining
- All buttons perform intended action
- All inputs influence actual calculations
- All charts display real calculated data
- Loading states on all async operations
- Empty states with CTA where applicable

### 18.5 Deployment Readiness
- GitHub Pages publishes successfully
- All relative paths work at subpath
- No 404s on instrument navigation
- Mobile viewport functions correctly

---