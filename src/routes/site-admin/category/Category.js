import React from 'react';
import { injectIntl } from 'react-intl';
import { flowRight as compose } from 'lodash';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './Category.css';

import CategoryList from '../../../components/Category/CategoryList';

import messages from '../../../locale/messages';
class Category extends React.Component {

  render() {
    const { formatMessage } = this.props.intl;

    return (
        <div className={s.root}>
          <div className={s.container}>
            <div className={s.heading}>
              {formatMessage(messages.categoryMenu)}
            </div>
            <div className={s.paddingRoutesSection}>
              <CategoryList />
            </div>
          </div>
        </div>
    );
  }
}

export default compose(
  injectIntl,
  withStyles(s))(Category);
