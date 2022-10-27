/* tslint:disable */
export interface AvalancheEvalProblem2EditModel {
  AvalCauseAttributeCrystalTID?: number;
  AvalCauseAttributeLightTID?: number;
  AvalCauseAttributeSoftTID?: number;
  AvalCauseAttributeThinTID?: number;

  /**
   * Hvor dypt ligger det overnevnte svake laget? The AvalCauseDepthKD unique identifier
   */
  AvalCauseDepthTID?: number;

  /**
   * Hvilket svakt lag løsner skredet på? The AvalCauseKD unique identifier
   */
  AvalCauseTID?: number;

  /**
   * Sannsynlighet for skred. The AvalProbabilityKD unique identifier
   */
  AvalProbabilityTID?: number;
  AvalPropagationTID?: number;

  /**
   * The AvalTriggerSimpleKD unique identifier
   */
  AvalTriggerSimpleTID?: number;

  /**
   * Skredtype. I appen er dette 1. felt under skredproblem. The AvalancheExtKD unique identifier
   */
  AvalancheExtTID?: number;

  /**
   * Kommentar til skredproblemet
   */
  Comment?: string;

  /**
   * Sannsynlig tilleggsbelastning for å utløse skred. The DestructiveSizeKD unique identifier
   */
  DestructiveSizeTID?: number;

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
   * Velg utsatte retninger
   */
  ValidExposition?: string;
}
