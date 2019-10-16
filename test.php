<?php

$file = "./test.json";
$json = json_decode(file_get_contents($file), true);
echo ($json);

// for ($i = 0; $i < count($json); $i++) {
//     echo $json[$i]["UnyoNo"] . "\n";
// }
