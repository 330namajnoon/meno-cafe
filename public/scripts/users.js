/////// imports

import {araye_element_remove,SerchId,ID_ara,CrateElement,AndazeBaraks,filter,Tarih_Ara,ChengeElements} from "./acharfaranse.js";



///////////////////
///////////////////
//   elements    //
///////////////////
///////////////////
let marca,admin,masa_no,colors,font,paszamine,menolar,urunler,siparis_ekle,sabad,login,username;
///////////////////
///////////////////
//   data load   //
///////////////////
///////////////////
let socket = io();
let sabad_data = [];
let menolar_data = [];
let urunler_data = [];
let siparisler_data = [];


socket.emit("data_load","admin_users");

socket.on("data_load",(database,data) => {
    if (database == "admin_users" && data != null) {
        let admin_users_data = JSON.parse(data);
        let url = location.search;
        let url1 = new URLSearchParams(url);
        let url2 = url1.get("data");
        let u_m = url2.split("==");
        admin_users_data.forEach(element => {
            if(element.imail == u_m[1]) {
                admin = element.imail+element.lisens;
                masa_no = u_m[0];
                colors = element.colors;
                font = element.fonts.font;
                marca = element.marca;
                if(localStorage.getItem("username") !== null ) {
                paszamine = new Paszamine();
                socket.emit("data_load",""+admin+"menolar");
                socket.emit("data_load",""+admin+"siparisler");
                let username_ = JSON.parse(localStorage.getItem("username"));
                username = username_.user_name;
                }else {
                    login = new Login();
                }
            }
        });
    }
    if (database == ""+admin+"menolar") {
        if(data != "") {
            menolar_data = JSON.parse(data);
        }
        
        paszamine.paszamine_s.innerHTML = "";
        menolar = new Menolar();
        
    }
    if (database == ""+admin+"urunler") {
        if(data != "") {
            urunler_data = JSON.parse(data);
        }
        paszamine.paszamine_s.innerHTML = "";
        urunler = new Urunler();
    }
    if (database == ""+admin+"siparisler") {
        if(data != "") {
            siparisler_data = JSON.parse(data);
        }
        
    }
})

socket.on("data_load_s",(database,data,data2) => {
   
    if(database == ""+admin+"siparisler") {
        
        siparisler_data = JSON.parse(data);
        sabad_data.forEach(e => {
            e.id = ID_ara(siparisler_data);
            siparisler_data.push(e);
        })
        socket.emit("data_save_s",""+admin+"siparisler",JSON.stringify(siparisler_data));
    }
    if(database == ""+admin+"users") {
        
        let users_data = JSON.parse(data);
        let durum = false;
        users_data.forEach(e => {
            if(e.imail == data2.imail) {
                durum = true;
            }
        })
        if(durum == false) {
            users_data.push({id: ID_ara(users_data),user_name: data2.username,imail: data2.imail});
            localStorage.setItem("username",JSON.stringify({id: ID_ara(users_data),user_name: data2.username,imail: data2.imail}));
            socket.emit("data_save",""+admin+"users",JSON.stringify(users_data));
            paszamine = new Paszamine();
            socket.emit("data_load",""+admin+"menolar");
            socket.emit("data_load",""+admin+"siparisler");
            username = data2.username;

        }else {
            localStorage.setItem("username",JSON.stringify({id: ID_ara(users_data),user_name: data2.username,imail: data2.imail}));
            paszamine = new Paszamine();
            socket.emit("data_load",""+admin+"menolar");
            socket.emit("data_load",""+admin+"siparisler");
            username = data2.username;

        }
        sabad_data.forEach(e => {
            e.id = ID_ara(siparisler_data);
            siparisler_data.push(e);
        })
        
    }
})
socket.on("data_save_s",(database,data) => {
   
    if(database == ""+admin+"siparisler") {
        socket.emit("user_siparis");
        socket.emit("data_load",""+admin+"menolar");
        sabad_data = [];
    }
})

