const center = [55.68381882889063, 37.72960898280328];
function init () {
  const map = new ymaps.Map('map-greenGarden', {
        center,
        zoom: 18
      });

    const placemark = new ymaps.Placemark(center, {}, {
      iconLayout: 'default#image',
      iconImageHref: 'icons/iconLocationFill.svg',
      iconImageSize: [32, 45],
      iconImageOffset: [0, -30]
    });

    map.geoObjects.add(placemark);  
  }
ymaps.ready(init);

