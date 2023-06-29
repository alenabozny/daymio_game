import logo from './logo.svg';
import './App.css';
import "./styles.css";
import Player from './player';
import Board from './board.js';
import React, { useState } from "react";
import game_state from './game_state.js';

// TODO: refactor - change players from Array to Object and add unique KEY for each player


function kabuki_changeCards() {

};

function samurai_steal2Coins(oponent_id) {};

function ninja_killFor3(oponent_id) {};

function HasNCoins(player, N) {
  return player.coin_counter >= N ? true : false ;
}

function Steal2CoinsButtons(props) {
  let oponents = props.oponents;

  return (
    <>
    <h4>Steal 2 coins from</h4>
        {oponents.map((oponent, id) =>(
        <button onClick={ninja_killFor3(oponent.id)}>
          {oponent.name}
        </button>
      ))}
    </>
  )
}

function KillFor3Buttons(props) {
  let oponents = props.oponents;

  return (
    <>
    <h4>Kill as Ninja (for 3 coins) </h4>
    {oponents.map((oponent, id) =>(
        <button onClick={ninja_killFor3(oponent.id)}>
          {oponent.name}
        </button>
      ))}
    </>
  )
}


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
    message[1] = 'I just stole 2 coins from' + oponent.name +'.';
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

  const KillFor7Buttons = props => {
    let oponents = props.oponents;

    return (
      <>
      <h4>Kill (for 7 coins) </h4>
      {oponents.map((oponent, id) =>(
          <button onClick={() => kill(oponents, id)}>
            {oponent.name}
          </button>
        ))}
      </>
    )
  };

  const TakeNCoins = (N) => {
    let players = state.players;
    players[3].coin_counter += N;

    setGameState(previousState => {
      return { ...previousState, players: players }
    });

    StartNextRound();
  };


  const kill = (oponents, oponent_id) => {
    if (!oponents[oponent_id].card_1_dead) {
      oponents[oponent_id].card_1_dead = true;  
    } else if (!oponents[oponent_id].card_2_dead) {
      oponents[oponent_id].card_2_dead = true;
      oponents[oponent_id].dead = true;
    }
    
    oponents.splice(3, 0, state.players[3]);

    setGameState(previousState => {
      return { ...previousState, players: oponents }
    });

    StartNextRound();
  };

  const StartNextRound = () => {
    const newround = (state.round + 1) % 4;
    const players = state.players;
    const seconds = 4;

    if (newround == 3) {
      document.getElementById("counter").innerHTML = 'Your round is ongoing.';
      setGameState(previousState => {
        return { ...previousState, round: newround, action_ongoing: true }
      });
      document.getElementById("next_round_button").innerHTML = 'Finish your round';
    } else {
      var next_action = ChooseAction({newround: newround,
                                       players: players});

      players[newround].message = next_action.initial_message;
      setGameState(previousState => {
        return { ...previousState, round: newround, action_ongoing: next_action.action_id }
      });

      CountDown({seconds: seconds,
                 username: players[newround].name});
        
      const timeout = setTimeout(() => {
        players[newround].message = next_action.postround_message;
        // TODO: UPDATE THE START_NEXT_ROUND FUNCTION TO UPDATE PARAMS AS COIN COUNTER AFTER THE TIMEOUT
        setGameState(previousState => {
          return { ...previousState, players: players, action_ongoing: false }
        });
      }, (seconds+1) * 1000);
      document.getElementById("next_round_button").innerHTML = 'Start next round';
    };
  };

  const RenderPossibleActions = props => {

  let players = props.state.players;
  let oponents = [...players]; // hard copy the players to later create the oponents list
  oponents.splice(3, 1);

  return (
  /* passing the function to onClick instead of calling it */
      <>
        <br />
        { HasNCoins(players[3], 10) ? '' : <button onClick={() => TakeNCoins(1) } > Take one coin from the bank.</button> }
        { HasNCoins(players[3], 9) ? '' : <button onClick={() => TakeNCoins(2) } > Take two coins from the bank.</button> }
        { HasNCoins(players[3], 8) ? '' : <button onClick={() => TakeNCoins(3)}>(Pretend that) you have a Daymio, take 3 coins from the bank.</button> }

        <button onClick={() => kabuki_changeCards()}>(Pretend that) you have a Kabuki, change your cards.</button>
        
        { HasNCoins(players[3],8) ? '' : <Steal2CoinsButtons oponents={oponents} />}
        { HasNCoins(players[3], 3) ? <KillFor3Buttons oponents={oponents} /> : ''}
        { HasNCoins(players[3], 7) ? <KillFor7Buttons oponents={oponents} /> : ''}

      </>
    )
  };

  const RenderCounteraction = (props) => {

    let counteraction_message = '';
    const action_ongoing = props.state.action_ongoing;
    const round = props.state.round;
    const players = props.state.players;

      // 0 is for taking 1 coin
      // 1 is for taking 2 coins
      // 2 is for taking 3 coins
      // 3 is for stealing 2 coins
      // 4 is for changing cards
      // 5 is for killing for 7 coins
      // 6 is for killing for 3 coins

    if (action_ongoing === 1) {

      counteraction_message = "(pretend that) you have a Daymio, let " + players[round].name + " not take 2 coins!";

    } else if (action_ongoing === 2) {

      counteraction_message = "Check if " + players[round].name + " has Daymio.";

    } else if (action_ongoing === 3) {

      counteraction_message = "Check if " + players[round].name + " has Samurai";

    } else if (action_ongoing === 4) {

      counteraction_message = "Check if " + players[round].name + " has Kabuki";

    } else if (action_ongoing === 6) {

      counteraction_message = "Check if " + players[round].name + " has Ninja";

    } else {
      return '';
    };


    return (
      <>
        <button> {counteraction_message} </button>
      </>
    )
};


  return (
  <>
    <h1>Round of player: {state.players[state.round].name}</h1>
    <div className='options'>
       { state.action_ongoing !== false && state.round != 3 ? RenderCounteraction({state: state}) : ''}
    </div>
    <div id='counter'></div>
    <button id='next_round_button' onClick={() => StartNextRound() }> Start next round </button>
    <div>
      <Board />
    </div>
    <div className='options'>
      { state.round === 3 ? RenderPossibleActions({state: state}) : '' }
    </div>
  </>
  );
}

export default App;
