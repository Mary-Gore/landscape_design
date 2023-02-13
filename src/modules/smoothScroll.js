import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();

const smoothScroll = () => {
  const scrollElems = document.querySelectorAll('a[href^="#"]:not(a[href="#"])');

  scrollElems.forEach(link => {
     link.addEventListener('click', event => {
      event.preventDefault();

      const id = link.getAttribute('href').substring(1);

   document.getElementById(id).scrollIntoView({behavior: 'smooth'});
    });
  }); 
};

export default smoothScroll;
