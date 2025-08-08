import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Widget from 'widget/Widget';
import { defaultConfig } from 'config/defaultConfig';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Widget config={defaultConfig} />
  </StrictMode>
);
