import { calculateBearing, calculateMagneticBearing, getMagneticDeclination } from './map-center-utils';

describe('map-center-utils', () => {
  describe('calculateBearing', () => {
    it('should calculate bearing due north as 0 degrees', () => {
      const bearing = calculateBearing(0, 10, 1, 10);
      expect(bearing).toBeCloseTo(0, 1);
    });

    it('should calculate bearing due east as 90 degrees', () => {
      const bearing = calculateBearing(0, 10, 0, 11); // Ved ekvator
      expect(bearing).toBeCloseTo(90, 1);
    });

    it('should calculate bearing due south as 180 degrees', () => {
      const bearing = calculateBearing(0, 10, -1, 10);
      expect(bearing).toBeCloseTo(180, 1);
    });

    it('should calculate bearing due west as 270 degrees', () => {
      const bearing = calculateBearing(0, 10, 0, 9); // Ved ekvator
      expect(bearing).toBeCloseTo(270, 1);
    });

    it('should calculate bearing from Oslo to Bergen (approximately west-northwest)', () => {
      // Oslo: 59.9139°N, 10.7522°E
      // Bergen: 60.3913°N, 5.3221°E
      const bearing = calculateBearing(59.9139, 10.7522, 60.3913, 5.3221);
      expect(bearing).toBeCloseTo(282, 0); // Approximately WNW
    });

    it('should calculate bearing from Bergen to Oslo (approximately east-southeast)', () => {
      // Bergen: 60.3913°N, 5.3221°E
      // Oslo: 59.9139°N, 10.7522°E
      const bearing = calculateBearing(60.3913, 5.3221, 59.9139, 10.7522);
      expect(bearing).toBeCloseTo(98, 0); // Approximately ESE
    });

    it('should calculate bearing from Oslo to Trondheim (approximately north)', () => {
      // Oslo: 59.9139°N, 10.7522°E
      // Trondheim: 63.4305°N, 10.3951°E
      const bearing = calculateBearing(59.9139, 10.7522, 63.4305, 10.3951);
      expect(bearing).toBeCloseTo(357, 0); // Nearly due north
    });

    it('should handle same position (return some value 0-360)', () => {
      const bearing = calculateBearing(60, 10, 60, 10);
      expect(bearing).toBeGreaterThanOrEqual(0);
      expect(bearing).toBeLessThan(360);
    });

    it('should always return a value between 0 and 360', () => {
      const testCases = [
        [0, 0, 10, 10],
        [-45, -45, 45, 45],
        [89, 179, -89, -179],
      ];

      testCases.forEach(([fromLat, fromLng, toLat, toLng]) => {
        const bearing = calculateBearing(fromLat, fromLng, toLat, toLng);
        expect(bearing).toBeGreaterThanOrEqual(0);
        expect(bearing).toBeLessThan(360);
      });
    });

    it('should calculate northeast bearing correctly', () => {
      const bearing = calculateBearing(60, 10, 61, 11);
      expect(bearing).toBeGreaterThan(0);
      expect(bearing).toBeLessThan(90);
    });

    it('should calculate southwest bearing correctly', () => {
      const bearing = calculateBearing(60, 10, 59, 9);
      expect(bearing).toBeGreaterThan(180);
      expect(bearing).toBeLessThan(270);
    });
  });

  describe('getMagneticDeclination', () => {
    it('should return positive declination for Oslo (magnetic north is east of true north)', () => {
      // Oslo: 59.9139°N, 10.7522°E
      const declination = getMagneticDeclination(59.9139, 10.7522);
      expect(declination).toBeGreaterThan(0);
      expect(declination).toBeLessThan(10); // Norge har ca. 5-7° østlig misvisning
    });

    it('should return positive declination for Bergen', () => {
      // Bergen: 60.3913°N, 5.3221°E
      const declination = getMagneticDeclination(60.3913, 5.3221);
      expect(declination).toBeGreaterThan(0);
      expect(declination).toBeLessThan(10);
    });

    it('should return positive declination for Trondheim', () => {
      // Trondheim: 63.4305°N, 10.3951°E
      const declination = getMagneticDeclination(63.4305, 10.3951);
      expect(declination).toBeGreaterThan(0);
      expect(declination).toBeLessThan(10);
    });

    it('should handle altitude parameter at sea level', () => {
      const declinationDefault = getMagneticDeclination(59.9139, 10.7522);
      const declinationSeaLevel = getMagneticDeclination(59.9139, 10.7522, 0);

      // Verdiene skal være identiske siden default er 0
      expect(declinationDefault).toBeCloseTo(declinationSeaLevel);
    });

    it('should have minimal difference with altitude changes', () => {
      const declinationSea = getMagneticDeclination(59.9139, 10.7522, 0);
      const declinationMountain = getMagneticDeclination(59.9139, 10.7522, 2000);

      // Høyde påvirker misvisning svært lite (< 0.1° for 2000m)
      expect(Math.abs(declinationSea - declinationMountain)).toBeLessThan(1);
    });

    it('should return declination for Svalbard (high latitude)', () => {
      // Longyearbyen: 78.2186°N, 15.6488°E
      const declination = getMagneticDeclination(78.2186, 15.6488);

      // Svalbard har høyere misvisning enn fastlands-Norge
      expect(declination).toBeGreaterThan(0);
      expect(declination).toBeLessThan(20);
    });

    it('should handle negative latitudes (southern hemisphere)', () => {
      // Sydney: -33.8688°S, 151.2093°E
      const declination = getMagneticDeclination(-33.8688, 151.2093);

      // Sydney har østlig misvisning
      expect(declination).toBeGreaterThan(0);
      expect(declination).toBeLessThan(20);
    });
  });

  describe('calculateMagneticBearing', () => {
    it('should calculate magnetic bearing from Oslo to Bergen', () => {
      // Oslo: 59.9139°N, 10.7522°E
      // Bergen: 60.3913°N, 5.3221°E
      const magneticBearing = calculateMagneticBearing(59.9139, 10.7522, 60.3913, 5.3221);
      const trueBearing = calculateBearing(59.9139, 10.7522, 60.3913, 5.3221);
      const declination = getMagneticDeclination(59.9139, 10.7522);

      // Magnetisk bearing skal være true bearing minus declination
      expect(magneticBearing).toBeCloseTo((trueBearing - declination + 360) % 360, 0);
    });

    it('should always return a value between 0 and 360', () => {
      const testCases = [
        [59.9139, 10.7522, 60.3913, 5.3221], // Oslo to Bergen
        [60.3913, 5.3221, 59.9139, 10.7522], // Bergen to Oslo
        [59.9139, 10.7522, 63.4305, 10.3951], // Oslo to Trondheim
        [69.6492, 18.9553, 78.2186, 15.6488], // Tromsø to Svalbard
      ];

      testCases.forEach(([fromLat, fromLng, toLat, toLng]) => {
        const bearing = calculateMagneticBearing(fromLat, fromLng, toLat, toLng);
        expect(bearing).toBeGreaterThanOrEqual(0);
        expect(bearing).toBeLessThan(360);
      });
    });

    it('should differ from true bearing by approximately the declination amount', () => {
      const fromLat = 60;
      const fromLng = 10;
      const toLat = 61;
      const toLng = 10;

      const trueBearing = calculateBearing(fromLat, fromLng, toLat, toLng);
      const magneticBearing = calculateMagneticBearing(fromLat, fromLng, toLat, toLng);
      const declination = getMagneticDeclination(fromLat, fromLng);

      // Forskjellen skal være lik misvisningen (med hensyn til wrapping rundt 360)
      const difference = (trueBearing - magneticBearing + 360) % 360;
      expect(difference).toBeCloseTo(declination, 0);
    });

    it('should handle altitude parameter correctly', () => {
      const bearingSeaLevel = calculateMagneticBearing(59.9139, 10.7522, 60.3913, 5.3221, 0);
      const bearingMountain = calculateMagneticBearing(59.9139, 10.7522, 60.3913, 5.3221, 2000);

      // Forskjellen skal være minimal siden altitude påvirker lite
      expect(Math.abs(bearingSeaLevel - bearingMountain)).toBeLessThan(1);
    });

    it('should give lower magnetic bearing than true bearing for positive declination', () => {
      // I Norge (positiv misvisning) skal magnetisk bearing være lavere enn true bearing
      const trueBearing = calculateBearing(59.9139, 10.7522, 60.3913, 5.3221);
      const magneticBearing = calculateMagneticBearing(59.9139, 10.7522, 60.3913, 5.3221);

      // Med positiv misvisning (magnetisk nord øst for true nord),
      // må vi kompensere ved å trekke fra, så magnetic < true (for de fleste tilfeller)
      // Men må ta hensyn til wrapping rundt 0/360
      const declination = getMagneticDeclination(59.9139, 10.7522);
      expect(declination).toBeGreaterThan(0); // Bekreft at Norge har positiv misvisning

      // Sjekk at forholdet stemmer
      const expectedMagnetic = (trueBearing - declination + 360) % 360;
      expect(magneticBearing).toBeCloseTo(expectedMagnetic, 0);
    });

    it('should handle bearing near 0/360 boundary correctly', () => {
      // Test et tilfelle hvor bearing er nær nord (0/360 grenser)
      const magneticBearing = calculateMagneticBearing(59, 10, 60, 10);

      expect(magneticBearing).toBeGreaterThanOrEqual(0);
      expect(magneticBearing).toBeLessThan(360);
    });
  });
});