///////////////////
///////////////////
//   paszamine   //
///////////////////
///////////////////
window.addEventListener("resize" , () => {
    paszamine.paszamine.style.width = innerWidth+"px";
    paszamine.paszamine.style.height = innerHeight+"px";
})
function Paszamine() {
    this.styles = {
        paszamine: ""+font+"width: "+innerWidth+"px;height: "+innerHeight+"px;float: left;",
        sartitr: "text-align: center;width: 100%;height: 20vw;background: "+colors.c_1+";float: left;",
        paszamine_s: "width: 100%;height: 100%;background: "+colors.c_2+";float: left;",
        spans: "font-size: 15vw;float: left;margin-top: 2vw;margin-left: 2%;color: "+colors.c_4+";",
        sabad_adad: "position: absolute;font-size: 6vw;top: 3.5vw;left: 89%;color: "+colors.c_1+";margin:0;display: none",
        marca: "position: absolute;font-size: 10vw;color: "+colors.c_4+";margin: 0"

    }
    
    this.paszamine = CrateElement("div");
    this.paszamine.style.cssText = this.styles.paszamine;
    this.sartitr = CrateElement("div");
    this.sartitr.style.cssText = this.styles.sartitr;
    this.paszamine_s = CrateElement("div");
    this.paszamine_s.style.cssText = this.styles.paszamine_s;
    this.home_span = CrateElement("span","home","","material-symbols-rounded");
    this.home_span.style.cssText = this.styles.spans;
    this.sabad_span = CrateElement("span","shopping_cart","","material-symbols-rounded");
    this.sabad_span.style.cssText = this.styles.spans+";float: right;margin-right: 2%;";
    this.sabad_adet = CrateElement("h1","0");
    this.sabad_adet.style.cssText = this.styles.sabad_adad;

    this.marca = CrateElement("h1",marca);
    this.marca.style.cssText = this.styles.marca;


    this.Crate();
    if(this.marca.getBoundingClientRect().width > innerWidth/1.4) {

        let val1 = innerWidth/1.6;
        let val2 = this.marca.getBoundingClientRect().width;
        let val3 = val2 / val1;
        let val4 = this.marca.style.fontSize;
        let val5 = Number(val4.replace("vw",""));
        let val6 = val5 / val3;

        this.marca.style.fontSize = val6+"vw";
        
   }
    this.marca.style.left = (innerWidth/2)-(this.marca.getBoundingClientRect().width/2)+"px";
    this.marca.style.top = (this.sartitr.getBoundingClientRect().height/2)-(this.marca.getBoundingClientRect().height/2)+"px";

    this.home_span.addEventListener("click",(e) => {
        e.stopPropagation();
        socket.emit("data_load",""+admin+"menolar");
    })
    this.sabad_span.addEventListener("click",(e) => {
        if(this.sabad_adet.innerHTML !== "0") {
        this.paszamine_s.innerHTML = "";
        sabad = new Sabad();
        }
    })
    
}
Paszamine.prototype.style = function() {
    this.paszamine.style.cssText = this.styles.paszamine;
}
Paszamine.prototype.Crate = function() {
    document.getElementById("body").innerHTML = "";
    document.getElementById("body").appendChild(this.paszamine);
    this.paszamine.appendChild(this.sartitr);
    this.paszamine.appendChild(this.paszamine_s);
    this.sartitr.appendChild(this.home_span);
    this.sartitr.appendChild(this.marca);
    this.sartitr.appendChild(this.sabad_span);
    this.sartitr.appendChild(this.sabad_adet);
}

///////////////////
///////////////////
//   menolar     //
///////////////////
///////////////////



function Menolar() {
    function Meno(id_,name_,img_) {
        this.id = id_;
        this.paszamine = CrateElement("div","","meno_div");
        this.img = CrateElement("img","","meno_img");
        this.img.src = "./images/"+img_;
        this.h1_div = CrateElement("div","","meno_h1_div");
        this.h1_div.style.backgroundColor = colors.c_1+"84";
        this.h1 = CrateElement("h1",name_,"meno_h1");
        this.h1.style.color = colors.c_3;
        this.paszamine.appendChild(this.img);
        this.paszamine.appendChild(this.h1_div);
        this.h1_div.appendChild(this.h1);
        this.paszamine.addEventListener("click",()=> {
            localStorage.setItem("meno_id",this.id);
            socket.emit("data_load",""+admin+"urunler");
        })
    }
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
    this.paszamine.style.cssText = " width: 100%;overflow-y: scroll;margin-top: 5vw"
    this.paszamine.style.height = innerHeight-this.paszamine.getBoundingClientRect().y+"px";
    
}
Menolar.prototype.Crate = function() {

    paszamine.paszamine_s.appendChild(this.paszamine);
    this.meno.forEach(element => {
        this.paszamine.appendChild(element.paszamine);
        
    });
}

///////////////////
///////////////////
//   urunler     //
///////////////////
///////////////////


