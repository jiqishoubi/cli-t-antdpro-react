import React, { Component } from 'react';
import { router } from 'umi';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: '',
      panes: [],
    };
  }
  componentDidMount() {
    console.log('tabsLayout didMount');
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

  render() {
    const { panes, activeKey } = this.state;

    console.log(panes);
    console.log(activeKey);

    return (
      <Tabs
        hideAdd
        type="editable-card"
        tabBarStyle={{ userSelect: 'none' }}
        // tabBarExtraContent={operations}

        activeKey={activeKey}
        onChange={this.onChangeTab}
        onEdit={this.onEdit}
      >
        {panes.map((obj, index) => {
          console.log(obj);
          return (
            <TabPane tab={obj.name} key={obj.path}>
              <div>
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
