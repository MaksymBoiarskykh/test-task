import { FC, useContext } from 'react';
import styles from './styles.module.scss';
import { IFile } from '../../../init/models/file';
import Button from '../Button';
import FilesContext from '../../../init/context/filesContext';
import ModalContext from '../../../init/context/modalContext';
import { Modals } from '../../../init/constants/modals';
import { deleteFile, updateSubFiles } from '../../../api/files';
import { Elements } from '../../../init/constants/elements';
import { useFindSubElements } from '../../../tools/hooks/useFindSubElements';
import { modificateSubElements } from '../../../tools/utils/modificateSubElements';

interface DropboxProps {
  addSubFile: (name: string) => void;
  subFiles: string[];
}

const Dropbox: FC<DropboxProps> = ({ addSubFile, subFiles }) => {
  const { files, setFiles } = useContext(FilesContext);
  const { setModal } = useContext(ModalContext);

  const data = useFindSubElements(files, subFiles);

  const openFolder = (item: IFile) => {
    addSubFile(item.id);
  };

  const handleDeleteClick = async (id: string) => {
    if (!subFiles.length) {
      await deleteFile(id);

      setFiles(files.filter((el) => el.id !== id));
    } else {
      const updatedFiles = modificateSubElements(subFiles, files, null, id);
      const updatedFile = updatedFiles.find((el) => el.id === subFiles[0]) as IFile;

      await updateSubFiles(subFiles[0], updatedFile);

      setFiles(updatedFiles);
    }
  };

  const handleOpenClick = (item: IFile) => {
    item.isFolder ? openFolder(item) : setModal(Modals.NOT_IMPLEMENTED);
  };

  if (!data.length) {
    return <div className={styles.emptyMessage}>empty</div>
  }

  return (
    <div className={styles.block}>
      {data?.map((item: IFile) => {
        return (
          <div key={item.id} className={styles.blockFile}>
            <div className={styles.blockFileButtons}>
              <div className={styles.blockFileIconBlock}>
                <img
                  src={`assets/${item.isFolder ? Elements.FOLDER : Elements.FILE}.png`}
                  alt='icon'
                />
              </div>
              <div>{item.name}</div>
              <Button
                type='secondary'
                onClick={() => handleOpenClick(item)}
              >
                open
              </Button>
              <Button
                type='secondary'
                onClick={() => handleDeleteClick(item.id)}
              >
                remove
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Dropbox;
