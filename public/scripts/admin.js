///////  imports

import{araye_element_remove,SerchId,ID_ara,CrateElement,AndazeBaraks,filter,Tarih_Ara,ChengeElements} from "./acharfaranse.js";

///////////////////////
////////////////////////
//     elements       //
////////////////////////
////////////////////////
let user = JSON.parse(localStorage.getItem("user"));

let navarabzar,marca,paszamine_s,meno_ekle,menolar,urun_ekle,urunler,qrcodes,siparisler,kasa,users,tem;

let colors = {c_1: "#906A50",c_2: "#E5B480",c_3: "#4DDDE0",c_4: "#ADEBF0"};
let font;
////////////////////////
////////////////////////
//      data load     //
////////////////////////
////////////////////////
let socket = io();
let styles_data = [];
let admin_users_data = [];
let menolar_data = [];
let urunler_data = [];
let qrcods_data = [];
let kasa_data = [];
let users_data = [{id:1,user_name: "sina",imail: "sina.majnoonhjk@gmail.com"}];
let siparisler_data = [{id:1,urun_adi: "cafe con leche",aciklama: "sekersiz",fiyat: 10,adet: 2,masa_no: "masa1"}];
let tercume_data = [];

socket.on("data_load_s",(database,data) => {
    if (database == ""+user.imail+user.lisens+"siparisler") {
        if(data != "") {
            kasa_data = JSON.parse(data);
        }
    }
})

socket.on("data_load",(database,data)=> {
    if (database == "style") {
        if(data != "") {
            styles_data = JSON.parse(data);
        }
    }
    if (database == "tercume") {
        if(data != "") {
            tercume_data = JSON.parse(data);
        }
       
        socket.emit("data_load","admin_users");
        socket.emit("data_load","style");
        socket.emit("data_load",""+user.imail+user.lisens+"siparisler");
       
    }
    if (database == ""+user.imail+user.lisens+"menolar") {
        if(data != "") {
            menolar_data = JSON.parse(data);
        }
        paszamine_s.innerHTML = "";
        meno_ekle = new MenoEkle();
        menolar = new Menolar();
    }
    if (database == ""+user.imail+user.lisens+"urunler") {
        if(data != "") {
            urunler_data = JSON.parse(data);
        }
     
        paszamine_s.innerHTML = "";
        urun_ekle = new UrunEkle();
        urunler = new Urunler();
    }
    if (database == ""+user.imail+user.lisens+"qrcodes") {
        if(data != "") {
            qrcods_data = JSON.parse(data);
        }
        paszamine_s.innerHTML = "";
        qrcodes = new QrCodEkle();
    }
    if (database == ""+user.imail+user.lisens+"siparisler") {
        if(data != "") {
            siparisler_data = JSON.parse(data);
        }
        paszamine_s.innerHTML = "";
        siparisler = new Siparisler();
    }
    if (database == ""+user.imail+user.lisens+"users") {
        if(data != "") {
            users_data = JSON.parse(data);
        }
        paszamine_s.innerHTML = "";
        users = new Users();
    }
    if (database == ""+user.imail+user.lisens+"kasa") {
        if(data != "") {
            kasa_data = JSON.parse(data);
        }
        paszamine_s.innerHTML = "";
        kasa = new Kasa();
    }
    if (database == "admin_users") {
        if(data != "") {
            admin_users_data = JSON.parse(data);
        }
    }
})
socket.on("data_load",(database,data,istek,data2) => {

})
socket.on("admin_siparis",() => {
    socket.emit("data_load",""+user.imail+user.lisens+"siparisler");
   
})
socket.on("user_siparis", ()=> {
    socket.emit("data_load",""+user.imail+user.lisens+"siparisler");
   
})






////////////////////////
////////////////////////
//   paszamine        //
////////////////////////
////////////////////////
let paszamine = CratePaszamine();
// window.addEventListener("resize", ()=> {
//     paszamine.style.width = innerWidth + "px";
//     paszamine.style.height = innerHeight + "px";
//     marca.style();
//     paszamine_s.style.cssText = ""+font+"position: absolute;width: "+(paszamine.getBoundingClientRect().width-filter(navarabzar.paszamine.style.width))+"px;height: "+(innerHeight-marca.paszamine.getBoundingClientRect().height)+"px;left: "+filter(navarabzar.paszamine.style.width)+"px;top: "+marca.paszamine.getBoundingClientRect().height+"px;background-color: "+colors.c_2+";"
// })
function CratePaszamine() {
    let paszamine = CrateElement("div");
    paszamine.style.width = innerWidth + "px";
    paszamine.style.height = innerHeight + "px";
    document.getElementById("body").appendChild(paszamine);
    return paszamine;
}

///////////////////////
////////////////////////
//    navar abzar    //
////////////////////////
////////////////////////

