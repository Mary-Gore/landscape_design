const popupAnimate = () => {
  const dataPopupsBtns = document.querySelectorAll('[data-simple-popup]');
  if (dataPopupsBtns.length === 0) return;

  const overlay = document.querySelector('.overlay'),
    popups = document.querySelectorAll('[data-type="simple"]'),
    dataClose = document.querySelectorAll('[data-closed]');

  let isOpen = false;

  const modalShow = popup => {
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


    isOpen = true;
    return isOpen;
  };

  const modalClose = e => {
    //  Если открыто окно (isOpen === true) 
    // и если нет события нажатия клавиши, а клик по крестику
    // или нажата клавиша Esc (её код — 27).
    if (isOpen && (e.type != 'keydown' || e.keyCode === 27)) {
      for (let popup of popups) {
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
      }

      if (window.innerWidth > 992) {
        overlay.classList.remove('fadeIn');
        overlay.classList.add('fadeOut');
      }

      isOpen = false;
      return isOpen;
    }
  };

  for (let elem of dataPopupsBtns) {
    elem.addEventListener('click', () => {
      let popup = document.getElementById(elem.dataset.simplePopup);
      modalShow(popup);
    });
  }


  for (let elem of dataClose) {
    elem.addEventListener('click', modalClose);
  }

  document.addEventListener('keydown', modalClose);
};

export default popupAnimate;
