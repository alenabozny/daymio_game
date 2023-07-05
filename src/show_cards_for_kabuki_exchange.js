import React from "react";

function ShowCardsForKabukiExchange(props) {
  // show to the user his/her cards and dwo random from the deck
  var deck = props.deck;
  var card_1_image = props.player.card_1_image;
  var card_2_image = props.player.card_2_image;

  var kabuki_hand = {};
  kabuki_hand[card_1_image + '_1'] = false;
  kabuki_hand[card_2_image + '_2'] = false;

  var random_index_1 = Math.floor(Math.random()*deck.length);
  let newcard_1 = deck.splice(random_index_1, 1)[0];
  kabuki_hand[newcard_1 + '_3'] = false;

  var random_index_2 = Math.floor(Math.random()*deck.length);
  let newcard_2 = deck.splice(random_index_2, 1)[0];
  kabuki_hand[newcard_2 + '_4'] = false;

  return kabuki_hand;
};

export default ShowCardsForKabukiExchange;