function getLineData_other(line) {
    // document.getElementsByName('word1').addEventListener('click', function (e) {
    let params = new URLSearchParams();
    params.set('word1', line);
    fetch('line.php?' + params.toString())
        .then(function (response) {
            console.log(response.status); //200
            return response.json();
        })
        .then(function (data) {
            const trains = data.trains.map(buildTrain); //mapで回して関数に従って格納？
            viewTrains(trains); //関数を実行しhtmlへ出力
        })
        .catch(function (error) {
            document.getElementById('result').textContent = error;
        });
    // }, false)
}

/**
 * 
 * @param {*} obj 
 * @return {Train}
 */
function buildTrain(obj) { //jsonから取得した各要素について？？？
    const train = new Train();
    train.dest = obj["dest"];
    train.direction = obj["direction"];
    train.delayMinutes = obj["delayMinutes"];
    train.displayType = obj["displayType"];
    train.nickname = obj["nickname"];
    train.no = obj["no"];
    train.pos = obj["pos"];
    train.type = obj["type"];
    train.notice = obj["notice"];
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
    const text = `${train.no} ${train.displayType}${train.nickname} ${train.dest}行き`;
    const elem = document.createElement('div');
    elem.innerText = text;
    return elem;
}

/**
 * 
 * @param {Train[]} trains 
 */
function viewTrains(trains) {
    const elem = document.getElementById("elem");
    while (child = elem.firstChild) elem.removeChild(child);
    const trainElems = trains.map(trainElement);
    trainElems.forEach(element => {
        elem.appendChild(element);
    });
}

class Train {
    constructor() {
        this.no = "";
        this.dest = "";
        this.direction = 0;
        this.displayType = "";
        this.delayMinutes = 0;
        this.nickname = "";
        this.pos = "";
        this.type = "";
        this.notice = "";
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
