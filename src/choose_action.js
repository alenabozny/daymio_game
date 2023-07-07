import React from "react";

  // 0 is for taking 1 coin
  // 1 is for taking 2 coins
  // 2 is for taking 3 coins
  // 3 is for stealing 2 coins ** oponent must be known
  // 4 is for changing cards
  // 5 is for killing for 7 coins ** oponent must be known
  // 6 is for killing for 3 coins ** oponent must be known

const ACTIONS = {0: ["I'm gonna take 1 coin from the bank.", 
                     "I just took 1 coin from the bank."], 
                 1: ["I'm gonna take 2 coins from the bank.",
                     "I just took 2 coins from the bank."], 
                 2: ["I'm gonna use Daymio superpowers and take 3 coins from the bank.",
                     "I just took 3 coins from the bank."], 
                 3: ["I'm gonna steal 2 coins from ",
                     "I just stole 2 coins from "], 
                 4: ["I'm gonna user KABUKI superpowers and change my cards.",
                     "I just changed my cards!"], 
                 5: ["For 7 coins I'm gonna kill ",
                     "I just killed "], 
                 6: ["With my NINJA superpowers I'm gonna kill ", 
                     "As NINJA, I just killed "]
               };

function PossibleActions(player) {
  var possible_actions = Object.keys(ACTIONS);

  player.coin_counter < 3 && possible_actions.splice(6, 1);
  player.coin_counter < 7 && possible_actions.splice(5, 1);

  return possible_actions
}

function ChooseAction(props) {
  var players = props.players;
  var oponents = [...props.players]; // hard copy the players to later create the oponents list
  const current_player_id = props.newround;
  const random_number = Math.random();

  var action_id = 0;
  var possible_actions = PossibleActions(players[current_player_id]);
  console.log("Possible Actions: " + possible_actions);

  var message = ['',''];
  const num_actions = possible_actions.length;

  // oponents.splice(current_player_id, 1); // remove current player from the oponents list
  // const oponent = oponents[Math.floor(Math.random()*oponents.length)]; // randomly choose an oponent for the current player
  var oponent_ids = [];
  var players_copy = [...props.players];

  oponent_ids = players_copy.map(
                  (player, id) => { 
                    return (id === current_player_id) || player.dead ? -1 : id
                  }).filter( j => j != -1 );

  var random_oponent_id = Math.floor(Math.random()*oponent_ids.length);

  var action_id = possible_actions[Math.floor(Math.random()*num_actions)];

  return({action_id: action_id,
          initial_message: ACTIONS[action_id][0],
          postround_message: ACTIONS[action_id][1],
          oponent_id: random_oponent_id,
          players: players});
};

export default ChooseAction;