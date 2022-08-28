////////////////////////
////////////////////////
//     elements       //
////////////////////////
////////////////////////
let user = JSON.parse(localStorage.getItem("user"));
let meno_ekle,menolar,urun_ekle,urunler,qrcodes;


////////////////////////
////////////////////////
//      data load     //
////////////////////////
////////////////////////
let socket = io();
let menolar_data = [];
let urunler_data = [];
let qrcods_data = [];


// socket.emit("data_save",""+user.imail+user.lisens+"qrcodes","salam");
// console.log(user.imail+user.lisens);
socket.on("data_load",(database,data)=> {
    if (database == ""+user.imail+user.lisens+"menolar") {
        if(data != "") {
            menolar_data = JSON.parse(data);
        }
        console.log(menolar_data);
        paszamine_s.innerHTML = "";
        meno_ekle = new MenoEkle();
        menolar = new Menolar();
    }
    if (database == ""+user.imail+user.lisens+"urunler") {
        if(data != "") {
            urunler_data = JSON.parse(data);
        }
        console.log(urunler_data);
        paszamine_s.innerHTML = "";
        urun_ekle = new UrunEkle();
        urunler = new Urunler();
    }
    if (database == ""+user.imail+user.lisens+"qrcodes") {
        if(data != "") {
            qrcods_data = JSON.parse(data);
        }
        console.log(qrcods_data);
        paszamine_s.innerHTML = "";
        qrcodes = new QrCodEkle();
    }
})



////////////////////////
////////////////////////
//   paszamine        //
////////////////////////
////////////////////////
let paszamine = CratePaszamine();
window.addEventListener("resize", ()=> {
    paszamine = CratePaszamine();
})
function CratePaszamine() {
    let paszamine = CrateElement("div");
    paszamine.style.width = innerWidth + "px";
    paszamine.style.height = innerHeight + "px";
    document.getElementById("body").appendChild(paszamine);
    return paszamine;
}
////////////////////////
////////////////////////
//    acharfaranse    //
////////////////////////
////////////////////////
function araye_element_remove(element,id,method) {
    let data = [];
    let sira = 1;
    
        element.forEach(e => {
            if (Number(e[method]) !== Number(id)) {
                let e_ = e;
                e_.id = sira;
                data.push(e_);
                sira++
            }
        });
    return data;
}
function SerchId(id,element) {
    let data;
    element.forEach(e => {
        if (e.id == id) {
            data = e;
        }
    });
    return data
}
function ID_ara(element) {
    let id;
    if(element.length > 0) {
        id = Number(element[element.length-1].id)+1;
    }else {
        id = 1;
    }
    return id;
}
let colors = {
    c_1: "#906A50",
    c_2: "#E5B480",
    c_3: "#4DDDE0",
    c_4: "#ADEBF0"
}
function CrateElement(name = "", inerhtml = "", id = "", clas = "", type = "") {
    let element = document.createElement(name);
    if (inerhtml !== "") {
        element.innerHTML = inerhtml;
    }
    if (id !== "") {
        element.id = id;
    }
    if (clas !== "") {
        element.className = clas;
    }
    if (type !== "") {
        element.type = type;
    }
    return element;
}
function AndazeBaraks (a,b) {
    let andaze;
    if (innerWidth > innerHeight) {
        andaze = (innerHeight / 100) * a ;
    }
    if ( innerHeight > innerWidth) {
        andaze = (innerWidth / 100) * b ;
    }
    return andaze;
}

function filter(element) {
    let filter1 = element.replace("px","");
    return filter1;
}