function NavarAbzar() {
    function Abzar(name) {
        let icon = CrateElement("span",name,"","material-symbols-rounded");
        icon.style.cssText = "font-size: "+AndazeBaraks(10,15)+"px;color: "+colors.c_4+";margin-left: 10%;margin-top: "+AndazeBaraks(2,5)+"px;margin-bottom: "+AndazeBaraks(5,10)+"px;";
        return icon;
    }
   
    
    this.paszamine = CrateElement("div");
    this.paszamine.style.cssText = "width: "+AndazeBaraks(15,20)+"px;height: 100%;background-color: "+colors.c_1+";"
    this.home = Abzar("home");
    this.meno_add = Abzar("format_list_bulleted_add");
    this.users = Abzar("group");
    this.kasa = Abzar("currency_exchange");
    this.qrcodes = Abzar("qr_code_2");
    this.edit = Abzar("auto_awesome");
    this.home.addEventListener("click",(e) => {
        e.stopPropagation();
        socket.emit("data_load",""+user.imail+user.lisens+"siparisler");
    })
    this.meno_add.addEventListener("click",()=> {
        socket.emit("data_load",""+user.imail+user.lisens+"menolar");
    })
    this.qrcodes.addEventListener("click",()=> {
        socket.emit("data_load",""+user.imail+user.lisens+"qrcodes");
    })
    this.users.addEventListener("click",()=> {
        socket.emit("data_load",""+user.imail+user.lisens+"users");
    })
    this.kasa.addEventListener("click",(e) => {
        e.stopPropagation();
        socket.emit("data_load",""+user.imail+user.lisens+"kasa");
    })
    this.edit.addEventListener("click",(e) => {
        e.stopPropagation();
        tem = new Tem();
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
    this.paszamine.appendChild(this.edit);
  
    
}

///////////////////////
////////////////////////
//paszamine sanaviye  //
////////////////////////
////////////////////////
function Marca(marca) {
   this.value = marca; 
   this.styles = {
    paszamine: "border: solid .9vw "+colors.c_4+";"+font+"text-align: center;left:"+navarabzar.paszamine.getBoundingClientRect().width+"px;top:0;position: absolute;float: left;width: "+((paszamine.getBoundingClientRect().width-filter(navarabzar.paszamine.style.width))*.963)+"px;height: auto;background-color: "+colors.c_1+";color: "+colors.c_4+";font-size:10vw;padding-top:5vw;padding-bottom:5vw",
    marca: "position: absolute;font-size: 10vw;color: "+colors.c_4+";margin: 0;"
   }
   this.marca = CrateElement("h1",marca);
   this.marca.style.cssText = this.styles.marca;
   this.paszamine = CrateElement("input","","","","text");
   this.paszamine.style.cssText = this.styles.paszamine;
   this.paszamine.value = this.value;
   this.paszamine.setAttribute("maxlength","15");
   this.Crate();
   if(this.marca.getBoundingClientRect().width > innerWidth/1.5) {

        let val1 = innerWidth/1.5;
        let val2 = this.marca.getBoundingClientRect().width;
        let val3 = val2 / val1;
        let val4 = this.paszamine.style.fontSize;
        let val5 = Number(val4.replace("vw",""));
        let val6 = val5 / val3;

        this.paszamine.style.fontSize = val6+"vw";
        
   }
  
}
Marca.prototype.style = function() {
    this.marca.style.cssText = this.styles.marca;
    this.paszamine.style.cssText = this.styles.paszamine;
    if(this.marca.getBoundingClientRect().width > innerWidth/1.5) {

        let val1 = innerWidth/1.5;
        let val2 = this.marca.getBoundingClientRect().width;
        let val3 = val2 / val1;
        let val4 = this.paszamine.style.fontSize;
        let val5 = Number(val4.replace("vw",""));
        let val6 = val5 / val3;

        this.paszamine.style.fontSize = val6+"vw";
        
    }
}
Marca.prototype.Crate = function() {
    document.getElementById("body").appendChild(this.paszamine);
    document.getElementById("body").appendChild(this.marca);
    
}
window.addEventListener("click",() => {
    if(marca.paszamine.value !== user.marca) {
        user.marca = marca.paszamine.value;
        localStorage.setItem("user",JSON.stringify(user));
        let data = ChengeElements(admin_users_data,user.id,"id",marca.paszamine.value,"marca");
        socket.emit("data_save","admin_users",JSON.stringify(data));
        open(location.href);
    }

})



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
    this.text.setAttribute("placeholder","Nombre del meno ....");
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
    this.button.value = "Guerda";
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
    this.h1_div.style.backgroundColor = colors.c_1+"84";
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
    this.paszamine.style.cssText = " width: 100%;margin-top: "+(meno_ekle.ekle_icon.getBoundingClientRect().y+meno_ekle.ekle_icon.getBoundingClientRect().height)*.5+"px;overflow-y: scroll;"
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
    this.delete.value = "Borra";
    this.delete.style.cssText = " z-index: 1;margin-top: -30%;position: absolute;width: 50%;margin-left: 25%;height: 10vw;background-color: "+colors.c_4+";border: solid 0 ;color: "+colors.c_1+"";
    ////// urun adi
    this.text = CrateElement("input","","m_add_text","","text");
    this.text.value = data.meno_name;
    this.text.style.cssText = "font-size: 5vw;width: 98%;height: 12vw;border: solid .5vw "+colors.c_4+";padding: .2vw;background-color: "+colors.c_1+";color: "+colors.c_3+";margin-top: 14vw;";
    this.text.setAttribute("placeholder","Nombre del meno ...");
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
    this.button.value = "Guarda";
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
    this.text.setAttribute("placeholder","Nombre del pedido.....");
    this.text.setAttribute("maxlength","20");
    ///// urun aciklama
    this.text_aciklama = CrateElement("input","","m_add_text","","text");
    this.text_aciklama.style.cssText = "font-size: 5vw;width: 98%;height: 12vw;border: solid .5vw "+colors.c_4+";padding: .2vw;background-color: "+colors.c_1+";color: "+colors.c_3+";margin-top: 1vw;";
    this.text_aciklama.setAttribute("placeholder","Explicacion ....");
    ///// urun fiyat
    this.text_fiyat = CrateElement("input","","m_add_text","","text");
    this.text_fiyat.style.cssText = "font-size: 5vw;width: 98%;height: 12vw;border: solid .5vw "+colors.c_4+";padding: .2vw;background-color: "+colors.c_1+";color: "+colors.c_3+";margin-top: 1vw;";
    this.text_fiyat.setAttribute("placeholder","Pricio ..");

    this.file = CrateElement("input","","add_meno_file","","file");
    this.lable = CrateElement("lable","","m_add_lable");
    this.lable.setAttribute("for","add_meno_file");
    this.lable.style.cssText = " position: absolute;width: 100%;height: 12vw;background-color: "+colors.c_1+";";
    this.uploding = CrateElement("div","");
    this.uploding.style.cssText = " position: absolute;width: 0%;height: 12vw;background-color: "+colors.c_4+";";
    this.icon = CrateElement("span","add_photo_alternate","m_add_icon","material-symbols-rounded");
    this.icon.style.cssText = "position: absolute;font-size: 12vw;color: "+colors.c_4+";margin-left: 40%;";
    this.button = CrateElement("input","","m_add_button","","button");
    this.button.value = "Guarda";
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
    this.h1_div.style.backgroundColor = colors.c_1+"84";
    this.h1 = CrateElement("h1",name_,"meno_h1");
    this.h1.style.color = colors.c_3;
    ///// urun aciklama
    this.h1_div_aciklama = CrateElement("div","","meno_h1_div");
    this.h1_div_aciklama.style.backgroundColor = colors.c_1+"84";
    this.h1_aciklama = CrateElement("h1",aciklama_,"meno_h1");
    this.h1_aciklama.style.color = colors.c_3;
    ///// urun fiyat
    this.h1_div_fiyat = CrateElement("div","","meno_h1_div");
    this.h1_div_fiyat.style.backgroundColor = colors.c_1+"84";
    this.h1_fiyat = CrateElement("h1",""+fiyat_+"  €","meno_h1");
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
    this.paszamine.style.cssText = " width: 100%;margin-top: "+(urun_ekle.ekle_icon.getBoundingClientRect().y+urun_ekle.ekle_icon.getBoundingClientRect().height)*.6+"px;overflow-y: scroll;"
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
    this.delete.style.cssText = " z-index: 1;margin-top: -30%;position: absolute;width: 50%;margin-left: 25%;height: 10vw;background-color: "+colors.c_4+";border: solid 0 ;color: "+colors.c_1+"";
    this.delete.value = "Borra";
    ////// urun adi
    this.text = CrateElement("input","","m_add_text","","text");
    this.text.value = data.meno_name;
    this.text.style.cssText = "font-size: 5vw;width: 98%;height: 12vw;border: solid .5vw "+colors.c_4+";padding: .2vw;background-color: "+colors.c_1+";color: "+colors.c_3+";margin-top: 14vw;";
    this.text.setAttribute("placeholder","Prodoct Nembre del prodocto ...");
    this.text.setAttribute("maxlength","20");
    ///// urun aciklama
    this.text_aciklama = CrateElement("input","","m_add_text","","text");
    this.text_aciklama.value = data.aciklama;
    this.text_aciklama.style.cssText = "font-size: 5vw;width: 98%;height: 12vw;border: solid .5vw "+colors.c_4+";padding: .2vw;background-color: "+colors.c_1+";color: "+colors.c_3+";margin-top: 1vw;";
    this.text_aciklama.setAttribute("placeholder","Explicacion...");
    ///// urun fiyat
    this.text_fiyat = CrateElement("input","","m_add_text","","text");
    this.text_fiyat.value = data.fiyat;
    this.text_fiyat.style.cssText = "font-size: 5vw;width: 98%;height: 12vw;border: solid .5vw "+colors.c_4+";padding: .2vw;background-color: "+colors.c_1+";color: "+colors.c_3+";margin-top: 1vw;";
    this.text_fiyat.setAttribute("placeholder","Precio ..");

    this.file = CrateElement("input","","add_meno_file","","file");
    this.lable = CrateElement("lable","","m_add_lable");
    this.lable.setAttribute("for","add_meno_file");
    this.lable.style.cssText = " position: absolute;width: 100%;height: 12vw;background-color: "+colors.c_1+";";
    this.uploding = CrateElement("div","");
    this.uploding.style.cssText = " position: absolute;width: 0%;height: 12vw;background-color: "+colors.c_4+";";
    this.icon = CrateElement("span","add_photo_alternate","m_add_icon","material-symbols-rounded");
    this.icon.style.cssText = " position: absolute;font-size: 12vw;color: "+colors.c_4+";margin-left: 40%;";
    this.button = CrateElement("input","","m_add_button","","button");
    this.button.value = "Guarda";
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

            }
            if(Number(e.id) == Number(localStorage.getItem("urun_id"))&& this.file.files.length > 0) {
                urunler_data[sira]  = {id: e.id,meno_name: this.text.value,img: this.file.files[0].name,aciklama: this.text_aciklama.value,fiyat: this.text_fiyat.value,meno_id: localStorage.getItem("meno_id")}
            }
            sira++;
        });
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
    this.text.setAttribute("placeholder","Numero de mesa ..");
    this.text.setAttribute("maxlength","20");

    this.button = CrateElement("input","","m_add_button","","button");
    this.button.value = "Guarda";
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
        let url = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://"+location.origin+"/index.html?data="+this.text.value+"=="+user.imail+"";
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
///////////////////////
////////////////////////
//     siparisler     //
////////////////////////
////////////////////////

