import { DisplayState } from '../model/DisplayState';

export interface DisplayStateChangedHandler {
  onState?(displayState: DisplayState): void;
  onStateChanged(displayState: DisplayState): void;
  onBackendError?(errorMessage: string): void;
}
