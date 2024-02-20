export const createFile = (name: string, type: string) => ({
  id: String(Math.floor(Math.random() * 100000)),
  name,
  isFolder: type === 'folder',
  items: [],
});
