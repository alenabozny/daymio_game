import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import geisha from './images/geisha.png';
import daimyo from './images/daimyo.png';
import ninja from './images/ninja.png';
import kabuki from './images/kabuki.png';
import samurai from './images/samurai.png';

const IMAGES = {
  'geisha': geisha,
  'daymio': daimyo,
  'ninja' : ninja,
  'kabuki': kabuki,
  'samurai': samurai
};

function CustomNavbar(props) {
  return (
<Navbar sticky="top"> 
    <div className="nav-instruction">
          <div className="nav-instruction-block">
            <img src={daimyo} />
            <p>
            <b>DAIMYO:<br/></b>
              a) <b>Corruption: </b> Take 3 coins
                  from the treasury
                <br/>b) <b>Envy: </b>  Prevent enemy
                  player from taking 2 coins
                  from the treasury
            </p>
          </div>
          <div className="nav-instruction-block">
            <img src={geisha} />
            
            <p><b>GEISHA:<br/></b><b>Deadly sex-appeal: </b> Defend yourself against enemy Ninja attack</p>
          </div>
          <div className="nav-instruction-block">
            <img src={samurai} />
            <p>
            <b>SAMURAI:<br/></b>
                  a) <b>Pillage:</b> Attack an opponent
                  and rob him of 2 coins. Can be
                  repelled by Samurai or Kabuki.
                  <br/> b) <b>Duty: </b> Defend yourself against
                  enemy Samurai attack
            </p>
          </div>
          <div className="nav-instruction-block">
            <img src={ninja} />
            <p>
              <b>NINJA:<br/></b>
              <b>Assassination: </b> Pay 3 coins and
              kill enemy character.
            </p>
          </div>
          <div className="nav-instruction-block">
            <img src={kabuki} />
            
            <p><b>KABUKI:<br/></b>a) 
              <b>Shape Shifter:</b> Take 2 cards from the pool to your
                  hand, look them up and return 2 cards of your choice
                  <br/>b) <b>Trickery:</b> Defend yourself against Samurai attack
            </p>
          </div>
          <div className="nav-instruction-block" id='hand'>
              {/*<span className='red'>Your <br/> hand: </span>*/}
              < img src={ IMAGES[props.props.players[3].card_1_image] } />
              < img src={ IMAGES[props.props.players[3].card_2_image] } />
              YOUR < br />HAND
{/*            <div id='hand'>

              <p>Your hand: </p>
              < img src={ IMAGES[props.props.players[3].card_1_image] } />
              < img src={ IMAGES[props.props.players[3].card_2_image] } />
            </div>*/}
          </div>
      </div>
    </Navbar>
  );
}

export default CustomNavbar;