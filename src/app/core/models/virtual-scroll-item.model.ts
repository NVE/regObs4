export interface IVirtualScrollItem<T> {
  header?: string;
  infoText?: string;
  showDayNames?: boolean;
  item: T;
}
