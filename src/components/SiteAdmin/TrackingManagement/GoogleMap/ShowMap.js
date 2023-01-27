import React, { Component } from 'react';
import { connect } from 'react-redux';
import { change } from 'redux-form';

import ReactGoogleMapLoader from "react-google-maps-loader";
import {
	GoogleMap,
	Marker,
	HeatmapLayer,
	MarkerClusterer
} from "@react-google-maps/api";

import { googleMapAPI } from '../../../../config';

import users from '../../../../../public/Icons/MapMarker/users.png';
import availableDrivers from '../../../../../public/Icons/MapMarker/availableDrivers.png';
import unActivatedDrivers from '../../../../../public/Icons/MapMarker/unActivatedDrivers.png';
import unAvailableDrivers from '../../../../../public/Icons/MapMarker/unAvailableDrivers.png';

function createKey(location) {
	return location.lat + location.lng
}
class ShowMap extends Component {
	static defaultProps = {
		zoom: 4,
		height: '400px',
		width: '100%',
		center: { lat: 55.3781, lng: 3.4360 },
		bounds: []
	};


	constructor(props) {
		super(props);
		this.onLoad = this.onLoad.bind(this);
	}

	onLoad(map) {
		const { mapMarkerPoints, heatMapData, showSection } = this.props;
		let bounds = new google.maps.LatLngBounds();

		if (showSection === 0 && map && mapMarkerPoints && mapMarkerPoints.length > 0) {
			mapMarkerPoints.map((i) => {
				bounds.extend(new google.maps.LatLng(parseFloat(i.profile.lat), parseFloat(i.profile.lng)));
			});
			map.fitBounds(bounds);
		}
		else if (showSection === 1 && map && heatMapData && heatMapData.length > 0) {
			heatMapData.map((i) => {
				bounds.extend(i);
			});
			map.fitBounds(bounds);
		}
	}


	render() {
		const { mapMarkerPoints, type, zoom, height, width, center, heatMapData, showSection } = this.props;
		let mapStyles = [
			{
				featureType: "poi",
				elementType: "geometry",
				stylers: [
					{
						color: "#eeeeee",
					},
				],
			},
			{
				featureType: "poi",
				elementType: "labels.text",
				stylers: [
					{
						visibility: "off",
					},
				],
			},
			{
				featureType: "water",
				elementType: "labels.text.fill",
				stylers: [
					{
						color: "#9e9e9e",
					},
				],
			},
		];

		let options = {
			styles: mapStyles,
			disableDefaultUI: true,
			minZoom: 2,
			maxZoom: 22,
		}

		if (showSection === 1) {
			options['mapTypeId'] = "satellite"
		} else {
			options['mapTypeId'] = "roadmap"
		}

		return (
			<ReactGoogleMapLoader
				params={{
					key: googleMapAPI,
					libraries: "geometry,drawing,places,visualization"
				}}
				render={googleMaps =>
					googleMaps && (
						<div>
							<GoogleMap
								ref={(map) => this.map = map}
								zoom={zoom}
								center={center}
								mapContainerStyle={{ height, width }}
								options={options}
								onLoad={(map) => this.onLoad(map)}
							>
								{
									showSection === 0 && mapMarkerPoints && mapMarkerPoints.length > 0 && <MarkerClusterer >
										{(clusterer) =>
											mapMarkerPoints && mapMarkerPoints.length > 0 && mapMarkerPoints.map((position, index) => {
												let icon = users;
												if (type === 'all') {
													if (position.userType === 1) {
														icon = users;
													} else if (position.userType === 2) {
														if (position.isActive === 1 && position.activeStatus == 'inactive') {
															icon = availableDrivers;
														} else if (position.isActive === 1 && position.activeStatus == 'active') {
															icon = unAvailableDrivers;
														} else if (position.isActive === 0 && position.activeStatus == 'inactive') {
															icon = unActivatedDrivers;
														}
													}
												} else if (type === 'users') {
													icon = users;
												} else if (type === 'availablePartners') {
													icon = availableDrivers;
												} else if (type === 'unAvailablePartners') {
													icon = unAvailableDrivers;
												} else if (type === 'unActivatedPartners') {
													icon = unActivatedDrivers;
												}
												return (
													<Marker
														key={index}
														position={new google.maps.LatLng(parseFloat(position.profile.lat), parseFloat(position.profile.lng))}
														icon={icon}
														clusterer={clusterer}
													/>
												)
											})
										}
									</MarkerClusterer>}

								{
									showSection === 1 && heatMapData && heatMapData.length > 0 && <HeatmapLayer
										data={heatMapData}
									/>
								}

							</GoogleMap>

						</div>
					)
				}
			/>
		)
	}
}

const mapState = state => ({});

const mapDispatch = {
	change
};

export default connect(mapState, mapDispatch)(ShowMap);
