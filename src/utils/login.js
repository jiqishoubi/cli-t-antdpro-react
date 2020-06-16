import { MenuOutlined } from '@ant-design/icons';

/**
 * 处理菜单
 */
export const dealMenu = allMenu => {
  let rightsArr = [];
  let levelArr = [];
  allMenu.forEach(obj => {
    if (obj.menuUrl && obj.menuUrl.indexOf('_') > -1 && obj.menuUrl.indexOf('/') == -1) {
      //权限
      rightsArr.push(obj);
    } else {
      //菜单
      if (!levelArr[obj.menuLevel]) levelArr[obj.menuLevel] = [];
      obj.path = obj.menuUrl || '';
      obj.name = obj.menuName || '';
      obj.icon = obj.menuLevel != 2 ? (obj.menuIcon ? obj.menuIcon : 'line') : ''; // 菜单图标
      levelArr[obj.menuLevel].push(obj);
    }
  });
  for (let i = levelArr.length - 1; i >= 0; i--) {
    let index = i;
    let preIndex = i - 1;
    let arr = levelArr[index];
    let preArr = levelArr[preIndex];
    if (!preArr) continue;
    arr.forEach(obj => {
      preArr.forEach(preObj => {
        if (preObj.menuCode == obj.parentCode) {
          if (!preObj.children) preObj.children = [];
          preObj.children.push(obj);
        }
      });
    });
  }
  return {
    menuTree: levelArr[0] ? levelArr[0] : [],
    rightsArr,
  };
};

export const dealMenu2 = menuTree => {
  let tree = menuTree;
  let rightsArr = [];

  const dealArr = arr => {
    for (let i = 0; i < arr.length; i++) {
      let item = arr[i];
      if (item.menuUrl && item.menuUrl.indexOf('_') > -1) {
        //权限
        rightsArr.push(item);
      } else {
        //菜单
        item.path = '/' + item.menuUrl;
        item.name = item.menuName;
        if (item.menuLevel !== 1) {
          item.icon = '';
        } else {
          item.icon = '';
        }
        if (item.sons) {
          item.children = item.sons;
          dealArr(item.children);
        }
      }
    }
  };

  dealArr(tree);

  return {
    menuTree: tree,
    rightsArr,
  };
};

/**
 * 获取第一个菜单
 */
export const findFirstMenuUrl = ({ arr, childrenkey = 'children', urlKey = 'url' }) => {
  let url = '';
  const getFirst = arr => {
    if (arr && arr[0]) {
      if (arr[0][childrenkey]) {
        getFirst(arr[0][childrenkey]);
      } else {
        url = arr[0][urlKey];
      }
    }
  };
  getFirst(arr);
  return url;
};

export const findFirstMenuUrl2 = ({ arr, childrenkey = 'children', urlKey = 'url' }) => {
  let url = '';
  const getFirst = arr => {
    let item = arr[0];
    console.log(item);
    if (arr && item && item[urlKey].indexOf('_') == -1) {
      //是菜单
      if (
        (item[childrenkey][0] &&
          item[childrenkey][0][urlKey] &&
          item[childrenkey][0][urlKey].indexOf('_') > -1) ||
        !item[childrenkey][0]
      ) {
        //children[0]是权限
        //或者 没有children了
        url = item[urlKey];
      } else if (item[childrenkey]) {
        //继续
        getFirst(item[childrenkey]);
      }
    }
  };
  getFirst(arr);
  return '/' + url;
};