///////////////////////
////////////////////////
//    navar abzar    //
////////////////////////
////////////////////////
let navarabzar;
function NavarAbzar() {
    function Abzar(name) {
        let icon = CrateElement("span",name,"","material-symbols-rounded");
        icon.style.cssText = "font-size: "+AndazeBaraks(10,15)+"px;color: "+colors.c_4+";margin-left: 10%;margin-top: "+AndazeBaraks(5,10)+"px;margin-bottom: "+AndazeBaraks(5,10)+"px;";
        return icon;
    }
    this.paszamine = CrateElement("div");
    this.paszamine.style.cssText = "width: "+AndazeBaraks(15,20)+"px;height: 100%;background-color: "+colors.c_1+";"
    this.home = Abzar("home");
    this.meno_add = Abzar("format_list_bulleted_add");
    this.users = Abzar("group");
    this.kasa = Abzar("currency_exchange");
    this.qrcodes = Abzar("qr_code_2");
    this.meno_add.addEventListener("click",()=> {
        socket.emit("data_load",""+user.imail+user.lisens+"menolar");
    })
    this.qrcodes.addEventListener("click",()=> {
        socket.emit("data_load",""+user.imail+user.lisens+"qrcodes");
    })
    this.Crate();
}
NavarAbzar.prototype.Crate = function() {
    paszamine.appendChild(this.paszamine);
    this.paszamine.appendChild(this.home);
    this.paszamine.appendChild(this.meno_add);
    this.paszamine.appendChild(this.users);
    this.paszamine.appendChild(this.kasa);
    this.paszamine.appendChild(this.qrcodes);
}
navarabzar = new NavarAbzar();
///////////////////////
////////////////////////
//paszamine sanaviye  //
////////////////////////
////////////////////////
let paszamine_s = CrateElement("div");
paszamine_s.style.cssText = "position: absolute;width: "+(innerWidth-filter(navarabzar.paszamine.style.width))+"px;height: 100%;left: "+filter(navarabzar.paszamine.style.width)+"px;top: 0px;background-color: "+colors.c_2+";"
document.getElementById("body").appendChild(paszamine_s);
///////////////////////
////////////////////////
//      menolar       //
////////////////////////
////////////////////////
function MenoEkle () {
    this.ekle_icon = CrateElement("span","add_circle","","material-symbols-rounded");
    this.ekle_icon.style.cssText = "top: 2%;position: absolute;font-size: "+AndazeBaraks(15,15)+"px;color: "+colors.c_4+"";
    this.m_add_paszamine = CrateElement("div","","m_add_paszamine");
    this.m_add_paszamine.style.cssText = "display: none;position: relative;width: 100%;height: 100%;background-color: rgba(255, 255, 255, 0.549);"
    this.m_add_paszamine_s = CrateElement("form","","m_add_paszamine_s");
    this.m_add_paszamine_s.style.cssText = "position: relative;float: left;width: 90%;height: 40vw;background-color: #adebf000;margin-left: 5%;margin-top: 20%;",
    this.text = CrateElement("input","","m_add_text","","text");
    this.text.style.cssText = " position: absolute;font-size: 5vw;width: 98%;height: 12vw;border: solid .5vw "+colors.c_4+";padding: .2vw;background-color: "+colors.c_1+";color: "+colors.c_3+";top: 14vw;";
    this.text.setAttribute("placeholder","Meno Name:........");
    this.text.setAttribute("maxlength","20");
    this.file = CrateElement("input","","add_meno_file","","file");
    this.lable = CrateElement("lable","","m_add_lable");
    this.lable.setAttribute("for","add_meno_file");
    this.lable.style.cssText = " position: absolute;width: 100%;height: 12vw;background-color: "+colors.c_1+";";
    this.uploding = CrateElement("div","");
    this.uploding.style.cssText = " position: absolute;width: 0%;height: 12vw;background-color: "+colors.c_4+";";
    this.icon = CrateElement("span","add_photo_alternate","m_add_icon","material-symbols-rounded");
    this.icon.style.cssText = "position: absolute;font-size: 12vw;color: "+colors.c_4+";margin-left: 40%;";
    this.button = CrateElement("input","","m_add_button","","button");
    this.button.value = "save";
    this.button.style.cssText = " position: absolute;width: 100%;height: 13vw;background-color: "+colors.c_1+";color: "+colors.c_4+";font-size: 6vw;border: solid .5vw "+colors.c_4+";top: 30vw;";
    
    this.Crate();
    this.ekle_icon.style.left = ((paszamine_s.getBoundingClientRect().width/2)-(this.ekle_icon.getBoundingClientRect().width/2))+"px"
    this.m_add_paszamine_s.style.marginTop = this.ekle_icon.getBoundingClientRect().height*2+"px";
    this.m_add_paszamine_s.style.height = AndazeBaraks(90,70)-this.ekle_icon.getBoundingClientRect().height*2+"px";

    this.lable.addEventListener("click",(e)=> {
        this.file.click();
    })
    this.m_add_paszamine.addEventListener("touchend",(e)=> {
        e.stopPropagation();
        if (e.changedTouches[0].pageY < this.m_add_paszamine_s.getBoundingClientRect().y || e.changedTouches[0].pageY > this.m_add_paszamine_s.getBoundingClientRect().y+this.m_add_paszamine_s.getBoundingClientRect().height*1.5) {
            this.m_add_paszamine.style.display = "none";
        }
    })
    this.ekle_icon.addEventListener("click",(e)=> {
        e.stopPropagation();
        this.m_add_paszamine.style.display = "flex";
    })
    this.file.addEventListener("change",(e) => {
        let data = new FormData();
        data.append("image",this.file.files[0]);
        let http = new XMLHttpRequest();
        http.open("POST","/upload_image",true);
        http.upload.addEventListener("progress",({loaded,total}) => {
            let fileloaded = Math.floor(loaded/total*100);
            let totall = Math.floor(total*1000);
            this.uploding.style.width = fileloaded + "%";
            this.icon.style.color = colors.c_1;
            console.log(fileloaded,totall)
        })
        http.send(data);
    })
    this.button.addEventListener("click",(e)=> {
        e.stopPropagation();
        if (this.file.files.length > 0 && this.text.value !== "") {
            menolar_data.push({id: ID_ara(menolar_data),meno_name: this.text.value,img: this.file.files[0].name});
            socket.emit("data_save",""+user.imail+user.lisens+"menolar",JSON.stringify(menolar_data));
            this.m_add_paszamine.style.display = "none";
        }
       
    })
}
MenoEkle.prototype.Crate = function() {
    paszamine_s.appendChild(this.ekle_icon);
    paszamine_s.appendChild(this.m_add_paszamine);
    this.m_add_paszamine.appendChild(this.m_add_paszamine_s);
    this.m_add_paszamine_s.appendChild(this.file);
    this.m_add_paszamine_s.appendChild(this.lable);
    this.m_add_paszamine_s.appendChild(this.text);
    this.m_add_paszamine_s.appendChild(this.button);
    this.lable.appendChild(this.uploding);
    this.lable.appendChild(this.icon);
}
function Meno(id_,name_,img_) {
    this.id = id_;
    this.edit =  this.ekle_icon = CrateElement("span","edit","","material-symbols-rounded");
    this.edit.style.cssText = " left: 3%;top: 67%;position: absolute;font-size: 8vw;background-color: "+colors.c_2+";color: "+colors.c_4+";border-radius: 10vw;border: solid 1vw "+colors.c_3+";padding: 1vw;";
    this.paszamine = CrateElement("div","","meno_div");
    this.img = CrateElement("img","","meno_img");
    this.img.src = "./images/"+img_;
    this.h1_div = CrateElement("div","","meno_h1_div");
    this.h1 = CrateElement("h1",name_,"meno_h1");
    this.h1.style.color = colors.c_3;
    this.paszamine.appendChild(this.edit);
    this.paszamine.appendChild(this.img);
    this.paszamine.appendChild(this.h1_div);
    this.h1_div.appendChild(this.h1);
    this.paszamine.addEventListener("click",()=> {
        localStorage.setItem("meno_id",this.id);
        socket.emit("data_load",""+user.imail+user.lisens+"urunler");
    })
    this.edit.addEventListener("click",(e) => {
        e.stopPropagation();
        paszamine_s.innerHTML = "";
        localStorage.setItem("meno_id",this.id);
        console.log(this.id);
        meno_ekle = new Menoedit(SerchId(this.id,menolar_data));
    })
}
function Menolar() {
    this.paszamine = CrateElement("div","","menolar_paszamine");
    
    this.meno = [];
    menolar_data.forEach(e => {
        this.meno.push(new Meno(e.id,e.meno_name,e.img));
    });
    this.Crate();
    this.meno.forEach(e => {
        e.paszamine.style.height = "40vw";
        e.h1_div.style.top = ((e.paszamine.getBoundingClientRect().height/2)-(e.h1_div.getBoundingClientRect().height/2))+"px";
    });
    this.paszamine.style.cssText = " width: 100%;margin-top: "+(meno_ekle.ekle_icon.getBoundingClientRect().y+meno_ekle.ekle_icon.getBoundingClientRect().height)*1.3+"px;overflow-y: scroll;"
    this.paszamine.style.height = innerHeight-this.paszamine.getBoundingClientRect().y+"px";
    
}
Menolar.prototype.Crate = function() {
    paszamine_s.appendChild(this.paszamine);
    this.meno.forEach(element => {
        this.paszamine.appendChild(element.paszamine);
        
    });
}