function Siparisler() {
    function Siparis(data) {
        this.data = data;
        this.paszamine = CrateElement("div");
        this.paszamine.style.cssText = "float: left;margin-top: 4vw;text-align: center;width: 90%;height: auto;margin-left:5%";
        /////  musteri adi sira
        this.sira_div = CrateElement("div");
        this.sira_div.style.cssText = "border-radius: 4vw 0vw 0 0;float: left;width: 28%;height: 10vw;border: solid .5vw "+colors.c_4+";background-color: "+colors.c_1+";";
        this.sira_h1 = CrateElement("h1");
        this.sira_h1.innerHTML = "Nombre :";
        this.sira_h1.style.cssText = "margin-top: 2.5vw;font-size: 4vw;color: "+colors.c_4+";";
        //satir
        this.satir_div = CrateElement("div");
        this.satir_div.style.cssText = "overflow-y: auto;border-radius: 0vw 4vw 0 0;float: left;width: 69%;height: 10vw;border: solid .5vw "+colors.c_4+";background-color: "+colors.c_1+";";
        this.satir_h1 = CrateElement("h1");
        this.satir_h1.innerHTML = this.data.musteri_adi;
        this.satir_h1.style.cssText = "margin-top: 2.5vw;font-size: 5vw;color: "+colors.c_4+";";
        /////  tarih sira
        this.sira_div1 = CrateElement("div");
        this.sira_div1.style.cssText = "float: left;width: 28%;height: 10vw;border: solid .5vw "+colors.c_1+";background-color: "+colors.c_4+";";
        this.sira_h11 = CrateElement("h1");
        this.sira_h11.innerHTML = "Fecha :";
        this.sira_h11.style.cssText = "margin-top: 2.5vw;font-size: 4vw;color: "+colors.c_1+";";
        //satir
        this.satir_div1 = CrateElement("div");
        this.satir_div1.style.cssText = "float: left;width: 69%;height: 10vw;border: solid .5vw "+colors.c_1+";background-color: "+colors.c_4+";";
        this.satir_h11 = CrateElement("h1");
        this.satir_h11.innerHTML = this.data.tarih;
        this.satir_h11.style.cssText = "margin-top: 2.5vw;font-size: 5vw;color: "+colors.c_1+";";
         /////  urun adi sira
         this.sira_div2 = CrateElement("div");
         this.sira_div2.style.cssText = "float: left;width: 28%;height: 10vw;border: solid .5vw "+colors.c_1+";background-color: "+colors.c_4+";";
         this.sira_h12 = CrateElement("h1");
         this.sira_h12.innerHTML = "Pedido :";
         this.sira_h12.style.cssText = "margin-top: 2.5vw;font-size: 4vw;color: "+colors.c_1+";";
         //satir
         this.satir_div2 = CrateElement("div");
         this.satir_div2.style.cssText = "float: left;width: 69%;height: 10vw;border: solid .5vw "+colors.c_1+";background-color: "+colors.c_4+";";
         this.satir_h12 = CrateElement("h1");
         this.satir_h12.innerHTML = this.data.urun_adi;
         this.satir_h12.style.cssText = "margin-top: 2.5vw;font-size: 5vw;color: "+colors.c_1+";";
         /////  aciklama sira
         this.sira_div3 = CrateElement("div");
         this.sira_div3.style.cssText = "float: left;width: 28%;height: 10vw;border: solid .5vw "+colors.c_1+";background-color: "+colors.c_4+";";
         this.sira_h13 = CrateElement("h1");
         this.sira_h13.innerHTML = "Explicacion :";
         this.sira_h13.style.cssText = "margin-top: 2.5vw;font-size: 4vw;color: "+colors.c_1+";";
         //satir
         this.satir_div3 = CrateElement("div");
         this.satir_div3.style.cssText = "overflow-y: auto;float: left;width: 69%;height: 10vw;border: solid .5vw "+colors.c_1+";background-color: "+colors.c_4+";";
         this.satir_h13 = CrateElement("h1");
         this.satir_h13.innerHTML = this.data.aciklama;
         this.satir_h13.style.cssText = "margin-top: 2.5vw;font-size: 5vw;color: "+colors.c_1+";";
          /////  fiyat sira
          this.sira_div4 = CrateElement("div");
          this.sira_div4.style.cssText = "float: left;width: 28%;height: 10vw;border: solid .5vw "+colors.c_1+";background-color: "+colors.c_4+";";
          this.sira_h14 = CrateElement("h1");
          this.sira_h14.innerHTML = "Precio :";
          this.sira_h14.style.cssText = "margin-top: 2.5vw;font-size: 4vw;color: "+colors.c_1+";";
          //satir
          this.satir_div4 = CrateElement("div");
          this.satir_div4.style.cssText = "float: left;width: 69%;height: 10vw;border: solid .5vw "+colors.c_1+";background-color: "+colors.c_4+";";
          this.satir_h14 = CrateElement("h1");
          this.satir_h14.innerHTML = this.data.fiyat+"  €";
          this.satir_h14.style.cssText = "margin-top: 2.5vw;font-size: 5vw;color: "+colors.c_1+";";
           /////  adet sira
           this.sira_div5 = CrateElement("div");
           this.sira_div5.style.cssText = "float: left;width: 28%;height: 10vw;border: solid .5vw "+colors.c_1+";background-color: "+colors.c_4+";";
           this.sira_h15 = CrateElement("h1");
           this.sira_h15.innerHTML = "Numero :";
           this.sira_h15.style.cssText = "margin-top: 2.5vw;font-size: 4vw;color: "+colors.c_1+";";
           //satir
           this.satir_div5 = CrateElement("div");
           this.satir_div5.style.cssText = "float: left;width: 69%;height: 10vw;border: solid .5vw "+colors.c_1+";background-color: "+colors.c_4+";";
           this.satir_h15 = CrateElement("h1");
           this.satir_h15.innerHTML = this.data.adet;
           this.satir_h15.style.cssText = "margin-top: 2.5vw;font-size: 5vw;color: "+colors.c_1+";";
            /////  toplam fiyati sira
            this.sira_div6 = CrateElement("div");
            this.sira_div6.style.cssText = "float: left;width: 28%;height: 10vw;border: solid .5vw "+colors.c_1+";background-color: "+colors.c_4+";";
            this.sira_h16 = CrateElement("h1");
            this.sira_h16.innerHTML = "Total :";
            this.sira_h16.style.cssText = "margin-top: 2.5vw;font-size: 4vw;color: "+colors.c_1+";";
            //satir
            this.satir_div6 = CrateElement("div");
            this.satir_div6.style.cssText = "float: left;width: 69%;height: 10vw;border: solid .5vw "+colors.c_1+";background-color: "+colors.c_4+";";
            this.satir_h16 = CrateElement("h1");
            this.satir_h16.innerHTML = Number(this.data.adet)*Number(this.data.fiyat)+"  €";
            this.satir_h16.style.cssText = "margin-top: 2.5vw;font-size: 5vw;color: "+colors.c_1+";";
             /////  masa_no sira
             this.sira_div7 = CrateElement("div");
             this.sira_div7.style.cssText = "float: left;width: 28%;height: 10vw;border: solid .5vw "+colors.c_1+";background-color: "+colors.c_4+";";
             this.sira_h17 = CrateElement("h1");
             this.sira_h17.innerHTML = "Numero de mesa :";
             this.sira_h17.style.cssText = "margin-top: 2.5vw;font-size: 4vw;color: "+colors.c_1+";";
             //satir
             this.satir_div7 = CrateElement("div");
             this.satir_div7.style.cssText = "float: left;width: 69%;height: 10vw;border: solid .5vw "+colors.c_1+";background-color: "+colors.c_4+";";
             this.satir_h17 = CrateElement("h1");
             this.satir_h17.innerHTML = this.data.masa_no;
             this.satir_h17.style.cssText = "margin-top: 2.5vw;font-size: 5vw;color: "+colors.c_1+";";

             // buttons
             this.sil = CrateElement("input","","","","button");
             this.sil.value = "Borra";
             this.sil.style.cssText = "font-size: 5vw;border-radius: 0vw 0vw 0 4vw;float: left;width: 30%;height: 10vw;border: solid 0vw "+colors.c_1+";background-color: "+colors.c_1+";color: "+colors.c_4+"";

             this.onayla = CrateElement("input","","","","button");
             this.onayla.value = "Confirme";
             this.onayla.style.cssText = "font-size: 5vw;border-radius: 0vw 0vw 4vw 0vw;float: left;width: 69.5%;height: 10vw;border: solid .5vw "+colors.c_1+";background-color: "+colors.c_4+";color: "+colors.c_1+"";
        this.Crate();

        this.sil.addEventListener("click",(e) => {
            e.stopPropagation();
            siparisler_data = araye_element_remove(siparisler_data,this.data.id,"id");
            socket.emit("data_save",""+user.imail+user.lisens+"siparisler",JSON.stringify(siparisler_data));
        })
        this.onayla.addEventListener("click",(e) => {
            e.stopPropagation();
            this.data.id = ID_ara(kasa_data);
            kasa_data.push(this.data);
            socket.emit("data_save_s",""+user.imail+user.lisens+"kasa",JSON.stringify(kasa_data));
            siparisler_data = araye_element_remove(siparisler_data,this.data.id,"id");
            socket.emit("data_save",""+user.imail+user.lisens+"siparisler",JSON.stringify(siparisler_data));
        })

    }
    Siparis.prototype.Crate = function() {
        this.paszamine.appendChild(this.sira_div);
        this.sira_div.appendChild(this.sira_h1);
        this.paszamine.appendChild(this.satir_div);
        this.satir_div.appendChild(this.satir_h1);

        this.paszamine.appendChild(this.sira_div1);
        this.sira_div1.appendChild(this.sira_h11);
        this.paszamine.appendChild(this.satir_div1);
        this.satir_div1.appendChild(this.satir_h11);

        this.paszamine.appendChild(this.sira_div2);
        this.sira_div2.appendChild(this.sira_h12);
        this.paszamine.appendChild(this.satir_div2);
        this.satir_div2.appendChild(this.satir_h12);

        this.paszamine.appendChild(this.sira_div3);
        this.sira_div3.appendChild(this.sira_h13);
        this.paszamine.appendChild(this.satir_div3);
        this.satir_div3.appendChild(this.satir_h13);

        this.paszamine.appendChild(this.sira_div4);
        this.sira_div4.appendChild(this.sira_h14);
        this.paszamine.appendChild(this.satir_div4);
        this.satir_div4.appendChild(this.satir_h14);

        this.paszamine.appendChild(this.sira_div5);
        this.sira_div5.appendChild(this.sira_h15);
        this.paszamine.appendChild(this.satir_div5);
        this.satir_div5.appendChild(this.satir_h15);

        this.paszamine.appendChild(this.sira_div6);
        this.sira_div6.appendChild(this.sira_h16);
        this.paszamine.appendChild(this.satir_div6);
        this.satir_div6.appendChild(this.satir_h16);

        this.paszamine.appendChild(this.sira_div7);
        this.sira_div7.appendChild(this.sira_h17);
        this.paszamine.appendChild(this.satir_div7);
        this.satir_div7.appendChild(this.satir_h17);

        this.paszamine.appendChild(this.sil);
        this.paszamine.appendChild(this.onayla);

    }
    this.paszamine = CrateElement("div");
    this.paszamine.style.cssText = "position: absolute;width: 100%;height: 97%;overflow-y: auto;top: 0%";
    this.siparis = [];
    this.shomar = siparisler_data.length-1;
    siparisler_data.forEach(e => {
        this.siparis.push(new Siparis(siparisler_data[this.shomar]));
        this.shomar = this.shomar - 1;
    })
   
    this.Crate();
}
Siparisler.prototype.Crate = function() {
    paszamine_s.appendChild(this.paszamine);
    this.siparis.forEach(e => {
        this.paszamine.appendChild(e.paszamine);
    });
}

