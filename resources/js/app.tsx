import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import './app.css';

let globalSiteName = 'DigiFalah';

createInertiaApp({
  title: (title) => {
    if (!title) return globalSiteName;
    if (title.includes(globalSiteName)) return title;
    return `${title} | ${globalSiteName}`;
  },
  resolve: async (name) => {
    const pages = import.meta.glob('./pages/**/*.tsx');
    const page = pages[`./pages/${name}.tsx`];
    if (!page) throw new Error(`Page not found: ${name}`);
    return (await page()) as any;
  },
  setup({ el, App, props }) {
    globalSiteName = (props.initialPage.props.settings as any)?.site_name || 'DigiFalah';
    createRoot(el).render(<App {...props} />);
  },
});
