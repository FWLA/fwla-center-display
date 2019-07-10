import { DisplayState } from '../model/DisplayState';

export interface DisplayStateChangedHandler {
  onStateChanged(displayState: DisplayState): void;
  onBackendError?(errorMessage: string): void;
}
