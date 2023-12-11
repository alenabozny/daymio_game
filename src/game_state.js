var game_state = {
  players: [
      {
        id: 0,
        name: "Adam",
        card_1_dead: false,
        card_2_dead: false,
        card_1_image: NaN,
        card_2_image: NaN,
        dead: false,
        coin_counter: 10,
        message:'...'
      },
      {
        id: 1,
        name: "Ola",
        card_1_dead: false,
        card_2_dead: false,
        card_1_image: NaN,
        card_2_image: NaN,
        dead: false,
        coin_counter: 10,
        message:'...'
      },
      {
        id: 2,
        name: "Marek",
        card_1_dead: false,
        card_2_dead: false,
        card_1_image: NaN,
        card_2_image: NaN,
        dead: false,
        coin_counter: 10,
        message:'...'
      },
      {
        id: 3,
        name: "You",
        card_1_dead: false,
        card_2_dead: false,
        card_1_image: NaN,
        card_2_image: NaN,
        dead: false,
        coin_counter: 9,
        message:'...'
      }],

	round: 3,
  oponent_id: null,
  action_ongoing: false,

  kabuki_exchange_ongoing: false,
  kabuki_hand: {},

  wptk_ongoing: false,
  wptk: NaN,

  kabuki_finished_count: 0,
  defeated_geisha_attact_count: 0,
  taking_2_coins_count: 0,
  ninja_attack_count: 0,

  next_game_start: false,

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


export default game_state;