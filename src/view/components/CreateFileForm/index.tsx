import { FC, FormEvent, useContext, useState } from 'react';
import styles from './styles.module.scss';
import { addFile, updateSubFiles } from '../../../api/files';
import ModalContext from '../../../init/context/modalContext';
import FilesContext from '../../../init/context/filesContext';
import { modificateSubElements } from '../../../tools/utils/modificateSubElements';
import { createFile } from '../../../tools/utils/createFile';
import { IFile } from '../../../init/models/file';

interface CreateFileFormProps {
  subFiles: string[];
}

const CreateFileForm: FC<CreateFileFormProps> = ({ subFiles }) => {
  const { files, setFiles } = useContext(FilesContext);
  const { setModal } = useContext(ModalContext);

  const [name, setName] = useState('');
  const [type, setType] = useState('file');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setModal(null);

    const newFile = createFile(name, type);

    if (!subFiles.length) {
      await addFile(newFile);

      setFiles([...files, newFile]);
    } else {
      const updatedFiles = modificateSubElements(subFiles, files, newFile);
      const updatedFile = updatedFiles.find((el) => el.id === subFiles[0]) as IFile;

      await updateSubFiles(subFiles[0], updatedFile);

      setFiles(updatedFiles);
    }
  };

  return (
    <form
      className={styles.container}
      onSubmit={handleSubmit}
    >
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className={styles.typeBlock}>
        <label>
          <input
            type='radio'
            value='file'
            checked={type === 'file'}
            onChange={(e) => setType(e.target.value)}
          />
          File
        </label>
        <label>
          <input
            type='radio'
            value='folder'
            checked={type === 'folder'}
            onChange={(e) => setType(e.target.value)}
          />
          Folder
        </label>
      </div>

      <input
        className={styles.submitBtn}
        type='submit'
        value='create'
        disabled={!name}
      />
    </form>
  );
};

export default CreateFileForm;
