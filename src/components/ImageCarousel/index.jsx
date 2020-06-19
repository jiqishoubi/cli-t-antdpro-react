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
    const { imglist } = this.props;
    return (
      <div style={{ float: 'left' }}>
        {imglist && imglist.length > 1 ? (
          <Carousel
            autoplay
            arrows={true}
            style={{ width: '300px', height: '350px' }}
            {...lunboSetting}
            ref={el => (this.slider = el)}
          >
            {imglist &&
              imglist.map((item, ind) => {
                return <img key={ind} style={{ width: '300px', height: '350px' }} src={item} />;
              })}
          </Carousel>
        ) : (
          <Carousel
            autoplay
            arrows={true}
            style={{ width: '300px', height: '350px' }}
            {...lunboSetting}
            ref={el => (this.slider = el)}
          >
            <div style={{ width: '300px', height: '350px' }}>
              <img
                style={{ width: '300px', height: '350px' }}
                src={imglist ? imglist[0] : ''}
                alt="暂无"
              />
            </div>
          </Carousel>
        )}
        {/* <LeftOutlined onClick={this.prev} /> */}
        <Icon type="LeftOutlined" onClick={this.prev} />
        {/* <RightOutlined onClick={this.next} /> */}
        <Icon type="RightOutlined" onClick={this.next} />
      </div>
    );
  }
}

export default ImageCarousel;
