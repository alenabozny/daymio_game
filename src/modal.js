import React from "react";

export const GeishaModal = ({handleGeishaProtectAction, handleGeishaNoAction, handleCheckGeishaAction, show, children}) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}

        <button type="button" onClick={ handleGeishaProtectAction }>
          (Pretend that) you have Geisha, protect yourself!
        </button>

        <button type="button" onClick={ handleCheckGeishaAction }>
          Check if your attacker has ninja
        </button>

        <button type="button" onClick={ handleGeishaNoAction }>
          Do nothing and die...
        </button>
      </section>
    </div>
  );
};

export const SamuraiModal = ({handleCheckSamuraiAction, handleSamuraiNoAction, show, children}) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}

        <button type="button" onClick={ handleCheckSamuraiAction }>
          Check if your checker has Daymio.
        </button>

        <button type="button" onClick={ handleSamuraiNoAction }>
          Do nothing and let the player prevent you from taking 2 coins.
        </button>
      </section>
    </div>
  );
};

// export default GeishaModal;