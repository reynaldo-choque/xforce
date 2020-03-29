import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {IntlProvider} from 'react-intl';
import spanish from "./intl18/spanish.json"

import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <IntlProvider locale='es' messages={spanish}>
        <App />
    </IntlProvider>
    , document.getElementById('root'));
