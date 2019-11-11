<?php

    function wget($uri,$uas=null,$ref=null)
    {
        if(!is_string($uri)){return;}; if(strpos($uri,'http')===false){return;}; if(!isee('curl')){return;}; $ipa=envi('USERADDR');
        if(!$uas){$uas=envi('USER_AGENT');}; if(!$ref){$ref=envi('REFERER'); if(!$ref){$ref='http://example.com/index.html';}};
        $o=array(CURLOPT_RETURNTRANSFER=>1,CURLOPT_SSL_VERIFYPEER=>false,CURLOPT_URL=>$uri,CURLOPT_USERAGENT=>$uas,CURLOPT_REFERER=>$ref);
        $c=curl_init(); curl_setopt_array($c,$o); curl_setopt($c,CURLOPT_HTTPHEADER,array("REMOTE_ADDR: $ipa", "HTTP_X_FORWARDED_FOR: $ipa"));
        $r=curl_exec($c); $e=null; if(!$r){$x=curl_error($c); if($x){$e=$x;};}; curl_close($c);
        if($e){return "FAIL :: $e";}; return $r;
    };


    if(isset($_POST['find']))
    {
        $what = $_POST['find'];
        $json = json_encode(wget("https://www.lekkeslaap.co.za/akkommodasie/$what"));
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