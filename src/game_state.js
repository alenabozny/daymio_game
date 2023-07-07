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
        coin_counter: 0,
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
        dead: true,
        coin_counter: 0,
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
        coin_counter: 0,
        message:''
      }],

	round: 3,
  oponent_id: null,
  action_ongoing: false,
  kabuki_exchange_ongoing: false,
  kabuki_hand: {},
  geisha_modal: false,
  game_ongoing: false,
  deck: ['samurai', 'daymio', 'geisha', 'kabuki', 'ninja',
         'samurai', 'daymio', 'geisha', 'kabuki', 'ninja',
         'samurai', 'daymio', //'geisha', 
         // 'kabuki', 'ninja',
         // 'samurai', 'daymio', 'geisha', 'kabuki', 'ninja'
         ]

    }; 


export default game_state;