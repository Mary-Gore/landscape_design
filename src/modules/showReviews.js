const showReviews = () => {
  const checkReviews = () => {
    const reviewsArr = Array.from(document.querySelectorAll('#reviews .reviews-content')),
      showBtn = document.querySelector('#show-reviews-btn'),
      resetBtn = document.querySelector('#reset-reviews-btn'),
      step = 2;

    let item = 0;

    const even = document.querySelectorAll('#reviews .reviews-content:nth-child(even)');
    const odd = document.querySelectorAll('#reviews .reviews-content:nth-child(odd)');

    even.forEach(item => {
      item.classList.add('right');
    });

    odd.forEach(item => {
      item.classList.add('left');
    });

    reviewsArr.slice(step).forEach(review => {
      review.style.display = 'none';
    });

    item += step;

    showBtn.addEventListener('click', () => {
      const newArr = reviewsArr.slice(item, item + step);
      newArr.forEach(elem => {
        elem.style.display = 'flex';
      });

      item += step;

      if (item >= reviewsArr.length) {
        showBtn.style.display = 'none';
        resetBtn.style.display = 'flex';
      }
    });

    resetBtn.addEventListener('click', () => {
      showBtn.style.display = 'flex';
      resetBtn.style.display = 'none';

      const moreTwo = document.querySelectorAll('.reviews .reviews-content:nth-child(n+3)');
      moreTwo.forEach(elem => {
        elem.style.display = 'none';
      });
      item = step;
    });
  };
  const renderReviews = reviewsArr => {
    const reviewsBlock = document.querySelector('#reviews .reviews-block');
    reviewsArr.forEach(item => {
      const reviewsContent = document.createElement('div');
      reviewsContent.classList.add('reviews-content');
      reviewsContent.innerHTML = `
        <div class="bg-div"></div>
        <img class="reviews-img" src="${item.img.src}" alt="${item.img.alt}">
        <div class="review-wrapper">
          <div class="content-wrapper">
            <div class="header-wrapper">
              <div class="avatar-wrapper">
                <img src="${item.review.img.src}" alt="${item.review.img.alt}">
              </div>
              <p>${item.review.title}</p>
              <a href="${item.review.link}">
                <svg class="icon-VK">
                  <use xlink:href="icons/icons.svg#iconVK"></use>
                </svg>
              </a>
            </div>
            <p>${item.review.content}</p>
          </div>
        </div>
     `;
      reviewsBlock.append(reviewsContent);
    });
    checkReviews();
  };
  const getData = () => {
    fetch('https://green-garden-12786-default-rtdb.firebaseio.com/db.json')
      .then(res => res.json())
      .then(data => {
        for (const i in data[2]) {
          renderReviews(data[2][i]);

        }
      });
  };
  getData();
};

export default showReviews;
