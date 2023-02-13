const toggleMenu = () => {
  const navbar = document.querySelector('.navbar'),
    mainMenu = document.querySelector('.header-nav .main-menu'),
    navbarNav = document.querySelector('.navbar-nav');

  const navMenuClone = mainMenu.cloneNode(true);
  navbarNav.append(navMenuClone);

  const handlerMenu = elem => {
    if (!navbar.classList.contains('is-open')) {
      navbar.classList.add('is-open');
    } else if (elem.matches('a') || elem.closest('svg')) {
      navbar.classList.remove('is-open');
    }
  };

  document.addEventListener('click', event => {
    if (event.target.closest('.iconBurger') ||
        event.target.closest('.navbar')) {
      handlerMenu(event.target);
    }
  });
};

export default toggleMenu;
