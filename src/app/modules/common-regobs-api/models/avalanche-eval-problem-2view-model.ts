/* tslint:disable */
export interface AvalancheEvalProblem2ViewModel {
  AvalCauseAttributeCrystalName?: string;
  AvalCauseAttributeCrystalTID?: number;
  AvalCauseAttributeLightName?: string;
  AvalCauseAttributeLightTID?: number;
  AvalCauseAttributeSoftName?: string;
  AvalCauseAttributeSoftTID?: number;
  AvalCauseAttributeThinName?: string;
  AvalCauseAttributeThinTID?: number;
  AvalCauseDepthName?: string;

  /**
   * Hvor dypt ligger det overnevnte svake laget? The AvalCauseDepthKD unique identifier
   */
  AvalCauseDepthTID?: number;
  AvalCauseName?: string;

  /**
   * Hvilket svakt lag løsner skredet på? The AvalCauseKD unique identifier
   */
  AvalCauseTID?: number;
  AvalProbabilityName?: string;

  /**
   * Sannsynlighet for skred. The AvalProbabilityKD unique identifier
   */
  AvalProbabilityTID?: number;
  AvalPropagationName?: string;
  AvalPropagationTID?: number;
  AvalTriggerSimpleName?: string;

  /**
   * The AvalTriggerSimpleKD unique identifier
   */
  AvalTriggerSimpleTID?: number;
  AvalancheExtName?: string;

  /**
   * Skredtype. I appen er dette 1. felt under skredproblem. The AvalancheExtKD unique identifier
   */
  AvalancheExtTID?: number;

  /**
   * Kommentar til skredproblemet
   */
  Comment?: string;
  DestructiveSizeName?: string;

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
  ExposedHeightComboName?: string;

  /**
   * Hvilket symbol brukes? Er utsatt tereng over ExposedHeight2 eller under den? The ExposedHeightComboKD unique identifier
   */
  ExposedHeightComboTID?: number;

  /**
   * Velg utsatte retninger
   */
  ValidExposition?: string;
}
