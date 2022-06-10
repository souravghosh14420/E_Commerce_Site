const list=JSON.parse(document.getElementById(`info`).value);
const image=document.getElementById(`profileImage`);
const person=document.getElementById(`person`).value;
const hide1=document.getElementById(`hide1`);
const hide2=document.getElementById(`hide2`);

if(person==="u")
{
    hide1.style.display="none";
    hide2.style.display="none";
    const im=document.createElement(`img`);
    im.src=`userImage/${list.image}`;
    image.appendChild(im);

}
else{
    const im=document.createElement(`img`);
    im.src=`vendorImage/${list.image}`;
    image.appendChild(im);
}


let ser=document.getElementById(`services`);
const arr=list.order;

let newArr=arr.map((cval)=>{
    let elem=document.createElement(`div`);
    elem.className=`box`;

    const item=`${cval.item}`;
    let img=document.createElement(`div`);
    let imgimg=document.createElement(`img`);
    imgimg.src=`image/${item}.jpg`;
    imgimg.alt=`item`;
    img.appendChild(imgimg);

    let heading=document.createElement(`h2`);
    heading.classList.add("h-secondary","center");
    let x=item.toLocaleUpperCase();
    let text=document.createTextNode(`${x}`);
    heading.appendChild(text);

    let table=document.createElement(`table`);
    let r=document.createElement('tr');
    let c=document.createElement('td');
    let cv=document.createElement('td');
    c.classList.add("spaceList","bold");
    if(person==="u")
    {
    text=document.createTextNode(`Shop Name:`);
    c.appendChild(text);
    r.appendChild(c);
    cv=document.createElement('td');
    text=document.createTextNode(`${cval.sname}`);
    cv.appendChild(text);
    r.appendChild(cv);
    table.appendChild(r);
    }
    else{
        text=document.createTextNode(`Customer Name:`);
        c.appendChild(text);
        r.appendChild(c);
        c=document.createElement('td');
        text=document.createTextNode(`${cval.fname} ${cval.lname}`);
        c.appendChild(text);
        r.appendChild(c);
        table.appendChild(r);
    }

    r=document.createElement('tr');
    c=document.createElement('td');
    cv=document.createElement('td');
    c.classList.add("spaceList","bold");
    text=document.createTextNode(`quantity :`);
    c.appendChild(text);
    r.appendChild(c);
    text=document.createTextNode(`${cval.quantity}`);
    cv.appendChild(text);
    r.appendChild(cv);
    table.appendChild(r);

    r=document.createElement('tr');
    c=document.createElement('td');
    cv=document.createElement('td');
    c.classList.add("spaceList","bold");
    text=document.createTextNode(`Price :`);
    c.appendChild(text);
    r.appendChild(c);
    text=document.createTextNode(`Rs. ${cval.price}`);
    cv.appendChild(text);
    r.appendChild(cv);
    table.appendChild(r);

    r=document.createElement('tr');
    c=document.createElement('td');
    cv=document.createElement('td');
    c.classList.add("spaceList","bold");
    text=document.createTextNode(`Status :`);
    c.appendChild(text);
    r.appendChild(c);
    text=document.createTextNode(`${cval.status}`);
    cv.appendChild(text);
    r.appendChild(cv);
    table.appendChild(r);

    r=document.createElement('tr');
    c=document.createElement('td');
    cv=document.createElement('td');
    c.classList.add("spaceList","bold");
    text=document.createTextNode(`Contact No :`);
    c.appendChild(text);
    r.appendChild(c);
    text=document.createTextNode(`${cval.contact}`);
    cv.appendChild(text);
    r.appendChild(cv);
    table.appendChild(r);


    let button=document.createElement(`div`);
        button.className=`order`;
        let fr=document.createElement(`form`);
        fr.action=`/viewdetails`;
        fr.method=`post`;
        let i1=document.createElement(`input`);
        i1.type="hidden";
        i1.name="orderId";
        i1.value=`${cval.orderId}`;

        let i2=document.createElement(`input`);
        i2.type="hidden";
        i2.name="person";
        if(person==="u")
        i2.value="u";
        else
        i2.value="v";

        // let i3=document.createElement(`input`);
        // i3.type="hidden";
        // i3.name="item";
        // i3.value=`${item}`;

        // let i4=document.createElement(`input`);
        // i4.type="hidden";
        // i4.name="quantity";
        // i4.value=`${cval.quantity}`;

        // let i5=document.createElement(`input`);
        // i5.type="hidden";
        // i5.name="status";
        // i5.value=`${cval.status}`;

        // let i6=document.createElement(`input`);
        // i6.type="hidden";
        // i6.name="address";
        // i6.value=`${cval.address}`;

        // let i7=document.createElement(`input`);
        // i7.type="hidden";
        // i7.name="dt";
        // i7.value=`${cval.dt}`;

        // let i8=document.createElement(`input`);
        // i8.type="hidden";
        // i8.name="contact";
        // i8.value=`${cval.contact}`;

        // let i9=document.createElement(`input`);
        // i9.type="hidden";
        // i9.name="price";
        // i9.value=`${cval.price}`;

        let btn=document.createElement(`input`);
        btn.className=`btn`;
        btn.type="submit";
        btn.value=`View Details`;

        fr.appendChild(i1);
        fr.appendChild(i2);
        // fr.appendChild(i3);
        // fr.appendChild(i4);
        // fr.appendChild(i5);
        // fr.appendChild(i6);
        // fr.appendChild(i7);
        // fr.appendChild(i8);
        // fr.appendChild(i9);
        fr.appendChild(btn);

        button.appendChild(fr);


    elem.appendChild(img);
    elem.appendChild(heading);
    elem.appendChild(table);
    elem.appendChild(button);

    ser.appendChild(elem);
});