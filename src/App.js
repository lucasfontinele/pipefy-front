import React from 'react';

import GlobalStyle from "./styles/global";
import Header from "./components/Header/index";
import Board from "./components/Board/index";

import HTML5Backend from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Header/>
      <Board />
      <GlobalStyle/>
    </DndProvider>
  );
}

export default App;
