import L from "leaflet";
// hsl icons can be found here: https://reittiopas.hsl.fi/styleguide

const trainIcon = L.icon({
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Aiga_railtransportation.png',

    iconSize:     [30, 40],
    iconAnchor:   [15, 20],
    popupAnchor:  [-3, -76]
});

const restIcon = L.icon({
    iconUrl: 'https://restfulapi.net/wp-content/uploads/rest.png',

    iconSize:     [30, 30],
    iconAnchor:   [15, 15],
    popupAnchor:  [-3, -76]
});

const websocketsIcon = L.icon({
    iconUrl: 'http://www.techbysample.com/wp-content/uploads/2017/03/websocket-1.png',

    iconSize:     [40, 30],
    iconAnchor:   [20, 15],
    popupAnchor:  [-3, -76]
});

export function selectIcon(connectionType){
    if (connectionType === 'Rest'){
        return restIcon
    }
    if (connectionType === 'Websockets'){
        return websocketsIcon
    }
    return trainIcon;
}