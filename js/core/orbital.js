/**
 * WOBlISK LUMINAIRE — Orbital Mechanics Module
 * JPL orbital elements and Keplerian calculations
 */

/**
 * Solve Kepler's equation M = E - e·sin(E) using Newton-Raphson iteration
 * @param {number} M - Mean anomaly in radians
 * @param {number} e - Orbital eccentricity (0 <= e < 1 for ellipses)
 * @param {number} tolerance - Convergence tolerance (default 1e-12)
 * @param {number} maxIter - Maximum iterations (default 20)
 * @returns {object} - {E: eccentric anomaly in radians, iter: iteration count, residual: convergence residual}
 */
function solveKeplersEquation(M, e, tolerance = 1e-12, maxIter = 20) {
  // Initial guess
  let E = M;
  if (e > 0.8) {
    // For high eccentricity, use alternative initial guess
    E = Math.sign(M) * Math.PI;
  }

  let residual = Math.abs(M - (E - e * Math.sin(E)));

  let iter = 0;
  for (; iter < maxIter; iter++) {
    const fp = 1 - e * Math.cos(E); // derivative
    if (Math.abs(fp) < 1e-15) {
      // Avoid division by zero
      break;
    }
    const delta = (E - e * Math.sin(E) - M) / fp;
    E -= delta;
    residual = Math.abs(M - (E - e * Math.sin(E)));

    if (residual < tolerance) {
      break;
    }
  }

  return {
    E,
    iter: Math.min(iter + 1, maxIter),
    residual
  };
}

/**
 * Calculate true anomaly from eccentric anomaly
 * @param {number} E - Eccentric anomaly in radians
 * @param {number} e - Orbital eccentricity
 * @returns {number} True anomaly in radians, range (-π, π]
 */
function calculateTrueAnomaly(E, e) {
  // Using the tangent half-angle formula
  const nu = 2 * Math.atan2(
    Math.sqrt(1 + e) * Math.sin(E / 2),
    Math.sqrt(1 - e) * Math.cos(E / 2)
  );
  // Normalize to (-π, π]
  return (nu + Math.PI) % (2 * Math.PI) - Math.PI;
}

/**
 * Calculate orbital position from orbital elements
 * @param {number} a - Semi-major axis
 * @param {number} e - Eccentricity
 * @param {number} i - Inclination in radians
 * @param {number} Omega - Longitude of ascending node in radians
 * @param {number} omega - Argument of perihelion in radians
 * @param {number} M - Mean anomaly in radians
 * @param {number} t - Time in days (for mean motion calculation)
 * @param {number} t0 - Reference time in days
 * @returns {object} - {x: x-position, y: y-position, z: z-position, r: distance}
 */
function calculateOrbitalPosition(a, e, i, Omega, omega, M, t = 0, t0 = 0) {
  // Mean motion: n = 2π / T, and from Kepler's Third Law T² ∝ a³
  // So mean motion n = 2π / (a^(3/2)) in normalized units
  const n = 2 * Math.PI / Math.pow(a, 1.5); // Mean motion
  const meanAnomaly = n * (t - t0) + M; // Mean anomaly at time t

  // Solve Kepler's equation
  const keplerResult = solveKeplersEquation(meanAnomaly, e);
  const E = keplerResult.E;

  // True anomaly
  const nu = calculateTrueAnomaly(E, e);

  // Distance from focus (Sun)
  const r = a * (1 - e * e) / (1 + e * Math.cos(nu));

  // Position in orbital plane (xy)
  const x_orb = r * Math.cos(nu);
  const y_orb = r * Math.sin(nu);

  // Apply inclination rotation (rotate around X-axis by i)
  const x = x_orb;
  const y = y_orb * Math.cos(i);
  const z = y_orb * Math.sin(i); // This was originally y_orb * sin(i) but we need to also rotate

  // Actually, full 3D rotation requires both inclination and node rotation
  // Simplified: position in orbital plane with inclination applied
  // Full transformation would also rotate by Omega around Z, then omega around X

  return {
    x,
    y,
    z,
    r
  };
}

