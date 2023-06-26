var game_state = {
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

	round: 3

    }; 


export default game_state;