// const endpoint1 = "/line.php";
// window.addEventListener('load', async () => { //ページロード時実行
//     // const res = await fetch(endpoint1); //プロミス 予約 URLフェッチ
//     // const json = await res.json(); //JSONパース
//     // const trains = json.trains.map(buildTrain); //mapで回して関数に従って格納？
//     // viewTrains(trains); //関数を実行しhtmlへ出力

// }, false);

function getLineData(line) {
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
            viewTrains(trains); //関数を実行しhtmlへ
        })
        .catch(function (error) {
            document.getElementById('elem').textContent = error;
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
    train.dest = buildDestination(obj["dest"]);
    train.direction = obj["direction"];
    train.displayType = obj["displayType"];
    train.delayMinutes = obj["delayMinutes"];
    train.nickname = obj["nickname"];
    train.no = obj["no"];
    train.numberOfCars = obj["numberOfCars"];
    train.pos = obj["pos"];
    train.type = obj["type"];
    train.typeChange = obj["typeChange"];
    train.via = obj["via"];
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
 * @param {*} obj
 * @return {Destination}
 */
function buildDestination(obj) {
    return new Destination(obj["code"], obj["line"], obj["text"]);
}

/**
 * 
 * @param {Train} train
 * @param {HTMLElement} dest
 * @return {HTMLElement}
 */
function trainElement(train) {
    const direction = directionSet(train.direction);
    const delayMinutes = delayMinutesSet(train.delayMinutes);
    const position = StaGet(train.pos);
    const text = `${train.no} ${train.displayType}${train.nickname} ${train.typeChange} ${train.dest.text}行き ${train.numberOfCars}両 ${delayMinutes} 走行位置：${position}${direction}`;
    const elem = document.createElement('div');
    elem.innerText = text;
    return elem;
}

/**
 * 
 * @param {string} pos 
 */
function StaGet(pos) {
    const position = pos.split('_');
    const pos1 = posMatch_U(position[0]);
    const pos2 = posMatch_U(position[1]);
    if (pos2[0].name == "") return pos1[0].name;
    else {
        const result = (pos1[0].name + "－" + pos2[0].name);
        return result;
    }
}

/**
 * 
 * @param {*} direction 
 */
function directionSet(direction) {
    if (direction == 0) return "上り";
    else return "下り";
}

/**
 * 
 * @param {*} delayMinutes 
 */
function delayMinutesSet(delayMinutes) {
    if (delayMinutes == 0) return "定刻";
    else return delayMinutes + "分遅れ";
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
        this.dest = {};
        this.direction = 0;
        this.displayType = "";
        this.delayMinutes = 0;
        this.nickname = "";
        this.numberOfCars = 0;
        this.pos = "";
        this.type = "";
        this.typeChange = "";
        this.via = "";
    }
}

class Destination {
    constructor(code, line, text) {
        this.code = code;
        this.line = line;
        this.text = text;
    }
}
