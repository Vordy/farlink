import React from "react";

import { BrowserRouter as Router } from "react-router-dom";
import { Routes } from "./router";

import { ThemeProvider } from "theme-ui";
import { theme } from "./theme";
import { NetState, usePeerNet } from "./components/PeerNetwork";

const App = () => {
  const PeerNet = usePeerNet();

  return (
    <ThemeProvider theme={theme}>
      <NetState.Provider value={PeerNet}>
        <Router>
          <Routes />
        </Router>
      </NetState.Provider>
    </ThemeProvider>
  );
};

export default App;