///////////////////////
////////////////////////
//        users       //
////////////////////////
////////////////////////
function Users() {
    function User(data) {
        this.styles = {
            s1: "font-size: 10vw;color: #ADEBF0;",
            s2: "font-size: 4vw;color: #ADEBF0;"
        }
        this.data = data;
        this.paszamine = CrateElement("div");
        this.paszamine.style.cssText = "position: relative;margin-left: 5%;margin-top: 5vw;float: left;width: 90%;height: auto;text-align: center;border: solid .5vw "+colors.c_4+";background-color: "+colors.c_1+";border-radius: 5vw;";
        this.span = CrateElement("span","account_circle","","material-symbols-rounded");
        this.span.style.cssText = "color: "+colors.c_4+" ;font-size: 20vw;";
        this.delete = CrateElement("span","delete","","material-symbols-rounded");
        this.delete.style.cssText = "color: "+colors.c_4+" ;font-size: 8vw;position: absolute;top: 1.5vw;left: 1.5vw";
        this.username = CrateElement("h1",""+this.data.user_name+"");
        this.username.style.cssText = this.styles.s1;
        this.imail = CrateElement("h1",""+this.data.imail+"");
        this.imail.style.cssText = this.styles.s2;
        this.Crate();
        this.delete.addEventListener("click",(e) => {
            e.stopPropagation();
            users_data = araye_element_remove(users_data,this.data.id,"id");
            socket.emit("data_save",""+user.imail+user.lisens+"users",JSON.stringify(users_data));
        })
    }
    User.prototype.Crate = function() {
        this.paszamine.appendChild(this.span);
        this.paszamine.appendChild(this.username);
        this.paszamine.appendChild(this.imail);
        this.paszamine.appendChild(this.delete);
    }
    this.paszamine = CrateElement("div");
    this.paszamine.style.cssText = "float: left;overflow-y: auto;width: 98%;height: 97%;text-align: center;";
    this.users_adet = CrateElement("div",""+users_data.length+" Personas");
    this.users_adet.style.cssText = "margin-bottom: 2vw;border-radius: 5vw; font-size: 7vw;background-color: "+colors.c_1+";color: "+colors.c_3+";width: 80%;margin-left: 10%;border-radius: 0 0 4vw 4vw;border: solid .5vw "+colors.c_4+";";
    this.users = [];
    this.shomar = users_data.length-1;
    users_data.forEach(e => {
        this.users.push(new User(users_data[this.shomar]));
        this.shomar = this.shomar - 1;
    })
    this.Crate();
}
Users.prototype.Crate = function() {
    paszamine_s.appendChild(this.paszamine);
    this.paszamine.appendChild(this.users_adet);
    this.users.forEach(e => {
        this.paszamine.appendChild(e.paszamine);
    })
}

