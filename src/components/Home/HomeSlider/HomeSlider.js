import React from 'react';
import { injectIntl } from 'react-intl';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './HomeSlider.css';
import cx from 'classnames';
import Swiper from 'react-id-swiper';
import HomeItem from '../HomeItem';
import Loader from '../../Common/Loader';
import { isRTL } from '../../../helpers/formatLocale';

//images
import nextIcon from '../../../../public/Icons/rightArrowHomwTwo.png';
import prevIcon from '../../../../public/Icons/leftArrowHomeTwo.png';

const nextArrowStyle = {
  position: 'absolute',
  right: '-75px',
  background: 'transparent',
  color: '#00B0CD',
  zIndex: '5',
  width: 'auto',
  height: 'auto',
  top: '25%',
  fontSize: '40px',
  cursor: 'pointer',
  borderRadius: '50%',
  textAlign: 'center',
};

const prevArrowStyle = {
  position: 'absolute',
  left: '-90px',
  background: 'transparent',
  color: '#00B0CD',
  zIndex: '5',
  width: 'auto',
  height: 'auto',
  top: '28%',
  fontSize: '40px',
  cursor: 'pointer',
  borderRadius: '50%',
  textAlign: 'center',
};

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={nextArrowStyle}
      onClick={onClick}
    >
      <img src={nextIcon} />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={prevArrowStyle}
      onClick={onClick}
    >
      <img src={prevIcon} />
    </div>
  );
}

class HomeSlider extends React.Component {
  static defaultProps = {
    data: [],
    arrow: true
  };

  constructor(props) {
    super(props);
    this.swiper = null;
    this.goNext = this.goNext.bind(this);
    this.goPrev = this.goPrev.bind(this);
    this.state = {
      load: false
    };
  }

  componentDidMount() {
    this.setState({
      load: true,
    });
  }

  componentDidUpdate(prevProps) {
    const { locale } = this.props.intl;
    const { locale: prevLocale } = prevProps.intl;

    if (locale !== prevLocale) {
      this.setState({
        load: false
      });
      clearTimeout(this.loadSync);
      this.loadSync = null;
      this.loadSync = setTimeout(() => {
        this.setState({
          load: true
        })
      }, 1);
    }
  }

  goNext() {
    if (this.swiper !== null) {
      this.swiper.slideNext();
    }
  }

  goPrev() {
    if (this.swiper !== null) {
      this.swiper.slidePrev();
    }
  }


  render() {
    const { data, arrow, intl: { locale } } = this.props;
    const { load } = this.state;
    let arrow_display = this.props.arrow;
    arrow_display = false;

    const params = {

      slidesPerView: 5,
      draggable: true,
      freeMode: true,

      breakpoints: {
        1024: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 0,
        },
        640: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        500: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
          centeredSlides: true,
        }
      }
    }

    if (arrow === true) {
      params.loop = true
    } else {
      params.loop = true
    }

    return (
      <div className={s.root}>
        <div className={cx(s.paddingTopBottom, 'homeSlickSlider', s.sliderMain)}>
          {
            !load && <div>
              <Loader type="circle" show={true} />
            </div>
          }
          {
            load && data && data.results && data.results.length > 0 && <Swiper {...params} rtl={isRTL(locale)} className={cx(s.noMargin)} getSwiper={(swiper) => this.swiper = swiper}>
              {
                data.results.map((item, index) => {
                  return (
                    <div key={index}>
                      <div className='swiperSliderMobielWidth'>
                        <HomeItem
                          key={index}
                          categoryName={item.name}
                          categoryLogo={item.logoImage}
                        />
                      </div>
                    </div>
                  );
                })}
            </Swiper>}
          {
            arrow == true &&
            <div>
              <SamplePrevArrow
                className={cx(s.displayNone, 'arrowPrevRTL')}
                onClick={this.goPrev}
              />
              <SampleNextArrow
                className={cx(s.displayNone, 'arrowNextRTL')}
                onClick={this.goNext}
              />
            </div>
          }
        </div>
      </div>
    );
  }
}

export default injectIntl(withStyles(s)(HomeSlider))

