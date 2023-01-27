import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import cx from 'classnames';
import { Button } from 'react-bootstrap';
import { flowRight as compose } from 'lodash';
import { FormattedMessage, injectIntl } from 'react-intl';

import Link from '../../Link';
import MessagesItemCommon from './MessagesItemCommon';

import messages from '../../../locale/messages'

import s from './MessagesItem.css';
import bt from '../../../components/commonStyle.css';

//Images
import DriverIcon from '../../../../public/Icons/userProfile.svg';
import UserDetails from './UserDetails/UserDetails';
class MessagesItem extends React.Component {
  render() {
    const { threadItems: { getAllThreadItems }, loadMore, from } = this.props;
    let link = '/siteadmin/' + from;

    return (
      <div className={cx(s.pagecontentWrapper, s.widthInner, bt.space5)}>
        <div className={s.contentBox}>
          <div className={cx(s.displayBlock, bt.space2, bt.textAlignRight, 'textAlignLeftRTL')}>
            <Link to={link} className={cx(s.backBtn, s.backBtn, bt.btnSecondary, s.linkText)}>
              <FormattedMessage {...messages.goBack} />
            </Link>
          </div>
          <div>
            <UserDetails
              userDetails={getAllThreadItems && getAllThreadItems.userDetails}
              partnerDetails={getAllThreadItems && getAllThreadItems.partnerDetails} />
          </div>
          {
            getAllThreadItems && getAllThreadItems.threadItems != null && getAllThreadItems.threadItems.length > 0 && getAllThreadItems.threadItems.map((item, index) => (
              <div key={index}>
                <MessagesItemCommon
                  avatarImage={DriverIcon}
                  text={item.message}
                  chatPadding={getAllThreadItems.userDetails && (item.authorId == getAllThreadItems.userDetails.id) ? 'left' : 'right'}
                  userImage={(getAllThreadItems.userDetails && item.authorId == getAllThreadItems.userDetails.id) ? getAllThreadItems.userDetails.profile.picture : getAllThreadItems.partnerDetails && getAllThreadItems.partnerDetails.profile.picture}
                />
              </div>
            ))
          }
          {
            getAllThreadItems && getAllThreadItems.threadItems != null && getAllThreadItems.threadItems.length > 0 && getAllThreadItems.threadItems.length < getAllThreadItems.count && <div className={s.textCenter}>
              <Button href="javascript:void(0)" onClick={() => loadMore()} className={cx(s.btnRadius, bt.btnPrimary)}><FormattedMessage {...messages.loadMoreMsg} /></Button>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default compose(injectIntl,
  withStyles(s, bt)
)(MessagesItem);