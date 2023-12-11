import React from "react";

export const GeishaModal = ({handleGeishaProtectAction, handleGeishaNoAction, handleCheckNinjaAction, show, children}) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}

        <button type="button" onClick={ handleGeishaProtectAction }>
          (Pretend that) you have Geisha, protect yourself!
        </button>

        <button type="button" onClick={ handleCheckNinjaAction }>
          Check if your attacker has ninja
        </button>

        <button type="button" onClick={ handleGeishaNoAction }>
          Do nothing and die...
        </button>
      </section>
    </div>
  );
};

export const GeishaCheckModal = ({handleCheckGeisha, handleNoCheckGeisha, show, children}) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}

        <button type="button" onClick={ handleCheckGeisha }>
          Check if your oponent has geisha.
        </button>

        <button type="button" onClick={ handleNoCheckGeisha }>
          Do not check, your ninja attack will be defeated.
        </button>

      </section>
    </div>
  );
};

export const TwoCoinsModal = ({handleTwoCoinsAction, handleTwoCoinsNoAction, show, children}) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={ showHideClassName }>
      <section className="modal-main">
        {children}

        <button type="button" onClick={ handleTwoCoinsAction }>
          Check if your checker has Daymio.
        </button>

        <button type="button" onClick={ handleTwoCoinsNoAction }>
          Do nothing and let the player prevent you from taking 2 coins.
        </button>
      </section>
    </div>
  );
};

export const WPTKModal = ({handleKillFirst, handleKillSecond, show, children, options}) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={ showHideClassName }>
      <section className="modal-main">
        {children}

        <button type="button" onClick={ handleKillFirst }>
          Kill {options[0]}
        </button>

        <button type="button" onClick={ handleKillSecond }>
          Kill {options[1]}
        </button>
      </section>
    </div>
  );
};


