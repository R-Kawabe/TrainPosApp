function get(Unyo) {
    // fetch('./jsonGet.php')
    let params = new URLSearchParams();
    params.set('word_U', Unyo);
    fetch('./jsonGet.php?' + params.toString())
        .then(function (response) {
            console.log(response.status); //200
            return response.json();
        })
        .then(function (data) {
            const trains = data.Unyo.map(buildTrain); //mapで回して関数に従って格納？
            viewTrains(trains); //関数を実行しhtmlへ出力
            document.getElementById("form").addEventListener('click', () => {
                const searchText = formfunc();
                const searchResult = searchUnyo(searchText[0], trains);
                const searchResult1 = searchTrainNo(searchText[1], searchResult);
                const searchResult2 = searchType(searchText[2], searchResult1);
                const searchResult3 = searchDest(searchText[3], searchResult2);
                const searchResult4 = searchDay(searchText[4], searchResult3);
                if (searchText.length < 6) viewTrains(searchResult4);
                else if (searchText.length == 6) {
                    const searchResult5 = searchDay(searchText[5], searchResult3);
                    const array_merge = searchResult4.concat(searchResult5);
                    viewTrains(array_merge);
                }
            }, false)
        })
        .catch(function (error) {
            document.getElementById('a').textContent = error;
        });
    //}, false)
}

/**
 * 
 * @param {string} 
 */
function formfunc() {
    const UnyoNo_text = document.forms.Unyo_Search.Unyo_Text.value;
    const TrainNo_text = document.forms.Unyo_Search.TrainNo_Text.value;
    const Type_text = document.forms.Unyo_Search.Type_Text.value;
    const Dest_text = document.forms.Unyo_Search.Dest_Text.value;
    const Day_text = document.forms.Unyo_Search.Day_Text.value;
    if (Day_text.includes(',')) {
        const Day_array = Day_text.split(",");
        return array = [UnyoNo_text, TrainNo_text, Type_text, Dest_text, Day_array[0], Day_array[1]];
    }
    else return array = [UnyoNo_text, TrainNo_text, Type_text, Dest_text, Day_text];
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
    train.EndTime = obj["EndTime"];
    return train;
}

/**
 * 
 * @param {Train} train 
 * @return {HTMLElement}
 */
function trainElement(train) {
    const text = `${train.UnyoNo} ${train.TrainNo}${train.Position} ${train.Type} ${train.Destination}行き ${train.FirstTime} ${train.EndTime} ${train.Day}`;
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
        this.EndTime = "";
    }
}

/**
 * 
 * @param {string} text 
 * @param {Train[]} trains 
 * @return {Train[]}
 */
function searchUnyo(text, trains) {
    return trains.filter(train => {
        if (train.UnyoNo === text) return train.UnyoNo;
        else if (text === "") return train.UnyoNo;
    });
}

/**
 * 
 * @param {string} text 
 * @param {Train[]} trains 
 * @return {Train[]}
 */
function searchTrainNo(text, trains) {
    return trains.filter(train => {
        // return train.TrainNo.match(text) != null;
        if (train.TrainNo === text) return train.TrainNo;
        else if (text === "") return train.TrainNo;
    });
}

/**
 * 
 * @param {string} text 
 * @param {Train[]} trains 
 * @return {Train[]}
 */
function searchType(text, trains) {
    return trains.filter(train => {
        // return train.Type.match(text) != null;
        if (train.Type === text) return train.Type;
        else if (text === "") return train.Type;
    });
}

/**
 * 
 * @param {string} text 
 * @param {Train[]} trains 
 * @return {Train[]}
 */
function searchDest(text, trains) {
    return trains.filter(train => {
        return train.Destination.match(text) != null;
    });
}

/**
 * 
 * @param {string} text 
 * @param {Train[]} trains 
 * @return {Train[]}
 */
function searchDay(text, trains) {
    return trains.filter(train => {
        return train.Day.match(text) != null;
    });
}
