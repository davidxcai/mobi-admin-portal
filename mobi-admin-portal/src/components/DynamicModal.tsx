import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import useUi from "../hooks/useUi";

interface DynamicModalProps {
  title: string;
  content: React.ReactNode;
  confirmText: string;
  confirmAction: () => void;
}

function DynamicModal({
  title,
  content,
  confirmText,
  confirmAction,
}: DynamicModalProps) {
  const { closeModalHandler } = useUi();
  const isModalOpen = useSelector((state: RootState) => state.ui.isModalOpen);
  return (
    <Modal show={isModalOpen}>
      <Modal.Header closeButton onClick={closeModalHandler}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{content}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModalHandler}>
          Close
        </Button>
        <Button variant="primary" onClick={confirmAction}>
          {confirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DynamicModal;
