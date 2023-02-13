const animateFinishPopup = popup => {
  const overlay = document.querySelector('.overlay'),
    dataClose = document.querySelectorAll('[data-closed]');

    const showFinishModal = () => {
      if (window.innerWidth > 992) {
        overlay.classList.remove('fadeOut');
        overlay.classList.add('fadeIn');

        if (popup.dataset.typeAnimate === 'slide') {
          popup.classList.remove('slideOutUp');
          popup.classList.add('slideInDown');
        } else if (popup.dataset.typeAnimate === 'fadeInOut') {
          popup.classList.remove('fadeOut');
          popup.classList.add('fadeIn');
        } else if (popup.dataset.typeAnimate === 'fadeIn') {
          popup.classList.remove('slideOutUp');
          popup.classList.remove('popup-slide');
          popup.classList.add('popup-fade');
          popup.classList.add('fadeIn');
        } 
      } else {
        popup.classList.remove('hide-mobile');
        popup.classList.add('show-mobile');
        overlay.style.opacity = '1';
        overlay.style.visibility = 'visible';
      }

   };

  const closeFinishModal = e => {
    if (e.type != 'keydown' || e.keyCode === 27) {
      if (window.innerWidth > 992) {
        if ((popup.dataset.typeAnimate === 'slide')) {
          popup.classList.remove('slideInDown');
          popup.classList.add('slideOutUp');
        } else if (popup.dataset.typeAnimate === 'fadeInOut') {
          popup.classList.remove('fadeIn');
          popup.classList.add('fadeOut');
        } else if (popup.dataset.typeAnimate === 'fadeIn') {
          popup.classList.add('slideOutUp');
          popup.classList.remove('fadeIn');
          popup.classList.remove('popup-fade');
          popup.classList.add('popup-slide');
        }
      } else {
        popup.classList.remove('show-mobile');
        popup.classList.add('hide-mobile');
        overlay.style.opacity = '0';
        overlay.style.visibility = 'hidden';
      }

      if (window.innerWidth > 992) {
        overlay.classList.remove('fadeIn');
        overlay.classList.add('fadeOut');
      }
    }
  };

  showFinishModal();

  for (let elem of dataClose) {
    elem.addEventListener('click', closeFinishModal);
  }

  document.addEventListener('keydown', closeFinishModal);
};

export default animateFinishPopup;
