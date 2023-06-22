import logo from './logo.svg';
import './App.css';
import "./styles.css";
import Player from './player';
import Board from './board.js';
import React from "react";

const PossibleMoves = props => { 
  return (
    <>
      <button onClick={props.func_name}>
        {props.title}
      </button>
    </>
    );

}

function App() {
  const [players, setPlayers] = React.useState([]);

  // React.useEffect(() => {
  //   fetch("https://randomuser.me/api/?results=3")
  //         .then(response => response.json())
  //         .then(data => {
  //           for (let i = 0; i < data.results.length; i++) {
  //             data.results[i].first = {
  //               "persona": "ninja", 
  //               "state": false};
  //             data.results[i].second = {
  //                 "persona": "kabuki", 
  //                 "state": true};
  //             data.results[i].coinCount = 0;
  //             // console.log(data.results[i]);
  //           }
  //           setPlayers(data.results)
  //         });
  // },[]);

    return (
    <div>
      <Board />
    </div>
    );
}

export default App;
