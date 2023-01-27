import { addUpdatePricing } from '../../../../actions/siteadmin/Pricing/addUpdatePricing';

async function submit(values, dispatch) {
    let isActive = values.isActive == 'true' ? true : false;
    let isPriceEditable = values.isPriceEditable == 'true' ? true : false;

    await dispatch(
        addUpdatePricing(
            values.id,
            values.locationId,
            values.categoryId,
            values.subCategoryId,
            isActive,
            values.currency,
            isPriceEditable,
            values.basePrice,
            values.multiplierValue,
        )
    )
}

export default submit;