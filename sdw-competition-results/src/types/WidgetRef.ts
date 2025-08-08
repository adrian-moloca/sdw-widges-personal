export interface WidgetRef {
  refresh: () => void;
  getToken: () => Promise<string>;
}
