import { GeoHazard } from 'src/app/modules/common-core/models';
import { getGeohazardsId, getIconForGeohazards } from './get-geo-icon';

describe('getGeohazardsId', () => {
  it('should return "unknown" for a GeoHazard value not in the enum', () => {
    expect(getGeohazardsId([500 as GeoHazard])).toBe('unknown');
  });

  it('should return "notspecified" for NotSpecified', () => {
    expect(getGeohazardsId([GeoHazard.NotSpecified])).toBe('notspecified');
  });

  it('should return "snow" for Snow', () => {
    expect(getGeohazardsId([GeoHazard.Snow])).toBe('snow');
  });

  it('should return "dirt" for Soil', () => {
    expect(getGeohazardsId([GeoHazard.Soil])).toBe('dirt');
  });

  it('should return "wetsoil" for WetSoil', () => {
    expect(getGeohazardsId([GeoHazard.WetSoil])).toBe('wetsoil');
  });

  it('should return "rock" for Rock', () => {
    expect(getGeohazardsId([GeoHazard.Rock])).toBe('rock');
  });

  it('should return "icefall" for IceFall', () => {
    expect(getGeohazardsId([GeoHazard.IceFall])).toBe('icefall');
  });

  it('should return "water" for Water', () => {
    expect(getGeohazardsId([GeoHazard.Water])).toBe('water');
  });

  it('should return "ice" for Ice', () => {
    expect(getGeohazardsId([GeoHazard.Ice])).toBe('ice');
  });

  it('should return "eventonglacier" for EventOnGlacier', () => {
    expect(getGeohazardsId([GeoHazard.EventOnGlacier])).toBe('eventonglacier');
  });

  it('should return "jøkulhlaup" for Jøkulhlaup', () => {
    expect(getGeohazardsId([GeoHazard.Jøkulhlaup])).toBe('jøkulhlaup');
  });

  it('should return "weather" for Weather', () => {
    expect(getGeohazardsId([GeoHazard.Weather])).toBe('weather');
  });

  it('should return "drought" for Drought', () => {
    expect(getGeohazardsId([GeoHazard.Drought])).toBe('drought');
  });

  it('should return "unknown" for Unknown', () => {
    expect(getGeohazardsId([GeoHazard.Unknown])).toBe('unknown');
  });

  it('should join multiple geohazards with hyphens', () => {
    expect(getGeohazardsId([GeoHazard.Snow, GeoHazard.Ice])).toBe('snow-ice');
  });
});

describe('getIconForGeohazards', () => {
  it('should return svg path with underscores instead of hyphens', () => {
    expect(getIconForGeohazards([GeoHazard.Snow, GeoHazard.Ice])).toBe('/assets/icon/snow_ice.svg');
  });

  it('should return svg path for a single geohazard', () => {
    expect(getIconForGeohazards([GeoHazard.Snow])).toBe('/assets/icon/snow.svg');
  });
});
