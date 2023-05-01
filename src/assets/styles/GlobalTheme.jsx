const { ThemeProvider } = require('styled-components');

const GlobalTheme = ({ children }) => {
  const theme = {
    color: {
      primaryColor: '#000',
      secondColor: '#fff',
      backgroundColor: '#ad890c'
    }
  };
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default GlobalTheme;
