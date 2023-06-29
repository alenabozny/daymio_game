import React from "react";

// Players as class objects
const cardCover = "https://img.freepik.com/free-vector/hand-drawn-japanese-wave-pattern-illustration_23-2149522575.jpg?w=826&t=st=1686747207~exp=1686747807~hmac=3b573a7943db5c54231481b46956fd9d7091caf30d0a029d71daa800985e4f82"
const personaImages = {"ninja": "https://freesvg.org/img/Ninja-Head.png",
    "geisha": "https://freesvg.org/img/df54ed72.png",
    "daymio": "https://freesvg.org/img/Royal_face1.png",
    "samurai": "https://freesvg.org/img/025.png",
    "kabuki": "https://freesvg.org/img/zeimusu-kabuki-actor.png"
  };

function Player(props) {
    console.log(props.message);

    return(
      <div className={'player-card ' + props.dead} >
          <div className='message'>{props.message}</div>
          <div className="user-details">
              <p>Name: {props.name}</p>
              <p>Number of coins: {props.coin_counter}</p>
          </div>
          <div className='card'>
              { props.card_1_dead === true ? <img src={personaImages[props.card_1_image]} alt="first-card" /> : <img src={cardCover} alt="first-card" />}
              { props.card_2_dead === true ? <img src={personaImages[props.card_2_image]} alt="second-card" /> : <img src={cardCover} alt="second-card" />}
          </div>
          <button onClick={props.onClick}>Change number of coins of {props.name}</button>
      </div>
    );
  };
  

export default Player;