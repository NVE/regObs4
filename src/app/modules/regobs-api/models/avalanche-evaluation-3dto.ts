/* tslint:disable */
export interface AvalancheEvaluation3Dto {

  /**
   * Faregrad. The AvalancheDangerKD unique identifier
   */
  AvalancheDangerTID?: number;

  /**
   * Her blir Skredfarevurdering skrevet inn. I appen blir “Utstrekning” lagt til som tekst i denne kolonnen
   */
  AvalancheEvaluation?: string;

  /**
   * Her blir forventet utvikling skrevet inn.
   */
  AvalancheDevelopment?: string;

  /**
   * Bruksflagg er ikke implementert enda. Hensikten er å kunne flagge en observasjon som godkjent, underkjent, overført historisk database mm. The UsageFlagKD unique identifier
   */
  UsageFlagTID?: number;

  /**
   * Felt hvor observatøren kan fortelle de syns varslet stemmer. Valg fra liste gitt i ForecastCorrectKD. The ForecastCorrectKD unique identifier
   */
  ForecastCorrectTID?: number;

  /**
   * Kommetarfelt for utdypende kommentar om varslet stemmer eller ikke.
   */
  ForecastComment?: string;
}
