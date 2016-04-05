import React from 'react';

export default class Stars extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  renderStars(star, index) {
    const circleAttr = {
      cx: star.position[0],
      cy: star.position[1],
      r: 2,
      className: 'star-circle'
    };
    const textAttr = {
      x: star.position[0] + 5,
      y: star.position[1] + 5,
      onClick: this.props.handleClick.bind(null, star),
      className: `star-name ${star.jurisdiction}`
    };
    return <g key={index}>
      <text {...textAttr}>{star.name}</text>
      <circle {...circleAttr}/>
    </g>
  }

  render() {
    return <g>{this.props.starData.map((star, index) => this.renderStars(star, index))}</g>
  }
}
