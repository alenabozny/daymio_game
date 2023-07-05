import React from "react";

function ShowCardsForKabukiExchange(props) {
  // show to the user his/her cards and dwo random from the deck
  var deck = props.deck;
  var player_hand = [];
  var iterator = 1;

  // take only alive personas to be part of the hand
  !props.player.card_1_dead && player_hand.push( props.player.card_1_image );
  !props.player.card_2_dead && player_hand.push( props.player.card_2_image );

  var kabuki_hand = {};

  for (let i = 0; i < player_hand.length; i++) {
    kabuki_hand[player_hand[i] + '_' + iterator] = false;
    iterator++;
  }

  var random_index_1 = Math.floor(Math.random()*deck.length);
  let newcard_1 = deck.splice(random_index_1, 1)[0];
  kabuki_hand[newcard_1 + '_' + iterator] = false;

  var random_index_2 = Math.floor(Math.random()*deck.length);
  let newcard_2 = deck.splice(random_index_2, 1)[0];
  kabuki_hand[newcard_2 + '_' + (iterator + 1)] = false;

  return kabuki_hand;
};

export default ShowCardsForKabukiExchange;