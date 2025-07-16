import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { cashOutline, pieChartOutline, bulbOutline, walletOutline } from 'ionicons/icons';

import Transactions from './pages/Transactions';
import Analytics from './pages/Analytics';
import SavingsTips from './pages/SavingsTips';
import Wallet from './pages/Wallet';

import './i18n'; // Import untuk inisialisasi i18n
import { TransactionProvider } from './context/TransactionContext'; // pastikan path sesuai
import './App.css';

/* Core CSS */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Setup Ionic */
setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <TransactionProvider> {/* ⬅️ Bungkus semua di sini */}
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/transactions">
              <Transactions />
            </Route>
            <Route exact path="/analytics">
              <Analytics />
            </Route>
            <Route exact path="/tips">
              <SavingsTips />
            </Route>
            <Route exact path="/">
              <Redirect to="/transactions" />
            </Route>
            <Route exact path="/wallet">
             <Wallet />
            </Route>
          </IonRouterOutlet>

          <IonTabBar slot="bottom">
            <IonTabButton tab="transactions" href="/transactions">
              <IonIcon icon={cashOutline} />
              <IonLabel>Transaksi</IonLabel>
            </IonTabButton>
            <IonTabButton tab="analytics" href="/analytics">
              <IonIcon icon={pieChartOutline} />
              <IonLabel>Analisis</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tips" href="/tips">
              <IonIcon icon={bulbOutline} />
              <IonLabel>Tips</IonLabel>
            </IonTabButton>
            <IonTabButton tab="wallet" href="/wallet">
              <IonIcon icon={walletOutline} />
              <IonLabel>Dompet</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </TransactionProvider> {/* ✅ Ini harus ada */}
  </IonApp>
);

export default App;
