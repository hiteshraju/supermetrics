import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function DataTable(props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Sl No</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Post</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.posts.map((row) => (
            <TableRow
              key={row.sl_no}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{row.sl_no}</TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="left">{row.post}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}