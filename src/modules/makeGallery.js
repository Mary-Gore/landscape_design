const makeGallery = () => {
  const showGallery = () => {
    const galleryItems = Array.from(document.querySelectorAll('.our-work .gallery-elem')),
      moreGalleryBtn = document.querySelector('#more-gallery-btn'),
      resetGalleryBtn = document.querySelector('#reset-gallery-btn'),
      step = 3;

    let item = 0;

    galleryItems.slice(step).forEach(imageItem => {
      imageItem.style.display = 'none';
      imageItem.parentNode.style.display = 'none';
    });

    item += step;

    moreGalleryBtn.addEventListener('click', () => {
      const newArr = galleryItems.slice(item, item + step);
      newArr.forEach(elem => {
        elem.style.display = 'flex';
        elem.parentNode.style.display = 'flex';
      });

      item += step;

      if (item >= galleryItems.length) {
        moreGalleryBtn.style.display = 'none';
        resetGalleryBtn.style.display = 'flex';
      }
    });

    resetGalleryBtn.addEventListener('click', () => {
      moreGalleryBtn.style.display = 'flex';
      resetGalleryBtn.style.display = 'none';

      const moreThree = document.querySelectorAll('.our-work .gallery-elem:not(.first-third)');
      moreThree.forEach(elem => {
        elem.style.display = 'none';
        elem.parentNode.style.display = 'none';
      });

      item = step;
    });


  };
  const renderGallery = images => {
    const gallery = document.querySelector('.gallery');
    if (window.innerWidth > 576) {
      gallery.classList.add('desktop');

      let wrapper,
        horizontal,
        wrapperSmallGallery,
        wrapperBigImg,
        wrapperImg,
        img;

      for (let i = 0; i < images.length; i++) {
        switch (i) {
        case 0:
          wrapper = document.createElement('div');
          wrapper.classList.add('wrapper-gallery');
          gallery.append(wrapper);
          wrapperBigImg = document.createElement('div');
          wrapperBigImg.classList.add('wrapper-big-img');
          wrapperBigImg.classList.add('left');
          wrapperBigImg.classList.add('gallery-elem');
          wrapperBigImg.classList.add('first-third');
          wrapper.append(wrapperBigImg);
          img = document.createElement('img');
          img.src = `${images[i].src}`;
          img.alt = `${images[i].alt}`;
          wrapperBigImg.append(img);
          break;
        case 1:
          wrapperSmallGallery = document.createElement('div');
          wrapperSmallGallery.classList.add('wrapper-small-gallery');
          wrapper.append(wrapperSmallGallery);
          wrapperImg = document.createElement('div');
          wrapperImg.classList.add('wrapper-img');
          wrapperImg.classList.add('gallery-elem');
          wrapperImg.classList.add('first-third');
          wrapperSmallGallery.append(wrapperImg);
          img = document.createElement('img');
          img.src = `${images[i].src}`;
          img.alt = `${images[i].alt}`;
          wrapperImg.append(img);
          break;
        case 2:
          wrapperImg = document.createElement('div');
          wrapperImg.classList.add('wrapper-img');
          wrapperImg.classList.add('gallery-elem');
          wrapperImg.classList.add('first-third');
          wrapperSmallGallery.append(wrapperImg);
          img = document.createElement('img');
          img.src = `${images[i].src}`;
          img.alt = `${images[i].alt}`;
          wrapperImg.append(img);
          break;
        case 3: case 9: case 12:
          horizontal = document.createElement('div');
          horizontal.classList.add('horizontal-small-gallery');
          gallery.append(horizontal);
          wrapperImg = document.createElement('div');
          wrapperImg.classList.add('wrapper-img');
          wrapperImg.classList.add('gallery-elem');
          horizontal.append(wrapperImg);
          img = document.createElement('img');
          img.src = `${images[i].src}`;
          img.alt = `${images[i].alt}`;
          wrapperImg.append(img);
          break;
        case 4: case 5: case 10: case 11: case 13: case 14:
          wrapperImg = document.createElement('div');
          wrapperImg.classList.add('wrapper-img');
          wrapperImg.classList.add('gallery-elem');
          horizontal.append(wrapperImg);
          img = document.createElement('img');
          img.src = `${images[i].src}`;
          img.alt = `${images[i].alt}`;
          wrapperImg.append(img);
          break;
        case 6:
          wrapper = document.createElement('div');
          wrapper.classList.add('wrapper-gallery');
          gallery.append(wrapper);
          wrapperSmallGallery = document.createElement('div');
          wrapperSmallGallery.classList.add('wrapper-small-gallery');
          wrapper.append(wrapperSmallGallery);
          wrapperImg = document.createElement('div');
          wrapperImg.classList.add('wrapper-img');
          wrapperImg.classList.add('gallery-elem');
          wrapperSmallGallery.append(wrapperImg);
          img = document.createElement('img');
            img.src = `${images[i].src}`;
            img.alt = `${images[i].alt}`;
          wrapperImg.append(img);
          break;
        case 7:
          wrapperImg = document.createElement('div');
          wrapperImg.classList.add('wrapper-img');
          wrapperImg.classList.add('gallery-elem');
          wrapperSmallGallery.append(wrapperImg);
          img = document.createElement('img');
            img.src = `${images[i].src}`;
            img.alt = `${images[i].alt}`;
          wrapperImg.append(img);
          break;
        case 8:
          wrapperBigImg = document.createElement('div');
          wrapperBigImg.classList.add('wrapper-big-img');
          wrapperBigImg.classList.add('right');
          wrapperBigImg.classList.add('gallery-elem');
          wrapper.append(wrapperBigImg);
          img = document.createElement('img');
            img.src = `${images[i].src}`;
            img.alt = `${images[i].alt}`;
          wrapperBigImg.append(img);
        }
      }
    } else {
      gallery.classList.add('mob-our-gallery');
      for (let i = 0; i < images.length; i++) {
        const slickImageDiv = document.createElement('div');
        slickImageDiv.classList.add('mob-gallery-item');
        const image = document.createElement('img');
        image.src = `${images[i].src}`;
        slickImageDiv.append(image);
        gallery.append(slickImageDiv);
      }
    }
    showGallery();
  };


  const getData = () => {
    fetch('https://green-garden-12786-default-rtdb.firebaseio.com/db.json')
      .then(res => res.json())
      .then(data =>  {
        for (const i in data[0]) {
          renderGallery(data[0][i]);
        }
      }
      );
  };
  getData();
};

export default makeGallery;
