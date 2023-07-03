var game_state = {
  players: [
      {
      	avatar: "https://placehold.co/125x125",
        name: "Adam",
        email: "ad@shave.pl",
        card_1_dead: false,
        card_2_dead: false,
        card_1_image: NaN,
        card_2_image: NaN,
        dead: false,
        coin_counter: 3,
        message:''
      },
      {
      	avatar: "https://placehold.co/125x125",
        name: "Ola",
        email: "ad@shave.pl",
        card_1_dead: false,
        card_2_dead: false,
        card_1_image: NaN,
        card_2_image: NaN,
        dead: false,
        coin_counter: 4,
        message:''
      },
      {
      	avatar: "https://placehold.co/125x125",
        name: "Marek",
        email: "ad@shave.pl",
        card_1_dead: false,
        card_2_dead: false,
        card_1_image: NaN,
        card_2_image: NaN,
        dead: false,
        coin_counter: 0,
        message:''
      },
      {
      	avatar: "https://placehold.co/125x125",
        name: "You",
        email: "ad@shave.pl",
        card_1_dead: false,
        card_2_dead: false,
        card_1_image: NaN,
        card_2_image: NaN,
        dead: false,
        coin_counter: 6,
        message:''
      }],

	round: 3,
  action_ongoing: false,
  game_ongoing: false,
  deck: ['samurai', 'daymio', 'geisha', 'kabuki', 'ninja',
         'samurai', 'daymio', 'geisha', 'kabuki', 'ninja']
         // 'samurai', 'daymio', 'geisha', 'kabuki', 'ninja',
         // 'samurai', 'daymio', 'geisha', 'kabuki', 'ninja']

    }; 


export default game_state;