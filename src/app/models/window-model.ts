export interface WindowModel {
  titleBar?: string;
  class?: string;
  body: string;
  active: boolean;
  zIndex: number;
  top: number;
  left: number;
  height: number;
  width: number;
  close: boolean;
  closed: boolean;
}
