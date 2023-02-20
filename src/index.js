import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {GlobalStateProvider} from './storage/GlobalStateProvider';

ReactDOM.render(<GlobalStateProvider><App /></GlobalStateProvider>, document.getElementById('root'));