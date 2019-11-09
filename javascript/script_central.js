function getLineData_Central(line) {
    // document.getElementsByName('word1').addEventListener('click', function (e) {
    let params = new URLSearchParams();
    params.set('wordC', line);
    fetch('lineC.php?' + params.toString())
        .then(function (response) {
            console.log(response.status); //200
            return response.json();
        })
        .then(function (data) {
            const trains = data.lst.map(buildTrain); //mapで回して関数に従って格納？
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
    train.dest = obj["yukisaki"];
    train.direction = obj["jogeKbn"];
    train.delayMinutes = obj["chienJifun"];
    train.displayType = obj["resshaShubetsuMei"];
    train.nickname = obj["aishoMei"];
    train.no = obj["resshaBng"];
    train.pos = obj["ryokakuEkiCd"];
    train.ekikanKbn = obj["ekiEkikanKbn"];
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
    const DispTypeAddCol = AddDispTypeCol(train.displayType);
    const DestAddCol = AddDestCol(train.dest);
    const nickname = nicknameSet(train.nickname);
    const direction = directionSet(train.direction);
    const delayMinutes = delayMinutesSet(train.delayMinutes);
    const position = StaGet_Central(train.pos, train.ekikanKbn);
    // const text = `${train.no} ${train.displayType}${nickname} ${train.dest}行き ${delayMinutes} 走行位置：${position}${direction}`;
    const text = train.no + " " + DispTypeAddCol + nickname + " " + DestAddCol + "行き " + delayMinutes + " 走行位置：" + position + direction;
    const elem = document.createElement('div');
    elem.className = 'kakomi-box3';
    // elem.innerText = text;
    elem.innerHTML = text;
    return elem;
}

/**
 * 
 * @param {*} pos 
 * @param {*} ekikanKbn 
 */
function StaGet_Central(pos, ekikanKbn) {
    if (ekikanKbn == 1) {
        const position = posMatch_C(pos);
        return position[0].name;
    }
    else if (ekikanKbn == 2) {
        const position = posMatch_C(pos);
        return position[0].name + " 付近 ";
    }
}

/**
 * 
 * @param {*} nickname 
 */
function nicknameSet(nickname) {
    if (nickname == null) return "";
    else return nickname;
}

/**
 * 
 * @param {*} direction 
 */
function directionSet(direction) {
    if (direction == 1) return "上り";
    else return "下り";
}

/**
 * 
 * @param {*} delayMinutes 
 */
function delayMinutesSet(delayMinutes) {
    if (delayMinutes == 0) return '<span class="noDelay">定刻</span>';
    else if (delayMinutes > 59) return '<span class="overDelay">60分以上遅れ</span>';
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
        this.dest = "";
        this.direction = 0;
        this.displayType = "";
        this.delayMinutes = 0;
        this.nickname = "";
        this.pos = "";
        this.ekikanKbn = 0;
    }
}

/**
 * 
 * @param {*} trainType 
 */
function AddDispTypeCol(trainType) {
    switch (trainType) {
        case "普通": {
            const typeCol = '<span class="local">' + trainType + '</span>';
            return typeCol;
        }
        case "区間快速": {
            const typeCol = '<span class="regionalrapid">' + trainType + '</span>';
            return typeCol;
        }
        case "快速": {
            const typeCol = '<span class="rapidC">' + trainType + '</span>';
            return typeCol;
        }
        case "新快速": {
            const typeCol = '<span class="newrapid">' + trainType + '</span>';
            return typeCol;
        }
        case "ホームライナー": {
            const typeCol = '<span class="rapidC">' + trainType + '</span>';
            return typeCol;
        }
        case "特別快速": {
            const typeCol = '<span class="specialrapidC">' + trainType + '</span>';
            return typeCol;
        }
        case "特急": {
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
        case "臨時特急": {
            const typeCol = '<span class="limitedexp">' + trainType + '</span>';
            return typeCol;
        }
        case "観光列車": {
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

// /**
//  * 
//  * @param {*} pos 
//  * @param {*} ekikanKbn 
//  * @param {*} direction 
//  */
// function StaGet_Central(pos, ekikanKbn, direction) {
//     if (ekikanKbn == 1) {
//         const position = posMatch_C(pos);
//         return position[0].name;
//     }
//     else if (ekikanKbn == 2 && direction == 2) {
//         const parsePos = new Number(pos);
//         resultPos = parsePos + 10;
//         const num = new String(resultPos);
//         const position2 = posMatch_C(num);
//         return position2[0].name;
//     }
//     else if (ekikanKbn == 2 && direction == 1) {
//         const parsePos = new Number(pos);
//         resultPos = parsePos - 10;
//         const num = new String(resultPos);
//         const position2 = posMatch_C(num);
//         return position2[0].name;
//     }
// }
