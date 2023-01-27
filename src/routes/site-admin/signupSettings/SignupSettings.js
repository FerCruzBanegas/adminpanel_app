import React, { Component } from 'react';
import SignupSettingsForm from '../../../components/SiteAdmin/SignupSettingsForm/SignupSettingsForm'
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import getAllHomePageSettings from './getAllHomePageSettings.graphql';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './SignupSettings.css';
import Loader from '../../../components/Common/Loader/Loader';


export class SignupSettings extends Component {
    static propTypes = {
        id: PropTypes.number.isRequired
    }
    static defaultProps = {
        data: {
            loading: true
        }
    }
    render() {
        const { data: { loading, getAllHomePageSettings } } = this.props;
        let initialValues = {};
        let homepageCollection = {};

        getAllHomePageSettings && getAllHomePageSettings.homePageData.map((item) => {
            homepageCollection[item.name] = item.value
        })

        return (
            <Loader type={"page"} show={loading}>
                <div className={s.root}>
                    <div className={s.container}>
                        <div className={s.paddingRoutesSection}>

                            {!loading && <SignupSettingsForm initialValues={homepageCollection} />}

                        </div>
                    </div>
                </div>
            </Loader>
        )
    }
}

export default compose(withStyles(s), graphql(getAllHomePageSettings, {
    options: (props) => ({
        variables: {
            id: props.id
        },
        fetchPolicy: 'network-only',
        ssr: false
    })
}))(SignupSettings)
