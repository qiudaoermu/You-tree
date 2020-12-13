import axios from 'axios'

export let getBasePramas = () =>{
  let path = location.pathname.split('/');
  let param = path[1] + '/' + path[2]; // tamer1an/octo-free
  let protocol = location.protocol // "https:"
  let api = 'api.github.com';
  let url = protocol + '//' + api + '/repos' + '/' + param; //https://api.github.com/repos/tamer1an/octo-free
  if(process.env.NODE_ENV === 'development') {
    url = 'https://api.github.com/repos/tamer1an/octo-free'
  }
  return new Promise((resolve, reject) => {
    axios(url).then(data => {
      resolve(data.data)
    })
  })
}
export let getTreeData = () => {
  return new Promise(resolve => {
    getBasePramas().then(d => {
      let {default_branch, url} = d;
      // url "https://api.github.com/repos/tamer1an/octo-free"
      // https://api.github.com/repos/tamer1an/octo-free/git/trees/master?recursive=1
      let treeUrl = url + '/git/trees/' + default_branch + '?recursive=1';
      if(process.env.NODE_ENV === 'development') {
        treeUrl = 'https://api.github.com/repos/tamer1an/octo-free/git/trees/master?recursive=1'
      }
      axios(treeUrl).then(data => {
        resolve(data);
      })
    })
  })
}
