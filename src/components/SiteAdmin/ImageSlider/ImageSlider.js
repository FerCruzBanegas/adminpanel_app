import React, { Component } from 'react';
import { connect } from 'react-redux';
import Lightbox from "react-image-lightbox";
import { injectIntl } from 'react-intl';

class ImageSlider extends Component {

  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      photoIndex: 0,
      isOpen: false
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { imageLightBox, currentIndex } = nextProps;
    this.setState({ isOpen: imageLightBox });
    if (currentIndex) {
      this.setState({ photoIndex: currentIndex });
    }
  }

  render() {
    const { sources, closeImageLightBox } = this.props;
    const { photoIndex, isOpen } = this.state;

    return (
      <div className={'jobPhotoSlider'}>
        {isOpen && (
          <Lightbox
            mainSrc={sources[photoIndex]}
            nextSrc={sources[(photoIndex + 1) % sources.length]}
            prevSrc={sources[(photoIndex + sources.length - 1) % sources.length]}
            onCloseRequest={() => closeImageLightBox()}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + sources.length - 1) % sources.length
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % sources.length
              })
            }
          />
        )}
      </div>
    );
  }
}


const mapState = (state) => ({
  currentIndex: state.adminModalStatus.currentIndex
});

const mapDispatch = {
};


export default injectIntl(connect(mapState, mapDispatch)(ImageSlider));
