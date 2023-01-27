import React from 'react';
import { injectIntl } from 'react-intl';
import { flowRight as compose } from 'lodash';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './SubCategory.css';
import SubCategoryList from '../../../components/SubCategory/SubCategoryList/SubCategoryList';
import messages from '../../../locale/messages';
class SubCategory extends React.Component {

  render() {
    const { formatMessage } = this.props.intl;
    return (
        <div className={s.root}>
          <div className={s.container}>
            <div className={s.heading}>
              {formatMessage(messages.subCategoryMenu)}
            </div>
            <div className={s.paddingRoutesSection}>
              <SubCategoryList />
            </div>
          </div>
        </div>
    );
  }
}

export default compose(
  injectIntl,
  withStyles(s))(SubCategory);
