// import React from "react";

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
                 4: ["I'm gonna use KABUKI superpowers and change my cards.",
                     "I just changed my cards!"], 
                 5: ["For 7 coins I'm gonna kill ",
                     "I just killed "], 
                 6: ["With my NINJA superpowers I'm gonna kill ", 
                     "As NINJA, I just killed "]
               };

export function RandomOponentId(props) {
  var oponent_ids = [];
  var players = [...props.players];

  oponent_ids = players.map(
                  (player, id) => { 

                    // chose all oponents that are not the current player and are not dead

                    if ((id === props.current_player_id) || player.dead) {
                         return (-1); 

                    // if the action is Samurai attack, we have to check if the potential oponent has at least 2 coins to steal from

                    } else if ((player.coin_counter < 2) && (props.action_id === '3')) {
                         return (-1);
                    } else { return (id); };
                  }).filter( j => j !== -1 );

  var random_oponent_id = oponent_ids[Math.floor(Math.random()*oponent_ids.length)];

  return random_oponent_id;
}

function PossibleActions(props) {
  var possible_actions = Object.keys(ACTIONS);
  var player = props.player;

  player.coin_counter < 3 && possible_actions.splice(6, 1);
  player.coin_counter < 7 && possible_actions.splice(5, 1);
  player.coin_counter > 9 && possible_actions.splice(0, 1);
  if (player.coin_counter > 8) { possible_actions.splice(1,1); possible_actions.splice(3,1) };
  player.coin_counter > 7 && possible_actions.splice(2,1); 
                                 
  // check if we can steal from anybody in the game
  var players_from_whom_we_can_steal = props.players.filter(player => player.coin_counter >= 2)
                                                    .filter(player => !player.dead)
                                                    .filter(player => player !== props.player);

  if (players_from_whom_we_can_steal.length === 0) { possible_actions.splice(3, 1); }

  return possible_actions
}

export function ChooseAction(props) {
  var players = props.players;
  const current_player_id = props.newround;

  var action_id = 0;
  var possible_actions = PossibleActions({players: players, player: players[current_player_id]});

  const num_actions = possible_actions.length;

  action_id = possible_actions[Math.floor(Math.random() * num_actions)];

  console.log("Possible actions: ");
  console.log(possible_actions);

  var random_oponent_id = (['3', '5', '6']).includes(action_id) ? RandomOponentId({players: players, 
                                                                                  current_player_id: current_player_id,
                                                                                  action_id: action_id}) : null ;

  var oponent_name = (['3', '5', '6']).includes(action_id) ? players[random_oponent_id].name : '';
  var initial_message = ACTIONS[action_id][0] + oponent_name;
  var postround_message = ACTIONS[action_id][1] + oponent_name;


  return({action_id: action_id,
          initial_message: initial_message,
          postround_message: postround_message,
          oponent_id: random_oponent_id,
          players: players});
};
