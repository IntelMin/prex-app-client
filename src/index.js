import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import configureStore from './redux';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import { UseWalletProvider } from 'use-wallet';
import { WEB3_PROVIDER_URL } from './config';
import { WalletProvider } from './components/contexts';

ReactDOM.render(
  <UseWalletProvider
    chainId={42}
    connectors={{
      walletconnect: {
        rpcUrl: WEB3_PROVIDER_URL
      }
    }}
  >
    <Provider store={configureStore()}>
      <WalletProvider>
        <App />
      </WalletProvider>
    </Provider>
  </UseWalletProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
