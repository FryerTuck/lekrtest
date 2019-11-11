<?php ob_start(); ?>
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
<?php

$html = ob_get_clean();


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
      if(!is_string($uri)){return;}; if(strpos($uri,'http')===false){return;}; $ipa=envi('USERADDR');
      if(!$uas){$uas=envi('USER_AGENT');}; if(!$ref){$ref=envi('REFERER'); if(!$ref){$ref='http://example.com/index.html';}};
      $o=array(CURLOPT_RETURNTRANSFER=>1,CURLOPT_SSL_VERIFYPEER=>false,CURLOPT_URL=>$uri,CURLOPT_USERAGENT=>$uas,CURLOPT_REFERER=>$ref);
      $c=curl_init(); curl_setopt_array($c,$o); curl_setopt($c,CURLOPT_HTTPHEADER,array("REMOTE_ADDR: $ipa", "HTTP_X_FORWARDED_FOR: $ipa"));
      $r=curl_exec($c); $e=null; if(!$r){$x=curl_error($c); if($x){$e=$x;};}; curl_close($c);
      if($e){return "FAIL :: $e";}; return $r;
   };
# ---------------------------------------------------------------------------------------------------------------------------------------------



# func :: indx : `mb_strpos()` short-hand that does not throw errors
# ---------------------------------------------------------------------------------------------------------------------------------------------
   function indx($h,$n,$p=0)
   {
       if(!isset($h[$p])){return;}; $i=mb_strpos($h,$n,$p); return(($i===false)?null:$i);
   }
# ---------------------------------------------------------------------------------------------------------------------------------------------



# func :: expo : extract strings between strings, returns list of extracted strings
# ---------------------------------------------------------------------------------------------------------------------------------------------
   function expo($t,$b,$e)
   {
      if(!is_string($t)||!is_string($b)||!is_string($e)||(mb_strpos($t,$b)===false)||(mb_strpos($t,$e)===false)){return;};
      $r=[]; $m=mb_strlen($b); $n=mb_strlen($e);
      do
      {
         $a=indx($t,$b,0); $i=($a+$m); $i++; $z=indx($t,$e,$i);
         if(($a===null)||($z===null)){break;}; $z+=$n; $x=mb_substr($t,($a+$m),($z-$a));
         $r[]=mb_substr($x,0,mb_strpos($x,$e)); $t=mb_substr($t,$z); if($x===false){break;};
      }
      while($t); return $r;
   }
# ---------------------------------------------------------------------------------------------------------------------------------------------



# ---------------------------------------------------------------------------------------------------------------------------------------------
    if(isset($_POST['find']))
    {
        $what = $_POST['find'];
        $html = spuf("https://www.lekkeslaap.co.za/akkommodasie/$what");
        $html = explode("<div class='swiper-wrapper' ",$html)[1]; $html=explode('      ',$html)[1];
        $html = str_replace('<div class="swiper-lazy-preloader"></div>','',trim($html));
        $html = expo($html,'data-src="','?fit='); print_r($html); exit;
        $list = [];
        $json = json_encode($list);
        die($json);
    };

    if(!envi('INTRFACE')){die($html);}; $_SERVER['HALT']='true'; 

    if(envi('INTRFACE')==='API')
    {
        header("HTTP/1.1 200 OK"); header("Content-Type: text/html"); flush();
        echo $html;
    };
# ---------------------------------------------------------------------------------------------------------------------------------------------
?>
