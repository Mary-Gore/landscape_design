const showCards = () => {

  const controlCards = () => {
    const cardWrappers = document.querySelectorAll('#tasks .card-wrapper');

    for (let i = 0; i < cardWrappers.length; i++) {
      if (window.innerWidth > 1299) {
        if (i === 2 || i === 5 || i === 8 || i === 11 || i === 14 || i === 17)
          continue;
        cardWrappers[i].style.marginRight = '48px';
      } else if (window.innerWidth > 1191 && window.innerWidth < 1300) {
        if (i === 2 || i === 5 || i === 8 || i === 11)
          continue;
        cardWrappers[i].style.marginRight = '30px';
      }   else if (window.innerWidth > 1171 && window.innerWidth < 1192) {
        if (i === 2 || i === 5 || i === 8 || i === 11)
          continue;
        cardWrappers[i].style.marginRight = '20px';
      }  else if (window.innerWidth > 992 && window.innerWidth < 1172) {
        if (i === 1 || i === 3 || i === 5 || i === 7 || i === 9 || i === 11)
          continue;
        cardWrappers[i].style.marginRight = '20px';
      }  else if (window.innerWidth > 576 && window.innerWidth < 993) {
        if (i === 1 || i === 3 || i === 5 || i === 7 || i === 9 || i === 11)
          continue;
        cardWrappers[i].style.marginRight = '20px';
      }
    }
  };

  const checkCards = () => {
    const cardsArr = Array.from(document.querySelectorAll('#tasks .card-wrapper')),
      showBtn = document.querySelector('#show-btn'),
      resetBtn = document.querySelector('#reset-btn'),
      step = 6;

    let item = 0;

    //Скрыть эл-ты, начиная с 7-го по кол-ву (индекс 6)
    cardsArr.slice(step).forEach(card => {
      card.style.display = 'none';
    });

    item += step;

    showBtn.addEventListener('click', () => {
      // Вывод с 7-го по 12 эл-ты по кол-ву (6, 11 индексы)
      const newArr = cardsArr.slice(item, item + step);
      newArr.forEach(elem => {
        elem.style.display = 'flex';
      });

      item += step;

      if (item >= cardsArr.length) {
        showBtn.style.display = 'none';
        resetBtn.style.display = 'flex';
      }
    });

    resetBtn.addEventListener('click', () => {
      showBtn.style.display = 'flex';
      resetBtn.style.display = 'none';

      const moreSix = document.querySelectorAll('#tasks .card-wrapper:nth-child(n+7)');
      moreSix.forEach(elem => {
        elem.style.display = 'none';
      });
      item = step;
    });
  };


  const renderCards = cardsArr => {
    const cards = document.querySelector('#tasks .cards');
    cardsArr.forEach(cardItem => {
      const card = document.createElement('div');
      card.classList.add('card-wrapper');
      card.innerHTML = `
       <div class="img-card">
          <img src="/src/${cardItem.img}" alt="${cardItem.alt}">
        </div>
        <div class="wrapper-card-titles">
          <div class="card-titles">
            <p>${cardItem.title}</p>
            <p>${cardItem.subtitle}</p>
        </div>
      `;
      cards.append(card);
    });
    if (window.innerWidth > 576) {
      controlCards();
      checkCards();
    }
  };

  const getData = () => {
    fetch('https://green-garden-12786-default-rtdb.firebaseio.com/db.json')
      .then(res => res.json())
      .then(data => {
        for (const i in data[1]) {
          return renderCards(data[1][i]);
        }
      });
  };
  getData();
};

export default showCards;