"use strict";

// cond :: (tools) : only define some short-hand tools if missing
// ----------------------------------------------------------------------------------------------------------------------------
    if((typeof dump)=="undeined")
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
    
        const list = function(a)
        {return ([].slice.call(a))};
    
        const dump = function()
        {console.log.apply(console,list(arguments))};
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
    alert('oloz');
// ----------------------------------------------------------------------------------------------------------------------------
