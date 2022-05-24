import React from "react";

import { BrowserRouter as Router } from "react-router-dom";
import { Routes } from "./router";

import { ThemeProvider } from "theme-ui";
import { theme } from "./theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes />
      </Router>
    </ThemeProvider>
  );
};

export default App;
