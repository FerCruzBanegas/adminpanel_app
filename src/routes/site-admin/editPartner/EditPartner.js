import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { flowRight as compose } from 'lodash';

import withStyles from 'isomorphic-style-loader/withStyles';
import s from './EditPartner.css';
import getUser from './getUser.graphql';

import Loader from '../../../components/Common/Loader/Loader';
import NotFound from '../../../components/NotFound/NotFound';
import EditPartnerForm from '../../../components/SiteAdmin/EditPartnerForm/EditPartnerForm';


export class EditPartner extends Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
    };

    static defaultProps = {
        data: {
            loading: true
        }
    }
    render() {
        const { data: { loading, getUser } } = this.props;

        let initialValues = {};

        if (!loading && getUser && getUser.status === 200) {
            initialValues = {
                id: getUser.result.id,
                firstName: getUser.result.profile.firstName,
                lastName: getUser.result.profile.lastName,
                email: getUser.result.email,
                phoneDialCode: getUser.result.phoneDialCode,
                phoneNumber: getUser.result.phoneNumber,
                userStatus: getUser.result.userStatus,
                isBan: getUser.result.isBan,
                country: getUser.result.profile.country,
                phoneCountryCode: getUser.result.phoneCountryCode,
                picture: getUser.result.profile.picture,
                identityDocument: getUser.result.identityDocument,
                experienceDocument: getUser.result.experienceDocument
            }
        }

        return (
            <Loader type={"page"} show={loading}>
                <div className={s.root}>
                    <div className={s.container}>
                        <div className={s.paddingRoutesSection}>
                            {!loading && <EditPartnerForm getUser={getUser} initialValues={initialValues} />}
                        </div>
                    </div>
                </div>
            </Loader>
        )
    }
}



export default compose(withStyles(s), graphql(getUser, {
    options: (props) => ({
        variables: {
            id: props.id,
            userType: 2
        },
        fetchPolicy: 'network-only',
        ssr: false
    })
}))(EditPartner)