function Menoedit (data) {
    this.imgsrc = data.img;
    this.m_add_paszamine = CrateElement("div","","m_add_paszamine");
    this.m_add_paszamine.style.background = "url("+data.img+")";
    this.m_add_paszamine.style.objectFit = "cover";
    this.m_add_paszamine.style.cssText = "position: relative;width: 100%;height: 100%;background-color: rgba(255, 255, 255, 0.549);"
    this.m_add_paszamine_s = CrateElement("form","","m_add_paszamine_s");
    this.m_add_paszamine_s.style.cssText = "position: relative;float: left;width: 90%;height: auto;background-color: #adebf000;margin-left: 5%;margin-top: 20%;",

    this.delete = CrateElement("input","","delete","","button");
    this.delete.value = "Delete";
    ////// urun adi
    this.text = CrateElement("input","","m_add_text","","text");
    this.text.value = data.meno_name;
    this.text.style.cssText = "font-size: 5vw;width: 98%;height: 12vw;border: solid .5vw "+colors.c_4+";padding: .2vw;background-color: "+colors.c_1+";color: "+colors.c_3+";margin-top: 14vw;";
    this.text.setAttribute("placeholder","Prodoct Name:........");
    this.text.setAttribute("maxlength","20");

    this.file = CrateElement("input","","add_meno_file","","file");
    this.lable = CrateElement("lable","","m_add_lable");
    this.lable.setAttribute("for","add_meno_file");
    this.lable.style.cssText = " position: absolute;width: 100%;height: 12vw;background-color: "+colors.c_1+";";
    this.uploding = CrateElement("div","");
    this.uploding.style.cssText = " position: absolute;width: 0%;height: 12vw;background-color: "+colors.c_4+";";
    this.icon = CrateElement("span","add_photo_alternate","m_add_icon","material-symbols-rounded");
    this.icon.style.cssText = "position:absolute;font-size: 12vw;color: "+colors.c_4+";margin-left: 40%;";
    this.button = CrateElement("input","","m_add_button","","button");
    this.button.value = "save";
    this.button.style.cssText = "width: 100%;height: 13vw;background-color: "+colors.c_1+";color: "+colors.c_4+";font-size: 6vw;border: solid .5vw "+colors.c_4+";margin-top: 1vw;";
    
    this.Crate();
    this.m_add_paszamine_s.style.marginTop = innerHeight/3+"px";
    this.m_add_paszamine_s.style.height = AndazeBaraks(90,70)-innerHeight/3+"px";

    this.lable.addEventListener("click",(e)=> {
        this.file.click();
    })
    this.delete.addEventListener("click",(e)=> {
        e.stopPropagation();
        let id = localStorage.getItem("meno_id");
        menolar_data = araye_element_remove(menolar_data,id,"id");
        urunler_data = araye_element_remove(urunler_data,id,"meno_id")
        socket.emit("data_save",""+user.imail+user.lisens+"urunler",JSON.stringify(urunler_data));
        socket.emit("data_save",""+user.imail+user.lisens+"menolar",JSON.stringify(menolar_data));
    })
    this.file.addEventListener("change",()=>{
        let data = new FormData();
            data.append("image",this.file.files[0]);
            let http = new XMLHttpRequest();
            http.open("POST","/upload_image",true);
            http.upload.addEventListener("progress",({loaded,total})=> {
                let filelaoded = Math.floor(loaded/total*100);
                this.uploding.style.width = filelaoded +"%";
                this.icon.style.color = colors.c_1;
            })
            http.send(data);
            

    })
   
    this.button.addEventListener("click",(e)=> {
        e.stopPropagation();
        
        let sira = 0;
        menolar_data.forEach(e => {
            
            if(Number(e.id) == Number(localStorage.getItem("meno_id"))&& this.file.files.length < 1) {
                menolar_data[sira] = {id: e.id,meno_name: this.text.value,img: this.imgsrc}

                console.log(e);
            }
            if(Number(e.id) == Number(localStorage.getItem("meno_id"))&& this.file.files.length > 0) {
                menolar_data[sira]  = {id: e.id,meno_name: this.text.value,img: this.file.files[0].name};
            }
            sira++;
        });
        socket.emit("data_save",""+user.imail+user.lisens+"menolar",JSON.stringify(menolar_data));
        this.m_add_paszamine.style.display = "none";
        
    })
}
Menoedit.prototype.Crate = function() {
    paszamine_s.appendChild(this.m_add_paszamine);
    this.m_add_paszamine.appendChild(this.m_add_paszamine_s);
    this.m_add_paszamine_s.appendChild(this.delete);
    this.m_add_paszamine_s.appendChild(this.file);
    this.m_add_paszamine_s.appendChild(this.lable);
    this.m_add_paszamine_s.appendChild(this.text);
    this.m_add_paszamine_s.appendChild(this.button);
    this.lable.appendChild(this.uploding);
    this.lable.appendChild(this.icon);
}

