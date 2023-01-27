import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './ManageCancelReason.css'
import { injectIntl } from 'react-intl';
import messages from '../../../locale/messages';
import CancellationReasonList from '../../../components/SiteAdmin/CancellationReason/CancellationReasonList'
import Loader from '../../../components/Common/Loader/Loader';
import getAllCancelReason from './getAllCancelReason.graphql';

export class ManageCancelReason extends Component {

    static defaultProps = {
        booking: {
            loading: true
        }
    }

    render() {
        const { cancelReasons, cancelReasons: { loading, getAllCancelReason } } = this.props;
        const { formatMessage } = this.props.intl;

        return (
            <Loader type={"page"} show={loading}>
                <div className={s.root}>
                    <div className={s.container}>
                        <div className={s.heading}>
                            {formatMessage(messages.manageCancelReason)}
                        </div>
                        <div className={s.paddingRoutesSection}>
                        {!loading &&  <CancellationReasonList cancelReasons={cancelReasons} /> }
                        </div>
                    </div>
                </div>
            </Loader>
        );
    }
}

export default compose(
    injectIntl,
    withStyles(s),
    graphql(getAllCancelReason, {
        name: 'cancelReasons',
        options: {
            variables: {
                currentPage: 1,
                searchList: ''
            },
            fetchPolicy: 'network-only'
        }
    })
)(ManageCancelReason);
