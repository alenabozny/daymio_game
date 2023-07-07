import React from "react";

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
  const ACTION_NUMBER = 7000;

  oponents.splice(current_player_id, 1); // remove current player from the oponents list
  const oponent = oponents[Math.floor(Math.random()*oponents.length)]; // randomly choose an oponent for the current player

  if (random_number<(1/ACTION_NUMBER)) {
    // player wants to take 1 coin from the bank
    action_id = 0;
    message[0] = "I'm gonna take 1 coin from the bank.";
    message[1] = "I just took 1 coin from the bank.";
    players[current_player_id] = {...players[current_player_id], 
                                  coin_counter: players[current_player_id].coin_counter += 1}

  } else if (random_number<(2/ACTION_NUMBER)) {
    // player wants to take 2 coins from the bank
    action_id = 1;
    message[0] = "I'm gonna take 2 coins from the bank.";
    message[1] = "I just took 2 coins from the bank.";
    players[current_player_id] = {...players[current_player_id], 
                                  coin_counter: players[current_player_id].coin_counter += 2}  
  } else if (random_number<(3/ACTION_NUMBER)) {
    // player wants to take 3 coins from the bank -!!!- DAYMIO -!!!-
    action_id = 2;
    message[0] = "I'm gonna use Daymio superpowers and take 3 coins from the bank.";
    message[1] = "I just took 3 coins from the bank.";
    players[current_player_id] = {...players[current_player_id], 
                                  coin_counter: players[current_player_id].coin_counter += 3}  
    } else if (random_number<(4/ACTION_NUMBER)) {
    // player wants to steal 2 coins from ... -!!!- SAMURAI -!!!-
    action_id = 3;
    message[0] = "I'm gonna take 2 coins from the bank.";
    message[1] = 'I just stole 2 coins from' + oponent.name +'.';
    players[current_player_id] = {...players[current_player_id], 
                                  coin_counter: players[current_player_id].coin_counter += 2}
    // TODO: -= 2 for the oponent

  }  else if (random_number<(5/ACTION_NUMBER)) {
    // player wants to change the cards -!!!- KABUKI -!!!-
    action_id = 4;
    message[0] = "I'm gonna user KABUKI superpowers and change my cards.";
    message[1] = "I just changed my cards!";
    // TODO: change cards for the current player; remaining: create the deck

  } else if (random_number<(6/ACTION_NUMBER)) {
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

export default ChooseAction;