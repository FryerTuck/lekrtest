
// func :: isModern : detect modern browser .. requeries call-back as only argument -which expects a boolean argument
// --------------------------------------------------------------------------------------------------------------------------------------------
    window.isModern=function(cb)
    {
        var x='(function(){class ಠ extends Array{constructor(j=`a`,...c){const q=(({u:e})=>{return {[`${c}`]:Symbol(j)};})({});'+
        'super(j,q,...c)}}new Promise(f=>{const a=function*(){return "\u{20BB7}".match(/./u)[0].length===2||!0};for (let z of a())'+
        '{const [x,y,w,k]=[new Set(),new WeakSet(),new Map(),new WeakMap()];break}f(new Proxy({},{get:(h,i)=>i in h ?h[i]:"j".repeat'+
        '(0o2)}))}).then(t=>new ಠ(t.d)); if(!navigator.storage||!navigator.storage.estimate){throw "!"}; let n=document.createElement'+
        '("canvas"); let g=(!!n.getContext?(n.getContext("webgl")||n.getContext("experimental-webgl")):null); if(!g||!(g instanceof '+
        'WebGLRenderingContext)){throw "!"}; if(btoa("jz\'")!=="anon"){throw "!"};})();';
        
        if(!window.addEventListener){cb(false);return;}; var n=document.createElement('script'); n.ondone=function(event,s)
        {
            s=this; if(s.done){window.removeEventListener('error',s.ondone,true); if(s.parentNode){s.parentNode.removeChild(s)}; return};
            this.done=1; cb(((event&&event.error)?false:true));
        };
        
        window.addEventListener('error',n.ondone,true); n.appendChild(document.createTextNode(x));
        n.id='dbug'; document.head.appendChild(n); setTimeout(n.ondone,1);
    };
// --------------------------------------------------------------------------------------------------------------------------------------------


