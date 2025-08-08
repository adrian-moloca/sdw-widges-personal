export interface WidgetMedia {
  id: string; // Unique ID
  unitId?: string; // E.g. "match:123", "team:456"
  type: 'video' | 'image' | 'banner' | 'logo';
  title?: string;
  description?: string; // Optional: for additional context
  imageUrl?: string; // Optional: for images or banners or videos
  videoUrl?: string; // Optional: for videos
  url?: string; // Optional: for videos
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  width?: number; // in px or %
  height?: number;
  onClickTrackUrl?: string; // Track clicks externally
}
