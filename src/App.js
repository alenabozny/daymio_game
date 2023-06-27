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
        Stop player {props.current_player.name} from taking two coins.
      </button>
    </>
  )
};

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

function ChooseAction(props) {
  var players = props.players;
  var oponents = [...props.players]; // hard copy the players to later create the oponents list
  const current_player_id = props.newround;
  const random_number = Math.random();
  
  var action_id = 0;

  // 0 is for taking 1 coin
  // 1 is for taking 2 coins
  // 2 is for taking 3 coins
  // 3 is for stealing 2 coins
  // 4 is for changing cards
  // 5 is for killing for 7 coins
  // 6 is for killing for 3 coins

  var message = ['',''];

  oponents.splice(current_player_id, 1); // remove current player from the oponents list
  const oponent = oponents[Math.floor(Math.random()*oponents.length)]; // randomly choose an oponent for the current player

  if (random_number<(1/7)) {
    // player wants to take 1 coin from the bank
    action_id = 0;
    message[0] = "I'm gonna take 1 coin from the bank.";
    message[1] = "I just took 1 coin from the bank.";
    players[current_player_id] = {...players[current_player_id], 
                                  coin_counter: players[current_player_id].coin_counter += 1}

  } else if (random_number<(2/7)) {
    // player wants to take 2 coins from the bank
    action_id = 1;
    message[0] = "I'm gonna take 2 coins from the bank.";
    message[1] = "I just took 2 coins from the bank.";
    players[current_player_id] = {...players[current_player_id], 
                                  coin_counter: players[current_player_id].coin_counter += 2}  
  } else if (random_number<(3/7)) {
    // player wants to take 3 coins from the bank -!!!- DAYMIO -!!!-
    action_id = 2;
    message[0] = "I'm gonna use Daymio superpowers and take 3 coins from the bank.";
    message[1] = "I just took 3 coins from the bank.";
    players[current_player_id] = {...players[current_player_id], 
                                  coin_counter: players[current_player_id].coin_counter += 3}  
    } else if (random_number<(4/7)) {
    // player wants to steal 2 coins from ... -!!!- SAMURAI -!!!-
    action_id = 3;
    message[0] = "I'm gonna take 2 coins from the bank.";
    message[1] = "I just took 2 coins from the bank.";
    players[current_player_id] = {...players[current_player_id], 
                                  coin_counter: players[current_player_id].coin_counter += 2}
    // TODO: -= 2 for the oponent

  }  else if (random_number<(5/7)) {
    // player wants to change the cards -!!!- KABUKI -!!!-
    action_id = 4;
    message[0] = "I'm gonna user KABUKI superpowers and change my cards.";
    message[1] = "I just changed my cards!";
    // TODO: change cards for the current player; remaining: create the deck

  } else if (random_number<(6/7)) {
    // player wants to kill ... for 7 coins
    action_id = 5;
    message[0] = "I'm gonna kill " + oponent.name + " for 7 coins";
    message[1] = "I just killed " + oponent.name + "!";
    // TODO: Check if the current player has 7 coins, kill the oponent

  } else {
    // player wants to kill for 3 coins -!!!- NINJA -!!!-
    action_id = 6;
    message[0] = "I'm gonna use NINJA superpowers and kill " + oponent.name + " for 3 coins";
    message[1] = "I just killed " + oponent.name + "!";
    // TODO: Check if the current player has 3 coins, attempt to kill the oponent
  };

  return({action_id: action_id,
          initial_message: message[0],
          postround_message: message[1],
          players: players});
};


function App() {
  const [state, setGameState] = useState(game_state);

  const StartNextRound = () => {
    const newround = (state.round + 1) % 4;
    const players = state.players;
    const seconds = 4;

    var next_action = ChooseAction({newround: newround,
                                     players: players});

    players[newround].message = next_action.initial_message;
    setGameState(previousState => {
      return { ...previousState, round: newround, state_round: 'ongoing' }
    });

    CountDown({seconds: seconds,
                username: players[newround].name});
      
    const timeout = setTimeout(() => {
      players[newround].message = next_action.postround_message;
      // TODO: UPDATE THE START_NEXT_ROUND FUNCTION TO UPDATE PARAMS AS COIN COUNTER AFTER THE TIMEOUT
      setGameState(previousState => {
        return { ...previousState, players: players, state_round: 'finished' }
      });
    }, (seconds+1) * 1000);
  };


  return (
  <>
    <h1>Round of player: {state.players[state.round].name}</h1>
    <div className='options'>
      { state.state_round === 'ongoing' ? RenderClass2Options({round: state.round, current_player: state.players[state.round]}) : ''}
    </div>
    <div id='counter'></div>
    <button onClick={ StartNextRound }> Start next round </button>
    <div>
      <Board />
    </div>
    <div className='options'>
      { state.round === 3 ? RenderClass1Options() : '' }
    </div>
  </>
  );
}

export default App;
