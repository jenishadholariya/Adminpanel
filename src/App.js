import logo from './logo.svg';
import './App.css';
import Layout from './Component/Layout/Layout';
import { Route, Switch } from 'react-router-dom';
import Medician from './Container/Medician/Medician';
import Patients from './Container/Patients/Patients';
import Appoinment from './Container/Appointment-form/Appoinment';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path={'/Medician'} exact component={Medician}></Route>
        <Route path={'/Patients'} exact component={Patients}></Route>
        <Route path={'/Appoinment'} react component={Appoinment}></Route>
      </Switch>
    </Layout>
  );
}

export default App;
