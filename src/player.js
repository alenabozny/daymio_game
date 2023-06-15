import React from "react";

// Players as class objects
const cardCover = "https://img.freepik.com/free-vector/hand-drawn-japanese-wave-pattern-illustration_23-2149522575.jpg?w=826&t=st=1686747207~exp=1686747807~hmac=3b573a7943db5c54231481b46956fd9d7091caf30d0a029d71daa800985e4f82"
const personaImages = {"ninja": "https://freesvg.org/img/Ninja-Head.png",
    "geisha": "https://freesvg.org/img/df54ed72.png",
    "daymio": "https://freesvg.org/img/Royal_face1.png",
    "samurai": "https://freesvg.org/img/025.png",
    "kabuki": "https://freesvg.org/img/zeimusu-kabuki-actor.png"
  };

class PlayerObj extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            avatar: props.avatar,
            firstName: props.name,
            email: props.email,
            card_1_state: props.card_1_state,
            card_1_image: props.card_1_image,
            card_2_state: props.card_2_state,
            card_2_image: props.card_2_image
        }
       }
  
      // Arrow function
      changeCard1State = () => {
        this.setState({card_1_state: !this.state.card_1_state})
      }

      render() {
        return(
            <div className="contact-card">
                <img src={this.state.avatar} alt="profile" />
                <div className="user-details">
                    <p>Name: {this.state.firstName}</p>
                    <p>Email: {this.state.email}</p>
                </div>
                <div className='cards'>
                    { this.state.card_1_state === true ? <img src={personaImages[this.state.card_1_image]} alt="first-card" /> : <img src={cardCover} alt="first-card" />}
                    { this.state.card_2_state === true ? <img src={personaImages[this.state.card_2_image]} alt="second-card" /> : <img src={cardCover} alt="second-card" />}
                </div>
                <button onClick={this.changeCard1State}></button>
            </div>
        );
        }
  }
  
  // end Player class

export default PlayerObj;