///////////////////////
////////////////////////
//      urunler       //
////////////////////////
////////////////////////
function UrunEkle () {
    this.bak_icon = CrateElement("span","arrow_back_ios","","material-symbols-rounded");
    this.bak_icon.style.cssText = "top: 2%;position: absolute;font-size: "+AndazeBaraks(15,15)+"px;color: "+colors.c_4+"";
    this.ekle_icon = CrateElement("span","add_circle","","material-symbols-rounded");
    this.ekle_icon.style.cssText = "top: 2%;position: absolute;font-size: "+AndazeBaraks(15,15)+"px;color: "+colors.c_4+"";
    this.m_add_paszamine = CrateElement("div","","m_add_paszamine");
    this.m_add_paszamine.style.cssText = "display: none;position: relative;width: 100%;height: 100%;background-color: rgba(255, 255, 255, 0.549);"
    this.m_add_paszamine_s = CrateElement("form","","m_add_paszamine_s");
    this.m_add_paszamine_s.style.cssText = "position: relative;float: left;width: 90%;height: auto;background-color: #adebf000;margin-left: 5%;margin-top: 20%;",
    ////// urun adi
    this.text = CrateElement("input","","m_add_text","","text");
    this.text.style.cssText = "font-size: 5vw;width: 98%;height: 12vw;border: solid .5vw "+colors.c_4+";padding: .2vw;background-color: "+colors.c_1+";color: "+colors.c_3+";margin-top: 14vw;";
    this.text.setAttribute("placeholder","Prodoct Name:........");
    this.text.setAttribute("maxlength","20");
    ///// urun aciklama
    this.text_aciklama = CrateElement("input","","m_add_text","","text");
    this.text_aciklama.style.cssText = "font-size: 5vw;width: 98%;height: 12vw;border: solid .5vw "+colors.c_4+";padding: .2vw;background-color: "+colors.c_1+";color: "+colors.c_3+";margin-top: 1vw;";
    this.text_aciklama.setAttribute("placeholder","Prodoct Description:.....");
    ///// urun fiyat
    this.text_fiyat = CrateElement("input","","m_add_text","","text");
    this.text_fiyat.style.cssText = "font-size: 5vw;width: 98%;height: 12vw;border: solid .5vw "+colors.c_4+";padding: .2vw;background-color: "+colors.c_1+";color: "+colors.c_3+";margin-top: 1vw;";
    this.text_fiyat.setAttribute("placeholder","Price of the ptodoct:..");

    this.file = CrateElement("input","","add_meno_file","","file");
    this.lable = CrateElement("lable","","m_add_lable");
    this.lable.setAttribute("for","add_meno_file");
    this.lable.style.cssText = " position: absolute;width: 100%;height: 12vw;background-color: "+colors.c_1+";";
    this.uploding = CrateElement("div","");
    this.uploding.style.cssText = " position: absolute;width: 0%;height: 12vw;background-color: "+colors.c_4+";";
    this.icon = CrateElement("span","add_photo_alternate","m_add_icon","material-symbols-rounded");
    this.icon.style.cssText = "position: absolute;font-size: 12vw;color: "+colors.c_4+";margin-left: 40%;";
    this.button = CrateElement("input","","m_add_button","","button");
    this.button.value = "save";
    this.button.style.cssText = "width: 100%;height: 13vw;background-color: "+colors.c_1+";color: "+colors.c_4+";font-size: 6vw;border: solid .5vw "+colors.c_4+";margin-top: 1vw;";
    
    this.Crate();
    this.bak_icon.style.left = paszamine_s.getBoundingClientRect().width/10+"px"
    this.ekle_icon.style.left = ((paszamine_s.getBoundingClientRect().width/1.2)-(this.ekle_icon.getBoundingClientRect().width/2))+"px"
    this.m_add_paszamine_s.style.marginTop = this.ekle_icon.getBoundingClientRect().height*2+"px";
    this.m_add_paszamine_s.style.height = AndazeBaraks(90,70)-this.ekle_icon.getBoundingClientRect().height*2+"px";

    this.bak_icon.addEventListener("click",(e) => {
        e.stopPropagation();
        socket.emit("data_load",""+user.imail+user.lisens+"menolar");

    })
    this.lable.addEventListener("click",(e)=> {
        this.file.click();
    })
    this.m_add_paszamine.addEventListener("touchend",(e)=> {
        e.stopPropagation();
        if (e.changedTouches[0].pageY < this.m_add_paszamine_s.getBoundingClientRect().y || e.changedTouches[0].pageY > this.button.getBoundingClientRect().y+this.button.getBoundingClientRect().height*1.5) {
            this.m_add_paszamine.style.display = "none";
        }
    })
    this.ekle_icon.addEventListener("click",(e)=> {
        e.stopPropagation();
        this.m_add_paszamine.style.display = "flex";
    })
    this.file.addEventListener("change",(e)=> {
        let data = new FormData();
        data.append("image",this.file.files[0]);
        let http = new XMLHttpRequest();
        http.open("POST","/upload_image",true);
        http.upload.addEventListener("progress",({loaded,total})=> {
            let filelaoded = Math.floor(loaded/total*100);
            let totall = Math.floor(total/1000);
            this.uploding.style.width = filelaoded + "%";
            this.icon.style.color = colors.c_1;
        })
        http.send(data);
    })
    this.button.addEventListener("click",(e)=> {
        e.stopPropagation();
        if(this.file.files.length > 0 && this.text.value !== "" && this.text_aciklama.value !== "",this.text_fiyat.value !== "") {
        urunler_data.push({id: ID_ara(urunler_data),meno_name: this.text.value,img: this.file.files[0].name,aciklama: this.text_aciklama.value,fiyat: this.text_fiyat.value,meno_id: localStorage.getItem("meno_id")});
        console.log(urunler_data);
        socket.emit("data_save",""+user.imail+user.lisens+"urunler",JSON.stringify(urunler_data));
        this.m_add_paszamine.style.display = "none";
        }
        
    })
}

