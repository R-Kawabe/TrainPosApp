function get() {
    fetch('./test.php')
        .then(function (response) {
            console.log(response.status); //200
            return response.json();
        })
        .then(function (data) {
            const trains = data.Unyo.map(buildTrain); //mapで回して関数に従って格納？
            viewTrains(trains); //関数を実行しhtmlへ出力
        })
        .catch(function (error) {
            document.getElementById('a').textContent = error;
        });
    //}, false)
}

/**
 * 
 * @param {*} obj 
 * @return {Train}
 */
function buildTrain(obj) { //jsonから取得した各要素について？？？
    const train = new Train();
    train.UnyoNo = obj["UnyoNo"];
    train.TrainNo = obj["TrainNo"];
    train.Position = obj["Position"];
    train.Type = obj["Type"];
    train.Destination = obj["Destination"];
    train.Day = obj["Day"];
    train.FirstTime = obj["FirstTime"];
    train.ArrivalTime = obj["ArrivalTime"];
    return train;
}

/**
 * @return {string}
 */
function getSearchText() { //入力された文字列を取得し返す関数
    return document.getElementById('search_text').value;
}

/**
 * 
 * @param {Train} train 
 * @return {HTMLElement}
 */
function trainElement(train) {
    const text = `${train.UnyoNo} ${train.TrainNo} ${train.Destination}行き`;
    const elem = document.createElement('div');
    elem.innerText = text;
    return elem;
}

/**
 * 
 * @param {Train[]} trains 
 */
function viewTrains(trains) {
    const elem = document.getElementById("a");
    while (child = elem.firstChild) elem.removeChild(child);
    const trainElems = trains.map(trainElement);
    trainElems.forEach(element => {
        elem.appendChild(element);
    });
}

class Train {
    constructor() {
        this.UnyoNo = "";
        this.TrainNo = "";
        this.Position = "";
        this.Position = "";
        this.Type = "";
        this.Destination = "";
        this.Day = "";
        this.FirstTime = "";
        this.ArrivalTime = "";
    }
}

/**
 * 
 * @param {string} text 
 * @param {Train[]} trains 
 * @return {Train[]}
 */
function searchDest(text, trains) {
    return trains.filter(train => {
        return train.dest.text.match(text) != null;
    });
}
