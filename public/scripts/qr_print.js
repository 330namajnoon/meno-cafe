import{user} from "./admin.js";
document.getElementById("body").innerHTML = "";
console.log(user);       
let img = document.createElement("img");
img.id = "img";
let socket = io();
let id = location.search;
let id1 = id.replace("?url=","");
console.log(id1);
let qr_data = [];
socket.emit("data_load",""+user.imail+user.lisens+"qrcodes");
socket.on("data_load",(database,data) => {
    
    qr_data = JSON.parse(data);
    console.log(qr_data)
    qr_data.forEach(element => {
        if (Number(element.id) == Number(id1) ) {
            img.src = element.url;
            document.getElementById("body").appendChild(img);
            img.addEventListener("load",(e) => {
                console.log(e)
                print()
            })
            
        }
    });
})