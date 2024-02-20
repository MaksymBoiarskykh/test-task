import { FC, useCallback, useContext } from 'react';
import styles from './styles.module.scss';
import Button from '../Button';
import ModalContext from '../../../init/context/modalContext';
import { Modals } from '../../../init/constants/modals';
import FilesContext from '../../../init/context/filesContext';
import { useConvertSubFiles } from '../../../tools/utils/convertSubFiles';

interface ToolBarProps {
  subFiles: string[];
  removeSubFile: () => void;
}

const ToolBar: FC<ToolBarProps> = ({ subFiles, removeSubFile }) => {
  const { setModal } = useContext(ModalContext);
  const { files } = useContext(FilesContext);

  const fileNames = useConvertSubFiles(subFiles, files, 'name');

  const handleCreateClick = useCallback(() => {
    setModal(Modals.CREATE_FILE);
  }, []);

  return (
    <div className={styles.toolBar}>
      <div className={styles.toolBarFolder}>
        {fileNames.map((name, index) => (
          <span key={index}>
            {index > 0 && <span> -- </span>}
            <span>{name}</span>
          </span>
        ))}
      </div>

      <div className={styles.toolBarTools}>
        {fileNames[fileNames.length - 1] !== 'all' && (
          <Button type='primary' onClick={removeSubFile}>back</Button>
        )}
        <Button
          type='primary'
          onClick={handleCreateClick}
        >
          create item
        </Button>
      </div>
    </div>
  );
};

export default ToolBar;
