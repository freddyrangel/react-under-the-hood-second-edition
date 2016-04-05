import React               from 'react';
import ShipInfo            from './ship-info';
import NavigationDashboard from './navigation-dashboard';
import WarpDriveControls   from './warp-drive-controls';
import CourseControl       from './course-control';

const HelmControl = (p) => {
  return <div className="helm">
    <div id="helm-header">
      <h1>Helm Control</h1>
    </div>
    <ShipInfo {...p}/>
    <NavigationDashboard ship={p.ship}/>
    <CourseControl
      starData={p.starData}
      updateDestination={p.updateDestination}/>
    <WarpDriveControls
      speed={p.ship.speed}
      updateSpeed={p.updateSpeed}
      engageWarpDrive={p.engageWarpDrive}/>
  </div>
}

export default HelmControl;