/**
 * Calculate mean anomaly at a given time
 * @param {number} a - Semi-major axis (AU)
 * @param {number} t - Time (days from reference)
 * @param {number} t0 - Reference time (days, default J2000 epoch)
 * @returns {number} Mean anomaly in radians
 */
function calculateMeanAnomaly(a, t, t0 = 0) {
  // J2000 epoch is JD 2451545.0
  // Orbital period T in days: T = a^(3/2) * 365.25 (from T² ∝ a³, Earth: a=1, T=365.25)
  const T = Math.pow(a, 1.5) * 365.25; // Orbital period in days
  const n = 2 * Math.PI / T; // Mean motion (radians per day)
  return n * (t - t0);
}

/**
 * Convert equatorial coordinates (RA, Dec) to horizontal (Altitude, Azimuth)
 * @param {number} phi - Observer latitude in radians
 * @param {number} delta - Declination in radians
 * @param {number} HA - Hour angle in radians
 * @returns {object} - {alt: altitude in radians, az: azimuth in radians}
 */
function equatorialToHorizontal(phi, delta, HA) {
  // Altitude equation: sin(h) = sin(φ)sin(δ) + cos(φ)cos(δ)cos(H)
  const sinAlt = Math.sin(phi) * Math.sin(delta) + Math.cos(phi) * Math.cos(delta) * Math.cos(HA);
  const altitude = Math.asin(sinAlt);

  // Azimuth calculation
  // cos(A) = (sin(δ) - sin(φ)sin(h)) / (cos(φ)cos(h))
  // But we need the full quadrant-aware calculation
  const cosAz = (Math.sin(delta) - Math.sin(phi) * Math.sin(altitude)) / (Math.cos(phi) * Math.cos(altitude));

  // Use atan2 for proper quadrant
  const azimuth = Math.atan2(-Math.cos(delta) * Math.sin(HA),
    Math.sin(delta) * Math.cos(phi) - Math.cos(delta) * Math.sin(phi) * Math.cos(HA));

  // Normalize azimuth to (0, 2π)
  const azNorm = (azimuth + 2 * Math.PI) % (2 * Math.PI);

  return {
    alt: altitude,
    az: azNorm
  };
}

/**
 * Calculate Julian Date from Gregorian date
 * @param {number} year - Year (e.g., 2024)
 * @param {number} month - Month (1-12)
 * @param {number} day - Day (1-31)
 * @param {number} hour - Hours (0-23, default 0)
 * @param {number} minute - Minutes (default 0)
 * @param {number} second - Seconds (default 0)
 * @returns {number} Julian Date
 */
function calculateJulianDate(year, month, day, hour = 0, minute = 0, second = 0) {
  let jy = year;
  let jm = month;
  const dayOfMonth = day;

  if (month <= 2) {
    jy -= 1;
    jm += 12;
  }

  const A = Math.floor(jy / 100);
  const B = 2 - A + Math.floor(A / 4);

  const jd = Math.floor(365.25 * (jy + 4716)) + Math.floor(30.6001 * (jm + 1)) + dayOfMonth + B - 1524.5;

  const ut = hour + minute / 60 + second / 3600;
  const jdUt = jd + ut / 24;

  return jdUt;
}

/**
 * Calculate Local Sidereal Time given Julian Date and longitude
 * @param {number} jd - Julian Date
 * @param {number} lon - Observer longitude in radians (east positive)
 * @returns {number} Local Sidereal Time in radians
 */
