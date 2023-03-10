import './css/style.css';
import "./plugins/jQuery/slider.js";
import "./plugins/jQuery/slick.min.js";
import "./plugins/yandex maps/map.js";
import toggleMenu from "./modules/toggleMenu";
import smoothScroll from "./modules/smoothScroll";
import makeGallery from "./modules/makeGallery";
import showCards from "./modules/showCards";
import sendForm from "./modules/sendForm";
import showReviews from "./modules/showReviews";
import popupAnimate from "./modules/popupAnimate";

toggleMenu();
smoothScroll();
makeGallery();
popupAnimate();
showCards();
sendForm('feedback-form');
sendForm('callback-form');
sendForm('application-form');
showReviews();
