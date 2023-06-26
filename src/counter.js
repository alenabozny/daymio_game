import { useState, useEffect } from 'react';

export default function Counter(seconds) {
  const [counter, setCounter] = useState(seconds);

  useEffect(() => {
    const interval = setInterval(()=>{
      setCounter((count) => count - 1);
      if (counter < 0) {
        counter = 'EXPIRED';
        clearInterval(interval);
      };
    }, 1000);

    return () => clearInterval(interval);
  });

  return (
    <h1>{counter}</h1>
    );

}

    countDown(seconds) {
      // Set the date we're counting down to
    var now = new Date();
    var counter = seconds;
    

    // Update the count down every 1 second
    var x = setInterval(function() {
      // Display the result in the element with id="counter"
      document.getElementById("counter").innerHTML = seconds + "s ";

      // If the count down is finished, write some text
      if (seconds < 0) {
          clearInterval(x);
          document.getElementById("counter").innerHTML = "EXPIRED";
        }

      seconds -= 1;
      }, 1000)
    };