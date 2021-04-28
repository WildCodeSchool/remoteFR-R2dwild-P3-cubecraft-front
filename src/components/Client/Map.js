import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
export default function MapLeaflet () {



    return (
        <MapContainer center={[48.9475053, 4.393899]} zoom={16} scrollWheelZoom={true}>
        <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[48.9475053, 4.393899]}>
            <Popup>
            <h3>High Cube Eco Design</h3>
            <p>Adresse : </p>
            <p>Telephone : </p>
            </Popup>
        </Marker>
        </MapContainer>
 
    )
}