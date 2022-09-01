let socket = io();
import {ID_ara} from "./acharfaranse.js";
import {colors} from "./admin.js";
let user;
let lisens;
let users_data = []
socket.emit("data_load","admin_users");
socket.on("data_load",(database,data)=> {
    if (database == "admin_users") {
        users_data = JSON.parse(data);
    }
   
})
function ObjectSerch(object,string,element) {
    let durum = false;
    element.forEach(e => {
        if(e[object] == string) {
            durum = true;
        }
    });
    return durum;
} 
let sigin,login;
function Sigin() {
    this.styles = {
        s1: "border-radius: 3vw;margin-top: 5vw;width: 100%;height: 10vw;background-color: "+colors.c_4+"; border: solid .5vw "+colors.c_3+"; color: "+colors.c_1+";font-size: 5vw;"
    }
    this.eror = document.createElement("h1");
    this.eror.innerHTML = "lutfen hepsini doldurun";
    this.eror.style.cssText = "display: none;font-size: 6vw;color: red;";
    this.paszamine = document.createElement("div");
    this.paszamine.style.cssText = "text-align: center;width: 100%;height: "+innerHeight+"px;background-color: "+colors.c_2+";";
    this.paszamine_s = document.createElement("div");
    this.paszamine_s.style.cssText = "text-align: center;position: absolute;margin-top: 20%;margin-left: 10%;width: 80%;height: auto;";
    this.name = document.createElement("input");
    this.name.style.cssText = this.styles.s1;
    this.name.type = "text";
    this.name.setAttribute("placeholder","name ...");
    this.lastname = document.createElement("input");
    this.lastname.style.cssText = this.styles.s1;
    this.lastname.type = "text";
    this.lastname.setAttribute("placeholder","last name ...");
    this.imail = document.createElement("input");
    this.imail.style.cssText = this.styles.s1;
    this.imail.type = "text";
    this.imail.setAttribute("placeholder","imail ...");
    this.sifre = document.createElement("input");
    this.sifre.style.cssText = this.styles.s1;
    this.sifre.type = "password";
    this.sifre.setAttribute("placeholder","password ...");
    this.sifre_s = document.createElement("input");
    this.sifre_s.style.cssText = this.styles.s1;
    this.sifre_s.type = "password";
    this.sifre_s.setAttribute("placeholder","repeat the password ...");
    this.lisens = document.createElement("input");
    this.lisens.style.cssText = this.styles.s1;
    this.lisens.type = "text";
    this.lisens.setAttribute("placeholder","lisens ...");
    this.save = document.createElement("input");
    this.save.style.cssText = this.styles.s1+";height: 15vw;font-size: 7vw;width: 90%;margin-left: 5%;margin-top: 8vw";
    this.save.type = "button";
    this.save.value = "Sigin up";
    this.login = document.createElement("a");
    this.login.innerHTML = "LOGIN";
    this.login.style.cssText = "font-size: 7vw;color: "+colors.c_1+";position: absolute;left:40%;top:110%";
    this.login.addEventListener("click",(e) => {
        e.stopPropagation();
        document.getElementById("body").innerHTML = "";
        login = new Login();
    })
    this.Crate();
    this.save.addEventListener("click",(e)=> {
        e.stopPropagation();
        if (this.name.value != "" && this.lastname.value != "" && this.imail.value != "" && this.lisens.value != "" &&this.sifre.value != ""&& this.sifre_s.value != "" && this.sifre.value == this.sifre_s.value) {
            user = {id: ID_ara(users_data),name: this.name.value,lastname: this.lastname.value,imail: this.imail.value,password: this.sifre.value,lisens: this.lisens.value,colors:{c_1: "#906A50",c_2: "#E5B480",c_3: "#4DDDE0",c_4: "#ADEBF0"}};
            socket.emit("data_load","lisens");
            socket.on("data_load",(database,data)=> {
                lisens = JSON.parse(data);
                userSave(user);
            })
        }else {
            this.eror.style.display = "grid";
        }
    })
}
Sigin.prototype.Crate = function() {
    document.getElementById("body").appendChild(this.paszamine);
    this.paszamine.appendChild(this.paszamine_s);
    this.paszamine_s.appendChild(this.eror);
    this.paszamine_s.appendChild(this.name);
    this.paszamine_s.appendChild(this.lastname);
    this.paszamine_s.appendChild(this.imail);
    this.paszamine_s.appendChild(this.sifre);
    this.paszamine_s.appendChild(this.sifre_s);
    this.paszamine_s.appendChild(this.lisens);
    this.paszamine_s.appendChild(this.save);
    this.paszamine_s.appendChild(this.login);
}
function userSave(data) {
  
    if (data.lisens == lisens && ObjectSerch("imail",data.imail,users_data) == false) {
        users_data.push(data);
        socket.emit("data_save","admin_users",JSON.stringify(users_data));
        localStorage.setItem("user",JSON.stringify(user));
        sessionStorage.setItem("user","true");
        let admin_ad = [];
        socket.emit("admin_ad",data.imail+data.lisens+"menolar",JSON.stringify(admin_ad));
        socket.emit("admin_ad",data.imail+data.lisens+"urunler",JSON.stringify(admin_ad));
        socket.emit("admin_ad",data.imail+data.lisens+"qrcodes",JSON.stringify(admin_ad));
        socket.emit("admin_ad",data.imail+data.lisens+"siparisler",JSON.stringify(admin_ad));
        socket.emit("admin_ad",data.imail+data.lisens+"kasa",JSON.stringify(admin_ad));
        socket.emit("admin_ad",data.imail+data.lisens+"users",JSON.stringify(admin_ad));
        open(location.href);
    }else {
        sigin.eror.style.display = "grid";
    }
}

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
    this.sifre = document.createElement("input");
    this.sifre.style.cssText = this.styles.s1;
    this.sifre.type = "password";
    this.sifre.setAttribute("placeholder","password ...");
   
    this.save = document.createElement("input");
    this.save.style.cssText = this.styles.s1+";height: 15vw;font-size: 7vw;width: 90%;margin-left: 5%;margin-top: 8vw";
    this.save.type = "button";
    this.save.value = "Login";

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
        let durum = false;
        users_data.forEach(e => {
            if (e.imail == this.imail.value && e.password == this.sifre.value) {
                let us = JSON.parse(localStorage.getItem("user"));
                if(us !== null) {
                    e.colors = us.colors
                }else {
                    e.colors = colors;
                }
            
                sessionStorage.setItem("user","true");
                localStorage.setItem("user",JSON.stringify(e));
                durum = true;
                open(location.href);
            }
        });
        if(durum == false) {
            this.eror.style.display = "grid";
        }
       
    })
}
Login.prototype.Crate = function() {
    document.getElementById("body").appendChild(this.paszamine);
    this.paszamine.appendChild(this.paszamine_s);
    this.paszamine_s.appendChild(this.eror);
    this.paszamine_s.appendChild(this.imail);
    this.paszamine_s.appendChild(this.sifre);
    this.paszamine_s.appendChild(this.save);
    this.paszamine_s.appendChild(this.sigin);
}

user = localStorage.getItem("user");

if(sessionStorage.getItem("user") == null) {
    document.getElementById("body").innerHTML = "";
    login = new Login();
}
if (user == null) {
    document.getElementById("body").innerHTML = "";
    sigin = new Sigin();
}


