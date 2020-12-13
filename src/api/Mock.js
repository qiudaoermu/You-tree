import axios from 'axios'
export let getTreeData = () => {
  return new Promise((resolve, reject) => {
    let treeUrl = 'https://api.github.com/repos/tamer1an/octo-free/git/trees/master?recursive=1'
    axios({method:'get', treeUrl}).then(data => {
      resolve(data)
    })
  })
}
export let getBasePramas = () => {
  return new Promise((resolve, reject) => {
    let url = 'https://api.github.com/repos/tamer1an/octo-free'
    axios({method:'get', url}).then(data => {
      resolve(data.data)
    })
  })
}
