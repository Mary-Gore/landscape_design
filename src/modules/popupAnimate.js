const popupAnimate = () => {
  const dataPopupsBtns = document.querySelectorAll('[data-simple-popup]');
  if (dataPopupsBtns.length === 0) return;

  const overlay = document.querySelector('.overlay'),
    popups = document.querySelectorAll('[data-type="simple"]'),
    dataClose = document.querySelectorAll('[data-closed]'),
    forms = document.querySelectorAll('form');


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
      }
    } else {
      popup.classList.remove('hide-mobile');
      popup.classList.add('show-mobile');
      overlay.style.visibillity = 'visible';
      overlay.style.opacity = '1';
    }

    popup.classList.add('is-open');
  };

  const modalClose = e => {
    //  Если открыто окно (isOpen === true) 
    // и если нет события нажатия клавиши, а клик по крестику
    // или нажата клавиша Esc (её код — 27).
    for (let popupElem of popups) {
      if (popupElem.classList.contains('is-open') && (e.type !== 'keydown' || e.keyCode === 27)) {
        if (window.innerWidth > 992) {
          if ((popupElem.dataset.typeAnimate === 'slide')) {
            popupElem.classList.remove('slideInDown');
            popupElem.classList.add('slideOutUp');
          } else if (popupElem.dataset.typeAnimate === 'fadeInOut') {
            popupElem.classList.remove('fadeIn');
            popupElem.classList.add('fadeOut');
          }
        } else {
          popupElem.classList.remove('show-mobile');
          popupElem.classList.add('hide-mobile');
          overlay.style.visibillity = 'hidden';
          overlay.style.opacity = '0';
        }

        if (window.innerWidth > 992) {
          overlay.classList.remove('fadeIn');
          overlay.classList.add('fadeOut');
        }

        popupElem.classList.remove('is-open');
      }
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
