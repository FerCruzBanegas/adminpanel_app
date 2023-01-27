import gql from 'graphql-tag';
import { closeCurrencyModal } from '../../../actions/siteadmin/modalActions';
import getCurrency from './currencyList.graphql';
import { showToaster } from '../../../helpers/toastrMessgaes/showToaster';

import {
  CHANGE_CURRENCY_STATUS_START,
  CHANGE_CURRENCY_STATUS_SUCCESS,
  CHANGE_CURRENCY_STATUS_ERROR,
  SET_BASE_CURRENCY_START,
  SET_BASE_CURRENCY_SUCCESS,
  SET_BASE_CURRENCY_ERROR,
  CURRENCY_RATES_FETCH_SUCCESS,
  ADD_CURRENCY_START,
  ADD_CURRENCY_SUCCESS,
  ADD_CURRENCY_ERROR,
} from '../../../constants';

const getCurrencyRatesQuery = gql`{
  getCurrencyRates {
      base
      rates
  }
}
`;

export function updateCurrencyStatus(id, isEnable, symbol) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: CHANGE_CURRENCY_STATUS_START,
    });

    try {
      let query = gql`
      query getCurrency($currentPage: Int, $searchList: String){
        getCurrency(currentPage: $currentPage, searchList:$searchList){
          count
          results{
              id
              symbol
              isEnable
              isPayment
              isBaseCurrency
          }
        }
      }
      `
      let baseCurrencyId;
      // Get Base currency data
      let subQuery = gql`
          {
              getBaseCurrency{
                id
                symbol
              }
          }
        `;

      const { data } = await client.query({ query: subQuery, fetchPolicy: 'network-only' });
      if (data && data.getBaseCurrency) {
        baseCurrencyId = data.getBaseCurrency.id;
      }

      // Warn admind if he/she try to disable the base currency
      if (baseCurrencyId === id) {
        showToaster({ messageId: 'failedCurrency', toasterType: 'error' });
      } else {
        let mutation = gql`
                mutation updateCurrency ($id: Int, $isEnable: Boolean, $symbol: String){
                  updateCurrency(id: $id, isEnable: $isEnable, symbol: $symbol){
                        status
                        errorMessage
                    }
                }
            `;

        const { data } = await client.mutate({
          mutation,
          variables: { id, isEnable, symbol },
          refetchQueries: [{ query: getCurrency, variables: { currentPage: 1, searchList: '' } }]
        });

        if (data.updateCurrency.status === 200) {
          dispatch({
            type: CHANGE_CURRENCY_STATUS_SUCCESS,
          });
          showToaster({ messageId: 'successCurrency', toasterType: 'success' });
        } else {
          dispatch({
            type: CHANGE_CURRENCY_STATUS_ERROR
          });
          showToaster({ messageId: 'errorMessage', requestContent: { content: data && data.updateCurrency && data.updateCurrency.errorMessage }, toasterType: 'error' });
          return false;
        }
      }

    } catch (error) {

      dispatch({
        type: CHANGE_CURRENCY_STATUS_ERROR,
        payload: {
          error
        }
      });
      showToaster({ messageId: 'catchMessage', requestContent: { content: error }, toasterType: 'error' });
      return false;
    }
    return true;
  };
}

export function setBaseCurrency(id) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: SET_BASE_CURRENCY_START,
    });

    try {

      let mutation = gql`
            mutation setBaseCurrency($id: Int){
              setBaseCurrency(id: $id){
                    status
                }
            }
        `;

      const { data } = await client.mutate({
        mutation,
        variables: { id },
        refetchQueries: [{ query: getCurrency, variables: { currentPage: 1, searchList: '' } }]
      });

      if (data.setBaseCurrency.status == 200) {
        dispatch({
          type: SET_BASE_CURRENCY_SUCCESS,
        });


        const currency = await client.query({ query: getCurrencyRatesQuery, fetchPolicy: 'network-only' })

        if (currency && currency.data && currency.data.getCurrencyRates) {

          let currencyRates;
          let base = currency.data.getCurrencyRates.base;

          if (currency.data.getCurrencyRates.rates != null) {
            currencyRates = JSON.parse(currency.data.getCurrencyRates.rates);
          }

          showToaster({ messageId: 'baseCurrency', toasterType: 'success' });

          dispatch({
            type: CURRENCY_RATES_FETCH_SUCCESS,
            payload: {
              base,
              to: "",
              rates: currencyRates
            }
          })

        }
      }

    } catch (error) {
      dispatch({
        type: SET_BASE_CURRENCY_ERROR,
        payload: {
          error
        }
      });
      showToaster({ messageId: 'catchMessage', requestContent: { content: error }, toasterType: 'error' });
      return false;
    }
    return true;
  };
}

