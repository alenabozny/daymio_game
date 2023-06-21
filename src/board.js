import React from "react";
import Player from './player.js';


class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [
      {
      	avatar: "https://placehold.co/125x125",
        name: "Adam",
        email: "ad@shave.pl",
        card_1_state: true,
        card_2_state: false,
        card_1_image: "kabuki",
        card_2_image: "geisha",
        status: "playing",
        coin_counter: 3
      },
      {
      	avatar: "https://placehold.co/125x125",
        name: "Ola",
        email: "ad@shave.pl",
        card_1_state: true,
        card_2_state: false,
        card_1_image: "ninja",
        card_2_image: "daymio",
        status: "disabled",
        coin_counter: 4
      },
      {
      	avatar: "https://placehold.co/125x125",
        name: "Marek",
        email: "ad@shave.pl",
        card_1_state: true,
        card_2_state: false,
        card_1_image: "daymio",
        card_2_image: "geisha",
        status: "playing",
        coin_counter: 0
      }]
    };
  }

    disablePlayer(i) {
	    const players = this.state.players.slice(); //immutable objects - to keep the history of change
	    players[i].status = !players[i].status;
	    this.setState({players: players});
  	}

  	addCoinsToPlayer(i) {
  		const players = this.state.players.slice();
  		players[i].coin_counter += 1;
  		this.setState({players: players})
  	}

	render () {
		return(
			<>
			{this.state.players.map((player, id) =>(
			<>
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
			/>
			</>
			))}
			</>
		)

	}
};

export default Board;