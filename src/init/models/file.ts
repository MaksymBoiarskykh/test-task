export interface IFile {
  [key: string]: any;
  id: string;
  name: string;
  isFolder: boolean;
  items: IFile[];
}