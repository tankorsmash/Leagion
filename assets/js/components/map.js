import {mapsUrl} from "common/utils";
import { compose, withProps, lifecycle } from "recompose";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from "react-google-maps";
import { SearchBox } from "react-google-maps/lib/components/places/SearchBox";

export const MapWithASearchBox = compose(
    withProps({
        googleMapURL: mapsUrl,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap,
    lifecycle({
        componentWillMount() {
            const refs = {};
            const {latitude, longitude} = this.props;
            const lat = parseFloat(latitude);
            const lng = parseFloat(longitude);
            const marker = lat && lng ?
                {location: new google.maps.LatLng(lat, lng)} : null;

            this.setState({
                bounds: null,
                center: {
                    lat: lat || 45.4215, lng: lng || -75.6972
                },
                marker: marker,
                onMapMounted: ref => {
                    refs.map = ref;
                },
                onBoundsChanged: () => {
                    this.setState({
                        bounds: refs.map.getBounds(),
                        center: refs.map.getCenter(),
                    });
                },
                onSearchBoxMounted: ref => {
                    refs.searchBox = ref;
                },
                onPlacesChanged: () => {
                    const place = R.head(refs.searchBox.getPlaces());
                    const nextMarker = place.geometry;

                    this.setState({
                        center: nextMarker.location || this.state.center,
                        marker: nextMarker,
                    });
                    this.props.onMapChanged(refs.searchBox.getPlaces());
                },
            });
        },
    }),
)(props => {
    return (
        <GoogleMap
            ref={props.onMapMounted}
            defaultZoom={15}
            center={props.center}
            onBoundsChanged={props.onBoundsChanged}
        >
            <SearchBox
                ref={props.onSearchBoxMounted}
                bounds={props.bounds}
                controlPosition={google.maps.ControlPosition.TOP_LEFT}
                onPlacesChanged={props.onPlacesChanged}
            >
                <input
                    type="text"
                    placeholder={props.initial || "Enter an address"}
                    style={{
                        boxSizing: `border-box`,
                        border: `1px solid transparent`,
                        width: `240px`,
                        height: `32px`,
                        marginTop: `27px`,
                        padding: `0 12px`,
                        borderRadius: `3px`,
                        boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                        fontSize: `14px`,
                        outline: `none`,
                        textOverflow: `ellipses`,
                    }}
                />
            </SearchBox>
            {props.marker &&
                <Marker position={props.marker.location} />
            }
        </GoogleMap>
    );
});
