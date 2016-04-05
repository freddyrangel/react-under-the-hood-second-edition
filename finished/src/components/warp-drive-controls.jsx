import React           from 'react';
import EditableElement from './editable-element';

const WarpDriveControls = (p) => {
  return <div className="navigational-controls">
    <h2>Warp Drive</h2>
    <span>WARP:</span>
    <EditableElement value={p.speed} onEdit={updateSpeed.bind(this, p)}/>
    <div className="arrow-controls">
      <button onClick={incrementSpeed.bind(this, p, 1)}>&#11014;</button>
      <button onClick={incrementSpeed.bind(this, p, -1)}>&#11015;</button>
    </div>
    <div className="engage">
      <button onClick={p.engageWarpDrive}>Engage</button>
    </div>
  </div>
};

const updateSpeed = (p, speed) =>{
  const newSpeed = parseFloat(speed, 10);
  if (0 <= newSpeed && newSpeed < 10) p.updateSpeed(newSpeed);
}

const incrementSpeed = (p, dSpeed) => {
  const currentSpeed = p.speed;
  const newSpeed = Math.floor(currentSpeed + dSpeed);
  if (0 <= newSpeed && newSpeed < 10) p.updateSpeed(newSpeed);
}

export default WarpDriveControls;
