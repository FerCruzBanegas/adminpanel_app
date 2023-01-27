import React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Col,
  Row
} from 'react-bootstrap';
import { FormattedMessage, injectIntl } from 'react-intl';
// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/withStyles';

// Components
import Loader from '../../Common/Loader/Loader';
import ShowMap from './GoogleMap/ShowMap';

import { getMapViewData, getHeatMapData } from '../../../actions/siteadmin/Tracking/getMapViewData';

import s from './TrackingManagement.css';
import bt from '../../../components/commonStyle.css';

import messages from '../../../locale/messages';
//images
import userIcon from '../.../../../../../public/Icons/userIcon.svg';
import avaliableIcon from '../.../../../../../public/Icons/availableIcon.svg';
import unAvailableIcon from '../.../../../../../public/Icons/unavailableIcon.svg';
import unActiveIcon from '../.../../../../../public/Icons/unactiveIcon.svg';
import infoIcon from '../.../../../../../public/Icons/infoIcon.png';

class TrackingManagement extends React.Component {
  static defaultProps = {
    data: []
  };

  constructor(props) {
    super(props);
    this.state = {
      showSection: 0,
      type: 'all',
      requestDays: 'today',
      limit: 10,
    }
    this.handleMapViewStatus = this.handleMapViewStatus.bind(this);
    this.handleHeatMapStatus = this.handleHeatMapStatus.bind(this);
    this.handleMapView = this.handleMapView.bind(this);
    this.handleHeatMap = this.handleHeatMap.bind(this);
    this.handleHistory = this.handleHistory.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
  }

  async handleMapViewStatus(e) {
    const { getMapViewData } = this.props;
    const { requestDays, limit } = this.state;
    this.setState({
      type: e.target.value
    });
    getMapViewData(e.target.value, requestDays, limit);
  }

  async handleHeatMapStatus(e) {
    const { getHeatMapData } = this.props;
    const { requestDays, limit } = this.state;
    this.setState({
      type: e.target.value
    });
    getHeatMapData(e.target.value, requestDays, limit);
  }

  async handleMapView() {
    const { getMapViewData } = this.props;
    this.setState({
      type: "all",
      requestDays: 'today',
      showSection: 0,
      limit: 10
    });
    getMapViewData("all", 'today', this.state.limit);
  }

  async handleHeatMap() {
    const { getHeatMapData } = this.props;
    this.setState({
      type: "jobs",
      requestDays: 'today',
      showSection: 1,
      limit: 10
    });
    getHeatMapData("jobs", 'today', this.state.limit);
  }

  handleHistory(requestDays) {
    const { getHeatMapData, getMapViewData, } = this.props;
    const { type, showSection, limit } = this.state;
    this.setState({ requestDays });
    if (showSection == 0) getMapViewData(type, requestDays, limit);
    if (showSection == 1) getHeatMapData(type, requestDays, limit);
  }

  handlePagination(e) {
    const { type, showSection, requestDays } = this.state;
    const { getHeatMapData, getMapViewData } = this.props;
    let limit = e && e.target && e.target.value;
    if (showSection == 0) getMapViewData(type, requestDays, limit);
    if (showSection == 1) getHeatMapData(type, requestDays, limit);
    this.setState({
      limit
    });
  }

  render() {
    const { data, loading, mapMarkerPoints, heatMapData, mapLoading } = this.props;
    const { requestDays, showSection, type, limit } = this.state;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(s.widthInner, 'heatMapSelectRTL')}>
        <div className={s.contentBox}>
          <Row className={s.justifyContent}>
            <Col xs={12} sm={12} md={12} lg={4} className={cx(bt.noPadding, s.buttonMargin, 'textAlignRightRTL')}>
              <Button
                className={cx(bt.btnPrimary, { [bt.btnSecondary]: showSection === 1 })}
                onClick={() => this.handleMapView()}
              >
                <FormattedMessage {...messages.mapView} />
              </Button>
              <Button
                className={cx(s.marginLeft, bt.btnPrimary, 'heatmapBtnRTL', { [bt.btnSecondary]: showSection === 0 })}
                onClick={() => this.handleHeatMap()}
              >
                <FormattedMessage {...messages.heatMap} />
              </Button>



