import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './UserDetails.css';
import cx from 'classnames';
import bt from '../../../../components/commonStyle.css';
import { flowRight as compose } from 'lodash';
import DriverIcon from '../../../../../public/Icons/userProfile.svg';
import chatIcon from '../../../../../public/Icons/Chat-icon.png';
import batchIcon from '../../../../../public/Icons/service-provider-chat-icon.png';
import { api, profilePhotouploadDir } from '../../../../config';


class UserDetails extends React.Component {
  render() {
    const { userDetails, partnerDetails } = this.props;
    let userImage, partnerImage;

    if (userDetails && userDetails.profile && userDetails.profile.picture) {
      userImage = api.apiEndpoint + profilePhotouploadDir + userDetails.profile.picture;
    } else {
      userImage = DriverIcon;
    }

    if (partnerDetails && partnerDetails.profile && partnerDetails.profile.picture) {
      partnerImage = api.apiEndpoint + profilePhotouploadDir + partnerDetails.profile.picture;
    } else {
      partnerImage = DriverIcon;
    }

    return (
      <div className={cx(s.containerWidth, s.hiddenXs)}>
        <div className={cx(s.displayGrid)}>
          <div className={s.textAlignRight}>{userDetails && userDetails.profile && userDetails.profile.firstName}</div>
          <div className={s.textAlignCenter}>
            <div className={s.icon} style={{ backgroundImage: `url(${userImage})` }} />
            <div className={s.centerChatIcon}>
              <div className={s.iconBG}>
                <img src={chatIcon} responsive />
              </div>
            </div>
            <div className={s.icon} style={{ backgroundImage: `url(${partnerImage})` }}>
              <span><img src={batchIcon} className={s.batchIcon} /></span>
            </div>
          </div>
          <div className={s.textAlignLeft}>{partnerDetails && partnerDetails.profile && partnerDetails.profile.firstName}</div>
        </div>
      </div>
    );
  }
}

export default compose(
  withStyles(s, bt)
)(UserDetails);