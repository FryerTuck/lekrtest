<?php

    function seek($n)
    {
        return 
    }
    
    if(isset($_POST['find']))
    {
        $data = json_encode(seek($_POST['find']));
        die($data);
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