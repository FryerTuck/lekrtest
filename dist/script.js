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
        this.style.display="none"; this.list=a; this.indx=0; this.innerHTML="";
        
        if(!this.touched)
        {
            this.touched={bgn:0,end:0};
            this.addEventListener('touchstart',function(e){this.touched.bgn=e.changedTouches[0].screenX});
            this.addEventListener('touchend',function(e)
            {
                let d; this.touched.end=e.changedTouches[0].screenX;
                if(this.touched.end < this.touched.bgn){d="<"};
            });
        };

        document.getElementById("view").style.display='inline-block';
        document.getElementById("busy").style.display='none';
    });
// ----------------------------------------------------------------------------------------------------------------------------



// unc :: load : prepare & render speciied accommodation target
// ----------------------------------------------------------------------------------------------------------------------------
    const load = function(n)
    {
        document.getElementById("view").style.display='none';
        document.getElementById("busy").style.display='inline-block';

        purl("/lekrtest/dist/",{find:n},(resp)=>
        {
            resp=resp.body; if(!resp.startsWith("[")||!resp.endsWith("]")||(resp=="[]")){return};
            document.getElementById("view").preslide(JSON.parse(resp));
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
