import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs) {
  return { name, calories, fat, carbs };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24),
  createData('Ice cream sandwich', 237, 9.0, 37),
  createData('Eclair', 262, 16.0, 24),
  createData('Cupcake', 305, 3.7, 67),
  createData('Gingerbread', 356, 16.0, 49),
];

const TableComp = ({ headers, rows }) => {
  const renderHeaders = () => {
    return headers.map((headerData) => {
      const { name, id } = headerData;
      return <TableCell key={`HEADER_${id}`}>{name}</TableCell>;
    });
  };

  const renderRows = () => {
    if (!rows) return null;

    return rows.map((rowData) => {
      const { id, cells } = rowData;
      return (
        <TableRow
          key={`ROW_${id}`}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          {cells.map((cell) => {
            return <TableCell>{cell}</TableCell>;
          })}
        </TableRow>
      );
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>{renderHeaders()}</TableRow>
        </TableHead>
        <TableBody>{renderRows()}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComp;