export function allowPaymentCurrency(id, isPayment) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: SET_BASE_CURRENCY_START,
    });

    try {

      let mutation = gql`
            mutation allowPaymentCurrency($id: Int,$isPayment: Int){
              allowPaymentCurrency(id: $id,isPayment: $isPayment){
                    status
                }
            }
        `;

      const { data } = await client.mutate({
        mutation,
        variables: { id, isPayment },
        refetchQueries: [{ query: getCurrency }]
      });

      if (data.allowPaymentCurrency.status === 200) {
        dispatch({
          type: SET_BASE_CURRENCY_SUCCESS,
        });
        showToaster({ messageId: 'allowedCurrency', toasterType: 'success' });
      }

    } catch (error) {
      dispatch({
        type: SET_BASE_CURRENCY_ERROR,
        payload: {
          error
        }
      });
      showToaster({ messageId: 'catchMessage', requestContent: { content: error }, toasterType: 'error' });
      return false;
    }
    return true;
  };
}

export function addCurrency(values) {

  return async (dispatch, getState, { client }) => {
    dispatch({
      type: ADD_CURRENCY_START,
    });

    try {

      let mutation = gql`
      mutation updateCurrency ($id: Int, $isEnable: Boolean, $symbol: String){
        updateCurrency(id: $id, isEnable: $isEnable, symbol: $symbol){
              status
              errorMessage
          }
      }`;

      const { data } = await client.mutate({
        mutation,
        variables: {
          isEnable: values.isEnable == '1' ? true : false,
          symbol: values.symbol
        },
        refetchQueries: [{ query: getCurrency, variables: { currentPage: 1, searchList: '' } }]
      });

      if (data.updateCurrency.status === 200) {
        dispatch({
          type: CHANGE_CURRENCY_STATUS_SUCCESS,
        });
        showToaster({ messageId: 'addCurrency', toasterType: 'success' });
      } else {
        dispatch({
          type: CHANGE_CURRENCY_STATUS_ERROR
        });
        showToaster({ messageId: 'errorMessage', requestContent: { content: data && data.updateCurrency && data.updateCurrency.errorMessage }, toasterType: 'error' });

        return false;
      }
      dispatch(closeCurrencyModal());

    } catch (error) {
      dispatch({
        type: ADD_CURRENCY_ERROR,
        payload: {
          error
        }
      });
      showToaster({ messageId: 'catchMessage', requestContent: { content: error }, toasterType: 'error' });
      dispatch(closeCurrencyModal());
      return false;
    }
    return true;
  };
}


export function removeCurrency(id, symbol) {

  return async (dispatch, getState, { client }) => {
    dispatch({
      type: ADD_CURRENCY_START,
    });

    try {

      let mutation = gql`
      mutation removeCurrency ($id: Int, $symbol: String){
        removeCurrency(id: $id, symbol: $symbol){
              status
              errorMessage
          }
      }`;

      const { data } = await client.mutate({
        mutation,
        variables: {
          id,
          symbol
        },
        refetchQueries: [{ query: getCurrency, variables: { currentPage: 1, searchList: '' } }]
      });

      if (data.removeCurrency.status === 200) {
        dispatch({
          type: ADD_CURRENCY_SUCCESS,
        });
        showToaster({ messageId: 'deleteCurrency', toasterType: 'success' });
      } else {
        dispatch({
          type: ADD_CURRENCY_ERROR
        });
        showToaster({ messageId: 'errorMessage', requestContent: { content: data && data.removeCurrency && data.removeCurrency.errorMessage }, toasterType: 'error' });
        return false;
      }

    } catch (error) {
      dispatch({
        type: ADD_CURRENCY_ERROR,
        payload: {
          error
        }
      });
      showToaster({ messageId: 'catchMessage', requestContent: { content: error }, toasterType: 'error' });
      return false;
    }
    return true;
  };
}