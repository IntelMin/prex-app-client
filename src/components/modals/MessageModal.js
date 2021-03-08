
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'react-bootstrap';
const MessageModal = () => {

  return (
    <Modal show={props.show} onHide={handleClose} className="connect-modal">
      <ModalHeader >{props.title}</ModalHeader>
      <ModalBody>{props.content}</ModalBody>
      {props.onOK && props.okContent && <ModalFooter>
        <Button className="w-full sm:w-auto text-white rounded-none py-4" onClick={props.onOK}>
          {props.okContent}
        </Button>
      </ModalFooter>}
    </Modal>
  );
};

export default MessageModal;