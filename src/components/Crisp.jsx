import { useEffect } from 'react';

export default function Crisp({ children }) {
  useEffect(() => {
    if (window.CRISP_WEBSITE_ID) return;
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = '2aa7bcb2-8094-4624-b64e-112c2ca3a174';

    (function () {
      const d = document;
      const s = d.createElement('script');
      s.src = 'https://client.crisp.chat/l.js';
      s.async = 1;
      d.getElementsByTagName('head')[0].appendChild(s);
    }());
  }, []);

  return children;
}
