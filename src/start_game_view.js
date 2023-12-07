import React from 'react';
import animation from './images/personas_animation.mp4';
import {Row, Container} from "react-bootstrap";


class StartGameView extends React.Component {
	render () {
		return(
			<>
			<Container>
			  <Row className="introduction">
				  <h1>
				  	WHO WILL BE
					<br />THE LAST LIVING <span>DAIMYO</span>?
					<br />WHO WILL STAY TO RULE JAPAN?
					<br />WHO WILL BECOME...
					<br />THE GREAT <span>SHOGUN</span>?
				  </h1>
			  </Row>
			  <Row className="introduction">
				<video height="400" loop autoplay="" muted>
					<source src={animation} type="video/mp4" />
					Your browser does not support the video tag.
				</video>
			  </Row>
			</Container>

			<Container>
				<Row className="introduction">
					<p>
					      <br /> Players receive 2 character cards to start. Everyone knows only their cards.
					      The goal of the game - SURVIVE.
					      <br />
					      <br />
					      In every move:
					        <br />- Get a coin from the treasury, OR
					        <br />- Take two coins from the treasury, OR
					        <br />- Use character skills, OR
					        <br />- Perform a "Coup d'Etat": Pay seven coins and kill an enemy character
					      
					      <br />
					      <br />
					      
					      <br /> You can have a maximum of ten coins.
					      <br /> You can bluff and use any character's abilities, regardless of what cards you have.
					      <br /> Checking consists in forcing the player to reveal the card of the character being used.
					      <br /> Only the player against whom the skill is used can check.
					      <br /> Exceptions - Daimyo's first ability and Kabuki's first ability.
					      <br /> 
					      <br /> Right check:
					      <br /> The bluffer permanently loses the revealed card. His move is invalidated.
					      <br /> Invalid check:
					      <br /> The player returns the revealed character to the deck and shuffles. Fetches a new card.
					      <br /> The caller chooses one of his cards and permanently loses it.
					      <br /> A dead character remains exposed until the end of the game.
					      <br /> A failed geisha bluff or a false ninja call results in the loss of both cards.
					      <br /> The player who loses all cards dies. His money is returned to the treasury.
					      <br /> 
					      <br /> 
					      <p className='note'> Note that this is a tutorial. For simplicity, check actions are between you and the other players only. The other players don't check each other (which definitely will happen in a real play). </p>
				    </p>
			    </Row>
		    </Container>
			</>
			)

	};
};

export default StartGameView;