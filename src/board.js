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
      }],

	round: 4,

    }; // end this.status
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

  	// global options

  	take1Coin() {
  		// start round of another player
  		// choose a random option for the next player
  		// prompt round-dependent options for the next player
  	}

  	daymio_take3Coins() {}

  	kabuki_changeCards() {}

  	// options to take on other player

  	samurai_steal2Coins(player_id) {}

  	killFor7 (player_id) {}

  	ninja_killFor3 (player_id) {}

  	// options to take during other player's round

  	geisha_defendNinjaAttack (player_id) {}

  	samurai_defendStealing (player_id) {}

  	kabuki_defendStealing (player_id) {}

  	daymio_stopFromTaking2Coins (player_id) {}

  	renderClass1Options() {
  		return (
  			<>
  				<button onClick={this.take1Coin()}>Take one coin from the bank.</button>
  				<button onClick={this.daymio_take3Coins()}>Take 3 coins from the bank.</button>
  				<button onClick={this.kabuki_changeCards()}>Change cards.</button>
  				
  				<h4>Steal 2 coins from</h4>
  				{this.state.players.map((player, id) =>(
					<button onClick={this.samurai_steal2Coins(player.id)}>
  						{player.name}
  					</button>
				))}

				<h4>Kill </h4>
  				{this.state.players.map((player, id) =>(
					<button onClick={this.killFor7(player.id)}>
  						{player.name}
  					</button>
				))}

				<h4>Kill as Ninja (for 3 coins) </h4>
				{this.state.players.map((player, id) =>(
	  				<button onClick={this.ninja_killFor3(player.id)}>
	  					{player.name}
	  				</button>
	  			))}
  			</>
  		)
  	}

  	renderClass2Options(props) {
  		return (
  			<>
  				<button onClick={this.geisha_defendNinjaAttack(props.round)}>
  					Defend yourself with a Geisha skill!
  				</button>
  				<button onClick={this.samurai_defendStealing(props.round)}>
  					You have (?) a Samurai - do not let them steal from you!
  				</button>
  				<button onClick={this.kabuki_defendStealing(props.round)}>
  					Or... you have a Kabuki to prevent the stealing.
  				</button>
  				<button onClick={this.daymio_stopFromTaking2Coins(props.round)}>
  					Stop player {this.state.players[props.round-1].name} from taking two coins.
  				</button>
  			</>
  		)
  	}

	render () {
		return(
			<>
			<h1>Round of player: {this.state.round}</h1>
			{this.state.players.map((player, id) =>(
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
			))}
			<div className='options'>
				{ this.state.round === 4 ? this.renderClass1Options() : this.renderClass2Options(this.state) }
			</div>
			</>
			)

	}
};

export default Board;