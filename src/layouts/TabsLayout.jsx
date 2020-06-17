import React, { Component } from 'react';
import { connect } from 'dva';
import { router } from 'umi';
import { Tabs } from 'antd';
import defaultTheme from '../../config/theme/defaultTheme';
import defaultSettings from '../../config/defaultSettings';
import styles from './TabsLayout.less';

const { TabPane } = Tabs;

//tabBar 样式
const tabBarListStyle = {
  boxSizing: 'border-box',
  height: defaultTheme['t-istabs-tabbar-height'],
  backgroundColor: '#fff',
  userSelect: 'none',
  boxShadow: '0 1px 4px rgba(0, 21, 41, 0.08)',
  padding: '0 4px',
  transition: 'all 0.3s',

  position: 'fixed',
  top: defaultTheme['layout-header-height'],
  right: 0,
  zIndex: 1,
};

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: '',
      panes: [],
    };
  }
  componentDidMount() {
    this.props.onRef(this);
  }

  addCutTab = url => {
    const { panes, activeKey } = this.state;
    const { login, route } = this.props;
    const { routes } = route;

    let flag = false;
    for (let i = 0; i < panes.length; i++) {
      if (panes[i].path == url) {
        flag = true;
        break;
      }
    }
    if (flag) {
      //已经有这个tab
      console.log('已经有这个tab');
      this.setState({ activeKey: url });
    } else {
      //还没有
      console.log('还没有');
      let routeFilter = routes.filter(obj => {
        return obj.path == url;
      });
      if (routeFilter[0]) {
        let paneItem = {
          ...routeFilter[0],
        };
        panes.push(paneItem);

        this.setState({
          activeKey: url,
          panes,
        });
      }
    }
  };

  //tabs方法
  onChangeTab = url => {
    router.push(url);
  };

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  remove = targetKey => {
    let { panes, activeKey } = this.state;

    let lastIndex;
    panes.forEach((pane, i) => {
      if (pane['path'] === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panesTemp = panes.filter(pane => pane['path'] !== targetKey);
    if (panesTemp.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = panesTemp[lastIndex]['path'];
      } else {
        activeKey = panesTemp[0]['path'];
      }
    }

    this.setState({
      panes: panesTemp,
      activeKey: activeKey,
    });
    router.replace(activeKey);
  };

  /**
   * 渲染
   */
  render() {
    const { panes, activeKey } = this.state;
    const { collapsed } = this.props;

    //关闭按钮
    const operations = null;

    //tabBar 样式
    let left;
    if (defaultSettings.layout == 'topmenu') {
      left = 0;
    } else {
      left = collapsed ? defaultTheme['menu-collapsed-width'] : defaultTheme['t-siderMenu-width'];
    }
    let tabBarListStyle2 = {
      ...tabBarListStyle,
      left,
      display: panes.length == 0 ? 'none' : null,
    };

    return (
      <Tabs
        className={styles.tabs_wrap}
        id="istabs_tabs_wrap"
        hideAdd
        type="editable-card"
        size="small"
        tabBarStyle={tabBarListStyle2}
        // tabBarExtraContent={operations}

        activeKey={activeKey}
        onChange={this.onChangeTab}
        onEdit={this.onEdit}
      >
        {panes.map((obj, index) => {
          return (
            <TabPane key={obj.path} tab={obj.name} closable={panes.length > 1}>
              <div
                className={styles.paneCard}
                style={{
                  marginTop: Number(defaultTheme['t-istabs-tabbar-height'].split('px')[0]),
                }}
              >
                <obj.component {...this.props} />
              </div>
            </TabPane>
          );
        })}
      </Tabs>
    );
  }
}

export default index;
