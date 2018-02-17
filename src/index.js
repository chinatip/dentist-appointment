import React from 'react';
import ReactDOM from 'react-dom';

import App from 'components/App';
import registerServiceWorker from './registerServiceWorker';

import 'antd/dist/antd.css';
import './global.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
