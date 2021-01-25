export interface SmartChange<T> {
  previousValue?: T;
  currentValue: T;
  firstChange: boolean;
  isFirstChange(): boolean;
}

export type SmartChanges<T> = {
  [Key in keyof T]?: SmartChange<T[Key]>;
};
