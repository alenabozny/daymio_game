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
        coin_counter: 3,
        message:''
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
        coin_counter: 4,
        message:''
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
        coin_counter: 0,
        message:''
      },
      {
      	avatar: "https://placehold.co/125x125",
        name: "You",
        email: "ad@shave.pl",
        card_1_state: true,
        card_2_state: false,
        card_1_image: "daymio",
        card_2_image: "geisha",
        status: "playing",
        coin_counter: 0,
        message:''
      }],

	round: 3,

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

  	take1Coin(player_id) {
  		const players = this.state.players.slice();
  		players[player_id].coin_counter += 1;
  		this.setState({players: players});
  		this.startNextRound();
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

  	// non-user-generated actions

  	startNextRound() {
  		// start round of another player
  		// choose a random option for the next player
  		// prompt round-dependent options for the next player

  		const newround = this.state.round + 1;
  		this.state.round = newround % 4;
  		const player_id = this.state.round;
  		const random_number = Math.random();
  		const players = this.state.players;

		  if (random_number<0.15) {
			  players[player_id].message = "I'm gonna take 1 coin from the bank.";
			} else if (random_number<0.3) {
			  players[player_id].message = "I'm gonna use Daymio superpowers and take 3 coins from the bank!";
			} else if (random_number<0.45) {
				players[player_id].message = 'I\'m gonna use my wealth and kill {players[Math.random()*4]}!';
			} else if (random_number<0.6) {
				players[player_id].message = 'I\'m gonna use Ninja superpowers and kill {players[Math.random()*4]} for three coins!';
			} else if (random_number<0.75) {
				players[player_id].message = 'I\'m gonna use Samurai superpowers and steal two coins from {players[Math.random()*4]}!';
			} else {
				players[player_id].message = 'I\'m gonna use Kabuki superpowers and change my cards.';
			}
  	}

  	renderClass1Options() {
  		let players = [...this.state.players]; // spreading will return a new array
  		let other_players = players.slice(0,3);

  		return (
  		/* passing the function to onClick instead of calling it */
  			<>
  				<br />
  				<button onClick={() => this.take1Coin(this.state.round-1)}>Take one coin from the bank.</button>
  				<button onClick={this.daymio_take3Coins()}>Take 3 coins from the bank.</button>
  				<button onClick={this.kabuki_changeCards()}>Change cards.</button>
  				
  				<h4>Steal 2 coins from</h4>
  				{other_players.map((player, id) =>(
					<button onClick={this.samurai_steal2Coins(player.id)}>
  						{player.name}
  					</button>
				))}

				<h4>Kill </h4>
  				{other_players.map((player, id) =>(
					<button onClick={this.killFor7(player.id)}>
  						{player.name}
  					</button>
				))}

				<h4>Kill as Ninja (for 3 coins) </h4>
				{other_players.map((player, id) =>(
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
  					Stop player {this.state.players[props.round].name} from taking two coins.
  				</button>
  			</>
  		)
  	}

	render () {
		return(
			<>
			<h1>Round of player: {this.state.players[this.state.round].name}</h1>
			<div className='players'>
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
				  message={player.message}
				/>
				))}
			</div>
			<div className='options'>
				{ this.state.round === 3 ? this.renderClass1Options() : this.renderClass2Options(this.state) }
			</div>
			</>
			)

	}
};

export default Board;