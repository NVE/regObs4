/* tslint:disable */
export interface AvalancheEvalProblem2ViewModel {
  AvalProbabilityName?: string;
  AvalTriggerSimpleName?: string;
  AvalCauseDepthName?: string;
  ExposedHeightComboName?: string;
  AvalancheExtName?: string;
  AvalCauseName?: string;
  DestructiveSizeName?: string;
  AvalPropagationName?: string;
  AvalCauseAttributeLightName?: string;
  AvalCauseAttributeThinName?: string;
  AvalCauseAttributeSoftName?: string;
  AvalCauseAttributeCrystalName?: string;

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
   * Hvor dypt ligger det overnevnte svake laget? The AvalCauseDepthKD unique identifier
   */
  AvalCauseDepthTID?: number;

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
   * Skredtype. I appen er dette 1. felt under skredproblem. The AvalancheExtKD unique identifier
   */
  AvalancheExtTID?: number;

  /**
   * Kommentar til skredproblemet
   */
  Comment?: string;

  /**
   * Hvilket svakt lag løsner skredet på? The AvalCauseKD unique identifier
   */
  AvalCauseTID?: number;
  AvalCauseAttributeLightTID?: number;
  AvalCauseAttributeThinTID?: number;
  AvalCauseAttributeSoftTID?: number;
  AvalCauseAttributeCrystalTID?: number;

  /**
   * Sannsynlig tilleggsbelastning for å utløse skred. The DestructiveSizeKD unique identifier
   */
  DestructiveSizeTID?: number;
}
