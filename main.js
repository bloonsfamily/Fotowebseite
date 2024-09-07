fill_imlist();
var file_count=4;
current_sort=1;
const f=new Intl.DateTimeFormat("de",{dateStyle:"long"});
const r1=/^\s*/;
const r2=/\s{2,}/g
imda=[new Date("2023,11,13"),new Date("2023,11,15"),new Date("2023,11,17"),new Date("2023,11,19")];
imde=["s","t","k","z a k"];
imgs=[];
class image{
    constructor(f ,d,da){
        this.filename=f;
        this.description=d;
        this.date=da;
    }
}
function Search_includes(a,b){
    a1=a.toLowerCase()
    b1=b.replace(r1,"").replace(r2," ").toLowerCase();
    return a1.includes(b1);
}
function fill_imlist(){
    for (let i=0;i<file_count;i++){
        imgs.push(new image((i+1).toString(),imde[i],imda[i]));
    }
}
function open_filter_dropdown(){
    document.getElementById("dropdown_1").classList.toggle("show");
}
function open_sort_dropdown(){
    document.getElementById("dropdown_2").classList.toggle("show");
}

function set_sort(c){
    document.getElementById("b"+current_sort.toString()).innerHTML=document.getElementById("b"+current_sort.toString()).innerHTML.replace("✔","");
    current_sort=c
    document.getElementById("b"+c).innerHTML+="✔";
    if(c==1){
        imgs.sort((a,b)=>{return a.date-b.date;})
        document.getElementById("image_grid").innerHTML="";
        add_images("")
        return;
    }
    if(c==2){
        imgs.sort((a,b)=>{return b.date-a.date;})
        document.getElementById("image_grid").innerHTML="";
        add_images("")
        return;
    }
    if (c==3){
        imgs.sort((a,b)=>{
            if(a.description<b.description){return 1;}
            return -1;})
        document.getElementById("image_grid").innerHTML="";
        add_images("")
        return;
    }
    if (c==4){
        imgs.sort((a,b)=>{
            if(a.description<b.description){return -1;}
            return 1;})
        document.getElementById("image_grid").innerHTML="";
        add_images("")
        return;
    }

}
function add_images(s){
    for (let i=file_count-1; i>-1;i--){
        if(!(Search_includes(imgs[i].description,s))){continue}
        cont=document.createElement("div");
        cont.className="image_and_text";
        im=document.createElement("img");
        im.className="zoom";
        im.src="Bilder/"+imgs[i].filename+".JPG";
        im.loading="lazy";
        im.alt="";
        tn1=document.createTextNode("Beschreibung:"+imgs[i].description);
        tn2=document.createTextNode("Datum:"+f.format(imgs[i].date));
        tx=document.createElement("div");
        det=document.createElement("figcaption");
        datet=document.createElement("figcaption");
        det.className="image_text";
        datet.className="image_text";
        det.appendChild(tn1);
        datet.appendChild(tn2);
        tx.appendChild(det);
        tx.appendChild(datet);
        const element=document.getElementById("image_grid");
        cont.appendChild(im);
        cont.appendChild(tx);
        element.appendChild(cont);
    }
}
window.onclick = function(event) {
    if (!event.target.matches('.dropdown_btn')) {
      var dropdowns = document.getElementsByClassName("dropdown_content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  } 

fill_imlist()
add_images("")
document.getElementById("search").addEventListener("input", (e) =>
    {
        const value=e.target.value;
        document.getElementById("image_grid").innerHTML="";
        add_images(value)
    });

