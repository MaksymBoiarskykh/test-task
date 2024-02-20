import { useCallback, useContext } from 'react';
import { getFiles } from '../../api/files';
import ToolBar from '../components/ToolBar';
import Modal from '../components/Modal';
import Dropbox from '../components/Dropbox';
import ModalContext from '../../init/context/modalContext';
import FilesContext from '../../init/context/filesContext';
import { useFetch } from '../../tools/hooks/useFetch';
import { useLocalStorage } from '../../tools/hooks/useLocalStorage';
import { IFile } from '../../init/models/file';

const Main = () => {
  const { setFiles } = useContext(FilesContext);
  const { modal } = useContext(ModalContext);
  const [subFiles, setSubFiles] = useLocalStorage<IFile[]>('subFiles', []);

  const [isLoading, error] = useFetch(async () => {
    const files = await getFiles();
    setFiles(files);
  });

  const addSubFile = useCallback((id: string) => {
    const newSubFiles = [...subFiles, id];

    setSubFiles(newSubFiles);
  }, [subFiles]);

  const removeSubFile = useCallback(() => {
    const newSubFiles = subFiles.slice(0, -1);

    setSubFiles(newSubFiles);
  }, [subFiles]);

  if (isLoading) {
    return <div className='messageBlock'>loading...</div>;
  }

  if (error) {
    return <div className='messageBlock'>{error}</div>;
  }

  return (
    <div className='wrapper'>
      <ToolBar
        subFiles={subFiles}
        removeSubFile={removeSubFile}
      />
      <Dropbox
        addSubFile={addSubFile}
        subFiles={subFiles}
      />
      {modal && <Modal subFiles={subFiles} />}
    </div>
  );
};

export default Main;
