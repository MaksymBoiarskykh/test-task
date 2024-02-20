import { useState } from 'react';
import ModalContext from './init/context/modalContext';
import { ModalType } from './init/models/modal';
import Main from './view/pages/Main';
import FilesContext from './init/context/filesContext';
import { IFile } from './init/models/file';

const App = () => {
  const [files, setFiles] = useState<IFile[]>([]);
  const [modal, setModal] = useState<ModalType | null>(null);

  return (
    <FilesContext.Provider value={{ files, setFiles }}>
      <ModalContext.Provider value={{ modal, setModal }}>
        <Main />
      </ModalContext.Provider>
    </FilesContext.Provider>
  );
};

export default App;