///////////////////////
////////////////////////
//        users       //
////////////////////////
////////////////////////
function kasa_(data) {
    this.styles = {
        s2: "object-fit: cover;height: 4vw;width: 23.7%;font-size: 3vw;background-color: "+colors.c_4+";border: solid .5vw "+colors.c_1+" ;float: left;text-align: center;margin-top: 0vw;color: "+colors.c_1+" "
    }
    this.data = data;
    this.paszamine = CrateElement("div");
    this.tarih_s = CrateElement("div",""+this.data.tarih+"");
    this.tarih_s.style.cssText = this.styles.s2;
    this.siparis_s = CrateElement("div",""+this.data.urun_adi+"");
    this.siparis_s.style.cssText = this.styles.s2+";overflow-y: auto;";
    this.adet_s = CrateElement("div",""+this.data.adet+"");
    this.adet_s.style.cssText = this.styles.s2;
    this.tutar_s = CrateElement("div",""+Number(this.data.adet)*Number(this.data.fiyat)+"  €");
    this.tutar_s.style.cssText = this.styles.s2;
    this.Crate();
}
kasa_.prototype.Crate = function() {
    this.paszamine.appendChild(this.tarih_s);
    this.paszamine.appendChild(this.siparis_s);
    this.paszamine.appendChild(this.adet_s);
    this.paszamine.appendChild(this.tutar_s);
}
function Kasa() {
    
    this.styles = {
        s1: "float: left;margin-top:5vw;margin-left: 5%;width: 35%;height: 5vw;background-color: "+colors.c_3+";color: "+colors.c_1+";border: solid .5vw "+colors.c_1+";border-radius: 2vw;",
        s2: "width: 23.7%;font-size: 5vw;background-color: "+colors.c_1+";border: solid .5vw "+colors.c_4+" ;float: left;text-align: center;margin-top: 0vw;color: "+colors.c_4+" "
    }
    this.tarih_den = CrateElement("input","","","","date");
    this.tarih_den.style.cssText = this.styles.s1;
    this.tarih_a = CrateElement("input","","","","date");
    this.tarih_a.style.cssText = this.styles.s1;
    this.right_span = CrateElement("span","arrow_right_alt","","material-symbols-rounded");
    this.right_span.style.cssText = "float: left;color: "+colors.c_1+";font-size: 7vw;margin-left: 4%;margin-top: 5vw;";
    
    this.paszamine = CrateElement("div");
    this.paszamine.style.cssText = "margin-top: 5vw;float: left;overflow-y: auto;width: 100%;height: 97%;text-align: center;";
    this.tarih_s = CrateElement("div","Fecha");
    this.tarih_s.style.cssText = this.styles.s2+";border-radius: 3vw 0vw 0 0;";
    this.siparis_s = CrateElement("div","Pedido");
    this.siparis_s.style.cssText = this.styles.s2;
    this.adet_s = CrateElement("div","Numero");
    this.adet_s.style.cssText = this.styles.s2;
    this.tutar_s = CrateElement("div","Monto");
    this.tutar_s.style.cssText = this.styles.s2+";border-radius: 0vw 3vw 0 0;";
    this.durum = 0;
    this.data = [];
    this.kasa = [];
    this.date = new Date();
    this.yil = this.date.getFullYear();
    this.ay = this.date.getMonth()+1;
    this.gun = this.date.getDate();
    this.tarih = ""+this.yil+"-"+this.ay+"-"+this.gun+"";
    this.data = Tarih_Ara(kasa_data,this.tarih,this.tarih);
    
    this.shomar = this.data.length-1;
    this.shomar_fiyat = 0;
    this.data.forEach(e => {
        this.shomar_fiyat += Number(e.adet)*Number(e.fiyat);
        this.kasa.push(new kasa_(this.data[this.shomar]));
        this.shomar = this.shomar - 1;
    })
    this.toplam_fiyati = CrateElement("div",""+this.shomar_fiyat+"  €");
    this.toplam_fiyati.style.cssText = this.styles.s2+";border-radius: 0vw 0vw 3vw 0;margin-left:75%";
    this.Crate();
    
    this.tarih_den.addEventListener("change",(e) => {
        this.durum++;
        if (this.durum > 1) {
           this.CrateBord();
        }
    })
    this.tarih_a.addEventListener("change",(e) => {
        this.durum++;
        if (this.durum > 1) {
            this.CrateBord();
        }
    })
}
Kasa.prototype.CrateBord = function() {
    this.paszamine.innerHTML = "";
    this.kasa = [];
    this.paszamine.appendChild(this.tarih_s);
    this.paszamine.appendChild(this.siparis_s);
    this.paszamine.appendChild(this.adet_s);
    this.paszamine.appendChild(this.tutar_s);

    this.data = Tarih_Ara(kasa_data,this.tarih_den.value,this.tarih_a.value);

    this.shomar = this.data.length-1;
    this.shomar_fiyat = 0;
    this.data.forEach(e => {
        this.shomar_fiyat += Number(e.adet)*Number(e.fiyat);
        this.kasa.push(new kasa_(this.data[this.shomar]));
        this.shomar = this.shomar - 1;
    })
    this.toplam_fiyati.innerHTML = ""+this.shomar_fiyat+"  €";
    

    this.kasa.forEach(e => {
        this.paszamine.appendChild(e.paszamine);
    })
    this.paszamine.appendChild(this.toplam_fiyati);
}
Kasa.prototype.Crate = function() {
    paszamine_s.appendChild(this.tarih_den);
    paszamine_s.appendChild(this.right_span);
    paszamine_s.appendChild(this.tarih_a);
    this.paszamine.appendChild(this.tarih_s);
    this.paszamine.appendChild(this.siparis_s);
    this.paszamine.appendChild(this.adet_s);
    this.paszamine.appendChild(this.tutar_s);
    
    
    paszamine_s.appendChild(this.paszamine);
    this.kasa.forEach(e => {
        this.paszamine.appendChild(e.paszamine);
    })
    this.paszamine.appendChild(this.toplam_fiyati);
}

