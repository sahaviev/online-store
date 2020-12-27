/* eslint-disable no-undef */
const OSM_ATTRIBUTION = `&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>`;

const activeIcon = L.icon({
  iconUrl: `/img/pin-active.svg`,
  iconSize: [20, 30],
});

const tileLayer = L.tileLayer(
    `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
      attribution: OSM_ATTRIBUTION,
    },
);

let map;

export const initMap = (element, coordinates) => {
  if (map) {
    map.remove();
  }

  map = L.map(element, {
    center: coordinates,
    zoom: 14,
    layers: [tileLayer],
    marker: true,
  });

  L.marker(coordinates, {icon: activeIcon}).addTo(map);
};
