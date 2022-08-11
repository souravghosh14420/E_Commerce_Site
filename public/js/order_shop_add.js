const str=document.getElementById(`list`).value;
const uEmail=document.getElementById(`uEmail`).value;
const item=document.getElementById(`item`).value;
const obj=JSON.parse(str);

let index=0;

if("oil".localeCompare(`${item}`)==0)
        index=0;
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
        img.className="pic";
        let imgimg=document.createElement(`img`);
        imgimg.src=`vendorImage/${cval.image}`;
        imgimg.alt=`${cval.image}`;
        img.appendChild(imgimg);

        let body=document.createElement(`div`);
        body.className="info";

        let p1=document.createElement(`p`);
        p1.classList.add("h-secondary","center");
        p1.style="text-decoration: underline;";
        let text=document.createTextNode(`${cval.shop}`);
        p1.appendChild(text);
        
        let table=document.createElement(`table`);
        table.id="info";
        
        let r=document.createElement('tr');
        let c=document.createElement('td');
        let cv=document.createElement('td');
        c.className="h-table";
        cv.className="value";
        text=document.createTextNode(`Shop Owner : `);
        c.appendChild(text);
        r.appendChild(c);
        text=document.createTextNode(`${cval.fname} ${cval.lname}`);
        cv.appendChild(text);
        r.appendChild(cv);
        table.appendChild(r);

        r=document.createElement('tr');
        c=document.createElement('td');
        cv=document.createElement('td');
        c.className="h-table";
        cv.className="value";
        text=document.createTextNode(`Contact No. : `);
        c.appendChild(text);
        r.appendChild(c);
        text=document.createTextNode(`+91 ${cval.ph}`);
        cv.appendChild(text);
        r.appendChild(cv);
        table.appendChild(r);
        
        r=document.createElement('tr');
        c=document.createElement('td');
        cv=document.createElement('td');
        c.className="h-table";
        cv.className="value";
        let cvt=document.createElement('td');
        text=document.createTextNode(`Packets left : `);
        c.appendChild(text);
        r.appendChild(c);
        cvt.classList.add("value","space");
        text=document.createTextNode(`${cval.item[index].quantity}`);
        cvt.appendChild(text);
        r.appendChild(cvt);
        c=document.createElement('td');
        c.className="h-table";
        text=document.createTextNode(`Price per packets : `);
        c.appendChild(text);
        r.appendChild(c);
        text=document.createTextNode(`${cval.item[index].price}`);
        cv.appendChild(text);
        r.appendChild(cv);
        table.appendChild(r);

        r=document.createElement('tr');
        c=document.createElement('td');
        cv=document.createElement('td');
        c.className="h-table";
        cv.className="value";
        text=document.createTextNode(`Address : `);
        c.appendChild(text);
        r.appendChild(c);
        text=document.createTextNode(`${cval.address}`);
        cv.appendChild(text);
        r.appendChild(cv);
        table.appendChild(r);


        body.appendChild(p1);
        body.appendChild(table);

        let button=document.createElement(`div`);
        button.className=`order`;
        let fr=document.createElement(`form`);
        fr.action=`/placeOrder`;
        fr.method=`post`;

        let i1=document.createElement(`input`);
        i1.type="hidden";
        i1.name="item";
        i1.value=`${item}`;

        let i2=document.createElement(`input`);
        i2.type="hidden";
        i2.name="shop";
        i2.value=`${cval.email}`;

        let i3=document.createElement(`input`);
        i3.type="hidden";
        i3.name="quantity";
        i3.value=`${cval.item[index].quantity}`;

        let i4=document.createElement(`input`);
        i4.type="hidden";
        i4.name="price";
        i4.value=`${cval.item[index].price}`;

        let btn=document.createElement(`input`);
        btn.className=`btn`;
        btn.type="submit";
        btn.value=`Order`;

        fr.appendChild(i1);
        fr.appendChild(i2);
        fr.appendChild(i3);
        fr.appendChild(i4);
        fr.appendChild(btn);

        button.appendChild(fr);

        elem.appendChild(img);
        elem.appendChild(body);
        elem.appendChild(button);

        ser.appendChild(elem);
}

});