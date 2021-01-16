import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import ContextProvider from './shared/context-provider/context.provider';
import App from './component/app/app';


ReactDOM.render(
  <ContextProvider>
    <App />
  </ContextProvider>,
  document.getElementById('root')
);