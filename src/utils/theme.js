// theme.js
import { createTheme } from '@mui/material/styles';

// Escala de corner radius que crece con el tamaño del componente
// (mantiene la misma suavidad visual a distintas escalas).
//   xs → 12px  botones, tags
//   sm → 16px  cards, inputs
//   md → 24px  modals, paneles
export const radii = { xs: 12, sm: 16, md: 24 };

export const lightTheme = createTheme({
  shape: { borderRadius: radii.sm },
  radii,
  palette: {
    mode: 'light',
    primary: { main: '#ffffffff' },
    secondary: { main: '#000000ff' },
    background: { default: '#F2F2F2' },
    textPrimary: '#000000ff',
    textSecondary: '#d1d1d1ff',
    textAccent: '#0081C7',
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: { fontSize: '3rem' },
  },
});

export const darkTheme = createTheme({
  shape: { borderRadius: radii.sm },
  radii,
  palette: {
    mode: 'dark',
    primary: { main: '#90caf9' },
    secondary: { main: '#f48fb1' },
    background: { default: '#121212' },
    textPrimary: '#000000ff',
    textSecondary: '#0081C7',
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: { fontSize: '3rem' },
  },
});
