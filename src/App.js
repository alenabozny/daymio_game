import logo from './logo.svg';
import './App.css';
import "./styles.css";
import Player from './player';
import Modal from './modal';
import Board from './board.js';
import React, { useState } from "react";
import game_state from './game_state.js';
import Checkbox from './checkbox.js';
import ChooseAction from './choose_action.js';
import HasNCoins from './has_n_coins.js';
import CountDown from './count_down.js';
import ShowCardsForKabukiExchange from './show_cards_for_kabuki_exchange.js';

function App() {
  const [state, setGameState] = useState(game_state);

  const ToggleKabukiExchangeOn = () => {
    setGameState({...state, kabuki_exchange_ongoing: !state.kabuki_exchange_ongoing,
                            kabuki_hand: ShowCardsForKabukiExchange({deck: state.deck,
                                                                     player: state.players[3]
                                                                    })
                 })
  };

  const ToggleGeishaModal = () => {
    setGameState({...state, geisha_modal: true});
  };

  const KabukiChangeCards = (props) => {

    const CreateKabukiCheckbox = card => (
      <Checkbox
        label={card}
        isSelected={state.kabuki_hand[card]}
        onCheckboxChange={handleKabukiCheckboxChange}
        key={card}
      />
    );

    const CreateCheckboxesForKabuki = () => {
      return(
        <>
         { Object.keys(props.kabuki_hand).map((card) => CreateKabukiCheckbox(card)) }
        </>
        )
    };

    const handleKabukiCheckboxChange = changeEvent => {
      const { name } = changeEvent.target;
      var kabuki_hand = state.kabuki_hand;
      kabuki_hand[name] = !state.kabuki_hand[name];

      setGameState({...state, kabuki_hand: kabuki_hand });
    };

    const handleKabukiCheckboxesSubmit = formSubmitEvent => {
      formSubmitEvent.preventDefault();
      const regex = "^.*?(?=_)";

      let kabuki_hand_len = Object.keys(props.kabuki_hand).length;
      let new_hand = Object.keys(props.kabuki_hand).filter(card => props.kabuki_hand[card]);

      if (kabuki_hand_len === 4) {
        if (new_hand.length != 2) { alert("You have to choose exactly two cards!"); return(null); };
      } else {
        if (new_hand.length != 1) { alert("You have to choose exactly one card!"); return(null); };
      };


      new_hand = new_hand.map((card) => card.match(regex)[0]);

      let not_selected = Object.keys(props.kabuki_hand).filter(card => !props.kabuki_hand[card]);
      not_selected = not_selected.map((card) => card.match(regex)[0]);

      let players = state.players;
      !players[3].card_1_dead ? players[3].card_1_image = new_hand[0] : players[3].card_2_image = new_hand[0];
      if (!players[3].card_1_dead && !players[3].card_2_dead) { players[3].card_2_image = new_hand[1] };

      let deck = state.deck.concat(not_selected);

      setGameState({...state, players: players, 
                              deck: deck, 
                              kabuki_hand: {}, 
                              kabuki_exchange_ongoing: !state.kabuki_exchange_ongoing
                    });

      StartNextRound();
    };

    return(
      <>
        <form onSubmit={handleKabukiCheckboxesSubmit}>
          <CreateCheckboxesForKabuki />
          <button type="submit">
            Save my Choices
          </button>
        </form>
      </>
      )
  };

  const KillFor3Buttons = props => {
    let oponents = props.oponents;

    return (
      <>
      <h4>Kill as Ninja (for 3 coins) </h4>
      {oponents.map((oponent, id) =>(
          <button key={id} onClick={() => KillAsNinja(oponents, id)}>
            {oponent.name}
          </button>
        ))}
      </>
    )
  }

  const KillFor7Buttons = props => {
    let oponents = props.oponents;

    return (
      <>
      <h4>Kill (for 7 coins) </h4>
      {oponents.map((oponent, id) =>(
          <button onClick={() => kill(oponents, id, 7)}>
            {oponent.name}
          </button>
        ))}
      </>
    )
  };

  const Steal2CoinsButtons = props => {
    let oponents = props.oponents;

    return (
      <>
      <h4>Steal 2 coins from</h4>
          {oponents.map((oponent, id) =>(
            oponent.coin_counter >= 2 ? <button key={id} onClick={() => Steal2Coins(3, id)}> {oponent.name} </button> : ''
        ))}
      </>
    )
  }

  const TakeNCoins = (N) => {
    let players = state.players;
    players[3].coin_counter += N;

    setGameState(previousState => {
      return { ...previousState, players: players }
    });

    StartNextRound();
  };


  const kill = (oponents, oponent_id, num_blood_money) => {
    if (!oponents[oponent_id].card_1_dead) {
      oponents[oponent_id].card_1_dead = true;  
    } else if (!oponents[oponent_id].card_2_dead) {
      oponents[oponent_id].card_2_dead = true;
      oponents[oponent_id].dead = true;
    }
    
    oponents.splice(3, 0, state.players[3]);
    oponents[3].coin_counter -= num_blood_money;

    setGameState(previousState => {
      return { ...previousState, players: oponents }
    });

    StartNextRound();
  };

  const OnePersonaDies = (player_id) => {
    var players = state.players;

    if (!players[player_id].card_1_dead) {

      players[player_id].card_1_dead = true; 
      setGameState({...state, players: players}); 

    } else if (!players[player_id].card_2_dead) {

      players[player_id].card_2_dead = true;
      players[player_id].dead = true;

      if (player_id ===3) {

        alert("Sorry, you are out of the game. You can start a new one.");
        setGameState(game_state);
      }
      setGameState({...state, players: players}); 
    };

    return players;
  };

  const Steal = (robber_id, oponent_id) => {
    var players = state.players;

    players[robber_id].coin_counter += 2;
    players[oponent_id].coin_counter -= 2;

    return {...state, players: players}
  };

  const Steal2Coins = (robber_id, oponent_id) => {
    const do_oponent_check = Math.random() > 0.1 ? true : false;
    var new_game_state = state;

    do_oponent_check ? new_game_state = OponentChecks(oponent_id, robber_id, 'samurai') : new_game_state = Steal(robber_id, oponent_id);

    setGameState(new_game_state);
    StartNextRound();
  }

  const handleNoAction = () => {
      alert('You die as a result of a ninja attack!');
      setGameState({...state, geisha_modal: false});
      StartNextRound();
  };

  const handleProtectAction = (oponent_id) => {
    const oponent_checks = Math.random() > 0.5 ? true : false;
    setGameState({...state, geisha_modal: false});
    var new_game_state = state;

    if (oponent_checks) { 
      new_game_state = OponentChecks(oponent_id, 3, 'geisha'); // you can loose the checking action with one persona
      OnePersonaDies(3); // and then die out of ninja attack with the other
      setGameState({...new_game_state, geisha_modal: false});
      StartNextRound();
    } else {
      setGameState({...state, geisha_modal: false});
      alert('The ninja attact was defeated!')
      StartNextRound();
    }
  }

  const handleCheckingAction = (oponent_id) => {
    var new_game_state = OponentChecks(3, oponent_id, 'ninja');

    setGameState({...new_game_state, geisha_modal: false});
    StartNextRound();
  };

  const KillAsNinja = (oponents, oponent_id) => {
    const oponent_checks = Math.random() > 0.5 ? true : false;
    const oponent_uses_geisha = Math.random() > 0.5 ? true : false;
    var new_game_state = state;

    if (oponent_checks) {
      
        new_game_state = OponentChecks(oponent_id, 3, 'ninja'); 
        setGameState(new_game_state);

      } else if (oponent_uses_geisha) {

        alert(state.players[oponent_id].name + ' uses Geisha to protect him/herself. Do you want to check ' + state.players[oponent_id].name + ' ?' );

      } else {
        kill(oponents, oponent_id, 3);
      };

    setGameState(new_game_state);
    StartNextRound();
  };

  const OponentChecks = (checker_id, oponent_id, persona) => {
    var new_game_state = state;
    var players = state.players;
    alert(players[checker_id].name + ' wants to know if ' + players[oponent_id].name + ' have '+ persona);
    var oponent_1_image = players[oponent_id].card_1_image;
    var oponent_1_dead = players[oponent_id].card_1_dead;
    var oponent_2_image = players[oponent_id].card_2_image;
    var oponent_2_dead = players[oponent_id].card_2_dead;

    // if the oponent have a {persona}, and the persona is not dead, then the checker dies
    if ((( oponent_1_image === persona ) && !oponent_1_dead ) 
        ||
        (( oponent_2_image === persona ) && !oponent_2_dead )) 
    {
 
      players = OnePersonaDies(checker_id);
      alert(players[checker_id].name + ' dies, because of the lost checking action.');
      new_game_state = {...state, players: players, lost_check: checker_id};

    // if don't... then the oponent dies
    } else {

      players = OnePersonaDies(oponent_id);
      alert(players[oponent_id].name + ' dies, because of the lost checking action.');
      new_game_state = {...state, players: players, lost_check: oponent_id};

      // if it is a Geisha check, the oponent dies with both personas
      if (persona === 'geisha') { 
        alert('Sorry, you are out of the game because of the lost checking action and the ninja attack');
        OnePersonaDies(oponent_id) 
      }

    };

    return new_game_state;
  };

  const updateGameState = (action_id, players, player_id, oponent_id) => {
    var players = [...players];
    var player = players[player_id];
    var oponent = players[oponent_id];

    if (action_id === '0') {
      // taking 1 coin from the bank
      player.coin_counter += 1;

    } else if (action_id === '1') {
      // taking 2 coins from the bank
      player.coin_counter += 2;

    } else if (action_id === '2') {
      // taking 3 coins from the bank
      player.coin_counter += 3;

    } else if (action_id === '3') {
      // stealing 2 coins
      player.coin_counter += 2;
      oponent.coin_counter -= 2;

    } else if (action_id === '4') {
      // KABUKI exchange ; do nothing for now

    } else if (action_id === '5') {
      // 7 coins kill
      var players_after_kill = OnePersonaDies(oponent_id);
      players = [...players_after_kill];
      players[player_id].coin_counter -= 7;

    } else {
      // NINJA kill
      var players_after_kill = OnePersonaDies(oponent_id);
      players = [...players_after_kill];
      players[player_id].coin_counter -= 3;
    };

    return {...state, players: players, action_ongoing: false, oponent_id: null, round: player_id};
  };

  const StartNextRound = () => {
    const players = state.players;
    var newround = (state.round + 1) % 4;

    while ( players[newround].dead ) {
      if (players[newround] === state.round) {
        alert("You won the game!");
      };
      newround = (newround + 1) % 4;
    }
    // do not start the game if player is dead!
    
    var counter = 1;

    if (players[3].dead) { // if you lost the game

      return ( "" ); // TODO

    } else if (newround == 3) { // if the round belongs to the active user (YOU)

      document.getElementById("counter").innerHTML = 'Your round is ongoing.';
      setGameState(previousState => {
        return { ...previousState, round: newround, action_ongoing: true }
      });
      document.getElementById("next_round_button").innerHTML = 'Finish your round';

    } else { // if the round belongs to an oponent

      var action = ChooseAction({newround: newround,
                                       players: players});

      var oponent = null;
      var oponent_name = '';
      if ( action.oponent_id != null ) 
        { oponent = players[action.oponent_id]; 
          oponent_name = oponent.name 
        };

      players[newround].message = action.initial_message + oponent_name;
      setGameState({ ...state, round: newround, 
                         action_ongoing: action.action_id,
                         oponent_id: action.oponent_id });

      // CountDown({seconds: seconds,
      //            username: players[newround].name});

      var x = setInterval(function() {
        document.getElementById("counter").innerHTML = "You have" + counter + "seconds to decide...";

        if ((counter < 0) && !state.geisha_modal) { // TODO: additional condition to stop counting if user performs counteraction
            clearInterval(x);
            document.getElementById("counter").innerHTML = 'Player ' + players[newround].name + ' finished the round.';

            var new_game_state = updateGameState(action.action_id, players, newround, action.oponent_id);
            var new_players = [...new_game_state.players];
            new_players[newround].message = action.postround_message + oponent_name;

            setGameState({ ...new_game_state, players: players});
          }

        counter -= 1;
      }, 1000);
    };
  };

  const RenderPossibleActions = props => {

  let players = props.state.players;
  let oponents = [...players]; // hard copy the players to later create the oponents list
  oponents.splice(3, 1);

  return (
      <>
        <br />
        { HasNCoins(players[3], 10) ? '' : <button onClick={() => TakeNCoins(1) } > Take one coin from the bank.</button> }
        { HasNCoins(players[3], 9) ? '' : <button onClick={() => TakeNCoins(2) } > Take two coins from the bank.</button> }
        { HasNCoins(players[3], 8) ? '' : <button onClick={() => TakeNCoins(3) } >(Pretend that) you have a Daymio, take 3 coins from the bank.</button> }

        <button onClick={ToggleKabukiExchangeOn}>(Pretend that) you have a Kabuki, change your cards.
        </button>
        
        { HasNCoins(players[3],8) ? '' : <Steal2CoinsButtons oponents={oponents} />}
        { HasNCoins(players[3], 3) ? <KillFor3Buttons oponents={oponents} /> : ''}
        { HasNCoins(players[3], 7) ? <KillFor7Buttons oponents={oponents} /> : ''}

      </>
    )
  };


  const DaymioPreventsTaking2Coins = (player_id) => {
    var players = state.players
    let player_checks = Math.random() > 0.5;

    player_checks ? OponentChecks(player_id, 3, 'daymio') : players[player_id].coin_counter -= 2;

    StartNextRound();
  };

  const CheckDaymioWhenPlayerTakes3Coins = () => {
    var new_game_state = OponentChecks(3, state.round, 'daymio');
    var players = [...new_game_state.players];
    if (new_game_state.lost_check === state.round) {
      new_game_state.players[state.round].coin_counter -= 3;
    };

    setGameState({...new_game_state});
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

    if (action_ongoing === '1') {

      counteraction_message = "(pretend that) you have a Daymio, let " + players[round].name + " not take 2 coins!";
      return (
        <>
          <button onClick={() => DaymioPreventsTaking2Coins(round) }> {counteraction_message} </button>
        </>
      )

    } else if (action_ongoing === '2') {

      counteraction_message = "Check if " + players[round].name + " has Daymio.";
      return (
        <>
          <button onClick={ CheckDaymioWhenPlayerTakes3Coins }> {counteraction_message} </button>
        </>
      )

    } else if (action_ongoing === '3' && props.state.oponent_id === 3) {

      counteraction_message = "Check if " + players[round].name + " has Samurai";
      return (
        <>
          <button onClick={() => OponentChecks(3, round, 'samurai') }> {counteraction_message} </button>
        </>
      )

    } else if (action_ongoing === '4') {

      counteraction_message = "Check if " + players[round].name + " has Kabuki";
      return (
        <>
          <button onClick={() => OponentChecks(3, round, 'kabuki') }> {counteraction_message} </button>
        </>
      )

    } else if (action_ongoing === '6' && props.state.oponent_id === 3) {
      return (
        <>
          <button onClick={ToggleGeishaModal}> 
            'See your options for a ninja attack'
          </button>
        </>
      )

    } else {
      return '';
    };
  };

  const ChooseCardsForPlayer = (player_id) => {
    var players = state.players;
    var deck = state.deck; // deck is a list of all cards available for players

    const random_index_1 = Math.floor(Math.random()*deck.length)
    var persona_1 = deck.splice(random_index_1, 1)[0]; // choose random card from deck and remove it (hand it to player)

    const random_index_2 = Math.floor(Math.random()*deck.length)
    var persona_2 = deck.splice(random_index_2, 1)[0]; // choose another random card from deck and hand it to player)

    players[player_id].card_1_image = persona_1;
    players[player_id].card_2_image = persona_2;

    setGameState({...state, players: players, deck: deck});
  };

  const StartNextGame = () => {
    ChooseCardsForPlayer(0);
    ChooseCardsForPlayer(1);
    ChooseCardsForPlayer(2);
    ChooseCardsForPlayer(3);

    setGameState({...state, game_ongoing: true});
  };

  const NewGame = () => {
    return (
      <>
      <button onClick={() => StartNextGame()}>Start new Game!</button>
      </>
      )

  };

  const RenderBoard = () => {
    return(
    <>

      { state.geisha_modal &&  
        <Modal handleProtectAction = { () => handleProtectAction(state.round) } 
               handleNoAction = { handleNoAction }
               handleCheckingAction = { () => handleCheckingAction(state.round) }
               show = { state.geisha_modal }
               children = { <p> What do you want to do? </p> } />
      }

      <h1>Round of player: {state.players[state.round].name}</h1>
      <h2>Your hand: {state.players[3].card_1_image + ' ' + state.players[3].card_2_image}</h2>
      <h2>Remaining deck: {state.deck.join(' ')}</h2>
      <div className='options'>
         { ((state.action_ongoing != false) && (state.round != 3)) && RenderCounteraction({state: state}) }
      </div>
      <div id='counter'></div>
      <button id='next_round_button' className={state.round === 3 ? 'disable' : ''} onClick={() => StartNextRound() }> Start next round </button>
      <div>
        <Board />
      </div>

        {state.kabuki_exchange_ongoing && 
            <KabukiChangeCards kabuki_hand = { state.kabuki_hand } />}

      <div className='options'>
        { state.round === 3 ? RenderPossibleActions({state: state}) : '' }
      </div>
    </>
    )
  };

  return (
  <>
    { state.game_ongoing ? <RenderBoard /> : <NewGame /> }
  </>
  );
}

export default App;
