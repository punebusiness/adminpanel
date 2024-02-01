import { useState ,useContext} from 'react'; 
import {modalContext} from "../../context"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
const Modal = ({ element}) => {
const {modal,setModal} = useContext(modalContext)
  const closeModal = () => {
    setModal(false);
  };

  return (
    <div className={`modal ${modal ? 'block' : 'hidden'}`}>
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50" onClick={closeModal}></div>

      <div className="modal-container fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-700 p-8 rounded-lg shadow-lg">
        <div className="modal-close absolute top-0 right-0 m-4 cursor-pointer text-white" onClick={closeModal}>
          <FontAwesomeIcon icon={faTimes} />
        </div>
        {element}
      </div>
    </div>
  );
};

export default Modal;
