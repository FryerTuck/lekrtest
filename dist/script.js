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
        var prnt,s,w,h; prnt=this.parentNode; this.dime=prnt.parentNode.getBoundingClientRect(); 
        this.dime.height+=14; s=a.length; w=this.dime.width; h=this.dime.height; prnt.info={kids:s,wide:w};
        this.innerHTML=""; this.parentNode.style.height=`${h}px`; 
        this.style.width=`${(w*s)}px`; this.style.height=`${h}px`;

        a.forEach((i,x)=>
        {
            let n=document.createElement("div"); n.className="face"; n.style.width=`${w}px`; n.style.height=`${h}px`;
            n.style.background=`url('${i}?fit=crop&w=${w}&h=${h}&bg=000000&auto=enhance,compress&q=80')`;
            n.id=`face${x}`; this.appendChild(n);
        });
        

        if(!prnt.grab)
        {
            prnt.grab=1; this.wait=null;
            prnt.addEventListener("scroll",function(e)
            {
                if(this.wait!==null){clearTimeout(this.wait)};
                this.wait=setTimeout(()=>
                {
                    let posi,indx; posi=this.scrollLeft; indx=Math.round(posi/this.info.wide);
                    posi=(indx*this.info.wide); this.scrollLeft=posi;
                },150);
            });
            
            MAIN.addEventListener("resize",function()
            {
                if(this.hold.wait!==null){clearTimeout(this.hold.wait)};
                this.hold.style.opacity=0; this.hold.wait=setTimeout(()=>
                {
                    let h=(location.hash+''); if(h.length<2){return}; load(h.slice(1));
                },250);
            }.bind({hold:prnt}));
        };

        document.getElementById("card").style.opacity=1;
        document.getElementById("busy").style.display='none';
    });
// ----------------------------------------------------------------------------------------------------------------------------



// func :: load : prepare & render speciied accommodation target
// ----------------------------------------------------------------------------------------------------------------------------
    const load = function(n)
    {
        document.getElementById("card").style.opacity=0;
        document.getElementById("busy").style.display='inline-block';

        purl("/lekrtest/dist/",{find:n},(resp)=>
        {
            resp=resp.body; if(!resp.startsWith("[")||!resp.endsWith("]")||(resp=="[]")){return};
            document.getElementById("span").preslide(JSON.parse(resp));
        });
    };
// ----------------------------------------------------------------------------------------------------------------------------



// init
// ----------------------------------------------------------------------------------------------------------------------------
    (function(t)
    {
        t=setInterval(()=>
        {
            let b=document.getElementById("card").getBoundingClientRect(); if(b.width<1){return;}; clearInterval(t);
            window.addEventListener('hashchange',function(){load((location.hash+'').slice(1));});
            let h=(location.hash+''); if(h.length<2){return}; load(h.slice(1));
        },1);
    }());
// ----------------------------------------------------------------------------------------------------------------------------
