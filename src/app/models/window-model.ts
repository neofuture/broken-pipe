export interface WindowModel {
  icon?: string;
  title: string;
  class: string;
  body: string;
  bodyComponent?: string;
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
  closing?: boolean;
  hasTab: boolean;
  hasTitleBar: boolean;
  state: {
    active: boolean;
    isMinimised: boolean;
    isMaximised: boolean;
    isMaximisedLeft: boolean;
    isMaximisedRight: boolean;
  };
  data?: object;
}
