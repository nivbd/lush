import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useCallApi } from '../customHooks/useFetch';
import { getUsers } from '../services/api';
import Table from './Table';

const tableHeaders = [
  { id: 0, name: 'First name', objectKey: 'first_name' },
  { id: 1, name: 'Last name', objectKey: 'last_name' },
  { id: 2, name: 'Email', objectKey: 'email' },
  { id: 3, name: 'Description', objectKey: 'description' },
];

const UserList = () => {
  const { dispatchApiCall, data, loading } = useCallApi({
    apiFunction: getUsers,
  });

  useEffect(() => {
    dispatchApiCall();
  }, [dispatchApiCall]);

  const getTableRows = () => {
    if (!data) return;

    return data.map((user) => {
      const { id } = user;
      const cellValues = tableHeaders.map((header) => {
        const { objectKey } = header;
        return user[objectKey] || '';
      });
      return {
        id,
        cells: cellValues,
      };
    });
  };

  const renderContent = () => {
    if (loading) return <div>Loading...</div>;
    return <Table headers={tableHeaders} rows={getTableRows()} />;
  };

  return (
    <Wrapper>
      <Title>Users List</Title>
      <Content>{renderContent()}</Content>
    </Wrapper>
  );
};

export default UserList;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  margin: 0;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  width: 80%;
  margin-top: 20px;
  margin-bottom: 20px;
`;
