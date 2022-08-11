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
        img.className="pic";
        let imgimg=document.createElement(`img`);
        imgimg.src=`image/${image}.jpg`;
        imgimg.alt=`${cval.item}`;
        img.appendChild(imgimg);
        let p=document.createElement(`p`);
        let t=document.createTextNode(`${cval.item}`);
        p.appendChild(t);
        p.classList.add("h-secondary","center");
        img.appendChild(p);
        console.log(img);

        let body=document.createElement(`div`);
        body.className="info";
        
        let p1=document.createElement(`p`);
        p1.classList.add("h-secondary","center");
        p1.style="text-decoration: underline;";
        let text=document.createTextNode(`Customer Details`);
        p1.appendChild(text);

        let table=document.createElement(`table`);
        table.id="info";

        let r=document.createElement('tr');
        let c=document.createElement('td');
        let cv=document.createElement('td');
        c.className="h-table";
        cv.className="value";
        text=document.createTextNode(`Customer Name : `);
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
        text=document.createTextNode(`Order Id : `);
        c.appendChild(text);
        r.appendChild(c);
        text=document.createTextNode(`${cval.orderId}`);
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
        text=document.createTextNode(`+91 ${cval.contact}`);
        cv.appendChild(text);
        r.appendChild(cv);
        table.appendChild(r);

        r=document.createElement('tr');
        c=document.createElement('td');
        cv=document.createElement('td');
        c.className="h-table";
        cv.className="value";
        let cvt=document.createElement('td');
        text=document.createTextNode(`Quantity : `);
        c.appendChild(text);
        r.appendChild(c);
        cvt.classList.add("value","space");
        text=document.createTextNode(`${cval.quantity}`);
        cvt.appendChild(text);
        r.appendChild(cvt);
        c=document.createElement('td');
        c.className="h-table";
        text=document.createTextNode(`Price : `);
        c.appendChild(text);
        r.appendChild(c);
        text=document.createTextNode(`Rs. ${cval.price}`);
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
        btn.value=`Delivered`;

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