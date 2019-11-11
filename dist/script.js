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



// tool :: (preslide) : proto-method that mutate div-nodes into image sliders
// ----------------------------------------------------------------------------------------------------------------------------
    bake(HTMLDivElement.prototype,"preslide",function(a)
    {
        a
    });
// ----------------------------------------------------------------------------------------------------------------------------



// unc :: load : prepare & render speciied accommodation target
// ----------------------------------------------------------------------------------------------------------------------------
    const load = function(n)
    {
        purl("/lekrtest/dist/",{find:n},(resp)=>
        {
            resp=resp.body; if(!resp.startsWith("[")||!resp.endsWith("]")||(resp=="[]")){return}; resp=JSON.parse(resp);
            document.getElementById("view");
        });
    };
// ----------------------------------------------------------------------------------------------------------------------------



// init
// ----------------------------------------------------------------------------------------------------------------------------
    (function()
    {
        window.addEventListener('hashchange',function(){load((location.hash+'').slice(1));});
        let h=(location.hash+''); if(h.length<2){return}; load(h.slice(1));
    }());
// ----------------------------------------------------------------------------------------------------------------------------
