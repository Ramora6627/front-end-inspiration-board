import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { Board } from "./components/Board";
import { BoardDropDown } from "./components/BoardDropDown";
import { CreateBoard } from "./components/CreateBoard";

function App() {
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState();

  const getBoards = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/boards`);
      return response.data;
    } catch (err) {
      return [];
    }
  };

  const onCreateBoardCallBack = (board) => {
    console.log("board created:", board);
    setBoards((prv) => [...prv, board]);
  };

  useEffect(() => {
    getBoards().then((res) => {
      setBoards(res);

      if (res) {
        setSelectedBoard(res[0]);
      }
    });
  }, []);

  return (
    <div id="App">
      <header>
        <h1>Inspo Board</h1>
      </header>

      <div style={{ display: "flex", gap: 20, justifyContent: "flex-start" }}>
        <BoardDropDown
          boards={boards}
          selectedBoard={selectedBoard}
          setSelectedBoard={setSelectedBoard}
        />
        <CreateBoard onCreateCallBack={onCreateBoardCallBack} />
      </div>

      {selectedBoard ? (
        <Board
          key={selectedBoard.id}
          id={selectedBoard.id}
          title={selectedBoard.title}
          owner={selectedBoard.owner}
        ></Board>
      ) : null}
    </div>
  );
}

export default App;
