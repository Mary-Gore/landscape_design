/* eslint-disable no-undef */
$(() => {
  // Slick-slider for cards
  window.addEventListener("resize", () => {
    if (window.innerWidth < 577) {
      $('.cards').not('.slick-initialized').slick({
        dots: true,
        arrows: false,
        infinite: true,
        speed: 300,
        settings: {
          slidesToShow: 1,
          touchTreshold: 10,
          centerMode: true,
          vertical: false,
          verticalSwiping: false
        }
      });
    } else {
      $('.cards').filter('.slick-initialized').slick('unslick');
    }
  });

  // Slick-slider for gallery
  window.addEventListener("resize", () => {
    if (window.innerWidth < 577) {
      $('.mob-our-gallery').not('.slick-initialized').slick({
        dots: false,
        arrows: false,
        infinite: true,
        speed: 300,
        settings: {
          slidesToShow: 1,
          touchTreshold: 10,
          centerMode: false,
          vertical: false,
          verticalSwiping: false
        }
      });
    } else {
      $('.mob-our-gallery').filter('.slick-initialized').slick('unslick');
    }
  });

  // Slick-slider for reviews
  window.addEventListener("resize", () => {
    if (window.innerWidth > 576 && window.innerWidth < 993) {
      $('.reviews-block').not('.slick-initialized').slick({
        dots: true,
        arrows: false,
        infinite: true,
        speed: 300,
        settings: {
          slidesToShow: 1,
          touchTreshold: 10,
          centerMode: true,
          vertical: false,
          verticalSwiping: false,
        }
      });
    } else {
      $('.reviews-block').filter('.slick-initialized').slick('unslick');
    }
  });

});
