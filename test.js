document.getElementById('button').addEventListener('click', function (e) {
    let params = new URLSearchParams();
    params.set('word1', document.getElementById('word1').value);
    params.set('word2', document.getElementById('word2').value);
    fetch('line.php?' + params.toString())
        .then(function (response) {
            console.log(response.headers.get('Content-Type')); //text/html; charset=UTF-8
            console.log(response.headers.get('Date')); //Wed, 16 Jan 2019 03:08:21 GMT
            console.log(response.status); //200
            return response.text();
        })
        .then(function (data) {
            document.getElementById('result').textContent = data;
        })
        .catch(function (error) {
            document.getElementById('result').textContent = error;
        });
}, false)