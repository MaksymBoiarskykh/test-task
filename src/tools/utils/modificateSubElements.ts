import { IFile } from '../../init/models/file';

export const modificateSubElements = (
  subFiles: string[],
  files: IFile[],
  newFile: IFile | null,
  removeFileId?: string
) => {
  let newFiles: IFile[] = JSON.parse(JSON.stringify(files));
  let result = newFiles;

  subFiles.forEach((subFile) => {
    result.forEach((el) => {
      if (el.id === subFile) {
        result = el.items;

        if (el.id === subFiles.slice(-1)[0]) {
          newFile
            ? el.items.push(newFile)
            : (el.items = el.items.filter((el) => el.id !== removeFileId));
        }
      }
    });
  });

  return newFiles;
};
