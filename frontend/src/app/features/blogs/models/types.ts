
export type Sort = 'lowest' | 'highest' | 'toprated' | 'a-z' | 'z-a';

/** The height of blog box */
export const ROW_HEIGHT: { [id: number]: number } = { 1: 220, 2: 360, 4: 360 };

export interface IDisplayCardOptions {
  showSlides: boolean;
  fullWidthMode: boolean;
  cols: number;
  rowHeight: number;
  error: boolean;
}

export interface IDisplayDetailOptions {
  showSlides: boolean;
  fullWidthMode: boolean;
  cols: number;
  rowHeight: number;
  error: boolean;
}
export interface IWriteOptions {
  showSlides: boolean;
  fullWidthMode: boolean;
  cols: number;
  rowHeight: number;
  error: boolean;
}