function Urunler() {
    function Urun(id_,name_,img_,aciklama_,fiyat_,meno_id_) {
        this.id = id_;
        this.url = img_;
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
        this.h1_fiyat = CrateElement("h1",""+fiyat_+" €","meno_h1");
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
            paszamine.paszamine_s.innerHTML = "";
            siparis_ekle = new Siparis_ekle({urun_adi: this.name,aciklama: this.aciklama,fiyat: this.fiyat},this.url);
        })
    }
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
    this.paszamine.style.cssText = " width: 100%;margin-top: 5vw;overflow-y: scroll;"
    this.paszamine.style.height = innerHeight-this.paszamine.getBoundingClientRect().y+"px";
    
}
Urunler.prototype.Crate = function() {
    paszamine.paszamine_s.appendChild(this.paszamine);
    this.meno.forEach(element => {
        this.paszamine.appendChild(element.paszamine);
        
    });
}

///////////////////
///////////////////
// siparis ekle  //
///////////////////
///////////////////
function Siparis_ekle(data,img) {
    this.data = data;
    this.img_url = img;
    this.styles = {
        paszamine: "width: 100%;height: 100%;float: left;position: relative;",
        back_span: "margin-left: 2%;margin-top: ,5vw;float: left;font-size: 15vw;color: "+colors.c_3+";position: relative;",
        img: "float: left;width: 100%;height: 100%;position: absolute;top: 0;left: 0;object-fit: cover;filter: blur(2vw);",
        div: "position: relative;width: 100%;height: auto;font-size: 10vw;background-color: "+colors.c_4+";color: "+colors.c_1+";border: solid .5vw "+colors.c_1+";float: left;margin-top: 8vw;text-align: center;",
        masomenos: "margin-left: 9%;border-radius: 30vw;position: relative;width: 20vw;height: 20vw;font-size: 17vw;background-color: "+colors.c_1+";color: "+colors.c_3+";border: solid .5vw "+colors.c_3+";float: left;margin-top: 8vw;text-align: center;"
        
    }
    this.paszamine = CrateElement("div");
    this.paszamine.style.cssText = this.styles.paszamine;
    this.back_span = CrateElement("span","reply","","material-symbols-rounded")
    this.back_span.style.cssText = this.styles.back_span;
    this.img = CrateElement("img");
    this.img.src = "../images/"+this.img_url;
    this.img.style.cssText = this.styles.img;
    this.urun_name = CrateElement("div",""+this.data.urun_adi+"");
    this.urun_name.style.cssText = this.styles.div;

    this.menos = CrateElement("div","-");
    this.menos.style.cssText = this.styles.masomenos+";font-size: 15vw;";

    this.adet = CrateElement("div","0");
    this.adet.style.cssText = this.styles.masomenos;

    this.mas = CrateElement("div","+");
    this.mas.style.cssText = this.styles.masomenos;

    this.aciklama = CrateElement("div",""+this.data.aciklama+"");
    this.aciklama.style.cssText = this.styles.div;

    this.fiyat = CrateElement("div",""+this.data.fiyat+" €");
    this.fiyat.style.cssText = this.styles.div;

    

    this.aciklama_ekle = CrateElement("input","","","","text");
    this.aciklama_ekle.setAttribute("placeholder","explicacion...");
    this.aciklama_ekle.style.cssText = this.styles.div+";font-size: 5vw;height: 10vw";

    this.save = CrateElement("input","","","","button");
    this.save.value = "confirmar";
    this.save.style.cssText = this.styles.masomenos+";height: 18vw;width: 60%;border-radius: 2vw;font-size: 7vw;margin-left: 20%";
    
    this.Crate();
    this.mas.addEventListener("click",(e) => {
        e.stopPropagation();
        let adet = Number(this.adet.innerHTML);
        adet++;
        this.adet.innerHTML = adet;
    })
    this.menos.addEventListener("click",(e) => {
        if(Number(this.adet.innerHTML > 0)) {
        e.stopPropagation();
        let adet = Number(this.adet.innerHTML);
        adet--;
        this.adet.innerHTML = adet;
        }
    })
    this.save.addEventListener("click",(e) => {
        e.stopPropagation();
        if(this.adet.innerHTML !== "0") {
            paszamine.sabad_adet.style.display = "grid";
            let sabad = Number(paszamine.sabad_adet.innerHTML);
            sabad += Number(this.adet.innerHTML);
            paszamine.sabad_adet.innerHTML = sabad;
            let date = new Date();
            let yil = date.getFullYear();
            let ay = date.getMonth()+1;
            let gun = date.getDate();
            let data_ = {
                id: ID_ara(sabad_data),
                musteri_adi: username,
                urun_adi: this.data.urun_adi,
                aciklama: this.data.aciklama,
                fiyat: this.data.fiyat,
                adet: this.adet.innerHTML,
                masa_no: masa_no,
                tarih: yil+"-"+ay+"-"+gun,
                img: this.img_url
            };
            if(this.aciklama_ekle.value != "") {
                data_.aciklama = this.aciklama_ekle.value;
            }
            
            sabad_data.push(data_);
           
            socket.emit("data_load",""+admin+"urunler");
        }
        
        
    })
    this.back_span.addEventListener("click",(e) => {
        e.stopPropagation();
        socket.emit("data_load",""+admin+"urunler");
    })
    
}
Siparis_ekle.prototype.Crate = function() {
    paszamine.paszamine_s.appendChild(this.paszamine);
    this.paszamine.appendChild(this.img);
    this.paszamine.appendChild(this.back_span);
    this.paszamine.appendChild(this.urun_name);
    this.paszamine.appendChild(this.aciklama);
    this.paszamine.appendChild(this.fiyat);
    this.paszamine.appendChild(this.menos);
    this.paszamine.appendChild(this.adet);
    this.paszamine.appendChild(this.mas);
    this.paszamine.appendChild(this.aciklama_ekle);
    this.paszamine.appendChild(this.save);
}

