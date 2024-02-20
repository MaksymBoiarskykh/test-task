import { SetStateAction, createContext, Dispatch } from 'react';
import { IFile } from '../models/file';

interface IFilesContext {
  files: IFile[];
  setFiles: Dispatch<SetStateAction<IFile[]>>;
}

const FilesContext = createContext<IFilesContext>({
  files: [],
  setFiles: () => {},
});

export default FilesContext;
