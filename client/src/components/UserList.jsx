import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useCallApi } from '../customHooks/useFetch';
import { getUsers } from '../services/api';
import { getTableRows } from '../utils/table';
import LoadingButton from '../widgets/LoadingButton';
import Table from './Table';

const tableHeaders = [
  { id: 0, name: 'First name', objectKey: 'first_name' },
  { id: 1, name: 'Last name', objectKey: 'last_name' },
  { id: 2, name: 'Email', objectKey: 'email' },
  { id: 3, name: 'Description', objectKey: 'description' },
];

const PAGINATE_LIMIT = 15;

const UserList = () => {
  const [users, setUsers] = useState([]);
  const {
    dispatchApiCall: getUsersList,
    data,
    loading,
  } = useCallApi({
    apiFunction: getUsers,
  });

  useEffect(() => {
    getUsersList({ page: 1, limit: PAGINATE_LIMIT });
  }, [getUsersList]);

  useEffect(() => {
    if (!data?.docs) return;
    setUsers((prev) => [...prev, ...data.docs]);
  }, [data]);

  const loadMore = () => {
    if (!data?.nextPage) return;
    getUsersList({ page: data.nextPage, limit: PAGINATE_LIMIT });
  };

  const renderContent = () => {
    if (loading) return <div>Loading...</div>;
    return (
      <Table headers={tableHeaders} rows={getTableRows(users, tableHeaders)} />
    );
  };

  const isFirstDataInitialized = users.length > 0;
  const buttonDisabled = !isFirstDataInitialized || !data?.nextPage;

  return (
    <Wrapper>
      <Title>Users List</Title>
      <LoadingButton
        customStyle={{ marginTop: '30px' }}
        disabled={buttonDisabled}
        type='button'
        onClick={loadMore}
      >
        See more
      </LoadingButton>
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
