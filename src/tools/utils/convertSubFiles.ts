import { useMemo } from 'react';
import { IFile } from '../../init/models/file';

export const useConvertSubFiles = (
  subFiles: string[],
  files: IFile[],
  key: string
) =>
  useMemo(() => {
    let data = [...files];
    let result = ['all'];

    subFiles.forEach((subFile) => {
      data.forEach((el) => {
        if (el.id === subFile) {
          result.push(el[key]);
          data = el.items;
        }
      });
    });

    return result;
  }, [files, subFiles, key]);
