import React from "react";
import { Switch, Route } from "react-router-dom";
import './App.css';
import 'antd/dist/antd.css';
import PageLayout from './components/layout';
import HomePage from './pages/homePage';
import PeoplePage from './pages/peoplePage';
import Profile from './pages/profilePage';

const routes = [
  {
    path: '/people',
    component: PeoplePage,
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/',
    component: HomePage,
  },
];

function App(props) {
  return (
    <PageLayout>
      <Switch>
        {routes.map((route, index) => (
          <Route
            key={route.path}
            path={route.path}
            component={route.component}
          />
        ))}
      </Switch>
    </PageLayout>
  );
}

export default App;
