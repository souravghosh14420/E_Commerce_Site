const str=document.getElementById(`list`).value;
const uEmail=document.getElementById(`uEmail`).value;
const item=document.getElementById(`item`).value;
const obj=JSON.parse(str);

let index=0;

if("oil".localeCompare(`${item}`)==0)
        index=1;
else if("copy".localeCompare(`${item}`)==0)
        index=1;
else if("biscuit".localeCompare(`${item}`)==0)
        index=2;
else if("pen".localeCompare(`${item}`)==0)
        index=3;
else if("rice".localeCompare(`${item}`)==0)
        index=4;
else
        index=5;

        console.log(index);

let ser=document.getElementById(`services`);

let newArr=obj.map((cval) =>{
        // console.log(cval.item[index].quantity);
        if(cval.item[index].quantity>0)
        {
                let elem=document.createElement(`div`);
        elem.className=`box`;

        const image=`${cval.item}`;
        let img=document.createElement(`div`);
        let imgimg=document.createElement(`img`);
        imgimg.src=`image/oil.jpg`;
        imgimg.alt=`oil`;
        img.appendChild(imgimg);

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
        let text=document.createTextNode(`Name of shop : `);
        h.appendChild(text);
        p1.appendChild(h);
        let temp=`${cval.shop}`;
        text=document.createTextNode(temp);
        p1.appendChild(text);

        p2.className=`center`;
        h=document.createElement(`h5`);
        h.style=`text-decoration: underline;`;
        text=document.createTextNode(`Name of shop owner : `);
        h.appendChild(text);
        p2.appendChild(h);
        temp=`${cval.fname} ${cval.lname}`;
        text=document.createTextNode(temp);
        p2.appendChild(text);

        p3.className=`center`;
        h=document.createElement(`h5`);
        h.style=`text-decoration: underline;`;
        text=document.createTextNode(`Address of shop : `);
        h.appendChild(text);
        p3.appendChild(h);
        temp=`${cval.address}`;
        text=document.createTextNode(temp);
        p3.appendChild(text);

        p4.className=`center`;
        h=document.createElement(`h5`);
        h.style=`text-decoration: underline;`;
        text=document.createTextNode(`Contact Number : `);
        h.appendChild(text);
        p4.appendChild(h);
        temp=`${cval.ph}`;
        text=document.createTextNode(temp);
        p4.appendChild(text);

        p5.className=`center`;
        h=document.createElement(`h5`);
        h.style=`text-decoration: underline;`;
        text=document.createTextNode(`Number of packets left : `);
        h.appendChild(text);
        p5.appendChild(h);
        temp=`${cval.item[index].quantity}`;
        text=document.createTextNode(temp);
        p5.appendChild(text);

        p6.className=`center`;
        h=document.createElement(`h5`);
        h.style=`text-decoration: underline;`;
        text=document.createTextNode(`Price : `);
        h.appendChild(text);
        p6.appendChild(h);
        temp=`${cval.item[index].price}`;
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
        fr.action=`/placeOrder`;
        fr.method=`post`;
        let i1=document.createElement(`input`);
        i1.type="hidden";
        i1.name="uEmail";
        i1.value=`${uEmail}`;

        let i2=document.createElement(`input`);
        i2.type="hidden";
        i2.name="item";
        i2.value=`${item}`;

        let i3=document.createElement(`input`);
        i3.type="hidden";
        i3.name="shop";
        i3.value=`${cval.email}`;

        let i4=document.createElement(`input`);
        i4.type="hidden";
        i4.name="quantity";
        i4.value=`${cval.item[index].quantity}`;

        let i5=document.createElement(`input`);
        i5.type="hidden";
        i5.name="price";
        i5.value=`${cval.item[index].price}`;

        let btn=document.createElement(`input`);
        btn.className=`btn`;
        btn.type="submit";
        btn.value=`Order`;

        fr.appendChild(i1);
        fr.appendChild(i2);
        fr.appendChild(i3);
        fr.appendChild(i4);
        fr.appendChild(i5);
        fr.appendChild(btn);

        button.appendChild(fr);

        elem.appendChild(img);
        elem.appendChild(body);
        elem.appendChild(button);

        ser.appendChild(elem);
}

});