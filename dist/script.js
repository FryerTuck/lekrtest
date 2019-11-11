"use strict";


// cond :: (tools) : only define some short-hand tools if missing
// ----------------------------------------------------------------------------------------------------------------------------
    if((typeof purl)=="undeined")
    {
        const MAIN = window; // super-global
        const VOID = (function(){}()); // undefined
    
        const bake = function(o,k,v)
        {
            if(!o||!o.hasOwnProperty){return}; if(v==VOID){v=o[k]};
            let c={enumerable:false,configurable:false,writable:false,value:v};
            let r=true; try{Object.defineProperty(o,k,c);}catch(e){r=false};
            return r;
        };
    
        const list = function(a){return ([].slice.call(a))};
        const dump = function(){console.log.apply(console,list(arguments))};
        
        const purl = function(p,d,f, x)
        {
            if((typeof d)!="string"){d=JSON.stringiy(d)};
            x=(new XMLHttpRequest()); x.open("POST",p); x.setRequestHeader("INTRFACE","API");
            x.onloadend=function(){f({head:{},body:this.response});}; 
            x.send(d);
        };
    };
// ----------------------------------------------------------------------------------------------------------------------------



// tool :: (imageSlide) : proto-method that mutate div-nodes into an image sliders
// ----------------------------------------------------------------------------------------------------------------------------
    bake(HTMLDivElement.prototype,"imageSlide",function()
    {
        this.args = list(arguments);
        dump(this.args);
    });
// ----------------------------------------------------------------------------------------------------------------------------


// init
// ----------------------------------------------------------------------------------------------------------------------------

    window.addEventListener('hashchange',function()
    {
        purl("/lekrtest/dist",{find:(location.hash+'').slice(1)},(resp)=>
        {
            dump(resp.body);
        });
    });
// ----------------------------------------------------------------------------------------------------------------------------
