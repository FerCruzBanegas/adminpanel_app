import React, { Component } from 'react';
import { flowRight as compose } from 'lodash';
import { graphql } from 'react-apollo';
import Loader from '../../../components/Common/Loader/Loader';
import AddSubCategoryForm from '../../../components/SiteAdmin/AddSubCategoryForm/AddSubCategoryForm';
import getActiveCategories from './getActiveCategories.graphql';
export class AddSubCategory extends Component {

	render() {
		const { categories, categories: { loading } } = this.props;
		return (
			<Loader type={"page"} show={loading}>
				<div>
				{!loading && <AddSubCategoryForm categories={categories} />}
				</div>
			</Loader>
		)
	}
}

export default compose(
	graphql(getActiveCategories, {
		name: 'categories',
		options: {
			ssr: true,
			fetchPolicy: 'network-only'
		}
	})
)(AddSubCategory);

