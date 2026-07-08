

document.addEventListener('DOMContentLoaded', function () {


  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });


    nav.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }


  var revealTargets = document.querySelectorAll(
    '.section h2, .card, .feature, .split-visual, .split-text'
  );
  revealTargets.forEach(function (el) { el.classList.add('reveal'); });

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealTargets.forEach(function (el) { observer.observe(el); });
  } else {

    revealTargets.forEach(function (el) { el.classList.add('is-visible'); });
  }


  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      status.style.color = '#ff6d00';
      status.textContent = 'Envoi en cours...';

      var data = new FormData(form);

      fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      })
        .then(function (response) {
          if (response.ok) {
            status.textContent = 'Merci ! Votre message a bien ete envoye, nous revenons vers vous rapidement.';
            form.reset();
          } else {
            response.json().then(function (data) {
              if (data && data.errors) {
                status.textContent = 'Une erreur est survenue. Verifiez vos informations et reessayez.';
              } else {
                status.textContent = 'Une erreur est survenue. Merci de reessayer dans un instant.';
              }
            }).catch(function () {
              status.textContent = 'Une erreur est survenue. Merci de reessayer dans un instant.';
            });
          }
        })
        .catch(function () {
          status.textContent = 'Impossible d\'envoyer le message. Verifiez votre connexion et reessayez.';
        });
    });
  }

});
