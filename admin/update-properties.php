<html>
<head>
<title>Update Properties</title>
</head>
<body>
<?php

echo "<p>Updating properties from Google Spreadheet...</p>";

$url = 'https://docs.google.com/spreadsheet/ccc?key=0Ah_QZCEwo1hjdFc3aGpCY1BDYmQtdGR1MlJQc0ItbGc&output=csv';


$ch = curl_init();
$timeout = 30; // set to zero for no timeout
curl_setopt ($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, $timeout);

ob_start();
curl_exec($ch);
curl_close($ch);
$file_contents = ob_get_contents();
ob_end_clean();

// TODO validate $file_contents
//file_put_contents('/admin/properties.csv', $file_contents);

echo "<p>Finished:</p>";
echo $file_contents;
?>
</body>
</html>
