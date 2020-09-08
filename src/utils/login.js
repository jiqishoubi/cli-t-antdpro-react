/**
 * 处理菜单
 */

function dealMenuFunc({
  array = [],
  key,                //必填
  parentKey, //所属     //必填
  childrenKey = 'children',
  dealNode = (n) => n, //处理node
}) {
  const findChildrenByParentId = (parentId, array) => {
    let children = []
    let len = array.length
    let nextArray = []
    for (let i = 0; i < len; i++) {
      let node = array[i]
      if (node.haveSet) {
        continue
      }
      if (node[parentKey] === parentId) {
        node.haveSet = true //已经放置
        let node2 = dealNode(node)
        children.push({
          ...node2,
          [childrenKey]: findChildrenByParentId(node[key], array)
        })
      }
    }
    return children
  }

  let menuArr = []
  let rightsArr = []
  array.forEach((item) => {
    //判断 菜单/权限 类型
    if (item.menuUrl && item.menuUrl.indexOf('_') > -1 && item.menuUrl.indexOf('/') == -1) {
      //权限
      rightsArr.push(item);
    } else {
      //菜单
      menuArr.push(item)
    }
  })

  return {
    menuTree: findChildrenByParentId(null, menuArr),
    rightsArr,
  };
}

export const dealMenu = allMenu => {
  let res = dealMenuFunc({
    array: allMenu,
    key: 'menuCode',                //必填
    parentKey: 'parentCode', //所属     //必填
    childrenKey: 'children',
    dealNode: (node) => {
      return {
        ...node,
        path: node.menuUrl || '',
        name: node.menuName || '',
        //图标
        icon: node.menuLevel != 2 ? (node.menuIcon ? node.menuIcon : 'line') : ''
      }
    }
  })
  console.log(res)
  return res
};

/**
 * 获取第一个菜单
 */
export const findFirstMenuUrl = ({ arr, childrenkey = 'children', urlKey = 'url' }) => {
  let url = '';
  const getFirst = arr => {
    if (arr && arr[0]) {
      if (arr[0][childrenkey] && arr[0][childrenkey].length > 0) {
        getFirst(arr[0][childrenkey]);
      } else {
        url = arr[0][urlKey];
      }
    }
  };
  getFirst(arr);
  return url;
};

