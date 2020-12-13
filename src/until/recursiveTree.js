import {deleteLastStr, getPre, findParent, getPost, setfileEndIcon} from './untils'
export let recursiveTree = (flatTree) => {
   let result = [];
      let tem = '';
      flatTree.reduce((a, b) => {

        /*
          b 四种情况
            1.根文件
            2.次文件
            3.根文件
            4.次文件夹
        */ 
        // 设置文件结尾class 设置图标
        setfileEndIcon(b);
      
        if (b.path.split('/').length === 1 && b.type === 'blob') {
          b.name = b.path;
          result.push(b);

          return result
        }

        if (b.path.split('/').length === 1 && b.type === 'tree'){
           // b 是根文件夹
          tem = b;
          b.name = b.path;
          result.push(tem)
          return result;
        } 

        if (b.path.split('/').length > 1 && b.type === 'blob') {
          // b是次文件
          b.name = getPost(b.path);
          if (getPre(b.path) === tem.path) {
            if (tem.children && tem.children.length >= 1) {
              tem.children.push(b);
            } else {
              tem.children = [];
              tem.children.push(b);
            }
          } else {
            findParent(result, b)
          }
          return result;
        }

        if (b.path.split('/').length > 1 && b.type === 'tree') {
          // b是次文件夹
          b.name = getPost(b.path);
          if (getPre(b.path) === tem.path) {
           if (tem.children && tem.children.length >= 1) {
              tem.children.push(b);
            } else {
              tem.children = [];
              tem.children.push(b);
            }
          } else {
            findParent(result, b)
          }
          tem = b;
          return result;
        }
      }, result)
      return result;
}
export let sortTree = (tree) => {
  let ca = [];
  let pa = [];
  tree.forEach(d => {
    if (d.children) {
      ca.push(d);
      sortTree(d.children)
    } else {
      pa.push(d);
    }
  });
  tree.splice(0, tree.length);
  tree.push(...ca, ...pa);
  return tree
}