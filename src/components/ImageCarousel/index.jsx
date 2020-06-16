import React, { Component } from 'react';
import { Carousel, Input, Tabs, Icon } from 'antd';
import './index.less';
class ImageCarousel extends Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
  }
  next() {
    this.slider.slick.slickNext();
  }
  prev() {
    this.slider.slick.slickPrev();
  }
  render() {
    const lunboSetting = {
      dots: true,
    };
    return (
      <div style={{ float: 'left' }}>
        <Carousel
          autoplay
          arrows={true}
          style={{ width: '300px', height: '350px' }}
          {...lunboSetting}
          ref={el => (this.slider = el)}
        >
          <img
            src={
              'https://greecardcrmt.bld365.com/static/img/729b90b9-1f58-4ef5-9e0f-007e5f6733f2.jpg'
            }
          />
          <img
            src={
              'https://greecardcrmt.bld365.com/static/img/9a4055cc-e16b-4fe4-b733-9d6205bd6072.jpg'
            }
          />
          <img
            src={
              'https://greecardcrmt.bld365.com/static/img/4754b8c9-ed76-4a70-b415-3f1b8e99b323.jpg'
            }
          />
          <img
            src={
              'https://greecardcrmt.bld365.com/static/img/e0093113-120a-40a3-a353-961515fe3181.jpg'
            }
          />
        </Carousel>
        {/* <LeftOutlined onClick={this.prev} /> */}
        <Icon type="LeftOutlined" onClick={this.prev} />
        {/* <RightOutlined onClick={this.next} /> */}
        <Icon type="RightOutlined" onClick={this.next} />
      </div>
    );
  }
}

export default ImageCarousel;
