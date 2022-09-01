/////// imports

import {araye_element_remove,SerchId,ID_ara,CrateElement,AndazeBaraks,filter,Tarih_Ara,ChengeElements} from "./acharfaranse.js";



///////////////////
///////////////////
//   elements    //
///////////////////
///////////////////
let admin,masa_no,colors,paszamine,menolar,urunler,siparis_ekle;
///////////////////
///////////////////
//   data load   //
///////////////////
///////////////////
let socket = io();
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
                paszamine = new Paszamine();
                socket.emit("data_load",""+admin+"menolar");
                socket.emit("data_load",""+admin+"siparisler");
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
        socket.emit("user_siparis");
    }
})

///////////////////
///////////////////
//   paszamine   //
///////////////////
///////////////////

function Paszamine() {
    this.styles = {
        paszamine: "width: "+innerWidth+"px;height: "+innerHeight+"px;float: left;",
        sartitr: "width: 100%;height: 20vw;background: "+colors.c_1+";float: left;",
        paszamine_s: "width: 100%;height: 100%;background: "+colors.c_2+";float: left;",
        spans: "font-size: 15vw;float: left;margin-top: 2vw;margin-left: 2%;color: "+colors.c_4+";",
        sabad_adad: "position: absolute;font-size: 6vw;top: 3.5vw;left: 89%;color: "+colors.c_1+";margin:0;display: none"
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


    this.Crate();

    this.home_span.addEventListener("click",(e) => {
        e.stopPropagation();
        socket.emit("data_load",""+admin+"menolar");
    })
}
Paszamine.prototype.Crate = function() {
    document.getElementById("body").appendChild(this.paszamine);
    this.paszamine.appendChild(this.sartitr);
    this.paszamine.appendChild(this.paszamine_s);
    this.sartitr.appendChild(this.home_span);
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
    this.save.value = "comprar";
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
        paszamine.sabad_adet.style.display = "grid";
        let sabad = Number(paszamine.sabad_adet.innerHTML);
        sabad += Number(this.adet.innerHTML);
        paszamine.sabad_adet.innerHTML = sabad;
            let date = new Date();
            let yil = date.getFullYear();
            let ay = date.getMonth()+1;
            let gun = date.getDate();
            let data_ = {
                id: ID_ara(siparisler_data),
                musteri_adi: "sina",
                urun_adi: this.data.urun_adi,
                aciklama: this.data.aciklama,
                fiyat: this.data.fiyat,
                adet: this.adet.innerHTML,
                masa_no: masa_no,
                tarih: yil+"-"+ay+"-"+gun
            };
            if(this.aciklama_ekle.value != "") {
                data_.aciklama = this.aciklama_ekle.value;
            }
            
            siparisler_data.push(data_);
            socket.emit("data_save",""+admin+"siparisler",JSON.stringify(siparisler_data));
            socket.emit("data_load",""+admin+"urunler");
        
        
        
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



