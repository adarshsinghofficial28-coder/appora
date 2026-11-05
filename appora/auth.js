(function () {
  'use strict';

  var KEY = 'appora_session';

  function getSession() {
    try {
      var raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function setSession(user) {
    localStorage.setItem(KEY, JSON.stringify(user));
  }

  function clearSession() {
    localStorage.removeItem(KEY);
  }

  function signOut() {
    clearSession();
    renderAuth();
    var toast = document.getElementById('toast');
    if (toast) {
      toast.textContent = 'Signed out';
      toast.classList.add('show');
      setTimeout(function () { toast.classList.remove('show'); }, 3000);
    }
  }

  function renderAuth() {
    var links = document.getElementById('authLinks');
    var user = document.getElementById('authUser');
    var name = document.getElementById('userName');
    var out = document.getElementById('signOutBtn');
    if (!links || !user) return;

    var session = getSession();
    if (session) {
      links.hidden = true;
      user.hidden = false;
      if (name) name.textContent = session.name || session.email || 'Account';
      if (out) out.onclick = signOut;
    } else {
      user.hidden = true;
      links.hidden = false;
    }
  }

  window.ApporaAuth = {
    getSession: getSession,
    setSession: setSession,
    clearSession: clearSession
  };

  document.addEventListener('DOMContentLoaded', renderAuth);
})();
