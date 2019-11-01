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
            console.log(response);
            if (!response.ok) {
                throw new Error("eeeee");
            }
            return response.json();
        })
        .then(function (data) {
            console.log(data)
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
    const DispTypeAddCol = AddDispTypeCol(train.displayType, train.dest.line);
    const DestAddCol = AddDestCol(train.dest.text);
    const LineMark = LineMarkGet(train.dest.line);
    const direction = directionSet(train.direction);
    const delayMinutes = delayMinutesSet(train.delayMinutes);
    const position = StaGet(train.pos);
    // const text = `${train.no} ${train.displayType}${train.nickname} ${train.typeChange} ${train.via} ${train.dest.text}行き ${train.numberOfCars}両 ${delayMinutes} 走行位置：${position}${direction}`;
    const text = train.no + " " + LineMark + DispTypeAddCol + train.nickname + " " + train.typeChange + " " + train.via + " " + DestAddCol + "行き " + train.numberOfCars + "両 " + delayMinutes + " 走行位置：" + position + direction;
    const elem = document.createElement('div');
    elem.className = 'kakomi-box3';
    // elem.innerText = text;
    elem.innerHTML = text;
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
    if (delayMinutes == 0) return '<span class="noDelay">定刻</span>';
    // '<span class="noDelay">'+delayMinutes+'</span>'+"分遅れ";
    else return '<span class="delayMinutes">' + delayMinutes + '分遅れ</span>';
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

/**
 * 
 * @param {*} trainType 
 * @param {*} linename
 */
function AddDispTypeCol(trainType, linename) {
    switch (trainType) {
        case "普通": {
            const typeCol = '<span class="local">' + trainType + '</span>';
            return typeCol;
        }
        case "区間快速": {
            if (linename == "nara") {
                const typeCol = '<span class="miyakojirapid">' + trainType + '</span>';
                return typeCol;
            }
            else {
                const typeCol = '<span class="regionalrapid">' + trainType + '</span>';
                return typeCol;
            }
        }
        case "快速": {
            if (linename == "yamatoji" || linename == "wakayama2") {
                const typeCol = '<span class="yamatojirapid">' + trainType + '</span>';
                return typeCol;
            }
            else if (linename == "nara") {
                const typeCol = '<span class="miyakojirapid">' + trainType + '</span>';
                return typeCol;
            }
            else {
                const typeCol = '<span class="rapid">' + trainType + '</span>';
                return typeCol;
            }
        }
        case "新快速": {
            const typeCol = '<span class="specialrapid">' + trainType + '</span>';
            return typeCol;
        }
        case "A新快○": {
            const typeCol = '<span class="specialrapid">' + trainType + '</span>';
            return typeCol;
        }
        case "A→一般": {
            const typeCol = '<span class="specialrapid">' + trainType + '</span>';
            return typeCol;
        }
        case "一般→A": {
            const typeCol = '<span class="specialrapid">' + trainType + '</span>';
            return typeCol;
        }
        case "丹波路快": {
            const typeCol = '<span class="tanbajirapid">' + trainType + '</span>';
            return typeCol;
        }
        case "紀州路快": {
            const typeCol = '<span class="kishujirapid">' + trainType + '</span>';
            return typeCol;
        }
        case "関空快速": {
            const typeCol = '<span class="kixrapid">' + trainType + '</span>';
            return typeCol;
        }
        case "関空紀州": {
            const typeCol = '<span class="kixrapid">関空</span>' + '<span class="kishujirapid">紀州</span>';
            return typeCol;
        }
        case "大和路快": {
            const typeCol = '<span class="yamatojirapid">' + trainType + '</span>';
            return typeCol;
        }
        case "みやこ快": {
            const typeCol = '<span class="miyakojirapid">' + trainType + '</span>';
            return typeCol;
        }
        case "直通快速": {
            const typeCol = '<span class="directrapid">' + trainType + '</span>';
            return typeCol;
        }
        case "特急": {
            const typeCol = '<span class="limitedexp">' + trainType + '</span>';
            return typeCol;
        }
        case "関空特急": {
            const typeCol = '<span class="limitedexp">' + trainType + '</span>';
            return typeCol;
        }
        case "通勤特急": {
            const typeCol = '<span class="limitedexp">' + trainType + '</span>';
            return typeCol;
        }
        case "寝台特急": {
            const typeCol = '<span class="limitedexp">' + trainType + '</span>';
            return typeCol;
        }
        case "回送": {
            const typeCol = '<span class="notinservice">' + trainType + '</span>';
            return typeCol;
        }
        case "臨時": {
            const typeCol = '<span class="extra">' + trainType + '</span>';
            return typeCol;
        }
        default: {
            return trainType;
        }

    }
}

/**
 * 
 * @param {*} trainDest 
 */
function AddDestCol(trainDest) {
    return '<span class="destination">' + trainDest + '</span>';
}

/**
 * 
 * @param {*} LineMark 
 */
function LineMarkGet(LineMark) {
    switch (LineMark) {
        case "hokuriku": {
            const GetMark = '<span class="hokuriku">[A]</span>';
            return GetMark;
        }
        case "kosei": {
            const GetMark = '<span class="kosei">[B]</span>';
            return GetMark;
        }
        case "kusatsu": {
            const GetMark = '<span class="kusatsu">[C]</span>';
            return GetMark;
        }
        case "nara": {
            const GetMark = '<span class="nara">[D]</span>';
            return GetMark;
        }
        case "osakahigashi": {
            const GetMark = '<span class="osakahigashi">[F]</span>';
            return GetMark;
        }
        case "takarazuka": {
            const GetMark = '<span class="takarazuka">[G]</span>';
            return GetMark;
        }
        case "tozai": {
            const GetMark = '<span class="tozai">[H]</span>';
            return GetMark;
        }
        case "kakogawa": {
            const GetMark = '<span class="kakogawa">[I]</span>';
            return GetMark;
        }
        case "kishin": {
            const GetMark = '<span class="kishin">[K]</span>';
            return GetMark;
        }
        case "osakaloop": {
            const GetMark = '<span class="osakaloop">[O]</span>';
            return GetMark;
        }
        case "yumesaki": {
            const GetMark = '<span class="yumesaki">[P]</span>';
            return GetMark;
        }
        case "yamatoji": {
            const GetMark = '<span class="yamatoji">[Q]</span>';
            return GetMark;
        }
        case "hanwa": {
            const GetMark = '<span class="hanwa">[R]</span>';
            return GetMark;
        }
        case "kansaiairport": {
            const GetMark = '<span class="kix">[S]</span>';
            return GetMark;
        }
        case "wakayama2": {
            const GetMark = '<span class="wakayama">[T]</span>';
            return GetMark;
        }
        case "kansai": {
            const GetMark = '<span class="kansai">[V]</span>';
            return GetMark;
        }
        case "kinokuni": {
            const GetMark = '<span class="kinokuni">[W]</span>';
            return GetMark;
        }
        case "other": {
            return "";
        }
        case "hagoromo": {
            return "";
        }
        default: {
            return LineMark;
        }

    }
}
