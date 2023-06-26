import logo from './logo.svg';
import './App.css';
import "./styles.css";
import Player from './player';
import Board from './board.js';
import React, { useState } from "react";
import game_state from './game_state.js';

function  daymio_take3Coins() {}

function  kabuki_changeCards() {}

  // options to take on other player

function  samurai_steal2Coins(player_id) {}

function  killFor7 (player_id) {}

function  ninja_killFor3 (player_id) {}

  // options to take during other player's round

function  geisha_defendNinjaAttack (player_id) {}

function  samurai_defendStealing (player_id) {}

function  kabuki_defendStealing (player_id) {}

function  daymio_stopFromTaking2Coins (player_id) {}

  // non-user-generated actions

function Take1Coin() {

  let players = [...game_state.players];
  players[game_state.round].coin_counter += 1;
  // setGameState({players: players, round: state.round});
  // StartNextRound();
};

function RenderClass1Options(props) {
  // const [state, setGameState] = useState(game_state);

  let players = [...game_state.players]; // spreading will return a new array
  let other_players = players.slice(0,3);

  return (
  /* passing the function to onClick instead of calling it */
    <>
      <br />
      <button onClick={() => Take1Coin(game_state.round-1)}>Take one coin from the bank.</button>
      <button onClick={daymio_take3Coins()}>Take 3 coins from the bank.</button>
      <button onClick={kabuki_changeCards()}>Change cards.</button>
      
      <h4>Steal 2 coins from</h4>
      {other_players.map((player, id) =>(
      <button onClick={samurai_steal2Coins(player.id)}>
          {player.name}
        </button>
    ))}

    <h4>Kill </h4>
      {other_players.map((player, id) =>(
      <button onClick={killFor7(player.id)}>
          {player.name}
        </button>
    ))}

    <h4>Kill as Ninja (for 3 coins) </h4>
    {other_players.map((player, id) =>(
        <button onClick={ninja_killFor3(player.id)}>
          {player.name}
        </button>
      ))}
    </>
  )
};

function RenderClass2Options(props) {
  return (
    <>
      <button onClick={geisha_defendNinjaAttack(props.round)}>
        Defend yourself with a Geisha skill!
      </button>
      <button onClick={samurai_defendStealing(props.round)}>
        You have (?) a Samurai - do not let them steal from you!
      </button>
      <button onClick={kabuki_defendStealing(props.round)}>
        Or... you have a Kabuki to prevent the stealing.
      </button>
      <button onClick={daymio_stopFromTaking2Coins(props.round)}>
        Stop player {game_state.players[props.round].name} from taking two coins.
      </button>
    </>
  )
};

function AddCoinsToPlayer(props) {
  const players = game_state.players.slice();
  players[props.round].coin_counter += 1;
  this.setState({players: players})
};

// global options

function CountDown(props) {
    // Set the date we're counting down to
  var counter = props.seconds;


  // Update the count down every 1 second
  var x = setInterval(function() {
  document.getElementById("counter").innerHTML = "You have" + counter + "seconds to decide...";

  if (counter < 0) {
      clearInterval(x);
      document.getElementById("counter").innerHTML = 'Player ' + props.username + ' finished the round.';
    }

  counter -= 1;
  }, 1000);
};


function App() {
  const [state, setGameState] = useState(game_state);

  const StartNextRound = () => {
    const newround = (state.round + 1) % 4;
    const random_number = Math.random();
    const players = state.players;

    if (random_number<0.5) {
      players[newround].message = "I'm gonna take 1 coin from the bank.";      
      setGameState(previousState => {
        return { ...previousState, round: newround }
      });

      CountDown({seconds: 5,
                  username: players[newround].name});
      
      const timeout = setTimeout(() => {
        const players = state.players;
        players[newround].message = "I just took 1 coin from the bank!";
        players[newround].coin_counter += 1;
        setGameState(previousState => {
          return { ...previousState, players: players }
        });
      }, 5 * 1000);

    } else if (random_number<0.99) {
      players[newround].message = "I'm gonna use Daymio superpowers and take 3 coins from the bank!";
      setGameState(previousState => {
        return { ...previousState, round: newround }
      });
    };
  };


  return (
  <>
    <h1>Round of player: {state.players[state.round].name}</h1>
    <div id='counter'></div>
    <button onClick={ StartNextRound }> Start next round </button>
    <div>
      <Board />
    </div>
        <div className='options'>
      { game_state.round === 3 ? RenderClass1Options() : RenderClass2Options(game_state) }
    </div>
  </>
  );
}

export default App;
