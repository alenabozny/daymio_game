import React from "react";

function HasNCoins(player, N) {
  return player.coin_counter >= N ? true : false ;
}

export default HasNCoins;