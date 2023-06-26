import React from "react";
import Player from './player.js';
import game_state from './game_state.js';


class Board extends React.Component {
	constructor(props) {
    super(props);
  }

	render () {
		return(
			<>
			<div className='players'>
				{game_state.players.map((player, id) =>(
				<Player
				  key={id}
				  avatar={player.avatar}
				  name={player.name}
				  email={player.email}
				  coin_counter={player.coin_counter}
				  card_1_image={player.card_1_image}
				  card_2_image={player.card_2_image}
				  card_1_state={player.card_1_state}
				  card_2_state={player.card_2_state}
				  onClick={() => this.addCoinsToPlayer(id)}
				  status={player.status}
				  message={player.message}
				/>
				))}
			</div>
			</>
			)

	};
};

export default Board;