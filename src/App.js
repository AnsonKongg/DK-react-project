import React from "react";
import { Switch, Route } from "react-router-dom";
import './App.css';
import 'antd/dist/antd.css';
import PageLayout from './components/layout';
import HomePage from './pages/event/homePage';
import EventDetailPage from './pages/event/eventDetailPage';
import CreateEventPage from './pages/event/createEventPage';
import PeoplePage from './pages/peoplePage';
import Profile from './pages/profilePage';
import Login from './pages/loginPage';
import Signup from './pages/signupPage';

const routes = [
  {
    path: '/eventDetail/:eventId',
    component: EventDetailPage,
  },
  {
    path: '/createEvent',
    component: CreateEventPage,
  },
  {
    path: '/people',
    component: PeoplePage,
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/signup',
    component: Signup
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
