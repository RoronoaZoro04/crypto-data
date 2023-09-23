import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid'; // Import createTheme
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles'; // Import createTheme and ThemeProvider

const columns = [
  { field: 'id', headerName: 'ID', width: 200 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'base_unit', headerName: 'Base Unit', width: 200 },
  { field: 'buy', headerName: 'Buy', width: 200 },
  { field: 'sell', headerName: 'Sell', width: 200 },
  { field: 'volume', headerName: 'Volume', width: 200 },
];

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#2196F3', // Customize the primary color
      },
      secondary: {
        main: '#FF5722', // Customize the secondary color
      },
      text: {
        primary: '#000', // Customize the text color to white
      },
      background: {
        default: '#121212', // Customize the default background color to dark
      },
    },
    typography: {
      fontFamily: 'Arial, sans-serif',
      fontWeightBold: 700,
    },
  });
export default function DataTable() {
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/getData');
      console.log(response.data);
      const rowsWithIds = response.data.map((row, index) => ({ ...row, id: index }));
      setRows(rowsWithIds);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ height: 630, width: 'auto', m: '10px', p: '10px' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          disableRowSelectionOnClick
        />
      </Box>
    </ThemeProvider>
  );
}
