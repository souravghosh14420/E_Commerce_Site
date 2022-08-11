const x=document.getElementById("vendor-register");
        const y=document.getElementById("user-register");
        const z=document.getElementById("btn");
        const m=document.getElementById("main");
        const s=document.getElementById("shutter");
        function user()
        {
            y.style.left="0px";
            z.style.left="500px";
            x.style.visibility="hidden";
            y.style.visibility="visible";
            m.style.height="890px";
            s.style.position="relative";
            s.style.top="-800px";
            x.style.top="-800px";
        }
        function vendor(){
            x.style.left="0px";
            y.style.left="300px";
            z.style.left="0px";
            y.style.visibility="hidden";
            x.style.visibility="visible";
            m.style.height="1800px";
            s.style.position="relative";
            s.style.top="0px";
            x.style.top="0px";
        }