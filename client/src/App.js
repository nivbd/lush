import React from 'react';
import styled, { css } from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import UserList from './components/UserList';
import Header from './components/Header';
import CreateUser from './components/CreateUser';

const App = () => {
  return (
    <Router>
      <Layout>
        <Header />
        <Content>
          <Switch>
            <Route path='/users/list'>
              <UserList />
            </Route>
            <Route path='/users/create'>
              <CreateUser />
            </Route>
            <Redirect from='/' to='/users/list' />
          </Switch>
        </Content>
      </Layout>
    </Router>
  );
};

export default App;

const Layout = styled.div`
  min-height: 100vh;
  min-width: fit-content;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex: 1;
  padding-top: 20px;
`;
