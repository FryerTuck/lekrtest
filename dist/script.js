"use strict";


// defn :: (contants) : shortands to compliment DRY coding principle
// ----------------------------------------------------------------------------------------------------------------------------
    const MAIN = window; // super-global
    const VOID = (function(){}()); // undefined
// ----------------------------------------------------------------------------------------------------------------------------



// func :: bake : define hardened properties
// ----------------------------------------------------------------------------------------------------------------------------
    const bake = function(o,k,v)
    {
        if(!o||!o.hasOwnProperty){return}; if(v==VOID){v=o[k]};
        let c={enumerable:false,configurable:false,writable:false,value:v};
        let r=true; try{Object.defineProperty(o,k,c);}catch(e){r=false};
        return r;
    };
// ----------------------------------------------------------------------------------------------------------------------------



// tool :: (imageSlide) : proto-method that mutate containers into an image slider
// ----------------------------------------------------------------------------------------------------------------------------
    bake(HTMLDivElement.prototype,"imageSlide",function()
    {
        this.args = [].slice.call(arguments);
        
    });
// ----------------------------------------------------------------------------------------------------------------------------
