// 删除最后一个字符串
export let deleteLastStr = (str) => {
   str = str.substring(0, str.length - 1);
   return str;
}

/**
* @param {string} filePath
* @return {string} 文件后缀
*/
//获取文件后缀
export let getFileType = (file) => {
  let filePath = file.path
  if (file.type === 'tree') return 'folder'
  if (file.type === 'blob') {
    var index= filePath.lastIndexOf(".");
    if (index >= 0) {
      var ext = filePath.substr(index+1);
      return ext;
    } 
  }
}

/** 
* 截取文件路径
* @param {str}
* @return {str}
* a/b/c  => a/b
*/
export let getPre = (str) => {
  let spa = str.split('/');
  let strMerge = '';
  if (spa.length > 1) {
    for (var i = 0; i < spa.length-1; i++) {
      strMerge +=  spa[i] + '/';
    }
    strMerge = deleteLastStr(strMerge);
  }
  return strMerge;
}

/**
* 截取文件路径
* @param {str}
* @return {str}
* a/b/c  => c
*/
export let getPost = (str) => {
  let spa = str.split('/');
  return spa[spa.length-1];
}

export let setfileEndIcon = (file) => {
  let fileEnd = getFileType(file)
  switch (fileEnd) {
    case 'js':
      file.className = 'js-icon'
      break;
    case 'css':
      file.className = 'css-icon'
      break;
    case  'folder':
      file.className = 'folder-icon'
      break;
    case 'png':
      file.className = 'image-icon'
      break;
    case 'jpg':
      file.className = 'image-icon'
      break;
    case 'gif':
        file.className = 'gif-icon'
        break;
    case 'less':
      file.className = 'less-icon'
      break;         
    default:
      file.className = 'plain-icon'
  }
}
/*
[
  {
    path: 'src/config/firefox',
    label: '一级 1',
    children: [{
      path: 'src/config/firefox/asd',
      label: '二级 1-1',
      children: [{
        path: 9,
        label: '三级 1-1-1'
      }, {
        path: 10,
        label: '三级 1-1-2'
      }]
    }]
  }, {
    path: 2,
    label: '一级 2',
    children: [{
      path: 5,
      label: '二级 2-1'
    }, {
      path: 6,
      label: '二级 2-2'
    }]
  }, {
    path: 3,
    label: '一级 3'
  }
]
//path: "src/config/firefox/asd/manifest.json"

*/

export let findParent = (parentNode, node) => {
  let parent = parentNode.find(i => {return i.path === getPre(node.path)})
  if (parent) {
     parent.children.push(node);
     return true;
  } else {
    for(var i=0; i< parentNode.length; i++) {
      if (parentNode[i].children) {
        let res = findParent(parentNode[i].children, node)
        if (res) break;
      }
    }
  }
  return false;
}
export let getSvg = (className) => {
  console.log(process.env.NODE_ENV, 'process.env.NODE_ENV')
  if (process.env.NODE_ENV === 'development') {
    let imageUrl = require('../assets/images/'+className+'.svg');
    return imageUrl;
    return '1'
  } else {
    let imageUrl = chrome.extension.getURL('src/assets/images/'+className+'.svg');
    return imageUrl;
  }
}

export let promiseChain = (p1) => {
  return new Promise((resolve,reject) => {
    p1().then(d => {resolve(d)})
  })
}