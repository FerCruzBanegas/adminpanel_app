import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { injectIntl } from 'react-intl';
import withStyles from 'isomorphic-style-loader/withStyles';

import LocationList from '../../../components/SiteAdmin/ManageLocationList/LocationList';
import Loader from '../../../components/Common/Loader/Loader';

import s from './ManageLocation.css';
import getLocationList from './getLocationList.graphql';
import messages from '../../../locale/messages';

export class ManageLocation extends Component {

    static defaultProps = {
        booking: {
            loading: true
        }
    }

    render() {
        const { formatMessage } = this.props.intl;
        const { locationList, locationList: { loading } } = this.props;

        return (
            <Loader type={"page"} show={loading}>
                <div className={s.root}>
                    <div className={s.container}>
                        <div className={s.heading}>
                            {formatMessage(messages.location)}
                        </div>
                        <div className={s.paddingRoutesSection}>
                        {!loading && <LocationList locationList={locationList} /> }
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
    graphql(getLocationList, {
        name: 'locationList',
        options: {
            variables: {
                currentPage: 1,
                searchList: ''
            },
            fetchPolicy: 'network-only'
        }
    })
)(ManageLocation);
