<?php

    function seek($n)
    {
        $data = [];
        return $data;
    }


    if(isset($_POST['find']))
    {
        $json = json_encode(seek($_POST['find']));
        die($json);
    };

?>
<!DOCTYPE html>
<html>
    <head>
        <title>LekkeSlaap card-test</title>
        <link rel="stylesheet" href="/lekrtest/dist/style.css">
        <script src="/lekrtest/dist/script.js"></script>
    </head>
    <body>
        <div id="busy" class="panl midl">Loading ...</div>
    </body>
</html>