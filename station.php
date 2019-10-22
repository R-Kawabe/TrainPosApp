<?php

$word_st = ($_GET['word_st']);
$file = "https://www.train-guide.westjr.co.jp/api/v3/" . $word_st . "_st.json";
echo file_get_contents($file);
