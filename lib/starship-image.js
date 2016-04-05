import {data} from './navigation.js';

export const renderShipImageAsString = (ship) => {
  const navData       = data(ship);
  const shipPosition  = ship.position;
  const imagePosition = navData.imagePosition;
  const heading       = navData.heading;
  const imageInText   = '<image xlink:href="/images/starship.png"' +
    // Image Position
    'x="' + imagePosition[0] + '" y="' + imagePosition[1] +
    // Rotation Angle
    '" transform="rotate(' + heading + ' ' +
    // Rotation Center
    imagePosition[0]+ ' ' + imagePosition[1] + ')"' +
    // Size of Image
    ' height="20px" width="20px" />'
  return imageInText;
}
