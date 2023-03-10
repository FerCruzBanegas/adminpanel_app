// General
import React, { Component } from 'react';
// Style
import withStyles from 'isomorphic-style-loader/withStyles';
import cx from 'classnames';
import { FormattedMessage } from 'react-intl';
import {
  Modal
} from 'react-bootstrap';
// Redux
import { connect } from 'react-redux';
// Component
import AdminRolesForm from '../AdminRolesForm';
import s from './AdminRolesModal.css';

import { closeAdminRolesModal } from '../../../actions/siteadmin/modalActions';
import messages from '../../../locale/messages';

class AdminRolesModal extends Component {
  static defaultProps = {
    adminRolesModalType: 'add'
  };
  constructor(props) {
    super(props);
  }
  render() {
    const { closeAdminRolesModal, adminRolesModal, adminRolesModalType } = this.props;
    return (
      <div>
        <Modal show={adminRolesModal} onHide={closeAdminRolesModal} className={cx('wooberlyModal', 'wooberlyModalWidth', 'adminModal')}>
          <Modal.Header closeButton>
            <Modal.Title>  <FormattedMessage {...messages[adminRolesModalType === 'add' ? 'addAdminRole' : 'editAdminRole']} /></Modal.Title>
          </Modal.Header>
          <Modal.Body bsClass={s.logInModalBody}>
            <div className={s.root}>
              <div className={s.container}>
                <AdminRolesForm />
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}
const mapState = (state) => ({
  adminRolesModal: state.adminModalStatus.adminRolesModal,
  adminRolesModalType: state.adminModalStatus.adminRolesModalType
});
const mapDispatch = {
  closeAdminRolesModal
};
export default withStyles(s)(connect(mapState, mapDispatch)(AdminRolesModal));
