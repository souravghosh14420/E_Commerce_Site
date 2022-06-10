const str=document.getElementById(`vendor`).value;
const email=document.getElementById(`email`).value;
const obj=JSON.parse(str);

// console.log(obj);
// console.log(typeof obj);

let ser=document.getElementById(`services`);
console.log(ser);
let newArr=obj.map((cval) =>{
    if("Pending".localeCompare(cval.status)==0)
    {
        console.log(cval.status);
        let elem=document.createElement(`div`);
        elem.className=`box`;

        const image=`${cval.item}`;
        console.log(image);
        let img=document.createElement(`div`);
        let imgimg=document.createElement(`img`);
        imgimg.src=`image/${image}.jpg`;
        imgimg.alt=`${cval.item}`;
        img.appendChild(imgimg);
        console.log(img);

        let body=document.createElement(`div`);
        let p1=document.createElement(`p`);
        let p2=document.createElement(`p`);
        let p3=document.createElement(`p`);
        let p4=document.createElement(`p`);
        let p5=document.createElement(`p`);
        let p6=document.createElement(`p`);

        p1.className=`center`;
        let h=document.createElement(`h5`);
        h.style=`text-decoration: underline;`;
        let text=document.createTextNode(`Name of item : `);
        h.appendChild(text);
        p1.appendChild(h);
        let temp=`${cval.item}`;
        text=document.createTextNode(temp);
        p1.appendChild(text);

        p2.className=`center`;
        h=document.createElement(`h5`);
        h.style=`text-decoration: underline;`;
        text=document.createTextNode(`Name of buyer : `);
        h.appendChild(text);
        p2.appendChild(h);
        temp=`${cval.fname} ${cval.fname}`;
        text=document.createTextNode(temp);
        p2.appendChild(text);

        p3.className=`center`;
        h=document.createElement(`h5`);
        h.style=`text-decoration: underline;`;
        text=document.createTextNode(`Order Id : `);
        h.appendChild(text);
        p3.appendChild(h);
        temp=`${cval.orderId}`;
        text=document.createTextNode(temp);
        p3.appendChild(text);

        p4.className=`center`;
        h=document.createElement(`h5`);
        h.style=`text-decoration: underline;`;
        text=document.createTextNode(`Quantity : `);
        h.appendChild(text);
        p4.appendChild(h);
        temp=`${cval.quantity}`;
        text=document.createTextNode(temp);
        p4.appendChild(text);

        p5.className=`center`;
        h=document.createElement(`h5`);
        h.style=`text-decoration: underline;`;
        text=document.createTextNode(`Address : `);
        h.appendChild(text);
        p5.appendChild(h);
        temp=`${cval.address}`;
        text=document.createTextNode(temp);
        p5.appendChild(text);

        p6.className=`center`;
        h=document.createElement(`h5`);
        h.style=`text-decoration: underline;`;
        text=document.createTextNode(`Contact No. : `);
        h.appendChild(text);
        p6.appendChild(h);
        temp=`${cval.contact}`;
        text=document.createTextNode(temp);
        p6.appendChild(text);

        body.appendChild(p1);
        body.appendChild(p2);
        body.appendChild(p3);
        body.appendChild(p4);
        body.appendChild(p5);
        body.appendChild(p6);

        let button=document.createElement(`div`);
        button.className=`order`;
        let fr=document.createElement(`form`);
        fr.action=`/arrange`;
        fr.method=`post`;
        let i1=document.createElement(`input`);
        i1.type="hidden";
        i1.name="email";
        i1.value=`${email}`;

        let i2=document.createElement(`input`);
        i2.type="hidden";
        i2.name="orderId";
        i2.value=`${cval.orderId}`;

        let btn=document.createElement(`input`);
        btn.className=`btn`;
        btn.type="submit";
        btn.value=`delivered`;

        fr.appendChild(i1);
        fr.appendChild(i2);
        fr.appendChild(btn);

        button.appendChild(fr);

        elem.appendChild(img);
        elem.appendChild(body);
        elem.appendChild(button);

        console.log(elem);

        ser.appendChild(elem);
        console.log(ser);
    }
});