import React, { useState } from 'react';
import { Modal, Spin } from 'antd';
import { getExperienceCodeAjax } from '@/services/miniapp';
import styles from './index.less';

const useModal = props => {
  const [visible, setVisible] = useState(false);
  const [base64, setBase64] = useState('');
  const [loading, setLoading] = useState(false);
  const toggleModal = appid => {
    if (!visible) {
      getCode(appid);
    }
    setVisible(!visible);
  };
  //获取二维码
  const getCode = async appid => {
    let postData = {
      app_id: appid,
      path: '/pages/card/index/index',
    };
    setLoading(true);
    let res = await getExperienceCodeAjax(postData);
    setLoading(false);
    if (res && res.code == 200 && res.data && res.data.data) {
      setBase64(res.data.data);
    }
  };
  const modal = (
    <Modal
      title="扫码访问体验版"
      centered
      footer={null}
      visible={visible}
      onCancel={toggleModal}
      onOk={toggleModal}
    >
      <div className={styles.modal}>
        {loading ? (
          <Spin />
        ) : (
          <img className={styles.img} src={`data:image/png;base64,${base64}`} />
        )}
      </div>
    </Modal>
  );
  return [modal, toggleModal];
};

export default useModal;
