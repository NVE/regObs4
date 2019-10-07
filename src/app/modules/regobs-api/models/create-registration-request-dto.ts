/* tslint:disable */
import { AvalancheActivityObsDto } from './avalanche-activity-obs-dto';
import { AvalancheActivityObs2Dto } from './avalanche-activity-obs-2dto';
import { AvalancheDangerObsDto } from './avalanche-danger-obs-dto';
import { AvalancheEvalProblem2Dto } from './avalanche-eval-problem-2dto';
import { AvalancheEvaluation3Dto } from './avalanche-evaluation-3dto';
import { AvalancheObsDto } from './avalanche-obs-dto';
import { CompressionTestDto } from './compression-test-dto';
import { DangerObsDto } from './danger-obs-dto';
import { GeneralObservationEditModel } from './general-observation-edit-model';
import { IceCoverObsDto } from './ice-cover-obs-dto';
import { IceThicknessDto } from './ice-thickness-dto';
import { IncidentDto } from './incident-dto';
import { LandSlideObsDto } from './land-slide-obs-dto';
import { ObsLocationDto } from './obs-location-dto';
import { PictureRequestDto } from './picture-request-dto';
import { SnowCoverObsDto } from './snow-cover-obs-dto';
import { SnowProfileDto } from './snow-profile-dto';
import { SnowSurfaceObservationDto } from './snow-surface-observation-dto';
import { WaterLevelDto } from './water-level-dto';
import { WeatherObservationDto } from './weather-observation-dto';
import { WaterLevel2Dto } from './water-level-2dto';
import { DamageObsDto } from './damage-obs-dto';
import { DensityProfileDto } from './density-profile-dto';

/**
 * Denne tabellen knytter observatør, sted og observasjonene sammen. Poetisk sagt er den navet i en registrering. Merknad: For å opprette en ny registrering kreves gyldig observerID og ObsLocationId
 */
export interface CreateRegistrationRequestDto {
  Id: string;

  /**
   * Sett naturfare. Tabellen brukes av alle naturfarer (snø, jord, vann, is). The GeoHazardKD unique identifier
   */
  GeoHazardTID: 0 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 100 | 110 | 200 | 999;

  /**
   * Tiden da observasjonen ble gjort.
   */
  DtObsTime: string;

  /**
   * Unik ID for observatører (brukere). Denne lages av regObs systemet.
   */
  ObserverGuid: string;

  /**
   * Wether or not a confirmation email should be sent to user for this registration.
   */
  Email?: boolean;

  /**
   * Unik ID på ulike observasjonssteder.
   */
  ObsLocationID?: number;

  /**
   * Hvis en bruker registrerer en observasjon på vegne av en gruppe legges det til her.
   */
  ObserverGroupID?: number;

  /**
   * Kommentarfelt brukt av systemet.
   */
  Comment?: string;

  /**
   * Kildereferanse på en registrering. F.eks. har brukeren sette dette selv eller er det referert til fra nyheter. The SourceKD unique identifier
   */
  SourceTID?: number;

  /**
   * Tabell for skredaktivitet.
   */
  AvalancheActivityObs?: Array<AvalancheActivityObsDto>;
  AvalancheActivityObs2?: Array<AvalancheActivityObs2Dto>;
  AvalancheDangerObs?: Array<AvalancheDangerObsDto>;

  /**
   * Tabell for skredproblemet. Denne har vært under skredfarevurderingsskjema.
   */
  AvalancheEvalProblem2?: Array<AvalancheEvalProblem2Dto>;

  /**
   * Tabell for skredfarevurdering.
   */
  AvalancheEvaluation3?: AvalancheEvaluation3Dto;

  /**
   * Skred observasjon.
   */
  AvalancheObs?: AvalancheObsDto;
  CompressionTest?: Array<CompressionTestDto>;
  DangerObs?: Array<DangerObsDto>;
  GeneralObservation?: GeneralObservationEditModel;

  /**
   * Tabell for isdekningsgrad av en innsjø eller en elv. Registrering består av nåtilstanden og hvilken tilstand vi går fra. Dette sier noe om utviklingen på isforholdene.
   */
  IceCoverObs?: IceCoverObsDto;

  /**
   * Tabell for istykkelse. Denne tabellen utfylles av IceThicknessLayer som gir mulighet til å legge til enkeltlag i isen og ikke bare total istykkelse slik denne tabellen gjør.
   */
  IceThickness?: IceThicknessDto;

  /**
   * Tabell for registrering av hendelser. Merk: vårt jord, jord og stein (GeoHazardTID = 20, 30 og 40) bruker ikke dette mer. Nødvendige felter flyttet over til LandSlideObs.
   */
  Incident?: IncidentDto;

  /**
   * Tabell for registrering av våt jord-, jord- og steinskredhendelser (GeoHazardTID = 20, 30 og 40). Tabellen omfavner litt skredteknisk data og litt om konsekvens av hendelsen. Merk: startpunktet (løsneområdet) for skredet er gitt i obslocation tabellen og i denne tabellen registreres stopppunktet for skredet.
   */
  LandSlideObs?: LandSlideObsDto;

  /**
   * Lokasjon for hendelse
   */
  ObsLocation?: ObsLocationDto;

  /**
   * Tabell for bilder.
   */
  Picture?: Array<PictureRequestDto>;

  /**
   * Provide description for SnowCoverObs
   */
  SnowCoverObs?: SnowCoverObsDto;

  /**
   * A picture of snow profile
   */
  SnowProfile?: PictureRequestDto;

  /**
   * The snow profile data.
   */
  SnowProfile2?: SnowProfileDto;

  /**
   * Tabell for snøoverflateobservasjoner. Skjema forenkles noe høsten 2013 så derfor fases noen dataelementer ut også
   */
  SnowSurfaceObservation?: SnowSurfaceObservationDto;

  /**
   * Tabell for registrering var vannstand. Det gis mulighet for å beskrive som tekst i WaterLevelDescribed eller som tallverdi i WaterLevelValue. På regObs.no og i appen er dette ett inputtfelt som analyserer det som er skrevet og fører verdi i riktige kolonner.
   */
  WaterLevel?: WaterLevelDto;
  WeatherObservation?: WeatherObservationDto;
  WaterLevel2?: WaterLevel2Dto;
  DamageObs?: Array<DamageObsDto>;
  DensityProfile?: DensityProfileDto;
}