///////////////////
///////////////////
// sabad kharid  //
///////////////////
///////////////////
function Sabad() {
    function sabad(data) {
        this.data = data;
        this.styles = {
            paszamine: "border-radius: 8vw;margin-left: 7.5%;margin-top: 5vw;width: 85%;height: auto;float: left;position: relative;border: solid .5vw "+colors.c_1+";",
            back_span: "margin-left: 2%;margin-top: 2vw;font-size: 10vw;color: "+colors.c_3+";position: relative;",
            img: "border-radius: 8vw;float: left;width: 100%;height: 100%;position: absolute;top: 0;left: 0;object-fit: cover;filter: blur(1vw);",
            div: "position: relative;width: 99%;height: auto;font-size: 10vw;background-color: "+colors.c_4+";color: "+colors.c_1+";border: solid .5vw "+colors.c_1+";float: left;margin-top: 8vw;text-align: center;",
            masomenos: "border-radius: 0vw 0 7vw 7vw;position: relative;width: 20vw;height: auto;background-color: "+colors.c_1+";color: "+colors.c_3+";float: left;margin-top: 8vw;text-align: center;"
            
        }
        this.paszamine = CrateElement("div");
        this.paszamine.style.cssText = this.styles.paszamine;

        this.img = CrateElement("img");
        this.img.src = "../images/"+this.data.img;
        this.img.style.cssText = this.styles.img;
        this.urun_name = CrateElement("div",""+this.data.urun_adi+"");
        this.urun_name.style.cssText = this.styles.div;
        
        if(Number(this.data.adet) == 1) {
            this.adet = CrateElement("div",""+this.data.adet+" pieza");
        }else {
            this.adet = CrateElement("div",""+this.data.adet+" piezas");
        }
        this.adet.style.cssText = this.styles.div;
        
    
        this.aciklama = CrateElement("div",""+this.data.aciklama+"");
        this.aciklama.style.cssText = this.styles.div;
    
        this.fiyat = CrateElement("div",""+Number(this.data.adet)*Number(this.data.fiyat)+" €");
        this.fiyat.style.cssText = this.styles.div;

        this.delete = CrateElement("div");
        this.delete.style.cssText = this.styles.masomenos+";height: auto;width: 100%;font-size: 7vw";
        this.delete_span = CrateElement("span","delete","","material-symbols-rounded")
        this.delete_span.style.cssText = this.styles.back_span;
        
        this.Crate();
        this.delete.addEventListener("click",(e) => {
            sabad_data = araye_element_remove(sabad_data,this.data.id,"id");
            paszamine.paszamine_s.innerHTML = "";
            paszamine.sabad_adet.innerHTML = ""+(Number(paszamine.sabad_adet.innerHTML)-Number(this.data.adet))+"";
            sabad = new Sabad();
            if (Number(paszamine.sabad_adet.innerHTML) <= 0) {
                socket.emit("data_load",""+admin+"menolar");
            }
        })
       
        
    }
    sabad.prototype.Crate = function() {
        this.paszamine.appendChild(this.img);
        this.paszamine.appendChild(this.urun_name);
        this.paszamine.appendChild(this.aciklama);
        this.paszamine.appendChild(this.adet);
        this.paszamine.appendChild(this.fiyat);
        this.paszamine.appendChild(this.delete);
        this.delete.appendChild(this.delete_span);
        
    }
    this.styles = {
        paszamine: "overflow-y: auto;width: 100%;height: 85%;float: left;position: relative;",
        back_span: "margin-left: 2%;margin-top: ,5vw;float: left;font-size: 15vw;color: "+colors.c_3+";position: relative;",
        img: "float: left;width: 100%;height: 100%;position: absolute;top: 0;left: 0;object-fit: cover;filter: blur(2vw);",
        div: "position: relative;width: 100%;height: auto;font-size: 10vw;background-color: "+colors.c_4+";color: "+colors.c_1+";border: solid .5vw "+colors.c_1+";float: left;margin-top: 8vw;text-align: center;",
        masomenos: "margin-left: 9%;border-radius: 30vw;position: relative;width: 20vw;height: 20vw;font-size: 17vw;background-color: "+colors.c_1+";color: "+colors.c_3+";border: solid .5vw "+colors.c_3+";float: left;margin-top: 8vw;text-align: center;"
        
    }
    this.paszamine = CrateElement("div");
    this.paszamine.style.cssText = this.styles.paszamine;
    this.save = CrateElement("input","","","","button");
    this.toplamfiyati = 0;
   
    sabad_data.forEach(e => {
        this.toplamfiyati += (Number(e.adet)*Number(e.fiyat));
    })
    this.save.value = "orden "+this.toplamfiyati+" €";
    this.save.style.cssText = this.styles.masomenos+";height: 18vw;width: 60%;border-radius: 2vw;font-size: 7vw;margin-left: 20%";
    this.siparis = [];
    sabad_data.forEach(e => {
        this.siparis.push(new sabad(e));
    })
    this.Crate();
    this.save.addEventListener("click",(e) => {
        e.stopPropagation();
        paszamine.sabad_adet.innerHTML = "0";
        paszamine.sabad_adet.style.display = "none";
        socket.emit("data_load_s",""+admin+"siparisler");
    })
}
Sabad.prototype.Crate = function() {
    paszamine.paszamine_s.appendChild(this.paszamine);
   
    this.siparis.forEach(e => {
        this.paszamine.appendChild(e.paszamine);
    })
    this.paszamine.appendChild(this.save);

}

