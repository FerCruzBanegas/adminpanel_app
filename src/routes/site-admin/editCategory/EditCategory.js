import React, { Component } from 'react';
import AddCategoryForm from '../../../components/SiteAdmin/AddCategoryForm';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import getCategory from './getCategory.graphql';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './EditCategory.css';
import Loader from '../../../components/Common/Loader/Loader';
import NotFound from '../../../components/NotFound/NotFound';

export class EditCategory extends Component {
    static propTypes = {
        id: PropTypes.number.isRequired
    }
    static defaultProps = {
        data: {
            loading: true
        }
    }
    render() {
        const { data: { loading, getCategory }, data, id } = this.props;

        let initialValues = {};

        if (!loading && getCategory.status === 200 && getCategory.result) {
            initialValues = {
                id: getCategory.result.id,
                name: getCategory.result.name,
                description: getCategory.result.description,
                logoImage: getCategory.result.logoImage,
                bannerImage: getCategory.result.bannerImage,
                isPopular: getCategory.result.isPopular,
                isJobPhotoRequired: getCategory.result.isJobPhotoRequired,
                travellingPrice: getCategory.result.travellingPrice,
                userServiceFeeValue: getCategory.result.userServiceFeeValue,
                partnerServiceFeeValue: getCategory.result.partnerServiceFeeValue,
                pricingType: getCategory.result.pricingType,
                status: getCategory.result.status,
                currency: getCategory.result.currency
            }
        }

        return (
            <Loader type={"page"} show={loading}>
                <div className={s.root}>
                    <div className={s.container}>
                        <div className={s.paddingRoutesSection}>
                        {!loading &&  <AddCategoryForm initialValues={initialValues} /> }
                        </div>
                    </div>
                </div>
            </Loader>
        )
    }
}

export default compose(withStyles(s), graphql(getCategory, {
    options: (props) => ({
        variables: {
            id: props.id
        },
        fetchPolicy: 'network-only',
        ssr: false
    })
}))(EditCategory)
