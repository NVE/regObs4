/* tslint:disable */
export interface WaterLevelDto {

  /**
   * Felt for å beskrive vannstanden. Feks relativt et hus eller mot andre faste ting i terrenget. Verdi i meter [m].
   */
  WaterLevelDescribed?: string;

  /**
   * Om vannstanden kan beskrives settes i tallverdi relativt en flomstøtte, metermål eller som meter over havet.
   */
  WaterLevelValue?: number;

  /**
   * Vannstand beskrevet i feltene WaterLevelDescribed eller WaterLevelValue er relativt (referanseverdi) noe. Mulige valg gitt i WaterLevelRefKD. &lt; 200 = elver, &gt;= 200 innsjøer. The WaterLevelRefKD unique identifier
   */
  WaterLevelRefTID: number;

  /**
   * Faktisk vannføring. Dette er verdi målt av en felthydrolog og ikke en som er estimert ut fra vannstand. Verdi i kubikkmeter [m3].
   */
  MeasuredDischarge?: number;

  /**
   * Bruksflagg er ikke implementert enda. Hensikten er å kunne flagge en observasjon som godkjent,. The UsageFlagKD unique identifier
   */
  UsageFlagTID?: number;

  /**
   * Comment
   */
  Comment?: string;
}