///////////////////
///////////////////
//     login     //
///////////////////
///////////////////

function Login() {
    this.styles = {
        s1: "border-radius: 3vw;margin-top: 5vw;width: 100%;height: 10vw;background-color: "+colors.c_4+"; border: solid .5vw "+colors.c_3+"; color: "+colors.c_1+";font-size: 5vw;"
    }
    this.eror = document.createElement("h1");
    this.eror.innerHTML = "lutfen hepsini doldurun";
    this.eror.style.cssText = "display: none;font-size: 6vw;color: red;";
    this.paszamine = document.createElement("div");
    this.paszamine.style.cssText = "text-align: center;width: 100%;height: "+innerHeight+"px;background-color: "+colors.c_2+";";
    this.paszamine_s = document.createElement("div");
    this.paszamine_s.style.cssText = "text-align: center;position: absolute;margin-top: 35%;margin-left: 10%;width: 80%;height: auto;";
    this.imail = document.createElement("input");
    this.imail.style.cssText = this.styles.s1;
    this.imail.type = "text";
    this.imail.setAttribute("placeholder","imail ...");
    this.username = document.createElement("input");
    this.username.style.cssText = this.styles.s1;
    this.username.type = "text";
    this.username.setAttribute("placeholder","nombre de usuario ...");
   
    this.save = document.createElement("input");
    this.save.style.cssText = this.styles.s1+";height: 15vw;font-size: 7vw;width: 90%;margin-left: 5%;margin-top: 8vw";
    this.save.type = "button";
    this.save.value = "iniciar";

    this.sigin = document.createElement("a");
    this.sigin.innerHTML = "SIGINUP";
    this.sigin.style.cssText = "font-size: 7vw;color: "+colors.c_1+";position: absolute;left:35%;top:120%";
    this.sigin.addEventListener("click",(e) => {
        e.stopPropagation();
        document.getElementById("body").innerHTML = "";
        sigin = new Sigin();
    })
    this.Crate();
    this.save.addEventListener("click",(e)=> {
        e.stopPropagation();
       
            if (this.imail.value !== "" &&  this.username.value !== "") {
                socket.emit("data_load_s",""+admin+"users",{username: this.username.value,imail: this.imail.value});
            }else {
                this.eror.style.display = "grid";
            }
    
       
       
    })
}
Login.prototype.Crate = function() {
    document.getElementById("body").appendChild(this.paszamine);
    this.paszamine.appendChild(this.paszamine_s);
    this.paszamine_s.appendChild(this.eror);
    this.paszamine_s.appendChild(this.username);
    this.paszamine_s.appendChild(this.imail);
    
    this.paszamine_s.appendChild(this.save);
    
}






