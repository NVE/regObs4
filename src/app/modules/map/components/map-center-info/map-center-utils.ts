import geomagnetism from 'geomagnetism';

/**
 * Beregner retning fra ett geografisk punkt til et annet.
 * @param fromLat Breddegrad for startpunkt
 * @param fromLng Lengdegrad for startpunkt
 * @param toLat Breddegrad for målpunkt
 * @param toLng Lengdegrad for målpunkt
 * @returns Retning i grader [0-360), der 0 er nord, 90 er øst, osv.
 */
export function calculateBearing(fromLat: number, fromLng: number, toLat: number, toLng: number): number {
  const fromLatRad = toRadians(fromLat);
  const toLatRad = toRadians(toLat);
  const deltaLon = toRadians(toLng - fromLng);

  const y = Math.sin(deltaLon) * Math.cos(toLatRad);
  const x = Math.cos(fromLatRad) * Math.sin(toLatRad) - Math.sin(fromLatRad) * Math.cos(toLatRad) * Math.cos(deltaLon);
  const bearing = Math.atan2(y, x);

  // Konverter fra radianer til grader
  return (toDegrees(bearing) + 360) % 360;
}

/**
 * Henter magnetisk misvisning for en gitt posisjon.
 * @param lat Breddegrad
 * @param lng Lengdegrad
 * @param altitude Høyde over havet i meter (valgfritt, standard 0)
 * @returns Magnetisk misvisning i grader (positiv = østlig, negativ = vestlig)
 */
export function getMagneticDeclination(lat: number, lng: number, altitude = 0): number {
  const model = getGeomagnetismModel();
  const altitudeKm = altitude / 1000; // Konverter høyde til kilometer
  const info = model.point([lat, lng, altitudeKm]);
  return info.decl;
}

/**
 * Beregner kompasskurs fra ett geografisk punkt til et annet, inkludert misvisning.
 * @param fromLat Breddegrad for startpunkt
 * @param fromLng Lengdegrad for startpunkt
 * @param toLat Breddegrad for målpunkt
 * @param toLng Lengdegrad for målpunkt
 * @param altitude Høyde over havet i meter (valgfritt, standard 0)
 * @returns Magnetisk retning i grader [0-360)
 */
export function calculateMagneticBearing(
  fromLat: number,
  fromLng: number,
  toLat: number,
  toLng: number,
  altitude = 0
): number {
  const trueBearing = calculateBearing(fromLat, fromLng, toLat, toLng);
  const declination = getMagneticDeclination(fromLat, fromLng, altitude);

  // Trekk fra misvisning for å få magnetisk kompasskurs
  // (positiv misvisning betyr at magnetisk nord er øst for sann nord)
  return (trueBearing - declination + 360) % 360;
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

function toDegrees(radians: number): number {
  return radians * (180 / Math.PI);
}

// vi gjenbruker modellen så lenge året er det samme, siden modellen oppdateres årlig
let cachedModel: ReturnType<typeof geomagnetism.model> | undefined;
let cachedYear: number | undefined;

function getGeomagnetismModel() {
  const currentYear = new Date().getFullYear();
  if (cachedModel == null || cachedYear !== currentYear) {
    cachedModel = geomagnetism.model(new Date(), { allowOutOfBoundsModel: true });
    cachedYear = currentYear;
  }
  return cachedModel;
}