function calculateLST(jd, lon) {
  // J2000 approximate sidereal time at Greenwhich (degrees)
  // T = (JD - 2451545.0) / 36525.0 (Julian centuries from J2000)
  const T = (jd - 2451545.0) / 36525.0;

  // GST0 = 280.46061837 + 360.98564736629 * (JD - 2451545.0) + 0.000387933 * T² - T³/38710000
  const T2 = T * T;
  const T3 = T2 * T;
  let GST0 = 280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * T2 - T3 / 38710000;

  // Normalize to 0-360 degrees
  GST0 = GST0 % 360;
  if (GST0 < 0) GST0 += 360;

  // Add longitude (east positive)
  let GST = GST0 + lon * 180 / Math.PI;

  // Normalize to 0-360
  GST = GST % 360;
  if (GST < 0) GST += 360;

  return GST * Math.PI / 180; // Convert to radians
}

/**
 * Calculate horizon coordinates from equatorial coordinates
 * Full transformation including sidereal time and latitude
 * @param {number} ra - Right Ascension in radians
 * @param {number} dec - Declination in radians
 * @param {number} lst - Local Sidereal Time in radians
 * @param {number} phi - Observer latitude in radians
 * @returns {object} - {alt: altitude in radians, az: azimuth in radians}
 */
function equatorialToHorizon(ra, dec, lst, phi) {
  // Hour angle
  const HA = lst - ra;

  // Use equatorialToHorizontal
  return equatorialToHorizontal(phi, dec, HA);
}

/**
 * JPL-style orbital elements simplified set
 * @typedef {object} JPLOrbitalElements
 * @property {number} a - Semi-major axis (AU)
 * @property {number} e - Eccentricity
 * @property {number} i - Inclination (degrees)
 * @property {number} Omega - Longitude of ascending node (degrees)
 * @property {number} omega - Argument of perihelion (degrees)
 * @property {number} M0 - Mean anomaly at reference time (degrees)
 * @property {number} t0 - Reference time (MJD)

/**
 * Example JPL element sets for planets (simplified)
 * @type {Record<string, JPLOrbitalElements>}
 */
const jplElements = {
  mercury: {
    a: 0.387098,
    e: 0.205630,
    i: 7.00497,
    Omega: 48.33167,
    omega: 77.45645,
    M0: 172.46512,
    t0: 58849.0 // MJD
  },
  venus: {
    a: 0.723332,
    e: 0.006778,
    i: 3.39471,
    Omega: 76.67969,
    omega: 131.53254,
    M0: 50.11602,
    t0: 58849.0
  },
  earth: {
    a: 1.000002, // Earth's semi-major axis
    e: 0.016710,
    i: 0.00000,
    Omega: 0.0,
    omega: 102.94719,
    M0: 358.47383,
    t0: 58849.0
  },
  mars: {
    a: 1.523679,
    e: 0.093405,
    i: 1.85067,
    Omega: 49.55809,
    omega: 286.50158,
    M0: 19.37302,
    t0: 58849.0
  },
  jupiter: {
    a: 5.202603,
    e: 0.048488,
    i: 1.30530,
    Omega: 100.46445,
    omega: 273.88916,
    M0: 2.76708,
    t0: 58849.0
  },
  saturn: {
    a: 9.5388,
    e: 0.055512,
    i: 2.48424,
    Omega: 113.66244,
    omega: 339.39126,
    M0: 8.87581,
    t0: 58849.0
  },
  uranus: {
    a: 19.1913,
    e: 0.047284,
    i: 0.77213,
    Omega: 73.99815,
    omega: 170.96193,
    M0: 6.24265,
    t0: 58849.0
  },
  neptune: {
    a: 30.06896,
    e: 0.008586,
    i: 1.76991,
    Omega: 131.78422,
    omega: 44.97134,
    M0: 5.15131,
    t0: 58849.0
  }
};

export {
  solveKeplersEquation,
  calculateTrueAnomaly,
  calculateOrbitalPosition,
  calculateMeanAnomaly,
  equatorialToHorizontal,
  equatorialToHorizon,
  calculateJulianDate,
  calculateLST,
  jplElements
};
