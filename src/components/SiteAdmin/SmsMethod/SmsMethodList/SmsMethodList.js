import React from 'react';
import { connect } from 'react-redux';
import { flowRight as compose } from 'lodash';

import { graphql } from 'react-apollo';
import getAllSmsMethod from './getAllSmsMethod.graphql';

import withStyles from 'isomorphic-style-loader/withStyles';
import { Table } from 'react-bootstrap';
import s from './SmsMethodList.css';
import cx from 'classnames';
import bt from '../../../../components/commonStyle.css';

import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../../locale/messages';

import Link from '../../../Link/Link';

//Images
import EditIcon from '../../../../../public/Icons/editIcon.svg';

import { updateSmsMethod } from '../../../../actions/siteadmin/SmsMethod/updateSmsMethod';


class SmsMethodList extends React.Component {

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this);
  }


  async handleChange(id, name, accountId, securityId, phoneNumber, phoneDialCode, phoneCountryCode) {
    const { updateSmsMethod, smsMethods: { refetch } } = this.props;
    let data = {};
    data = {
      id,
      name,
      accountId,
      securityId,
      phoneNumber,
      phoneDialCode,
      phoneCountryCode,
      status: "true",
      updateStatus: true
    }
    await updateSmsMethod(data);
    refetch();
  }



  render() {
    const { smsMethods, intl: { formatMessage } } = this.props;
    return (
      <div className={cx(s.widthInner, 'whiteDropdown')}>
        <div className={cx(s.tableCss, 'tableCss', 'tableSticky', 'NewResponsiveTable', bt.spaceTop4)}>
          <Table className="table">
            <thead>
              <tr>
                <th scope="col"><FormattedMessage {...messages.id} /></th>
                <th scope="col"><FormattedMessage {...messages.name} /></th>
                <th scope="col"><FormattedMessage {...messages.status} /></th>
                <th scope="col"><FormattedMessage {...messages.action} /></th>
              </tr>
            </thead>
            <tbody>
              {
                smsMethods && smsMethods.getAllSmsMethod && smsMethods.getAllSmsMethod.results && smsMethods.getAllSmsMethod.results.length > 0 && smsMethods.getAllSmsMethod.results.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td data-label={formatMessage(messages.id)}>{item && item.id}</td>
                      <td data-label={formatMessage(messages.name)}>{item && item.name}</td>
                      <td data-label={formatMessage(messages.status)}>
                        {item.status == "false" &&
                          <a href="javascript:void(0)" onClick={(e) => this.handleChange(item.id, item.name, item.accountId, item.securityId, item.phoneNumber, item.phoneDialCode, item.phoneCountryCode)}>
                            <FormattedMessage {...messages.active} />
                          </a>
                        }
                      </td>
                      <td data-label={formatMessage(messages.action)}>
                        <Link to={'/siteadmin/sms-method/edit/' + item.id} className={cx('editAlign', s.noLink)}>
                          <span><img src={EditIcon} className={cx(s.editIcon, 'editIconRTL')} /></span>
                          <span className={s.vtrMiddle}>
                            <FormattedMessage {...messages.editAction} />
                          </span>
                        </Link>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({});
const mapDispatch = {
  updateSmsMethod
};

export default compose(injectIntl,
  withStyles(s, bt),
  graphql(getAllSmsMethod, {
    name: 'smsMethods',
    options: {
      ssr: true,
      fetchPolicy: 'network-only'
    }
  }),
  connect(mapState, mapDispatch)
)(SmsMethodList);