UrunEkle.prototype.Crate = function() {
    paszamine_s.appendChild(this.bak_icon);
    paszamine_s.appendChild(this.ekle_icon);
    paszamine_s.appendChild(this.m_add_paszamine);
    this.m_add_paszamine.appendChild(this.m_add_paszamine_s);
    this.m_add_paszamine_s.appendChild(this.file);
    this.m_add_paszamine_s.appendChild(this.lable);
    this.m_add_paszamine_s.appendChild(this.text);
    this.m_add_paszamine_s.appendChild(this.text_aciklama);
    this.m_add_paszamine_s.appendChild(this.text_fiyat);
    this.m_add_paszamine_s.appendChild(this.button);
    this.lable.appendChild(this.uploding);
    this.lable.appendChild(this.icon);
}
function Urun(id_,name_,img_,aciklama_,fiyat_,meno_id_) {
    this.id = id_;
    this.name = name_;
    this.aciklama = aciklama_;
    this.fiyat = fiyat_;
    this.meno_id = meno_id_;
    this.paszamine = CrateElement("div","","meno_div");
    this.img = CrateElement("img","","meno_img");
    this.img.src = "./images/"+img_;
    ///// urun adi
    
    this.h1_div = CrateElement("div","","meno_h1_div");
    this.h1 = CrateElement("h1",name_,"meno_h1");
    this.h1.style.color = colors.c_3;
    ///// urun aciklama
    this.h1_div_aciklama = CrateElement("div","","meno_h1_div");
    this.h1_aciklama = CrateElement("h1",aciklama_,"meno_h1");
    this.h1_aciklama.style.color = colors.c_3;
    ///// urun fiyat
    this.h1_div_fiyat = CrateElement("div","","meno_h1_div");
    this.h1_fiyat = CrateElement("h1",""+fiyat_+" $","meno_h1");
    this.h1_fiyat.style.color = colors.c_3;

    this.paszamine.appendChild(this.img);
    this.paszamine.appendChild(this.h1_div);
    this.h1_div.appendChild(this.h1);
    
    
    this.paszamine.appendChild(this.h1_div_aciklama);
    this.h1_div_aciklama.appendChild(this.h1_aciklama);
    
    this.paszamine.appendChild(this.h1_div_fiyat);
    this.h1_div_fiyat.appendChild(this.h1_fiyat);

    this.paszamine.addEventListener("click",()=> {
        localStorage.setItem("urun_id",this.id);
        paszamine_s.innerHTML = "";
        urun_ekle = new Urunedit(SerchId(this.id,urunler_data));
    })
}
function Urunler() {
    this.paszamine = CrateElement("div","","menolar_paszamine");
    this.meno = [];
    urunler_data.forEach(e => {
        if(e.meno_id == localStorage.getItem("meno_id")) {
        this.meno.push(new Urun(e.id,e.meno_name,e.img,e.aciklama,e.fiyat,e.meno_id));
        }
    });
    this.Crate();
    this.meno.forEach(e => {
    
        e.h1_div.style.top = ((e.h1_div.getBoundingClientRect().height/2))+"px";
        e.h1_div_aciklama.style.top = (((e.h1_div.getBoundingClientRect().y+e.h1_div.getBoundingClientRect().height)-e.paszamine.getBoundingClientRect().y)+20)+"px";
        e.h1_div_fiyat.style.top = (((e.h1_div_aciklama.getBoundingClientRect().y+e.h1_div_aciklama.getBoundingClientRect().height)-e.paszamine.getBoundingClientRect().y)+20)+"px";
        e.paszamine.style.height = (((e.h1_div_fiyat.getBoundingClientRect().y+e.h1_div_fiyat.getBoundingClientRect().height)-e.paszamine.getBoundingClientRect().y)+(e.h1_div.getBoundingClientRect().height/2))+"px";
        
    });
    this.paszamine.style.cssText = " width: 100%;margin-top: "+(urun_ekle.ekle_icon.getBoundingClientRect().y+urun_ekle.ekle_icon.getBoundingClientRect().height)*1.3+"px;overflow-y: scroll;"
    this.paszamine.style.height = innerHeight-this.paszamine.getBoundingClientRect().y+"px";
    
}
Urunler.prototype.Crate = function() {
    paszamine_s.appendChild(this.paszamine);
    this.meno.forEach(element => {
        this.paszamine.appendChild(element.paszamine);
        
    });
}

