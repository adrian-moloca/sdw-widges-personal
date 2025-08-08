import React from 'react';
import ReactDOM from 'react-dom/client';
import { WidgetConfig } from 'types/WidgetConfig';
import { WidgetRef } from 'types/WidgetRef';
import Widget from './Widget';
import { defaultConfig } from 'config/defaultConfig';

// Optional: Declare global type
declare global {
  interface Window {
    MyWidget: {
      init: (args: { containerId: string; config?: WidgetConfig }) => void;
    };
  }
}
// Mount function
function init({ containerId, config }: { containerId: string; config?: WidgetConfig }) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Widget container with ID '${containerId}' not found`);
    return;
  }
  const ref = React.createRef<WidgetRef>();
  const root = ReactDOM.createRoot(container);
  root.render(<Widget ref={ref} config={config ?? defaultConfig} />);
}

window.MyWidget = { init };
