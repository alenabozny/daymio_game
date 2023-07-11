const new_game_state = {
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
        card_1_dead: true,
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
        coin_counter: 10,
        message:''
      }],

	round: 3,
  oponent_id: null,
  action_ongoing: false,

  kabuki_exchange_ongoing: false,
  kabuki_hand: {},

  kabuki_finished_count: 0,
  defeated_geisha_attact_count: 0,
  taking_2_coins_count: 0,
  ninja_attack_count: 0,

  next_game_start: 0,

  lost_check: null,

  geisha_modal: false,
  geisha_check_modal: false,
  samurai_modal: false,

  game_ongoing: false,
  interval_id: null,

  deck: ['samurai', 'daymio', 'geisha', 'kabuki', 'ninja',
         'samurai', 'daymio', 'geisha', 'kabuki', 'ninja',
         'samurai', 'daymio', //'geisha', 
         // 'kabuki', 'ninja',
         // 'samurai', 'daymio', 'geisha', 'kabuki', 'ninja'
         ]

    }; 


export default new_game_state;