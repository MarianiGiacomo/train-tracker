import L from "leaflet";
import wsIconImage from '../images/ws.png';
import restIconImage from '../images/REST.png';

const trainIcon = L.icon({
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Aiga_railtransportation.png',

    iconSize:     [30, 40],
    iconAnchor:   [15, 20],
    popupAnchor:  [-3, -76]
});

const restIcon = L.icon({
    iconUrl: restIconImage,
    iconSize:     [30, 30],
    iconAnchor:   [15, 15],
    popupAnchor:  [-3, -76]
});

const websocketsIcon = L.icon({
    iconUrl: wsIconImage,

    iconSize:     [40, 30],
    iconAnchor:   [20, 15],
    popupAnchor:  [-3, -76]
});

export function selectIcon(connectionType){
    if (connectionType === 'Rest'){
        return restIcon
    }
    if (connectionType === 'WebSocket'){
        return websocketsIcon
    }
    return trainIcon;
}