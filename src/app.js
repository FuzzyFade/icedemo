import { runApp } from 'ice';
import React from 'react';
import { Provider } from 'react-redux';
import { getLocale } from './utils/locale';
import { ConnectedRouter } from 'react-router-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { createHashHistory } from 'history';

import configureStore from './configureStore';
import LanguageProvider from './components/LocaleProvider';

import 'moment/locale/zh-cn';

const history = createHashHistory();
const { store, persistor } = configureStore(history);
const locale = getLocale() || 'zh-CN'; // TODO 强制取中文语言

const appConfig = {
  app: {
    rootId: 'ice-container',
    addProvider: ({ children }) => (
      <LanguageProvider locale={locale}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ConnectedRouter history={history}>{children}</ConnectedRouter>
          </PersistGate>
        </Provider>
      </LanguageProvider>
    )
  },
  router: {
    basename: '/',
  },
};

runApp(appConfig);