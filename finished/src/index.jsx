import            './index.scss';
import React      from 'react';
import ReactDOM   from 'react-dom';
import Game       from './components/game';
import Perf       from 'react-addons-perf';

window.Perf = Perf;

ReactDOM.render(<Game />, document.getElementById('app'));
