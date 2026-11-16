import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { LangProvider, langFromDocument } from './i18n/LangContext';
import '@fontsource-variable/archivo/wdth.css';
import './styles/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LangProvider lang={langFromDocument()}>
      <App />
    </LangProvider>
  </StrictMode>,
);
