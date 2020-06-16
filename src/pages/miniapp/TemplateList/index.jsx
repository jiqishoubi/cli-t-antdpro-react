import React from 'react';
import { connect } from 'dva';
import { Button, Input } from 'antd';
import template1 from './template/template1';
import template2 from './template/template2';
import styles from './index.less';

const imgList = [
  {
    img: require('./template/template1.png'),
    title: '名片商城',
    json: template1,
  },
  {
    img: require('./template/template2.png'),
    title: '企业名片',
    json: template2,
  },
];

const Index = props => {
  const { dispatch } = props;
  const goEditor = obj => {
    dispatch({
      type: 'h5Editor/goEditor',
      payload: {
        json: obj.json,
      },
    });
  };
  const goEditorNew = () => {
    dispatch({
      type: 'h5Editor/goEditor',
      payload: {
        json: {
          type: 'card',
          itemList: [],
        },
      },
    });
  };
  console.log('template');
  return (
    <div className={styles.sass_right_card}>
      <div style={{ padding: 10, backgroundColor: '#fff' }}>
        <div style={{ marginBottom: 20 }}>
          <Button type="primary" onClick={goEditorNew}>
            新建模板
          </Button>
        </div>
        {/* 已有模板 */}
        <div className={styles.wrap}>
          {imgList.map((obj, index) => (
            <div
              key={index}
              className={styles.item}
              onClick={() => {
                goEditor(obj);
              }}
            >
              <img className={styles.img} src={obj.img} />
              <div className={styles.title}>{obj.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default connect(({ h5Editor }) => ({
  h5Editor,
}))(Index);
