import Modal from "../Modal/Modal";

type ShowChallengeModalProps = {
  challenge: Challenge;
};
const ShowChallengeModal = ({ challenge }: ShowChallengeModalProps) => {
  return (
    <Modal buttonContent="View Challenge">
      <p>{challenge.readingPiece}</p>
    </Modal>
  );
};

export default ShowChallengeModal;
