import gql from 'graphql-tag';
import {
  GET_MAP_DATA_START,
  GET_MAP_DATA_SUCCESS,
  GET_MAP_DATA_ERROR
} from '../../../constants';
import { setLoaderStart, setLoaderComplete } from '../../loader/loader';
import getMapViewDataQuery from './getMapViewData.graphql';
import getHeatMapDataQuery from './getHeatMapData.graphql';

export function getMapViewData(id, period, limit) {
  return async (dispatch, getState, { client }) => {

    try {
      dispatch({
        type: GET_MAP_DATA_START,
      });

      const { data: { getMapViewData } } = await client.query({
        query: getMapViewDataQuery,
        variables: { id, period, limit }
      });

      dispatch(setLoaderStart('GetMapData'));

      if (getMapViewData.status && getMapViewData.status === 200) {
        await dispatch({
          type: GET_MAP_DATA_SUCCESS,
          payload: {
            data: getMapViewData.results
          }
        });
        dispatch(setLoaderComplete('GetMapData'));
      } else {
        await dispatch({
          type: GET_MAP_DATA_ERROR,
        });
        dispatch(setLoaderComplete('GetMapData'));
      }
    } catch (error) {
      let errorMessage = "Something went wrong! " + error;
      await dispatch({
        type: GET_MAP_DATA_ERROR,
      });
      dispatch(setLoaderComplete('GetMapData'));
    }
  }
}

export function getHeatMapData(id, period, limit) {
  return async (dispatch, getState, { client }) => {

    try {
      dispatch({
        type: GET_MAP_DATA_START,
      });

      const { data: { getHeatMapData } } = await client.query({
        query: getHeatMapDataQuery,
        variables: { id, period, limit }
      });

      dispatch(setLoaderStart('GetMapData'));

      if (getHeatMapData.status && getHeatMapData.status === 200) {

        let heatMapData = [];

        if (id === 'jobs' && getHeatMapData.bookingResults && getHeatMapData.bookingResults.length > 0) {
          heatMapData = getHeatMapData.bookingResults.map((item, index) => {
            if (item.userLocationLat && item.userLocationLng) {
              return new google.maps.LatLng(item.userLocationLat, item.userLocationLng)
            }
          });
        } else if (id === 'partners' && getHeatMapData.results && getHeatMapData.results.length > 0) {
          heatMapData = getHeatMapData.results.map((item, index) => {
            if (item.profile.lat && item.profile.lng) {
              return new google.maps.LatLng(item.profile.lat, item.profile.lng)
            }
          });
        }

        await dispatch({
          type: GET_MAP_DATA_SUCCESS,
          payload: {
            heatMapData,
          }
        });
        dispatch(setLoaderComplete('GetMapData'));
      } else {
        await dispatch({
          type: GET_MAP_DATA_ERROR,
        });
        dispatch(setLoaderComplete('GetMapData'));
      }
    } catch (error) {
      let errorMessage = "Something went wrong! " + error;
      await dispatch({
        type: GET_MAP_DATA_ERROR,
      });
      dispatch(setLoaderComplete('GetMapData'));
    }
  }
}