function Urunedit (data) {
    this.imgsrc = data.img;
    this.m_add_paszamine = CrateElement("div","","m_add_paszamine");
    this.m_add_paszamine.style.background = "url("+data.img+")";
    this.m_add_paszamine.style.objectFit = "cover";
    this.m_add_paszamine.style.cssText = "position: relative;width: 100%;height: 100%;background-color: rgba(255, 255, 255, 0.549);"
    this.m_add_paszamine_s = CrateElement("form","","m_add_paszamine_s");
    this.m_add_paszamine_s.style.cssText = "position: relative;float: left;width: 90%;height: auto;background-color: #adebf000;margin-left: 5%;margin-top: 20%;",

    this.delete = CrateElement("input","","delete","","button");
    this.delete.value = "Delete";
    ////// urun adi
    this.text = CrateElement("input","","m_add_text","","text");
    this.text.value = data.meno_name;
    this.text.style.cssText = "font-size: 5vw;width: 98%;height: 12vw;border: solid .5vw "+colors.c_4+";padding: .2vw;background-color: "+colors.c_1+";color: "+colors.c_3+";margin-top: 14vw;";
    this.text.setAttribute("placeholder","Prodoct Name:........");
    this.text.setAttribute("maxlength","20");
    ///// urun aciklama
    this.text_aciklama = CrateElement("input","","m_add_text","","text");
    this.text_aciklama.value = data.aciklama;
    this.text_aciklama.style.cssText = "font-size: 5vw;width: 98%;height: 12vw;border: solid .5vw "+colors.c_4+";padding: .2vw;background-color: "+colors.c_1+";color: "+colors.c_3+";margin-top: 1vw;";
    this.text_aciklama.setAttribute("placeholder","Prodoct Description:.....");
    ///// urun fiyat
    this.text_fiyat = CrateElement("input","","m_add_text","","text");
    this.text_fiyat.value = data.fiyat;
    this.text_fiyat.style.cssText = "font-size: 5vw;width: 98%;height: 12vw;border: solid .5vw "+colors.c_4+";padding: .2vw;background-color: "+colors.c_1+";color: "+colors.c_3+";margin-top: 1vw;";
    this.text_fiyat.setAttribute("placeholder","Price of the ptodoct:..");

    this.file = CrateElement("input","","add_meno_file","","file");
    this.lable = CrateElement("lable","","m_add_lable");
    this.lable.setAttribute("for","add_meno_file");
    this.lable.style.cssText = " position: absolute;width: 100%;height: 12vw;background-color: "+colors.c_1+";";
    this.uploding = CrateElement("div","");
    this.uploding.style.cssText = " position: absolute;width: 0%;height: 12vw;background-color: "+colors.c_4+";";
    this.icon = CrateElement("span","add_photo_alternate","m_add_icon","material-symbols-rounded");
    this.icon.style.cssText = " position: absolute;font-size: 12vw;color: "+colors.c_4+";margin-left: 40%;";
    this.button = CrateElement("input","","m_add_button","","button");
    this.button.value = "save";
    this.button.style.cssText = "width: 100%;height: 13vw;background-color: "+colors.c_1+";color: "+colors.c_4+";font-size: 6vw;border: solid .5vw "+colors.c_4+";margin-top: 1vw;";
    
    this.Crate();
    this.m_add_paszamine_s.style.marginTop = innerHeight/3+"px";
    this.m_add_paszamine_s.style.height = AndazeBaraks(90,70)-innerHeight/3+"px";

    this.lable.addEventListener("click",(e)=> {
        this.file.click();
    })
    this.delete.addEventListener("click",(e)=> {
        e.stopPropagation();
        let id = localStorage.getItem("urun_id");
        urunler_data = araye_element_remove(urunler_data,id,"id");
        socket.emit("data_save",""+user.imail+user.lisens+"urunler",JSON.stringify(urunler_data));
    })

    this.file.addEventListener("change",()=> {
        let data = new FormData();
        data.append("image",this.file.files[0]);
        let http = new XMLHttpRequest();
        http.open("POST","/upload_image",true);
        http.upload.addEventListener("progress",({loaded,total})=> {
            let filelaoded = Math.floor(loaded/total*100);
            this.uploding.style.width = filelaoded + "%";
            this.icon.style.color = colors.c_1;
        })
        http.send(data);
    })
   
    this.button.addEventListener("click",(e)=> {
        e.stopPropagation();
        let sira = 0;
        urunler_data.forEach(e => {
            
            if(Number(e.id) == Number(localStorage.getItem("urun_id"))&& this.file.files.length < 1) {
                urunler_data[sira] = {id: e.id,meno_name: this.text.value,img: this.imgsrc,aciklama: this.text_aciklama.value,fiyat: this.text_fiyat.value,meno_id: localStorage.getItem("meno_id")}

                console.log(e);
            }
            if(Number(e.id) == Number(localStorage.getItem("urun_id"))&& this.file.files.length > 0) {
                urunler_data[sira]  = {id: e.id,meno_name: this.text.value,img: this.file.files[0].name,aciklama: this.text_aciklama.value,fiyat: this.text_fiyat.value,meno_id: localStorage.getItem("meno_id")}
            }
            sira++;
        });
        console.log(urunler_data);
        socket.emit("data_save",""+user.imail+user.lisens+"urunler",JSON.stringify(urunler_data));
        this.m_add_paszamine.style.display = "none";
        
    })
}
Urunedit.prototype.Crate = function() {
    paszamine_s.appendChild(this.m_add_paszamine);
    this.m_add_paszamine.appendChild(this.m_add_paszamine_s);
    this.m_add_paszamine_s.appendChild(this.delete);
    this.m_add_paszamine_s.appendChild(this.file);
    this.m_add_paszamine_s.appendChild(this.lable);
    this.m_add_paszamine_s.appendChild(this.text);
    this.m_add_paszamine_s.appendChild(this.text_aciklama);
    this.m_add_paszamine_s.appendChild(this.text_fiyat);
    this.m_add_paszamine_s.appendChild(this.button);
    this.lable.appendChild(this.uploding);
    this.lable.appendChild(this.icon);
}

