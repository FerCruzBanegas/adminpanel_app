// General
import React, { Component } from 'react';
// Redux
import { connect } from 'react-redux';
// Style
import {
  Modal
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/withStyles';
import cx from 'classnames';
import s from './CurrencyModal.css';
import { FormattedMessage } from 'react-intl';
import messages from '../../../../locale/messages';
// Component
import CurrencyForm from '../CurrencyForm';
import { closeCurrencyModal } from '../../../../actions/siteadmin/modalActions';


class CurrencyModal extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { closeCurrencyModal, currencyModal } = this.props;
    let initialValues = {
      isEnable : 1
    };
    return (
      <div>
        <Modal show={currencyModal} onHide={closeCurrencyModal} className={cx('wooberlyModal', 'wooberlyModalWidth')}>
          <Modal.Header closeButton>
            <Modal.Title> <FormattedMessage {...messages.addCurrency} /> </Modal.Title>
          </Modal.Header>
          <Modal.Body bsClass={s.logInModalBody}>
            <div className={s.root}>
              <div className={s.container}>
                <CurrencyForm initialValues={initialValues}/>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}
const mapState = (state) => ({
  currencyModal: state.adminModalStatus.currencyModal,
});
const mapDispatch = {
  closeCurrencyModal
};
export default withStyles(s)(connect(mapState, mapDispatch)(CurrencyModal));
