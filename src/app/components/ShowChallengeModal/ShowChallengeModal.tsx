import Modal from "../Modal/Modal";

type ShowChallengeModalProps = {
  readingPiece: string;
};
const ShowChallengeModal = ({ readingPiece }: ShowChallengeModalProps) => {
  return (
    <Modal buttonContent="View Challenge">
      <p>{readingPiece}</p>
    </Modal>
  );
};

export default ShowChallengeModal;
