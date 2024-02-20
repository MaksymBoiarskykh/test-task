import { FC, useContext } from 'react';
import styles from './styles.module.scss';
import ModalContext from '../../../init/context/modalContext';
import Button from '../Button';
import { Modals } from '../../../init/constants/modals';
import CreateFileForm from '../CreateFileForm';

interface ModalProps {
  subFiles: string[];
}

const Modal: FC<ModalProps> = ({ subFiles }) => {
  const { modal, setModal } = useContext(ModalContext);

  const handleCloseClick = () => {
    setModal(null);
  };

  return (
    <>
      <div
        className={styles.container}
        onClick={handleCloseClick}
      ></div>
      <div className={styles.modal}>
        {modal === Modals.NOT_IMPLEMENTED
          ? (<div>not implemented</div>)
          : (<CreateFileForm subFiles={subFiles} />)}

        <Button
          className={styles.btn}
          type='secondary'
          onClick={handleCloseClick}
        >
          x
        </Button>
      </div>
    </>
  );
};

export default Modal;
