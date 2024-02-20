import { SetStateAction, createContext, Dispatch } from 'react';
import { ModalType } from '../models/modal';

interface IModalContext {
  modal: ModalType | null;
  setModal: Dispatch<SetStateAction<ModalType | null>>;
}

const ModalContext = createContext<IModalContext>({
  modal: null,
  setModal: () => {},
});

export default ModalContext;
