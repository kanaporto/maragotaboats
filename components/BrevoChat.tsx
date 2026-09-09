'use client'

import Script from 'next/script'

export default function BrevoChat() {
  return (
    <Script id="brevo-conversations" strategy="afterInteractive">
      {`
        (function(d, w, c) {
            w.BrevoConversationsID = '6aa1c60761ee6e730d05c3c0';
            w[c] = w[c] || function() {
                (w[c].q = w[c].q || []).push(arguments);
            };
            var s = d.createElement('script');
            s.async = true;
            s.src = 'https://conversations-widget.brevo.com/brevo-conversations.js';
            if (d.head) d.head.appendChild(s);
        })(document, window, 'BrevoConversations');
      `}
    </Script>
  )
}
