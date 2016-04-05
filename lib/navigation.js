
// Calculates the center of the ship image, and then adjusts the center of the
// image to be at the supposed position of the ship. Otherwise, the image will
// be off center. The trick is figuring out where the center of the image is
// whe the image is rotated, and making sure you adjust correctly
export const imagePosition = (ship, heading) => {
  const pos = ship.position;
  // Because of the way an image is drawn in SVG, the center of the image is
  // always 135 degrees from direction of travel. Then we need to convert this
  // to radians to perform trig functions
  const angleToCenter = (heading + 135) % 360;
  // Since the image is 20 by 20, using the Pythagorean theorem we know the 
  // length of the line from the center of the position and the center of
  // the image is Math.sqrt(200) or about 14. Then use simple trig to figure
  // out the x and y coordinates of the center of the image.
  const xOfImage = pos[0] + 14 * Math.sin(degreesToRads(angleToCenter));
  // Need to add 180 degrees because the Y axis is inverted in SVG
  const yOfImage = pos[1] + 14 * Math.cos(degreesToRads(angleToCenter + 180));
  // Above we figured out the center of image, but we need to adjust it to the
  // position of the ship.
  const adjustedX = pos[0] + (pos[0] - xOfImage);
  const adjustedY = pos[1] + (pos[1] - yOfImage);
  return [adjustedX, adjustedY]
}

// heading is direction in degrees
export const heading = (ship) => {
  return Math.round(exactHeading(ship));
}

export const data = (ship) => {
  return {
    imagePosition : imagePosition(ship, heading(ship)),
    heading: heading(ship)
  }
}

// Just like #heading but used internally for more precision
export const exactHeading = (ship) => {
  const pos   = ship.position;
  const des   = ship.destination.position;
  // We need to use arctan to figure out the angle to face the ship
  // destination and then convert that from radians to degrees
  const angle = Math.atan2((des[0] - pos[0]), (pos[1] - des[1]));
  return (radsToDegrees(angle) + 360) % 360
}

// Gives next position on heading or slows to impulse and goes in standard
// ording if testination reaching
export const nextPositionToDestination = (ship) => {
  if (destinationReached(ship)) return ship.destination.position;
  else return nextPositionOnCurrentHeading(ship);
}

// Next position at current speed and direction regardless of whether you
// reached the destination or not
export const nextPositionOnCurrentHeading = (ship) => {
  const heading = exactHeading(ship);
  const speed   = ship.speed * 0.5;
  const pos     = ship.position;
  const x       = pos[0] + speed * Math.sin(degreesToRads(heading));
  const y       = pos[1] + speed * Math.cos(degreesToRads(heading + 180)); // SVG Y axis is inverted
  return [x, y]
}

// Returns a boolean of whether you're close enough to the destination to just
// go straight there rather than skip to next position on current heading
export const destinationReached = (ship) => {
  const dest          = ship.destination.position;
  const pos           = ship.position;
  const nextPos       = nextPositionOnCurrentHeading(ship);
  const distToDest    = Math.sqrt(
    Math.pow((dest[0] - pos[0]), 2) + Math.pow((dest[1] - pos[1]), 2)
  );
  const distToNextPos = Math.sqrt(
    Math.pow(nextPos[0] - pos[0], 2) + Math.pow(nextPos[1] - pos[1], 2)
  );
  return distToDest < distToNextPos;
}

export const radsToDegrees = (radians) => radians * (180 / Math.PI);

export const degreesToRads = (degrees) => degrees * (Math.PI / 180);
