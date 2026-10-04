'use strict';

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const mobileViewport = window.matchMedia('(max-width: 760px)');

if (menuButton && navigation) {
  function syncMenu() {
    menuButton.hidden = !mobileViewport.matches;
    menuButton.setAttribute('aria-expanded', 'false');
    navigation.hidden = mobileViewport.matches;
  }
  menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!expanded));
    navigation.hidden = expanded;
  });
  navigation.addEventListener('click', (event) => {
    if (mobileViewport.matches && event.target.closest('a')) syncMenu();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mobileViewport.matches && !navigation.hidden) {
      syncMenu();
      menuButton.focus();
    }
  });
  mobileViewport.addEventListener('change', syncMenu);
  syncMenu();
}
