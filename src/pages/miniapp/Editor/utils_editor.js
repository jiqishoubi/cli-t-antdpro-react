export const onValuesChange = ({ changedValues, allValues, itemList, activeItem, dispatch }) => {
  console.log(itemList);
  //修改相关属性
  let list = itemList;
  for (let i = 0; i < list.length; i++) {
    let obj = list[i];
    if (obj.id == activeItem.id) {
      list[i] = {
        ...obj,
        ...changedValues,
      };
      //颜色
      if (allValues.color || obj.color) {
        list[i].color = allValues.color ? allValues.color.hex : obj.color;
      }
      if (allValues.backgroundColor || obj.backgroundColor) {
        list[i].backgroundColor = allValues.backgroundColor
          ? allValues.backgroundColor.hex
          : obj.backgroundColor;
      }
    }
  }

  if (window.t_changeTimer) {
    window.clearTimeout(window.t_changeTimer);
  }
  window.t_changeTimer = setTimeout(() => {
    dispatch({
      type: 'h5Editor/save',
      payload: {
        itemList: list,
      },
    });
  }, 50);
};