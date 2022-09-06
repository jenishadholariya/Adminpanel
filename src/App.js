import logo from './logo.svg';
import './App.css';
import Layout from './Component/Layout/Layout';
import { Route, Switch } from 'react-router-dom';
import Medician from './Container/Medician/Medician';
import Patients from './Container/Patients/Patients';
import { Provider, useSelector } from 'react-redux'
import { configerestores } from './Redux/Store';
import Counter from './Container/Counter/Counter';
import { PersistGate } from 'redux-persist/integration/react';
import Doctor from './Container/Doctor/Doctor';
import PromiseExample from './Container/Examples/PromiseExample';

function App() {

  const {store,persistor} = configerestores();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <Switch>
            <Route path={'/Medician'} exact component={Medician}></Route>
            <Route path={'/Patients'} exact component={Patients}></Route>
            <Route path={'/Doctor'} react component={Doctor}></Route>
            <Route path={'/Counter'} react component={Counter}></Route>
            <Route path={'/Promise'} react component={PromiseExample}></Route>
          </Switch>
        </Layout>
      </PersistGate>
    </Provider>

  );
}

export default App;
