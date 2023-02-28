import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './index.scss';
import { injectStore } from './shared/api/axios';
import { BrowserRouter, HashRouter } from 'react-router-dom';
const container = document.getElementById('root');
if (process.env.REACT_APP_ENV_NAME !== 'local')
    console.log = function no_console() {
        return;
    };

if (container) {
    const root = createRoot(container);
    root.render(
        <React.StrictMode>
            <Provider store={store}>
                {process.env.HASH_ROUTER === 'true' ? (
                    <HashRouter>
                        <App />
                    </HashRouter>
                ) : (
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                )}
            </Provider>
        </React.StrictMode>,
    );
    injectStore(store);
}
