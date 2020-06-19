import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Card, Row, Col } from 'antd';
import { QrcodeOutlined } from '@ant-design/icons';
import HelpDetails from './components/HelpDetails';
import MiniappInfo from './components/MiniappInfo';
import VerifyList from './components/VerifyList';
import ExperienceAccount from './components/ExperienceAccount';
import useExperienceCodeModal from './components/ExperienceCodeModal';
import ExAccountModal from './components/ExAccountModal';
import helpList from './helpList';
import styles from './index.less';

const ExperienceCode = props => {
  const { miniapp } = props;
  const { appid } = miniapp;
  const [experienceCodeModal, toggleExperienceCodeModal] = useExperienceCodeModal();
  return (
    <Fragment>
      <div
        className={styles.experienceCode}
        onClick={() => {
          toggleExperienceCodeModal(appid);
        }}
      >
        体验版
        <QrcodeOutlined style={{ position: 'relative', top: 1, marginLeft: 5 }} />
      </div>
      {experienceCodeModal}
    </Fragment>
  );
};

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  openHelpDetails = dom => {
    this.helpDetails.toggle(dom);
  };

  openBindModal = () => {
    this.exAccountModal.open();
  };

  closeBindModal = () => {
    this.exAccountModal.close();
  };

  render() {
    return (
      <div>
        <Row gutter={10}>
          <Col flex="auto">
            <Card title="小程序信息" style={{ marginBottom: 10 }}>
              <MiniappInfo {...this.props} />
            </Card>
            <Row gutter={10}>
              <Col flex="0 0 50%">
                <Card
                  title="审核记录"
                  bodyStyle={{ minHeight: 250 }}
                  extra={<ExperienceCode {...this.props} />}
                >
                  <VerifyList {...this.props} />
                </Card>
              </Col>
              <Col flex="0 0 50%">
                <Card
                  title="体验账号"
                  bodyStyle={{ minHeight: 250 }}
                  extra={<a onClick={this.openBindModal}>添加体验账号</a>}
                >
                  <ExperienceAccount {...this.props} />
                </Card>
              </Col>
            </Row>
          </Col>
          <Col flex="240px">
            <Card title="相关帮助" bodyStyle={{ padding: 15 }} style={{ height: '100%' }}>
              <div className={styles.help}>
                {helpList.map((obj, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      this.openHelpDetails(obj.dom);
                    }}
                  >
                    {obj.desc}
                  </div>
                ))}
              </div>
            </Card>
          </Col>
        </Row>

        <HelpDetails
          ref={e => {
            this.helpDetails = e;
          }}
        />

        <ExAccountModal
          ref={e => {
            this.exAccountModal = e;
          }}
          {...this.props}
        />
      </div>
    );
  }
}

export default connect(({ miniapp, loading }) => ({
  miniapp,
  loadingGetMiniappInfo: loading.effects['miniapp/getMiniappInfo'],
}))(Index);
