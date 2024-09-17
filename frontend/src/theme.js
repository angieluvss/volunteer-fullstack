import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f68181', // Primary color for buttons
    },
    secondary: {
      main: '#febac2', // Secondary color (matches the gradient start)
    },
  },
  typography: {
    h1: {
      fontSize: '2.5rem',
      fontWeight: '600',
      textAlign: 'center',
      color: '#ff4d4d',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: '600',
      color: '#ff4d4d',
    },
    body1: {
      fontSize: '1rem',
      color: '#333',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'linear-gradient(to right, #feb8c0, #f68181)', // Apply the gradient globally
          minHeight: '100vh',
          margin: 0,
          padding: 0,
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          backgroundColor: '#fefafa',
          padding: '40px',
          borderRadius: '20px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          marginTop: '20px',
          width: '100%',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '12px',
          border: '1px solid #fdfbfb',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          transition: 'background-color 0.3s ease', // Smooth transition for hover
          '&:hover': {
            backgroundColor: '#e21c34', // Hover color for the button
          },
        },
        contained: {
          backgroundColor: '#f68181',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#e21c34', // Hover color for contained buttons
          },
        },
        outlined: {
          borderColor: '#f68181',
          color: '#f68181',
          '&:hover': {
            borderColor: '#e21c34', // Hover color for outlined buttons
            color: '#e21c34', // Text color on hover for outlined buttons
          },
        },
      },
    },
  },
});

export default theme;
