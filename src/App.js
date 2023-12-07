import './App.css';
// import Player from './player';
import { GeishaModal, GeishaCheckModal, TwoCoinsModal } from './modal';
import {Row, Col, Container, Button, Nav, Navbar} from "react-bootstrap";

import Board from './board.js';
import StartGameView from './start_game_view.js';
import React, { useState, useEffect } from "react";
import game_state from './game_state.js';
import Checkbox from './checkbox.js';
import { ChooseAction, RandomOponentId } from './choose_action.js';
import HasNCoins from './has_n_coins.js';
// import CountDown from './count_down.js';
import ShowCardsForKabukiExchange from './show_cards_for_kabuki_exchange.js';
import BasicExample from './navbar-example.js';

import geisha from './images/geisha.png';
import daimyo from './images/daimyo.png';
import ninja from './images/ninja.png';
import kabuki from './images/kabuki.png';
import samurai from './images/samurai.png';

const IMAGES = {
  'geisha': geisha,
  'daymio': daimyo,
  'ninja' : ninja,
  'kabuki': kabuki,
  'samurai': samurai
};

const COUNTER = 10;


function App() {
  const [state, setGameState] = useState(game_state);

  useEffect(()=>{ state.kabuki_finished_count > 0 && StartNextRound() }, [state.kabuki_finished_count]);  
  useEffect(()=>{ state.defeated_geisha_attact_count > 0 && StartNextRound() }, [state.defeated_geisha_attact_count]); 
  useEffect(()=>{ state.taking_2_coins_count > 0 && StartNextRound() }, [state.taking_2_coins_count]);  
  useEffect(()=>{ state.ninja_attack_count > 0 && StartNextRound() }, [state.ninja_attack_count]);

  const ToggleKabukiExchangeOn = () => {
    var random_oponent_id = RandomOponentId({players: state.players, 
                                             current_player_id: 3,
                                             action_id: 4});

    var new_game_state = {...state};
    var do_oponent_check = Math.random() > 0.5 ? true : false;

    if(do_oponent_check) {

      new_game_state = OponentChecks(random_oponent_id, 3, 'kabuki');

      // if oponent lost checking action, you can still perform card exchange
      // if you lost the checking action, the exchange does not occur and the next round begins
      if (new_game_state.lost_check !== random_oponent_id) {

        setGameState({...new_game_state, kabuki_exchange_ongoing: false, 
                                         kabuki_finished_count: state.kabuki_finished_count += 1});
        return(0);
      }
    };

    new_game_state = {...state, kabuki_exchange_ongoing: true,
                                kabuki_hand: ShowCardsForKabukiExchange({deck: state.deck,
                                                                         player: state.players[3]
                                                                  })} ;
    setGameState(new_game_state);
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
        if (new_hand.length !== 2) { alert("You have to choose exactly two cards!"); return(null); };
      } else {
        if (new_hand.length !== 1) { alert("You have to choose exactly one card!"); return(null); };
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
                              kabuki_exchange_ongoing: false,
                              kabuki_finished_count: state.kabuki_finished_count += 1
                    });

    };

    return(
      <>
        <form onSubmit={ handleKabukiCheckboxesSubmit }>
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
         !oponent.dead && <button key={id} onClick={() => KillAsNinja(oponents, id)}>
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
          !oponent.dead &&  <button className="option-button" onClick={() => kill(oponents, id, 7)}>
                              {oponent.name}
                            </button>
        ))}
      </>
    )
  };

  const Steal2CoinsButtons = props => {
    let oponents = [...props.oponents];
    let oponents_to_steal_from = oponents.filter(oponent => (oponent.coin_counter >= 2) && !oponent.dead);

    return (
      <>
      { oponents_to_steal_from.length !== 0 && <h4>Steal 2 coins from</h4> }
          {oponents_to_steal_from.map((oponent, id) =>(
            <button className="option-button" key={id} onClick={() => Steal2Coins(3, id)}> {oponent.name} </button>
        ))}
      </>
    )
  }

  const Take1Coin = () => {
    let players = [...state.players];

    players[3].coin_counter += 1;

    setGameState({...state, players: players});
    StartNextRound();
  };

  const Take2Coins = () => {
    let players = [...state.players];
    var new_game_state = {...state};

    var do_oponent_prevent = Math.random() > 0.5 ? true : false;

    if (do_oponent_prevent) {
      var random_oponent_id = RandomOponentId({players: state.players, 
                                             current_player_id: 3,
                                             action_id: 2});

      new_game_state = {...new_game_state, oponent_id: random_oponent_id, twocoins_modal: true};
    } else {
      players[3].coin_counter += 2;
      let count = state.taking_2_coins_count += 1;
      new_game_state = {...new_game_state, players: players, twocoins_modal: false, taking_2_coins_count: count};
    }

    setGameState(new_game_state);
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
    var new_game_state = {...state};

    if (!players[player_id].card_1_dead) {

      players[player_id].card_1_dead = true; 
      setGameState({...new_game_state, players: players}); 

    } else if (!players[player_id].card_2_dead) {

      players[player_id].card_2_dead = true;
      players[player_id].dead = true;

      if (player_id ===3) {

        alert("Sorry, you are out of the game. You can start a new one.");
        new_game_state = {...new_game_state, players: players, lost_check: player_id, game_ongoing: false};
      }

      setGameState({...new_game_state, players: players, lost_check: player_id}); 
    };

    return players;
  };

  const Steal = (robber_id, oponent_id, players) => {
    players[robber_id].coin_counter += 2;
    players[oponent_id].coin_counter -= 2;

    return {...state, players: players}
  };

  const Steal2Coins = (robber_id, oponent_id) => {
    const do_oponent_check = Math.random() > 0.5 ? true : false;
    var new_game_state = {...state};

    // does the oponent want to check if the robber indeed has Samurai?
    new_game_state = do_oponent_check && OponentChecks(oponent_id, robber_id, 'samurai');
    // if the check wasn't performed, the lost check indicator is null;
    // if the check was performed and the robber lost, nothing changes, the next round starts;
    // if the check was performed and the oponent lost, the robbery takes place and then the next round starts
    if ((new_game_state.lost_check === oponent_id) || !do_oponent_check ) { 

      new_game_state = Steal(robber_id, oponent_id, state.players);

    };

    setGameState(new_game_state);
    StartNextRound();
  };

  const Take3Coins = (taker_id, players) => {
    players[taker_id].coin_counter += 3;

    return {...state, players: players}
  }

  const TakeCoinsAsDaymio = () => {
    var random_oponent_id = RandomOponentId({players: state.players, 
                                             current_player_id: 3,
                                             action_id: 3});

    var new_game_state = {...state};
    var do_oponent_check = Math.random() > 0.5 ? true : false;

    if(!do_oponent_check) {

      new_game_state = Take3Coins(3, state.players);

    } else {

      // if someone wants to check if the taker indeed has Daymio the checking action starts
      new_game_state = OponentChecks(random_oponent_id, 3, 'daymio');
      // if the oponent loses, the 3 coins taking action is performed and the next round starts
      // if the taker loses, nothing changes with the coins, the next round begins
      new_game_state = new_game_state.lost_check === random_oponent_id && Take3Coins(3, new_game_state.players);

      setGameState(new_game_state);
      StartNextRound();
      return('');
    }

    setGameState(new_game_state);
    StartNextRound();
  };

  const handleGeishaNoAction = () => {
      alert('You die as a result of a ninja attack!');
      OnePersonaDies(3);
      setGameState({...state, geisha_modal: false});
      StartNextRound();
  };

  const handleGeishaProtectAction = (oponent_id) => {
    const oponent_checks = Math.random() > 0.5 ? true : false;
    setGameState({...state, geisha_modal: false});
    var new_game_state = state;

    if (oponent_checks) { 
      new_game_state = OponentChecks(oponent_id, 3, 'geisha'); // you can loose the checking action with one persona
      OnePersonaDies(new_game_state.lost_check); // and then die out of ninja attack with the other
      setGameState({...new_game_state, geisha_modal: false});
      StartNextRound();
    } else {
      setGameState({...state, geisha_modal: false, 
                              defeated_geisha_attact_count: state.defeated_geisha_attact_count += 1});
      alert('The ninja attact was defeated!')
    }
  }

  const handleCheckGeishaAction = (oponent_id) => {
    var new_game_state = OponentChecks(3, oponent_id, 'ninja');

    setGameState({...new_game_state, geisha_modal: false, 
                                     defeated_geisha_attact_count: state.defeated_geisha_attact_count += 1});
  };

  const handleTwoCoinsAction = (oponent_id) => {
    var new_game_state = OponentChecks(3, oponent_id, 'daymio');
    var count = state.taking_2_coins_count += 1;

    // if oponent lost check, then taking two coins action is performed and the next round begins
    // if the taker loses, nothing changes with the coins
    if (new_game_state.lost_check === oponent_id) {
      new_game_state.players[3].coin_counter +=  2;
    }

    setGameState({...new_game_state, players: new_game_state.players, twocoins_modal: false, taking_2_coins_count: count});
  };

  const handleTwoCoinsNoAction = () => {
    alert("You don't get any coins in this round");
    let count = state.taking_2_coins_count += 1;
    setGameState({...state, twocoins_modal: false, taking_2_coins_count: count});
  };

  const KillAsNinja = (oponents, oponent_id) => {
    const oponent_checks = Math.random() > 0.66 ? true : false;
    const oponent_uses_geisha = Math.random() > 0.33 ? true : false;

    var players = [...state.players];
    players[3].coin_counter -= 3;
    var new_game_state = state;

    // You perforn a ninja attack. The oponent can:
    // 1. check if you have ninja. 
    //   1.1. If he looses, he dies with both personas. You pay 3 coins.
    //   1.2. If he wins, you die with one persona. You still pay 3 coins.
    // 2. do nothing and die with one persona. You pay 3 coins.
    // 3. defend himself with geisha. Then:
    //  3.1. Nothing happens, you just pay 3 coins.
    //  3.2. You can check if he has geisha:
    //    3.2.1. He looses - he dies with both personas. You pay 3 coins.
    //    3.2.2. He wins - you lose, and he doesn't die because of the ninja attack. You pay 3 coins.

    if (oponent_checks) {
       // 1.
        new_game_state = OponentChecks(oponent_id, 3, 'ninja');
        if (new_game_state.lost_check === oponent_id) {
          // 1.1.
          players = OnePersonaDies(oponent_id);

          new_game_state = {...new_game_state, players: players, ninja_attack_count: state.ninja_attack_count += 1 }
        } else {
          // 1.2.
          new_game_state = {...new_game_state, players: players, ninja_attack_count: state.ninja_attack_count += 1 }
        }

      } else if (oponent_uses_geisha) {
        // 3
        new_game_state.geisha_check_modal = true;
        // modal fires

      } else {
        // 2
        players = OnePersonaDies(oponent_id);
        new_game_state = {...new_game_state, players: players, ninja_attack_count: state.ninja_attack_count += 1 }
      };

    setGameState({...new_game_state, oponent_id: oponent_id});
  };

  function handleCheckGeisha(ninja_attacker_id, geisha_protector_id) {
    var new_game_state = {...state};
    var players = new_game_state.players;

    // 3.2.
    new_game_state = OponentChecks(ninja_attacker_id, geisha_protector_id, 'geisha');

    if (new_game_state.lost_check === geisha_protector_id) {
      // 3.2.1
      alert("Your oponent dies with both personas: first for the ninja attack, second for the lost checking action.");
      players = OnePersonaDies(geisha_protector_id);

      new_game_state = {...new_game_state, players: players, ninja_attack_count: state.ninja_attack_count += 1, geisha_check_modal: false}
    } else {
      // 3.2.2.
      new_game_state = {...new_game_state, players: players, ninja_attack_count: state.ninja_attack_count += 1, geisha_check_modal: false}
    }

    setGameState(new_game_state)
  };

  function handleNoCheckGeisha(ninja_attacker_id, geisha_protector_id) {
    // 3.1.
    var players = state.players;

    setGameState({...state, geisha_check_modal: false, 
                            ninja_attack_count: state.ninja_attack_count += 1, 
                            players: players})
  };

  const OponentChecks = (checker_id, oponent_id, persona) => {
    var new_game_state = {...state};
    var players = state.players;
    alert(players[checker_id].name + ' wants to know if ' + players[oponent_id].name + ' have '+ persona);
    var oponent_1_image = players[oponent_id].card_1_image;
    var oponent_1_dead = players[oponent_id].card_1_dead;
    var oponent_2_image = players[oponent_id].card_2_image;
    var oponent_2_dead = players[oponent_id].card_2_dead;
    const random_index_1 = Math.floor(Math.random() * new_game_state.deck.length);

    // if the oponent have a {persona}, and the persona is not dead, then the checker dies
    if ((( oponent_1_image === persona ) && !oponent_1_dead ) 
        ||
        (( oponent_2_image === persona ) && !oponent_2_dead )) 
    {
 
      players = OnePersonaDies(checker_id);
      alert(players[checker_id].name + ' dies, because of the lost checking action.');

      // console.log("Old deck: " + state.deck);

      // the winner of the checking action (oponent in this case) 
      // exchanges revealed card {persona} with some card from the deck.
      // choose random card from deck and remove it (hand it to player)
      var new_persona = new_game_state.deck.splice(random_index_1, 1)[0];

      // console.log(new_persona);
      // console.log("Old cards of the winner: " + [oponent_1_image, oponent_2_image]);
      // console.log("New deck: " + new_game_state.deck);

      if (oponent_1_image === persona && !oponent_1_dead ) { 

        players[oponent_id].card_1_image = new_persona ;
        new_game_state.deck.push(oponent_1_image);

      } else { 

        players[oponent_id].card_2_image = new_persona ;
        new_game_state.deck.push(oponent_2_image);

      };

      console.log("Newer deck: " + new_game_state.deck);
      console.log("New winner hand: " + [players[oponent_id].card_1_image, players[oponent_id].card_2_image]);

      new_game_state = {...state, players: players, lost_check: checker_id, deck: new_game_state.deck};

    // if don't... then the oponent dies
    } else {

      players = OnePersonaDies(oponent_id);
      alert(players[oponent_id].name + ' dies, because of the lost checking action.');
      
      // the winner of the checking action (checker in this case) 
      // does not exchange any card. Hes/her cards were not revealed.

      new_game_state = {...state, players: players, lost_check: oponent_id};

      // if it is a Geisha check, the oponent dies with both personas
      if (persona === 'geisha') { 
        OnePersonaDies(oponent_id) 
      }

    };

    return new_game_state;
  };

  const updateGameState = (action_id, players, player_id, oponent_id) => {
    var players_after_kill = [];

    if (action_id === '0') {
      // taking 1 coin from the bank
      players[player_id].coin_counter += 1;

    } else if (action_id === '1') {
      // taking 2 coins from the bank
      players[player_id].coin_counter += 2;

    } else if (action_id === '2') {
      // taking 3 coins from the bank
      players[player_id].coin_counter += 3;

    } else if (action_id === '3') {
      // stealing 2 coins
      players[player_id].coin_counter += 2;
      players[oponent_id].coin_counter -= 2;

    } else if (action_id === '4') {
      // KABUKI exchange ; do nothing for now

    } else if (action_id === '5') {
      // 7 coins kill
      players_after_kill = OnePersonaDies(oponent_id);
      players = [...players_after_kill];
      players[player_id].coin_counter -= 7;

    } else {
      // NINJA kill
      players_after_kill = OnePersonaDies(oponent_id);
      players = [...players_after_kill];
      players[player_id].coin_counter -= 3;
    };

    return {...state, players: players, action_ongoing: false, oponent_id: null, round: player_id};
  };

  const StartNextRound = () => {
    var players = [...state.players];
    var newround = (state.round + 1) % 4;
    var new_game_state = {...state};

    // do not start the game if player is dead!
    while ( players[newround].dead ) {
      newround = (newround + 1) % 4;
    }
    
    // set timer for other users rounds
    var counter = COUNTER;

    if (players[3].dead) { // if you lost the game

      alert("You lost the game, you can start a new one");
      new_game_state = {...state, game_ongoing: false}; // TODO
      setGameState(new_game_state);

    } else if (newround === 3) { // if the round belongs to the active user (YOU)

      let oponents = [...players];
      oponents.splice(3,1);
      oponents = oponents.filter(player => !player.dead);
      
      if (oponents.length === 0) {
        alert("You won the game!");
        setGameState({...state, game_ongoing: false});
        return(0);
      }

      document.getElementById("counter").innerHTML = 'Your round is ongoing.';
      setGameState({ ...state, round: newround, action_ongoing: true});
      document.getElementById("next-round-button").innerHTML = 'Finish your round';

    } else { // if the round belongs to an oponent

      var action = ChooseAction({newround: newround,
                                       players: players});

      var oponent = null;
      var oponent_name = '';
      if ( action.oponent_id != null ) 
        { oponent = players[action.oponent_id]; 
          oponent_name = oponent.name 
        };

      players[newround].message = action.initial_message;

      var interval_id = setInterval(function() {
        document.getElementById("counter").innerHTML = "You have " + counter + " seconds to decide...";
        document.getElementById('next-round-button').style.display = 'none';

        if ((counter < 0) && !state.geisha_modal) {

            clearInterval(interval_id);
            document.getElementById("counter").innerHTML = 'Player ' + players[newround].name + ' finished the round.';
            document.getElementById('next-round-button').style.display = 'block';

            new_game_state = updateGameState(action.action_id, players, newround, action.oponent_id);
            new_game_state.players[newround].message = action.postround_message;

            setGameState({ ...new_game_state});
          }

        counter -= 1;
      }, 1000);

      new_game_state.players.forEach(function (value, i) {
          if ( i != newround ) {
            new_game_state.players[i].message = '...'
          }
      });

      setGameState({ ...new_game_state, round: newround, 
                   action_ongoing: action.action_id,
                   oponent_id: action.oponent_id,
                   interval_id: interval_id,
                   players: players });

    };
  };

  const RenderPossibleActions = props => {

  let players = props.state.players;
  let oponents = [...players]; // hard copy players to create the oponents list
  oponents.splice(3, 1);

  return (
      <>
        <br />
        { HasNCoins(players[3], 10) ? '' : <Button className="option-button" onClick={ Take1Coin } > Take one coin from the Bank.</Button> }
        { HasNCoins(players[3], 9) ? '' : <Button className="option-button" onClick={ Take2Coins } > Take two coins from the Bank.</Button> }
        { HasNCoins(players[3], 8) ? '' : <Button className="option-button" onClick={ TakeCoinsAsDaymio } >(Pretend that) you have a Daymio, take 3 coins from the Bank.</Button> }

        <Button className="option-button" onClick={ToggleKabukiExchangeOn}>(Pretend that) you have a Kabuki, change your cards.
        </Button>
        
        { HasNCoins(players[3],8) ? '' : <Steal2CoinsButtons oponents={oponents} />}
        { HasNCoins(players[3], 3) ? <KillFor3Buttons oponents={oponents} /> : ''}
        { HasNCoins(players[3], 7) ? <KillFor7Buttons oponents={oponents} /> : ''}

      </>
    )
  };


  const DaymioPreventsTaking2Coins = (player_id) => {
    var players = state.players
    let player_checks = Math.random() > 0.5;
    var new_game_state = {...state};

    clearInterval(state.interval_id);

    if (player_checks) {
      new_game_state = OponentChecks(player_id, 3, 'daymio');
    } else { 
      players[player_id].message = "I was not allowed to take 2 coins :(";

      new_game_state = {...state, players: players};
    };

    setGameState({...new_game_state, taking_2_coins_count: state.taking_2_coins_count += 1});
  };

  const CheckDaymioWhenPlayerTakes3Coins = (props) => {
    var new_game_state = OponentChecks(3, state.round, 'daymio');
    var players = [...new_game_state.players];
    clearInterval(state.interval_id);

    if (new_game_state.lost_check === state.round) {
      players[state.round].message = "I just lost checking action";
    } else {
      players[state.round].message = props.postround_message;
    } ;

    setGameState({...new_game_state, players: players, action_ongoing: false});
  };

  const CheckIfOponentHas = (props) => {
   clearInterval(state.interval_id);
   var new_game_state = OponentChecks(3, props.oponent_id, props.persona);
   var players = [...new_game_state.players];
   clearInterval(state.interval_id);

   if (new_game_state.lost_check === state.round) {
      players[state.round].message = "I just lost checking action";
    } else {
      players[state.round].message = props.postround_message;
      if (props.persona === 'samurai') {
        players[state.round].coin_counter += 2;
        players[3].coin_counter -= 2;
      }
    };

   setGameState({...new_game_state, action_ongoing: true});
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
          <button className="counteraction-button" onClick={() => DaymioPreventsTaking2Coins(round) }> {counteraction_message} </button>
        </>
      )

    } else if (action_ongoing === '2') {

      counteraction_message = "Check if " + players[round].name + " has Daymio.";
      return (
        <>
          <button className="counteraction-button" onClick={ () => CheckDaymioWhenPlayerTakes3Coins({postround_message: "I just took 3 coins from the bank"}) }> {counteraction_message} </button>
        </>
      )

    } else if (action_ongoing === '3' && props.state.oponent_id === 3) {

      counteraction_message = "Check if " + players[round].name + " has Samurai";
      return (
        <>
          <button className="counteraction-button" onClick={() => CheckIfOponentHas({oponent_id: state.round, persona: 'samurai', postround_message: "I just stole 2 coins from You"}) }> {counteraction_message} </button>
        </>
      )

    } else if (action_ongoing === '4') {

      counteraction_message = "Check if " + players[round].name + " has Kabuki";
      return (
        <>
          <button className="counteraction-button" onClick={() => CheckIfOponentHas({oponent_id: state.round, persona: 'kabuki', postround_message: "I just changed my cards"}) }> {counteraction_message} </button>
        </>
      )

    } else if (action_ongoing === '6' && props.state.oponent_id === 3) {
      return (
        <>
          <button className="counteraction-button" onClick={() => { ToggleGeishaModal(); clearInterval(state.interval_id) }}> 
            'See your options for a ninja attack'
          </button>
        </>
      )

    } else {
      return '';
    };
  };

  const ChooseCardsForPlayer = (player_id, deck, players) => {

    const random_index_1 = Math.floor(Math.random() * deck.length);
    var persona_1 = deck.splice(random_index_1, 1)[0]; // choose random card from deck and remove it (hand it to player)

    const random_index_2 = Math.floor(Math.random() * deck.length);
    var persona_2 = deck.splice(random_index_2, 1)[0]; // choose another random card from deck and hand it to player)

    players[player_id].card_1_image = persona_1;
    players[player_id].card_1_dead = false;
    players[player_id].card_2_image = persona_2;
    players[player_id].card_2_dead = false;
    players[player_id].coin_counter = 0;
    players[player_id].dead = false;
    players[player_id].message = '';

    return {players: players, deck: deck};
  };

  const StartNextGame = () => {
    var deck = [...game_state.deck];
    var players = [...game_state.players];

    var res1 = ChooseCardsForPlayer(0, deck, players);
    var res2 = ChooseCardsForPlayer(1, res1.deck, res1.players);
    var res3 = ChooseCardsForPlayer(2, res2.deck, res2.players);
    var res4 = ChooseCardsForPlayer(3, res3.deck, res3.players);

    setGameState({...game_state, game_ongoing: true, deck: res4.deck, players: res4.players});
  };

  const NewGame = () => {
    return (
      <>
      <StartGameView />
      <Container className="introduction">
        <button className="start_button" onClick={() => StartNextGame()}><h2>START NEW GAME!</h2></button>
      </Container>
      </>
      )

  };

  const RenderBoard = () => {
    return(
      <>
    <BasicExample />
    
    <Container className="introduction">
      { state.geisha_check_modal &&
        <GeishaCheckModal  
               handleCheckGeisha = { () => handleCheckGeisha(3, state.oponent_id) }
               handleNoCheckGeisha = { () => handleNoCheckGeisha() }
               show = { state.geisha_check_modal }
               children = { <p> Your oponent defends him/herself with Geisha. Do you want to check if he/she indeed has Geisha? </p> } />
      }
      { state.geisha_modal &&
        <GeishaModal handleGeishaProtectAction = { () => handleGeishaProtectAction(state.round) } 
               handleGeishaNoAction = { handleGeishaNoAction }
               handleCheckGeishaAction = { () => handleCheckGeishaAction(state.round) }
               show = { state.geisha_modal }
               children = { <p> What do you want to do? </p> } />
      }
      { state.twocoins_modal &&
        <TwoCoinsModal handleTwoCoinsAction = { () => handleTwoCoinsAction(state.oponent_id) } 
               handleTwoCoinsNoAction = { handleTwoCoinsNoAction }
               show = { state.twocoins_modal }
               children = { <p> {state.players[state.oponent_id].name} (pretends that he/she) has Daymio and prevents you from taking 2 coins. What do you want to do? </p> } />
      }

      <h1>Round of player: {state.players[state.round].name}</h1>
      <h2>Your hand:</h2>
      <div id='hand'>
        < img src={ IMAGES[state.players[3].card_1_image] } />
        < img src={ IMAGES[state.players[3].card_2_image] } />
      </div>

      <div className='counteractions'>
         { ( state.action_ongoing && (state.round !== 3)) && RenderCounteraction({state: state}) }
      </div>

      <div id='counter'></div>

      <button id='next-round-button' className={state.round === 3 ? 'disable' : ''} onClick={() => StartNextRound() }> Start next round </button>
              { (state.kabuki_exchange_ongoing) && 
            <KabukiChangeCards kabuki_hand = { state.kabuki_hand } />}

      <div className='options'>
        { state.round === 3 ? RenderPossibleActions({state: state}) : '' }
      </div>

      <div>
        <Board />
      </div>
    </Container>
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