///////////////////////
////////////////////////
//      qrcodes       //
////////////////////////
////////////////////////
function QrCodEkle() {
    function qr(name,url,id) {
        this.id = id;
        this.url = url;
        this.name = name;
        this.paszamine = CrateElement("div","");
        this.paszamine.style.cssText = "position: relative; width: 60%;height: auto;margin-left: 15%;margin-top: 4vw"
        this.qr = CrateElement("img","");
        this.qr.style.cssText = "width: 100%;border-radius: 10vw;"
        this.qr.src = this.url;
        this.h1_div = CrateElement("div","");
        this.h1_div.style.cssText = " top: 40%;position: absolute;width: 100%;height: auto;background-color: "+colors.c_3+";text-align: center;"
        this.h1 = CrateElement("h1",""+this.name+"");
        this.h1.style.cssText = "color: "+colors.c_1+";font-size: 10vw;margin: 0;"
        this.span = CrateElement("span","delete","","material-symbols-rounded");
        this.span.style.cssText = " position: absolute;font-size: 10vw;color: "+colors.c_3+";left: 110%;top: 41%;"
        this.paszamine.addEventListener("click",(e)=> {
            e.stopPropagation();
            open("qr.html?url="+this.id+"");
        })
        this.span.addEventListener("click",(e)=> {
            e.stopPropagation();
            qrcods_data = araye_element_remove(qrcods_data,this.id,"id");
            socket.emit("data_save",""+user.imail+user.lisens+"qrcodes",JSON.stringify(qrcods_data));
        })
        this.Crate();
    }
    qr.prototype.Crate = function() {
        this.paszamine.appendChild(this.qr);
        this.paszamine.appendChild(this.h1_div);
        this.paszamine.appendChild(this.span);
        this.h1_div.appendChild(this.h1);
    }
    this.ekle_icon = CrateElement("span","add_circle","","material-symbols-rounded");
    this.ekle_icon.style.cssText = "top: 2%;position: absolute;font-size: "+AndazeBaraks(15,15)+"px;color: "+colors.c_4+"";

    this.m_add_paszamine = CrateElement("div","","m_add_paszamine");
    this.m_add_paszamine.style.cssText = "display: none;position: relative;width: 100%;height: 100%;background-color: rgba(255, 255, 255, 0.549);"
    this.m_add_paszamine_s = CrateElement("form","","m_add_paszamine_s");
    this.m_add_paszamine_s.style.cssText = "position: relative;float: left;width: 90%;height: 40vw;background-color: #adebf000;margin-left: 5%;margin-top: 20%;",
    this.text = CrateElement("input","","m_add_text","","text");
    this.text.style.cssText = " position: absolute;font-size: 5vw;width: 98%;height: 12vw;border: solid .5vw "+colors.c_4+";padding: .2vw;background-color: "+colors.c_1+";color: "+colors.c_3+";top: 14vw;";
    this.text.setAttribute("placeholder","name-no:........");
    this.text.setAttribute("maxlength","20");

    this.button = CrateElement("input","","m_add_button","","button");
    this.button.value = "save";
    this.button.style.cssText = " position: absolute;width: 100%;height: 13vw;background-color: "+colors.c_1+";color: "+colors.c_4+";font-size: 6vw;border: solid .5vw "+colors.c_4+";top: 30vw;";

    this.qr_paszamine = CrateElement("div");
    this.qr_paszamine.style.cssText = " top: 12%;position: relative;width: 100%;height: 100%;overflow-y: auto;";
    this.qrcodes = [];
    qrcods_data.forEach(element => {
        this.qrcodes.push(new qr(element.name,element.url,element.id));
    });
    this.Crate();
    this.qr_paszamine.style.height = (paszamine_s.getBoundingClientRect().height-this.qr_paszamine.getBoundingClientRect().y)+"px";
    this.ekle_icon.style.left = ((paszamine_s.getBoundingClientRect().width/2)-(this.ekle_icon.getBoundingClientRect().width/2))+"px";

    this.m_add_paszamine.addEventListener("touchend",(e)=> {
        if (e.changedTouches[0].pageY < this.m_add_paszamine_s.getBoundingClientRect().y || e.changedTouches[0].pageY > this.m_add_paszamine_s.getBoundingClientRect().y+this.m_add_paszamine_s.getBoundingClientRect().height*1.5) {
            this.m_add_paszamine.style.display = "none";
        }
    })
    this.ekle_icon.addEventListener("click",(e)=> {
        e.stopPropagation();
        this.m_add_paszamine.style.display = "flex";
    })
    this.button.addEventListener("click",(e) => {
        e.stopPropagation();
        let url = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data="+location.origin+"/index.html?qr="+this.text.value+"";
        qrcods_data.push({id: ID_ara(qrcods_data),name: this.text.value,url: url});
        socket.emit("data_save",""+user.imail+user.lisens+"qrcodes",JSON.stringify(qrcods_data));
    })
}
QrCodEkle.prototype.Crate = function() {
    paszamine_s.appendChild(this.ekle_icon);
    paszamine_s.appendChild(this.m_add_paszamine);
    this.m_add_paszamine.appendChild(this.m_add_paszamine_s);
    this.m_add_paszamine_s.appendChild(this.text);
    this.m_add_paszamine_s.appendChild(this.button);
    this.qrcodes.forEach(e => {
        this.qr_paszamine.appendChild(e.paszamine);
    });
    paszamine_s.appendChild(this.qr_paszamine);
}

export {colors};
