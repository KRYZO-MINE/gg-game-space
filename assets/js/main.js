(function () {
  var c = window.GG_CONFIG || {};

  // Mobile menu
  var btn = document.querySelector('.menu-btn');
  var list = document.getElementById('nav-links');
  if (btn && list) {
    btn.addEventListener('click', function () {
      var open = list.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
    });
    list.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') { list.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && list.classList.contains('open')) { list.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); btn.focus(); }
    });
  }

  // Shared values keep app details consistent across pages.
  document.querySelectorAll('[data-cfg]').forEach(function (el) {
    var v = c[el.getAttribute('data-cfg')];
    if (v) { el.textContent = v; }
  });

  // Download buttons: real link only when a verified URL is set
  document.querySelectorAll('[data-download]').forEach(function (a) {
    if (c.downloadUrl) {
      a.href = c.downloadUrl;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.removeAttribute('aria-disabled');
      a.textContent = c.downloadLabel || 'Download';
    } else {
      a.removeAttribute('href');
      a.setAttribute('aria-disabled', 'true');
    }
  });

  // Navbar Download button appears only with a verified destination
  if (c.downloadUrl) {
    document.querySelectorAll('[data-when-download]').forEach(function (li) { li.hidden = false; });
  }

  // Support contact
  var s = document.getElementById('support-contact');
  if (s && (c.supportEmail || c.supportUrl)) {
    s.textContent = '';
    if (c.supportEmail) {
      var m = document.createElement('a');
      m.href = 'mailto:' + c.supportEmail; m.textContent = c.supportEmail;
      s.appendChild(m);
    }
    if (c.supportUrl) {
      if (c.supportEmail) s.appendChild(document.createTextNode(' or '));
      var u = document.createElement('a');
      u.href = c.supportUrl; u.target = '_blank'; u.rel = 'noopener noreferrer'; u.textContent = 'visit the help page';
      s.appendChild(u);
    }
  }
})();
