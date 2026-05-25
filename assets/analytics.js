/**
 * Umami analytics loader + event helpers for goortani.com
 *
 * Injects the Umami tracking script and exposes a global `window.track(event, data)`
 * helper used by terminal.js. Safe to include from any page in the site
 * (root, short, cv, resume, resume-cto, ...). Uses an absolute URL so
 * subdirectory depth does not matter.
 *
 * The WEBSITE_ID below is a per-domain UUID created in Umami. It is a public
 * identifier, not a secret (it is embedded in the HTML anyway).
 */
(function () {
  var UMAMI_HOST = 'https://goortani.synology.me:3100';
  var WEBSITE_ID = 'd7924d62-4849-4d6b-8bc5-4a0ce9baae50';
  var trackerRequested = false;
  var queue = [];

  function flushQueue() {
    if (!window.umami || typeof window.umami.track !== 'function' || !queue) return;
    queue.forEach(function (args) {
      try { window.umami.track.apply(window.umami, args); } catch (_) {}
    });
    queue = null;
  }

  function loadTracker() {
    if (trackerRequested) return;
    trackerRequested = true;

    var s = document.createElement('script');
    s.defer = true;
    s.src = UMAMI_HOST + '/script.js';
    s.setAttribute('data-website-id', WEBSITE_ID);
    s.setAttribute('data-domains', 'goortani.com');
    s.addEventListener('load', flushQueue, { once: true });
    document.head.appendChild(s);
  }

  function scheduleTracker() {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(loadTracker, { timeout: 2500 });
    } else {
      setTimeout(loadTracker, 1200);
    }
  }

  window.track = function (event, data) {
    var args = data ? [event, data] : [event];
    if (window.umami && typeof window.umami.track === 'function') {
      try { window.umami.track.apply(window.umami, args); } catch (_) {}
    } else if (queue) {
      queue.push(args);
      scheduleTracker();
    }
  };

  // Delegated outbound click tracking — any link that leaves goortani.com.
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    var namedEvent = a.getAttribute('data-track');
    if (namedEvent) {
      window.track(namedEvent, { href: href, text: (a.textContent || '').trim().slice(0, 80) });
    }
    if (!/^https?:\/\//i.test(href)) return;
    try {
      var url = new URL(href);
      if (url.hostname === window.location.hostname) return;
      window.track('outbound_click', { href: href, host: url.hostname });
    } catch (_) {}
  }, { capture: true });

  if (document.readyState === 'complete') {
    scheduleTracker();
  } else {
    window.addEventListener('load', scheduleTracker, { once: true });
  }
})();
