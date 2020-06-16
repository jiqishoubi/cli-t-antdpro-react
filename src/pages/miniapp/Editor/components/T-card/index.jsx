import { connect } from 'dva';
import styles from './index.less';

const Card = props => {
  const { h5Editor } = props;
  const { itemList } = h5Editor;

  let bgColor = '';
  for (let i = 0; i < itemList.length; i++) {
    let item = itemList[i];
    if (item.type == 'banner' && item.list && item.list[0] && item.list[0].bgColor) {
      bgColor = item.list[0].bgColor;
    }
  }

  return (
    <div className={styles.card} style={{ backgroundColor: bgColor || null }}>
      <div className={styles.top}>
        <div className={styles.img_box}>
          <img
            className={styles.img}
            src="https://greecardcrm.bld365.com/static/img/7949ea56-ebe1-461d-a8e8-b710510f6f69.png"
          />
        </div>
        <div className={styles.name_wrap}>
          <div>
            <span style={{ fontWeight: 'bold', fontSize: 14, paddingRight: 10 }}>Zhou</span>
            <span>商用经营部</span>
          </div>
          <div>珠海格力电器东北销售公司</div>
        </div>
      </div>
      {/* 按钮 */}
      <div className={styles.ctrl_wrap}>
        <div className={styles.ctrl_item}>
          <img
            className={styles.ctrl_icon}
            src="https://cdn.s.bld365.com/wcardindex_ctrl_btn_01.png"
          />
          <div>加微信</div>
        </div>
        <div className={styles.ctrl_item}>
          <img
            className={styles.ctrl_icon}
            src="https://cdn.s.bld365.com/wcardindex_ctrl_btn_02.png"
          />
          <div>打电话</div>
        </div>
        <div className={styles.ctrl_item}>
          <img
            className={styles.ctrl_icon}
            src="https://cdn.s.bld365.com/wcardindex_ctrl_btn_03.png"
          />
          <div>名片码</div>
        </div>
        <div className={styles.ctrl_item}>
          <img
            className={styles.ctrl_icon}
            src="https://cdn.s.bld365.com/wcardindex_ctrl_btn_04.png"
          />
          <div>去分享</div>
        </div>
      </div>
      {/* 存入通讯录 */}
      <span className={styles.cunru}>存入手机通讯录></span>
    </div>
  );
};

export default connect(({ h5Editor }) => ({
  h5Editor,
}))(Card);
