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
    

    var x = setInterval(function() {
      document.getElementById("counter").innerHTML = seconds + "s ";

      if (seconds < 0) {
          clearInterval(x);
          // document.getElementById("counter").innerHTML = "EXPIRED";
        }

      seconds -= 1;
      }, 1000)
    };