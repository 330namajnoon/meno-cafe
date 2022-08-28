let socket = io();
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
    this.eror = document.createElement("h1");
    this.eror.innerHTML = "lutfen hepsini doldurun";
    this.eror.style.cssText = "display: none;font-size: 6vw;color: red;";
    this.paszamine = document.createElement("div");
    this.paszamine.style.cssText = "text-align: center;width: 100%;height: "+innerHeight+"px;background-color: "+colors.c_2+";";
    this.paszamine_s = document.createElement("div");
    this.paszamine_s.style.cssText = "text-align: center;position: absolute;margin-top: 20%;margin-left: 10%;width: 80%;height: auto;";
    this.name = document.createElement("input");
    this.name.style.cssText = "border-radius: 3vw;margin-top: 5vw;width: 100%;height: 10vw;background-color: "+colors.c_4+"; border: solid .5vw "+colors.c_3+"; color: "+colors.c_1+";font-size: 8vw;";
    this.name.type = "text";
    this.name.setAttribute("placeholder","name ...");
    this.lastname = document.createElement("input");
    this.lastname.style.cssText = "border-radius: 3vw;margin-top: 5vw;width: 100%;height: 10vw;background-color: "+colors.c_4+"; border: solid .5vw "+colors.c_3+"; color: "+colors.c_1+";font-size: 8vw;";
    this.lastname.type = "text";
    this.lastname.setAttribute("placeholder","last name ...");
    this.imail = document.createElement("input");
    this.imail.style.cssText = "border-radius: 3vw;margin-top: 5vw;width: 100%;height: 10vw;background-color: "+colors.c_4+"; border: solid .5vw "+colors.c_3+"; color: "+colors.c_1+";font-size: 8vw;";
    this.imail.type = "text";
    this.imail.setAttribute("placeholder","imail ...");
    this.lisens = document.createElement("input");
    this.lisens.style.cssText = "border-radius: 3vw;margin-top: 5vw;width: 100%;height: 10vw;background-color: "+colors.c_4+"; border: solid .5vw "+colors.c_3+"; color: "+colors.c_1+";font-size: 8vw;";
    this.lisens.type = "text";
    this.lisens.setAttribute("placeholder","lisens ...");
    this.save = document.createElement("input");
    this.save.style.cssText = "border-radius: 3vw;margin-top: 5vw;width: 100%;height: 15vw;background-color: "+colors.c_4+"; border: solid .5vw "+colors.c_3+"; color: "+colors.c_1+";font-size: 8vw;";
    this.save.type = "button";
    this.save.value = "save";
    this.Crate();
    this.save.addEventListener("click",(e)=> {
        e.stopPropagation();
        if (this.name != "" && this.lastname != "" && this.imail != "" && this.lisens != ""  ) {
            user = {name: this.name.value,lastname: this.lastname.value,imail: this.imail.value,lisens: this.lisens.value};
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
    this.paszamine_s.appendChild(this.lisens);
    this.paszamine_s.appendChild(this.save);
}
function userSave(data) {
  
    if (data.lisens == lisens && ObjectSerch("imail",data.imail,users_data) == false) {
        users_data.push(data);
        console.log(users_data);
        socket.emit("data_save","admin_users",JSON.stringify(users_data));
        localStorage.setItem("user",JSON.stringify(user));
        let admin_ad = [];
        socket.emit("admin_ad",data.imail+data.lisens+"menolar",JSON.stringify(admin_ad));
        socket.emit("admin_ad",data.imail+data.lisens+"urunler",JSON.stringify(admin_ad));
        socket.emit("admin_ad",data.imail+data.lisens+"qrcodes",JSON.stringify(admin_ad));
        open(location.href);
    }else {
        sigin.eror.style.display = "grid";
    }
}

user = localStorage.getItem("user");
if (user == null) {
    document.getElementById("body").innerHTML = "";
    sigin = new Sigin();
}