///////////////////////
////////////////////////
//        tem         //
////////////////////////
////////////////////////
function Tem() {
    function Colors(colors) {
        this.colors = colors;
        this.styles = {
            paszamine: "min-width: 60vw;height: 60vw;float: left;position: relative;margin-left: 3vw;border-radius: 2vw 2vw 2vw 2vw;border: solid .5vw "+this.colors.c_1+"",
            colors: "float: left;position: relative;width: 50%;height: 100%;background-color: red"
        }
        this.paszamine = CrateElement("div");
        this.paszamine.style.cssText = this.styles.paszamine;
        this.color_1 = CrateElement("div");
        this.color_1.style.cssText = this.styles.colors+";width: 50%;height: 100%;background-color: "+this.colors.c_1+";border-radius: 2vw 0 0 2vw";

        this.color_2 = CrateElement("div");
        this.color_2.style.cssText = this.styles.colors+";width: 50%;height: 50%;background-color: "+this.colors.c_2+";border-radius: 0vw 2vw 0 0vw";

        this.color_3 = CrateElement("div");
        this.color_3.style.cssText = this.styles.colors+";width: 25%;height: 50%;background-color: "+this.colors.c_3+";border-radius: 0vw 0 0 0vw";

        this.color_4 = CrateElement("div");
        this.color_4.style.cssText = this.styles.colors+";width: 25%;height: 50%;background-color: "+this.colors.c_4+";border-radius: 0vw 0 2vw 0vw";
        this.Crate();
        
        this.paszamine.addEventListener("click",(e) => {
            e.stopPropagation();
            user.colors = this.colors;
            localStorage.setItem("user",JSON.stringify(user));
            let data = ChengeElements(admin_users_data,user.id,"id",this.colors,"colors");
            socket.emit("data_save","admin_users",JSON.stringify(data));
            open(location.href)
        })
    }
    Colors.prototype.Crate = function() {
        this.paszamine.appendChild(this.color_1);
        this.paszamine.appendChild(this.color_2);
        this.paszamine.appendChild(this.color_3);
        this.paszamine.appendChild(this.color_4);
    }
    function Fonts(fonts) {
        this.fonts = fonts;
        this.styles = {
            paszamine: "color: "+colors.c_1+";background-color: "+colors.c_3+";text-align: center;margin-top: 2vw;margin-left: 5%;width: 85%;height: auto;float: left;position: relative;margin-left: 3vw;border-radius: 2vw 2vw 2vw 2vw;border: solid .5vw "+colors.c_1+";padding: 2vw;font-size:6vw",
            fonts: "float: left;position: relative;width: 50%;height: 100%;background-color: red"
        }
        this.paszamine = CrateElement("div",this.fonts.name);
        this.paszamine.style.cssText = this.styles.paszamine+";"+this.fonts.font+"";

        this.paszamine.addEventListener("click",(e) => {
            e.stopPropagation();
            user.fonts = this.fonts;
            localStorage.setItem("user",JSON.stringify(user));
            let data = ChengeElements(admin_users_data,user.id,"id",this.fonts,"fonts");
            socket.emit("data_save","admin_users",JSON.stringify(data));
            
            open(location.href)
           
        })
       
       
    }
   
    this.styles = {
        paszamine: "width: 100%;height: 100%;float: left;",
        paszamine_s: "margin-left:5%;float: left;position: relative;width: 90%;height: auto;display: flex;margin-top: 5vw;padding-top: 2vw;padding-bottom: 2vw;border: solid .5vw "+colors.c_3+";",
        paszamine_s2: "overflow-y: auto;display: block,height: 50vw;margin-left:5%;float: left;position: relative;width: 90%;height: 40%;margin-top: 5vw;padding-top: 2vw;padding-bottom: 2vw;border: solid .5vw "+colors.c_3+";",
        inputs: "display: none",
        divs: "width: 100%;height: 22%;float: left"
       
    }
    
    this.paszamine = CrateElement("div");
    this.paszamine.style.cssText = this.styles.paszamine;

    this.paszamine_colors = CrateElement("div");
    this.paszamine_colors.style.cssText = this.styles.paszamine_s+";overflow-x: auto";

    this.paszamine_fonts = CrateElement("div");
    this.paszamine_fonts.style.cssText = this.styles.paszamine_s2;

    this.colors = [];
    styles_data.colorss.forEach(e => {
        this.colors.push(new Colors(e));
    })
    this.fonts = [];
    styles_data.fonts.forEach(e => {
        this.fonts.push(new Fonts(e));
    })

    this.Crate();
   
}
Tem.prototype.Crate = function() {
    paszamine_s.innerHTML = "";
    paszamine_s.appendChild(this.paszamine);
    this.paszamine.appendChild(this.paszamine_colors);
    this.colors.forEach(e => {
        this.paszamine_colors.appendChild(e.paszamine);
    })
    this.fonts.forEach(e => {
        this.paszamine_fonts.appendChild(e.paszamine);
    })
    this.paszamine.appendChild(this.paszamine_fonts);
    

}

if (user !== null && sessionStorage.getItem("user") !== "") {
    font = user.fonts.font;
    colors = user.colors;
    paszamine_s = CrateElement("div");
    document.getElementById("body").appendChild(paszamine_s);
    navarabzar = new NavarAbzar();
    marca = new Marca(user.marca);
    paszamine_s.style.cssText = ""+font+"position: absolute;width: "+(innerWidth-filter(navarabzar.paszamine.style.width))+"px;height: "+(innerHeight-marca.paszamine.getBoundingClientRect().height)+"px;left: "+filter(navarabzar.paszamine.style.width)+"px;top: "+marca.paszamine.getBoundingClientRect().height+"px;background-color: "+colors.c_2+";"
    socket.emit("data_load","tercume");
}



export{user,colors,tercume_data};