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