            </Col>
            <Col xs={12} sm={12} md={12} lg={3} className={cx(bt.noPadding)}>
              <select value={limit} onChange={(e) => this.handlePagination(e)} className={bt.formControlSelect}>
                <option value={10}>10 {formatMessage(messages.records)}</option>
                <option value={50}>50 {formatMessage(messages.records)}</option>
                <option value={100}>100 {formatMessage(messages.records)}</option>
                <option value={500}>500 {formatMessage(messages.records)}</option>
                <option value={0}>{formatMessage(messages.noLimit)}</option>
              </select>
            </Col>

            <Col xs={12} sm={12} md={12} lg={3} className={cx(s.buttonMargin, 'textAlignRightRTL', s.mBmarginTop, s.marginLeftDriver, 'marginLeftDriverRTL')}>
              {showSection === 0 && <select value={type} onChange={(e) => this.handleMapViewStatus(e)} className={bt.formControlSelect}>
                <option value="all">{formatMessage(messages.all)}</option>
                <option value="users">{formatMessage(messages.users)}</option>
                <option value="availablePartners">{formatMessage(messages.availablePartners)}</option>
                <option value="unAvailablePartners">{formatMessage(messages.unAvailablePartners)}</option>
                <option value="unActivatedPartners">{formatMessage(messages.unActivatedPartners)}</option>
              </select>}

              {showSection === 1 && <select value={type} onChange={(e) => this.handleHeatMapStatus(e)} className={bt.formControlSelect}>
                <option value="jobs">{formatMessage(messages.jobs)}</option>
                <option value="partners">{formatMessage(messages.partners)}</option>
              </select>}
            </Col>

            {(type != 'availablePartners' && type != 'unAvailablePartners' && type != 'partners') && <Col xs={12} sm={12} md={12} lg={2} className={cx(bt.noPadding, s.buttonMargin, 'textAlignRightRTL', s.mBmarginTop)}>
              <select value={requestDays} onChange={(e) => this.handleHistory(e.target && e.target.value)} className={bt.formControlSelect}>
                <option value={'today'}>{formatMessage(messages.today)}</option>
                <option value={"7days"}>{formatMessage(messages.last7Days)}</option>
                <option value={"30days"}>{formatMessage(messages.last30Days)}</option>
                <option value={"alldays"}>{formatMessage(messages.allDays)}</option>
              </select>
            </Col>}
          </Row>

          {
            loading && mapLoading && <div>
              <Loader type="circle" />
            </div>
          }
          {!loading && !mapLoading &&
            <div className={s.relative}>
              <ShowMap
                mapMarkerPoints={mapMarkerPoints}
                type={type}
                heatMapData={heatMapData}
                showSection={showSection}
              />
              {showSection === 0 &&
                <div className={s.hoverCss}>
                  <div className={cx(s.infoIcon, 'infoIconRTL')}><img src={infoIcon} /></div>
                  <div className={cx(s.mapInfo, 'mapInfoRTL')}>
                    <h6 className={cx(s.mapInfoHeading, 'textAlignRightRTL')}>{formatMessage(messages.markerInfo)}</h6>
                    <div className={s.flex}>
                      <span><img src={userIcon} /></span>
                      <span className={cx(s.mapInfoText, 'mapInfoTextRTL')}>{formatMessage(messages.users)}</span>
                    </div>
                    <div className={s.flex}>
                      <span><img src={avaliableIcon} /></span>
                      <span className={cx(s.mapInfoText, 'mapInfoTextRTL')}>{formatMessage(messages.availablePartners)}</span>
                    </div>
                    <div className={s.flex}>
                      <span><img src={unAvailableIcon} /></span>
                      <span className={cx(s.mapInfoText, 'mapInfoTextRTL')}>{formatMessage(messages.unAvailablePartners)}</span>
                    </div>
                    <div className={s.flex}>
                      <span><img src={unActiveIcon} /></span>
                      <span className={cx(s.mapInfoText, 'mapInfoTextRTL')}>{formatMessage(messages.unActivatedPartners)}</span>
                    </div>
                  </div>
                </div>
              }
            </div>
          }

        </div>
      </div>
    );
  }
}
const mapState = (state) => ({
  loading: state.intl.loading,
  mapMarkerPoints: state.mapData.data,
  heatMapData: state.mapData.heatMapData,
  mapLoading: state.loader.GetMapData,
});
const mapDispatch = {
  getMapViewData,
  getHeatMapData
};
export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(TrackingManagement)));