import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Layout from './route/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Main from './views/Main';
import MiningField from './views/MiningField';
import Resource from './views/Resource';
import Warehouse from './views/Warehouse';

function App() {

  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Redirect from="/" to="/mining_field" exact />
          <Route exact path="/main" component={() => <Main />} />
          <Route exact path="/mining_field" component={() => <MiningField />} />
          <Route exact path="/resource" component={() => <Resource />} />
          <Route exact path="/warehouse" component={() => <Warehouse />} />
          <Redirect to="/mining_field" />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
