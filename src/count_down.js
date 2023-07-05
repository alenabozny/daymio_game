import React from "react";

function CountDown(props) {
    // Set the date we're counting down to
  var counter = props.seconds;

  // Update the count down every 1 second
  var x = setInterval(function() {
    document.getElementById("counter").innerHTML = "You have" + counter + "seconds to decide...";

    if (counter < 0) {
        clearInterval(x);
        document.getElementById("counter").innerHTML = 'Player ' + props.username + ' finished the round.';
      }

    counter -= 1;
  }, 1000);
};

export default CountDown;