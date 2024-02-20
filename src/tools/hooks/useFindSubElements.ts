import { useMemo } from 'react';
import { IFile } from '../../init/models/file';

export const useFindSubElements = (
  elements: IFile[],
  subElementsId: string[]
) =>
  useMemo(() => {
    let result = elements;

    subElementsId.forEach((subElId) => {
      result.forEach((el) => {
        if (el.id === subElId) {
          result = el.items;
        }
      });
    });

    return result;
  }, [elements, subElementsId]);
