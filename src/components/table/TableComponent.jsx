import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  Paper,
  Checkbox,
  Box,
  TableSortLabel,
  TextField,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

const TableComponent = ({ headers, data, title, showCheckBox, showFilter }) => {
  const [filter, setFilter] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState(0);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSelectRow = (index) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(index)
        ? prevSelectedRows.filter((i) => i !== index)
        : [...prevSelectedRows, index]
    );
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const filteredData = data.filter((row) =>
    row.some((cell) =>
      cell.toString().toLowerCase().includes(filter.toLowerCase())
    )
  );

  const sortedData = stableSort(filteredData, getComparator(order, orderBy));

  const getStatusStyle = (status) => {
    switch (status) {
      case 'active':
        return {
          backgroundColor: '#bbf7d0',
          color: '#30415F',
          padding: '2px 8px',
          borderRadius: '4px',
        };
      case 'on leave':
        return {
          backgroundColor: '#fecaca',
          color: '#30415F',
          padding: '2px 8px',
          borderRadius: '4px',
        };
      case 'other':
        return {
          backgroundColor: '#e5e7eb',
          color: '#30415F',
          padding: '2px 8px',
          borderRadius: '4px',
        };
      case 'New':
        return {
          color: 'blue',
        };
      case 'Approved':
        return {
          color: 'green',
        };
      case 'Declined':
        return {
          color: 'red',
        };
    }
  };

  return (
    <Box sx={{ width: '100%', overflowX: 'auto', height: '100%' }}>
      <TableContainer component={Paper}>
        <h1 className="text-blue font-semibold">{title}</h1>
        {showFilter && (
          <TextField
            label="Filter by Column"
            variant="outlined"
            value={filter}
            onChange={handleFilterChange}
            style={{ margin: '10px' }}
          />
        )}
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {showCheckBox && (
                <TableCell
                  padding="checkbox"
                  sx={{
                    fontWeight: 'bold',
                    backgroundColor: 'background.paper',
                  }}
                >
                  {/* <Checkbox /> */}
                </TableCell>
              )}
              {headers.map((header, index) => (
                <TableCell
                  key={index}
                  sortDirection={orderBy === index ? order : false}
                  sx={{
                    fontWeight: 'bold',
                    backgroundColor: 'background.paper',
                    position: 'sticky',
                    top: 0,
                    color: '#30415F',
                    zIndex: 1,
                  }}
                >
                  <TableSortLabel
                    active={orderBy === index}
                    direction={orderBy === index ? order : 'asc'}
                    onClick={(event) => handleRequestSort(event, index)}
                  >
                    {header}
                    {orderBy === index ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc'
                          ? 'sorted descending'
                          : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  hover
                  role="checkbox"
                  aria-checked={selectedRows.includes(rowIndex)}
                  selected={selectedRows.includes(rowIndex)}
                  onClick={() => handleSelectRow(rowIndex)}
                >
                  {showCheckBox && (
                    <TableCell padding="checkbox">
                      <Checkbox checked={selectedRows.includes(rowIndex)} />
                    </TableCell>
                  )}
                  {row.map((cell, cellIndex) => (
                    <TableCell
                      key={cellIndex}
                      sx={{
                        fontWeight:
                          headers[cellIndex] === 'Status' ? 'font-bold' : 400,
                        fontFamily: 'Poppins, sans-serif',
                      }}
                    >
                      {headers[cellIndex] === 'Status' ? (
                        <span style={getStatusStyle(cell)}>{cell}</span>
                      ) : (
                        cell
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={headers.length + 1}
                count={filteredData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableComponent;
