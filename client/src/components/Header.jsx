import React from 'react';
import styled, { css } from 'styled-components';
import { useHistory, useLocation } from 'react-router-dom';

const routes = [
  { href: '/users/list', title: 'Users List' },
  { href: '/users/create', title: 'Create User' },
];
const Header = () => {
  const history = useHistory();
  const location = useLocation();

  const redirectToRoute = (route) => {
    history.push(route);
  };

  const isRouteSelected = (route) => {
    const currentRoute = location.pathname;
    return route === currentRoute;
  };

  return (
    <StyledNav>
      {routes.map((route) => {
        return (
          <StyledDiv
            key={route.href}
            selected={isRouteSelected(route.href)}
            onClick={() => redirectToRoute(route.href)}
          >
            {route.title}
          </StyledDiv>
        );
      })}
    </StyledNav>
  );
};

export default Header;

const StyledNav = styled.nav`
  display: flex;
  justify-content: start;
  padding: 20px;
  background: #b69e9e;
`;

const StyledDiv = styled.div`
  margin-right: 20px;
  cursor: pointer;
  border-bottom: 1px solid transparent;
  transition: border-bottom 0.3s;

  &:hover {
    border-color: black;
  }

  ${({ selected }) =>
    selected &&
    css`
      transform: scale(1.2);
      transition: transform 0.3s;
    `};
`;
