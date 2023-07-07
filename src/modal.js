import React from "react";

const Modal = ({handleProtectAction, handleNoAction, handleCheckingAction, show, children}) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}

        <button type="button" onClick={ handleProtectAction }>
          (Pretend that) you have Geisha, protect yourself!
        </button>

        <button type="button" onClick={ handleCheckingAction }>
          Check if your attacker has ninja
        </button>

        <button type="button" onClick={ handleNoAction }>
          Do nothing and die...
        </button>
      </section>
    </div>
  );
};

export default Modal;