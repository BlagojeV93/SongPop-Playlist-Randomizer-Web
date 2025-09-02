import React from "react";
import Modal from "react-modal";
import { customModalStyle } from "../styles/modalStyle";
import SpecialTournamentsModal from "./SpecialTournamentsModal";

Modal.setAppElement(document.getElementById("root"));

const ModalComponent = ({ type, triggerModal }) => {

    const renderModalCont = () => {
      // nema ovde nista specijalno
     if(type === 'special'){
        return (
            <SpecialTournamentsModal onChooseOption=(triggerModal) /> 
        )
     }
    }

  return (
    <Modal
      isOpen={type !== null}
      onRequestClose={() => triggerModal(null)}
      style={customModalStyle}
      closeTimeoutMS={700}
    >
      {renderModalCont()}
    </Modal>
  );
};

export default ModalComponent;
