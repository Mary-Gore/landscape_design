import animateFinishPopup from "./animateFinishPopup";

const sendForm = formId => {
  const form = document.getElementById(formId),
    elementsArr = [],
    statusMessage = document.createElement('div'),
    errorMessage = 'Что-то пошло не так...',
    btnSubmit = form.querySelector('button[type="submit"]');

  let statusName = false,
    statusPhone = false,
    statusCheckbox = true,
    statusAddress = false,
    statusDate = false;

  // Валидация
  const checkName = name => {
    const namePattern = /^[а-яё]+$/i;
    name.value = name.value.replace(/\s*/gim, '');
    if (namePattern.test(name.value)) {
      const lowerName = name.value.toLowerCase();
      name.value = lowerName.replace(/(^[а-яё])/, match => match.toUpperCase());
      return true;
    }
  };

  const checkPhone = phone => {
    const phonePattern = /^((8|\+7)[\s-]?)?(\(?\d{3}\)?[\s-]?)(\d{3}[\s-]?)(\d{2}[\s-]?)\d{2}$/;
    phone.value = phone.value.replace(/\s*/gim, '');
    if (phonePattern.test(phone.value)) {
      return true;
    }
  };

  const checkChecked = checkbox => {
    if (checkbox.checked) {
      return true;
    }
  };

  const checkBtn = () => {
    if (((form.id === 'feedback-form' || form.id === 'callback-form')
      && !(statusName && statusPhone && statusCheckbox))
      || (form.id === 'application-form' && !(statusName && statusPhone &&
        statusCheckbox && statusAddress && statusDate))) {
      btnSubmit.classList.remove('active');
      btnSubmit.classList.add('disable');
      btnSubmit.disabled = true;
    } else {
      btnSubmit.classList.remove('disable');
      btnSubmit.classList.add('active');
      btnSubmit.disabled = false;
    }

  };

  for (const elem of form.elements) {
    if (elem.tagName.toLowerCase() !== 'button' &&
      elem.type !== 'button') {
      elementsArr.push(elem);
    }
  }

  elementsArr.forEach(item => {
    if (item.type !== 'checkbox' && item.value === '') {
      if (item.classList.contains('user-name')) {
        statusName = false;
        checkBtn();
      } else if (item.classList.contains('phone')) {
        statusPhone = false;
        checkBtn();
      } else if (item.classList.contains('address')) {
        statusAddress = false;
        checkBtn();
      } else if (item.classList.contains('date')) {
        statusDate = false;
        checkBtn();
      }
    }

    const addError = checkedItem => {
      const parentElem = checkedItem.parentNode,
        errorSpan = parentElem.querySelector('.error-span');

      errorSpan.style.display = 'block';

      if (checkedItem.type !== 'checkbox') {
        checkedItem.classList.remove('valid');
        checkedItem.classList.add('invalid');
        checkedItem.parentNode.classList.remove('valid');
        checkedItem.parentNode.classList.add('invalid');

        if (checkedItem.value !== '') {
          if (checkedItem.classList.contains('user-name')) {
            errorSpan.textContent = 'Допускается только кириллица';
          } else if (checkedItem.classList.contains('phone')) {
            errorSpan.textContent = 'Недопустимый формат';
          }
        } else {
          errorSpan.textContent = 'Заполните обязательное поле';
        }
      } else if (checkedItem.type === 'checkbox' && !checkedItem.checked) {
        errorSpan.textContent = 'Согласитесь с условиями';
      }
    };

    const removeError = checkedItem => {
      const parentElem = checkedItem.parentNode,
        errorSpan = parentElem.querySelector('.error-span');

      if (checkedItem.type !== 'checkbox') {
        checkedItem.classList.remove('invalid');
        checkedItem.classList.add('valid');
        checkedItem.parentNode.classList.remove('invalid');
        checkedItem.parentNode.classList.add('valid');
      }

      errorSpan.textContent = '';
      errorSpan.style.display = 'none';
    };

    item.addEventListener('blur', event => {
      if (event.target.classList.contains('user-name')) {
        if (!checkName(event.target)) {
          statusName = false;
          addError(event.target);
          checkBtn();
        } else {
          statusName = true;
          removeError(event.target);
          checkBtn();
        }
      } else if (event.target.classList.contains('phone')) {
        if (!checkPhone(event.target)) {
          statusPhone = false;
          addError(event.target);
          checkBtn();
        } else {
          statusPhone = true;
          removeError(event.target);
          checkBtn();
        }
      } else if (event.target.classList.contains('address')) {
        if (event.target.value !== '') {
          statusAddress = true;
          removeError(event.target);
        } else {
          statusAddress = false;
          addError(event.target);
        }
      }
    });

    item.addEventListener('change', event => {
      if (event.target.type === 'checkbox') {
        if (!checkChecked(event.target)) {
          statusCheckbox = false;
          addError(event.target);
          checkBtn();
        } else {
          statusCheckbox = true;
          removeError(event.target);
          checkBtn();
        }
      } else if (event.target.classList.contains('date')) {
        if (event.target.value !== '') {
          statusDate = true;
          removeError(event.target);
          checkBtn();
        } else {
          statusDate = false;
          addError(event.target);
          checkBtn();
        }
      }
    });

    if (window.innerWidth < 993) {
      if (item.classList.contains('date')) {
        item.addEventListener('focus', () => {
          item.type = 'date';
        });

        item.addEventListener('blur', () => {
          item.type = 'text';
          item.placeholder = 'дд.мм.гггг';
        });
      }
    }
  });


  form.addEventListener('submit', event => {
    event.preventDefault();
    form.parentNode.append(statusMessage);

    btnSubmit.classList.remove('active');
    btnSubmit.classList.add('disable');
    btnSubmit.disabled = true;

    statusMessage.innerHTML = `<img class='img-preloader' src='./icons/iconSpinnerAnimated.svg'/>`;
    statusMessage.style.textAlign = 'center';
    if (form.id !== 'feedback-form') {
      statusMessage.style.marginTop = '30px';
    }

    const formData = new FormData(form),
      body = {};

    formData.forEach((key, val) => {
      body[key] = val;
    });

    const postData = body => {
      return fetch('server.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
    }

    postData(body)
      .then(response => {
        [...form.elements].forEach(item => item.value = '');

        const btnSubmit = form.querySelector('button[type="submit"]'),
          popup = document.getElementById(btnSubmit.dataset.finishPopup);

        if (response.status !== 200) {
          statusMessage.textContent = errorMessage;
          statusMessage.style.cssText = `
             margin-top: 30px;
             font-size: 16px;
             text-align: center;
          `;
          if (form.id === 'feedback-form') {
            statusMessage.style.color = '#fff';
          } else {
            statusMessage.style.color = '#000';
          }
      
          throw new Error('status network is not 200');
        } else {
          if (form.classList.contains('feedback-form')) {
            if (popup.classList.contains('finish-popup')) {
              popup.dataset.typeAnimate = 'slide';
            }
          } else {
            if (popup.classList.contains('finish-popup')) {
              popup.dataset.typeAnimate = 'fadeIn';
            }
          }
          animateFinishPopup(popup);
          if (document.querySelector('.popup').classList.contains('open-prev')) {
            document.querySelector('.popup.open-prev').visibility = 'hidden';
            document.querySelector('.popup.open-prev').opacity = '0';
          };

          statusMessage.textContent = '';
          statusMessage.style.display = 'none';
        }
      })
      .catch(error => {
        console.error(error);
      });
  });
};

export default sendForm;
