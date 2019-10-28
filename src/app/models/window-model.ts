export interface WindowModel {
  titleBar?: string;
  class?: string;
  body: string;
  zIndex: number;
  top: number;
  left: number;
  height: number;
  width: number;
  minimumHeight: number;
  minimumWidth: number;
  entities: object;
  maximizable: boolean;
  minimizable: boolean;
  resizable: boolean;
  close: boolean;
  state: {
    active: boolean;
    isMinimised: boolean;
    isMaximised: boolean;
  };
}
