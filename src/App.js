import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ul className="menu-list">
          <li className="list-item item-1">line 1</li>
          <li className="list-item item-2">line 2</li>
          <li className="list-item item-3">line 3</li>
          <li className="list-item item-4">line 4</li>
          <li className="list-item item-5 active">line 5</li>
        </ul>
      </header>
    </div>
  );
}

export default App;
