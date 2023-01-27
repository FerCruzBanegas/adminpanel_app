import React, { Component } from 'react';
import AddSubCategoryForm from '../../../components/SiteAdmin/AddSubCategoryForm/AddSubCategoryForm';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import getSubCategory from './getSubCategory.graphql';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './EditSubCategory.css';
import Loader from '../../../components/Common/Loader/Loader';
import NotFound from '../../../components/NotFound/NotFound';
import getActiveCategories from '../addSubCategory/getActiveCategories.graphql';

export class EditSubCategory extends Component {
    static propTypes = {
        id: PropTypes.number.isRequired
    }
    static defaultProps = {
        data: {
            loading: true
        }
    }
    render() {
        const { data: { loading, getSubCategory }, data, id } = this.props;
        const { categories } = this.props;

        let initialValues = {};

        if (!loading && getSubCategory.status === 200 && getSubCategory.result) {
            initialValues = {
                id: getSubCategory.result.id,
                name: getSubCategory.result.name,
                description: getSubCategory.result.description,
                image: getSubCategory.result.image,
                categoryId: getSubCategory.result.categoryId,
                status: getSubCategory.result.status
            }
        }
        return (
            <Loader type={"page"} show={loading}>
                <div className={s.root}>
                    <div className={s.container}>
                        <div className={s.paddingRoutesSection}>
                            {!loading && <AddSubCategoryForm initialValues={initialValues} categories={categories} />}
                        </div>
                    </div>
                </div>
            </Loader>
        )
    }
}

export default compose(withStyles(s),
    graphql(getSubCategory, {
        options: (props) => ({
            variables: {
                id: props.id
            },
            fetchPolicy: 'network-only',
            ssr: false
        })
    }),
    graphql(getActiveCategories, {
        name: 'categories',
        options: {
            ssr: true,
            fetchPolicy: 'network-only'
        }
    }))(EditSubCategory)
