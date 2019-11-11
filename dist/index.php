<?php


# dbug :: vars : USERADDR - ip address .. if no ip then the request is bogus .. get rid of unsupported requests
# ---------------------------------------------------------------------------------------------------------------------------------------------
   $l=explode(' ','CLIENT_IP FORWARDED_FOR FORWARDED REMOTE_ADDR'); $y=0; $s=count($l); for($i=0; $i<$s; $i++)
   {$v=$l[$i]; $x="X_$v"; $z="$v"; if(envi($x)){$y=$x;}elseif(envi($z)){$y=$z;}elseif(envi($v)){$y=$v;}else{$y=0;}; if($y){break;};};
   if(!$y){header("HTTP/1.1 400 Bad Request"); die();}; $_SERVER['USERADDR']=envi($y);  unset($l,$y,$s,$i,$v,$x,$z);
# ---------------------------------------------------------------------------------------------------------------------------------------------



# func :: envi : server variables .. prefix-free
# ---------------------------------------------------------------------------------------------------------------------------------------------
    function envi($d)
    {
        if(!is_string($d)||($d==='')){return '';};
        if(isset($_SERVER)){$v=$_SERVER;}elseif(isset($HTTP_SERVER_VARS)){$v=$HTTP_SERVER_VARS;}else{return '';};
        $l=explode(' ',$d); $s=count($l); $f=array();
        $x=array('X','HTTP','REDIRECT','REQUEST'); for($i=0; $i<$s; $i++)
        {
            $k=$l[$i]; if(!isset($v[$k])){$w=array_values($x); do{$p=(array_shift($w)."_$k"); if(isset($v[$p])){$k=$p;break;}}while(count($w));};
            if(!isset($v[$k])){continue;}; $q=$v[$k]; if($q&&!is_string($q)){$q=json_encode($q);}; if(is_string($q)&&(strlen($q)>0)){$f[$i]=$q;}
        };
        $c=count($f); if($s===1){if($c<1){return '';}; return $f[0];}; $r=($c/$s); return $r;
    }
# ---------------------------------------------------------------------------------------------------------------------------------------------



# func :: spuf : simple http-request .. can be used for spoofing .. or not .. using a proxy is better for REMOTE_ADDR, blessed be the ignorant
# ---------------------------------------------------------------------------------------------------------------------------------------------
   function spuf($uri,$uas=null,$ref=null)
   {
      if(!is_string($uri)){return;}; if(strpos($uri,'http')===false){return;}; if(!isee('curl')){return;}; $ipa=envi('USERADDR');
      if(!$uas){$uas=envi('USER_AGENT');}; if(!$ref){$ref=envi('REFERER'); if(!$ref){$ref='http://example.com/index.html';}};
      $o=array(CURLOPT_RETURNTRANSFER=>1,CURLOPT_SSL_VERIFYPEER=>false,CURLOPT_URL=>$uri,CURLOPT_USERAGENT=>$uas,CURLOPT_REFERER=>$ref);
      $c=curl_init(); curl_setopt_array($c,$o); curl_setopt($c,CURLOPT_HTTPHEADER,array("REMOTE_ADDR: $ipa", "HTTP_X_FORWARDED_FOR: $ipa"));
      $r=curl_exec($c); $e=null; if(!$r){$x=curl_error($c); if($x){$e=$x;};}; curl_close($c);
      if($e){return "FAIL :: $e";}; return $r;
   };
# ---------------------------------------------------------------------------------------------------------------------------------------------



# ---------------------------------------------------------------------------------------------------------------------------------------------
    if(isset($_POST['find']))
    {
        $what = $_POST['find'];
        $json = json_encode(spuf("https://www.lekkeslaap.co.za/akkommodasie/$what"));
        die($json);
    };

    $_SERVER['HALT']='1'; header("HTTP/1.1 200 OK"); header("Content-Type: text/html"); flush(); 
# ---------------------------------------------------------------------------------------------------------------------------------------------
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