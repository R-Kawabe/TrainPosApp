function getStationData(st) {
    let params = new URLSearchParams();
    params.set('word_st', st);
    fetch('station.php?' + params.toString())
        .then(function (response) {
            console.log(response.status); //200
            return response.json();
        })
        .then(function (data) {
            const stations = data.stations.map(buildStation); //mapで回して関数に従って格納？
            viewStations(stations); //関数を実行しhtmlへ出
        })
        .catch(function (error) {
            document.getElementById('elem').textContent = error;
        });
}

/**
 * 
 * @param {*} obj 
 * @return {Train}
 */
function buildStation(obj) { //jsonから取得した各要素について？？？
    const station = new Station();
    station.info = buildStaInfo(obj["info"]);
    return station;
}

/**
 * 
 * @param {*} obj 
 * @return {StaInfo}
 */
function buildStaInfo(obj) {
    return new StaInfo(obj["code"], obj["name"]);
}

/**
 * 
 * @param {Train} station
 * @return {HTMLElement}
 */
function stationElement(station) {
    const text = `${station.info.code} ${station.info.name}`;
    const elem = document.createElement('div');
    elem.innerText = text;
    return elem;
}

/**
 * 
 * @param {Station[]} stations 
 */
function viewStations(stations) {
    const elem = document.getElementById("elem");
    while (child = elem.firstChild) elem.removeChild(child);
    const stationElems = stations.map(stationElement);
    stationElems.forEach(element => {
        elem.appendChild(element);
    });
}

class Station {
    constructor() {
        this.info = {};
    }
}

class StaInfo {
    constructor(code, name) {
        this.code = code;
        this.name = name;
    }
}
