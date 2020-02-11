import { DisplayState } from '../model/DisplayState';

export interface DisplayStateChangedHandler {
  onStateChanged?(displayState: DisplayState): void;
  onSuccess?(displayState: DisplayState): void;
  onClientError?(error: ErrorEvent | any): void;
  onBackendError?(status: number, error: string): void;
}
