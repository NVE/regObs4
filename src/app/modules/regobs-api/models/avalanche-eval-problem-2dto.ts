/* tslint:disable */
export interface AvalancheEvalProblem2Dto {

  /**
   * Unik id på denne tabellen da flere er mulig pr RegID.
   */
  AvalancheEvalProblem2ID?: number;

  /**
   * Skredtype. I appen er dette 1. felt under skredproblem. The AvalancheExtKD unique identifier
   */
  AvalancheExtTID?: number;

  /**
   * Sannsynlighet for skred. The AvalProbabilityKD unique identifier
   */
  AvalProbabilityTID?: number;

  /**
   * The AvalTriggerSimpleKD unique identifier
   */
  AvalTriggerSimpleTID?: number;

  /**
   * Sannsynlig tilleggsbelastning for å utløse skred. The DestructiveSizeKD unique identifier
   */
  DestructiveSizeTID?: number;

  /**
   * Hvilket svakt lag løsner skredet på? The AvalCauseKD unique identifier
   */
  AvalCauseTID?: number;

  /**
   * Hvor dypt ligger det overnevnte svake laget? The AvalCauseDepthKD unique identifier
   */
  AvalCauseDepthTID?: number;

  /**
   * AvalCauseAttributes er flagging. Det som lagres er ugunstige egenskaper til det svake laget i snøen. Dette er flervalgsliste. Om valg 1 og 4 er valgt lagres 9 (binært 1001). Om valg 1 og 2 er valgt lagres 3 (binært 11). Om bare valg 3 er valgt lagres 4 (binært 100)
   */
  AvalCauseAttributes?: number;

  /**
   * Velg utsatte retninger
   */
  ValidExposition?: string;

  /**
   * Øverste høyde på “utsatt høyde” symbolet.
   */
  ExposedHeight1?: number;

  /**
   * Nederste høyde på “utsatt høyde” symbolet.
   */
  ExposedHeight2?: number;

  /**
   * Hvilket symbol brukes? Er utsatt tereng over ExposedHeight2 eller under den? The ExposedHeightComboKD unique identifier
   */
  ExposedHeightComboTID?: number;

  /**
   * TODO
   */
  AvalPropagationTID?: number;

  /**
   * Kommentar til skredproblemet
   */
  Comment?: string;
}
