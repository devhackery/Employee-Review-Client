import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './store';
// import App from './containers/app';
import Routers from './routers'

import 'sanitize.css/sanitize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './index.css';
 
import './css/easy-responsive-tabs.css';
import './css/super-staff.css';
// import './css/agency.css';


const target = document.querySelector('#root');

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Routers />
      </div>
    </ConnectedRouter>
  </Provider>,
  target
);
