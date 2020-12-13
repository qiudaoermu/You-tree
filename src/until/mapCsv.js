import rawFileIconIndex from '../assets/images/file-icons-index.csv'
import rawFolderIconIndex from '../assets/images/folder-icons-index.csv'
export function parseFileIconMapCSV() {
  rawFileIconIndex.split('\n').forEach(line => {
    console.log(line)
  })
}