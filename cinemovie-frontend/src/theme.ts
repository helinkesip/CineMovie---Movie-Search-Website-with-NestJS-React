import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark', // koyu modda kalmak için
    background: {
      default: '#2e2e2e',  // Buraya biraz açık koyu gri tonları verebilirsin, örneğin: '#2e2e2e', '#3a3a3a' veya '#424242'
    },
    primary: {
      main: '#7e57c2',  // mor ton
    },
    text: {
      primary: '#ffffff',
      secondary: '#bbbbbb',
    },
  },
});

export default theme;
