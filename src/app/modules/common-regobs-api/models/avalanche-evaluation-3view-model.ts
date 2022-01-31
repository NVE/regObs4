/* tslint:disable */
export interface AvalancheEvaluation3ViewModel {
  AvalancheDangerName?: string;
  ForecastCorrectName?: string;

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
   * Felt hvor observatøren kan fortelle de syns varslet stemmer. Valg fra liste gitt i ForecastCorrectKD. The ForecastCorrectKD unique identifier
   */
  ForecastCorrectTID?: number;

  /**
   * Kommetarfelt for utdypende kommentar om varslet stemmer eller ikke.
   */
  ForecastComment?: string;
}
