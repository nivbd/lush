export const getTableRows = (data, headers) => {
  return data.map((user) => {
    const { id } = user;
    const cellValues = headers.map((header) => {
      const { objectKey } = header;
      return user[objectKey] || '';
    });
    return {
      id,
      cells: cellValues,
    };
  });
};
