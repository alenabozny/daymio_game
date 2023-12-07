import React from "react";
import reverse from './images/reverse.png';
import geisha from './images/geisha.png';
import daimyo from './images/daimyo.png';
import ninja from './images/ninja.png';
import kabuki from './images/kabuki.png';
import samurai from './images/samurai.png';

// Players as class objects
const cardCover = reverse;
const personaImages = {"ninja": ninja,
    "geisha": geisha,
    "daymio": daimyo,
    "samurai": samurai,
    "kabuki": kabuki
  };

function Player(props) {
    // console.log(props.message);

    return(
      <div className={'player-card ' + props.dead} >
          <div className='message down'>{props.message}</div>
          <div className="user-details">
              <p>Name: {props.name}</p>
              <p>Number of coins: {props.coin_counter}</p>
          </div>
          <div className='card'>
              { props.card_1_dead ? <img src={personaImages[props.card_1_image]} alt="first-card" /> : <img src={cardCover} alt="first-card" />}
              { props.card_2_dead ? <img src={personaImages[props.card_2_image]} alt="second-card" /> : <img src={cardCover} alt="second-card" />}
          </div>
      </div>
    );
  };
  

export default Player;