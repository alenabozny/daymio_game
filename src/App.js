import logo from './logo.svg';
import './App.css';
import "./styles.css";
import PlayerObj from './player';
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
  // const player_1 = new PlayerObj("Adam", "ad@shave.pl", "geisha", true, "daymio", false);

  React.useEffect(() => {
    fetch("https://randomuser.me/api/?results=3")
          .then(response => response.json())
          .then(data => {
            for (let i = 0; i < data.results.length; i++) {
              data.results[i].first = {
                "persona": "ninja", 
                "state": false};
              data.results[i].second = {
                  "persona": "kabuki", 
                  "state": true};
              data.results[i].coinCount = 0;
              // console.log(data.results[i]);
            }
            setPlayers(data.results)
          });
  },[]);
  const changePlayerCardState = (e) => {
    e.preventDefault();
    console.log("Try to change state for player");
    // players[0].first.state = !players[0].first.state;
    // setPlayers(players);
    // re-render!
  };
  const stealAsSamurai = () => {};
  const take2CoinsAsSamurai = () => {};
  const killFor3CoinsAsNinja  = () => {};
  const killFor7Coins = () => {};
  const take1Coin = () => {};

  const[yourHand, setYourHand] = React.useState({"first":{
                                                    "persona": "geisha", 
                                                    "state": true}, 
                                                 "second":{
                                                    "persona": "ninja", 
                                                    "state": true}
                                                });
  const clickOptions = [{"title":"daymio_1", "message":"Take 3 coinst from the bank.", "func_name": changePlayerCardState},
                        {"title":"samurai_1", "message":"Steal 2 coins.", "func_name": stealAsSamurai},
                        {"title":"samurai_2", "message":"Take 2 coins from the bank.", "func_name": take2CoinsAsSamurai},
                        {"title":"ninja_1", "message":"Kill for 3 coins.", "func_name": killFor3CoinsAsNinja},
                        {"title":"kill", "message":"Kill for 7 coins.", "func_name": killFor7Coins},
                        {"title":"one_coin", "message":"Take 1 coin from the bank.", "func_name": take1Coin}
                                              ];
  //document.getElementById("change-state").addEventListener("click", player_1.changeCard1State);

    return (
    <>
      {players.map((player, id) =>(
        <PlayerObj
          key={id}
          avatar={player.picture.large}
          name={player.name.first}
          email={player.email}
          card_1_image={player.first.persona}
          card_2_image={player.second.persona}
          card_1_state={player.first.state}
          card_2_state={player.second.state}
        />
      ))}
      <PlayerObj 
        key={4}
        avatar="https://placehold.co/125x125"
        name="You"
        email="youremail"
        age={12}
        card_1_image={yourHand.first.persona}
        card_2_image={yourHand.second.persona}
        card_1_state={yourHand.first.state}
        card_2_state={yourHand.second.state}
      />
      <PlayerObj
      key={5}
        avatar = "https://placehold.co/125x125"
        name = "Adam"
        email = "ad@shave.pl"
        card_1_state = {true}
        card_2_state = {false}
        card_1_image = "kabuki"
        card_2_image = "geisha"
      />
      {clickOptions.map((option, id) =>(
        <PossibleMoves
          key={id}
          title={option.title}
          func_name={option.func_name}
        />
      ))}
      <button id="change-state">CLICK</button>
      <p id="player-1-info"></p>
    </>
    );
}

export default App;
