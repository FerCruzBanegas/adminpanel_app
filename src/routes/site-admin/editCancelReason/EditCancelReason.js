import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './EditCancelReason.css'
import Loader from '../../../components/Common/Loader/Loader';
import NotFound from '../../../components/NotFound/NotFound';
import AddCancelReasonForm from '../../../components/SiteAdmin/AddCancelReasonForm'
import getCancelReason from './getCancelReason.graphql'
import { injectIntl } from 'react-intl';
import messages from '../../../locale/messages';

export class EditCancelReason extends Component {

    render() {
        const { formatMessage } = this.props.intl;
        const { cancelReason: { getCancelReason, loading } } = this.props;

        let initialValues = {};

        if (!loading && getCancelReason && getCancelReason.result && getCancelReason.result) {
            initialValues = {
                id: getCancelReason && getCancelReason.result.id,
                reason: getCancelReason && getCancelReason.result.reason,
                userType: getCancelReason && getCancelReason.result.userType,
                isActive: getCancelReason && getCancelReason.result.isActive
            }
        }


        return (
            <Loader type={"page"} show={loading}>
                <div className={s.root}>
                    <div className={s.container}>
                        <div className={s.paddingRoutesSection}>
                            {!loading && <AddCancelReasonForm initialValues={initialValues} />}
                        </div>
                    </div>
                </div>
            </Loader>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default compose(
    injectIntl,
    withStyles(s),
    connect(mapStateToProps, mapDispatchToProps),
    graphql(getCancelReason, {
        name: 'cancelReason',
        options: (props) => ({
            variables: {
                id: props.id
            },
            ssr: false,
            fetchPolicy: 'network-only'
        })
    })
)(EditCancelReason)
