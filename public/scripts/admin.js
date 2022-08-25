////////////////////////
////////////////////////
//      data load     //
////////////////////////
////////////////////////
let socket = io();
let menolar = [];

let meno_ekle;
// socket.emit("data_save","menolar",JSON.stringify(meno_ekle));
socket.emit("data_load","menolar");
socket.on("data_load",(database,data)=> {
    if (database == "menolar") {
        menolar = JSON.parse(data);
        console.log(menolar);
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
    this.m_add_paszamine_s = CrateElement("div","","m_add_paszamine_s");
    this.m_add_paszamine_s.style.cssText = "position: relative;float: left;width: 90%;height: 40vw;background-color: #adebf000;margin-left: 5%;margin-top: 20%;",
    this.text = CrateElement("input","","m_add_text","","text");
    this.text.style.cssText = " position: absolute;font-size: 5vw;width: 98%;height: 12vw;border: solid .5vw "+colors.c_4+";padding: .2vw;background-color: "+colors.c_1+";color: "+colors.c_3+";top: 14vw;";
    this.text.setAttribute("maxlength","20");
    this.file = CrateElement("input","","m_add_file","","file");
    this.lable = CrateElement("lable","","m_add_lable");
    this.lable.setAttribute("for","m_add_file");
    this.lable.style.cssText = " position: absolute;width: 100%;height: 12vw;background-color: "+colors.c_1+";";
    this.icon = CrateElement("span","add_photo_alternate","m_add_icon","material-symbols-rounded");
    this.icon.style.cssText = "font-size: 12vw;color: "+colors.c_4+";margin-left: 40%;";
    this.button = CrateElement("input","","m_add_button","","button");
    this.button.value = "save";
    this.button.style.cssText = " position: absolute;width: 100%;height: 13vw;background-color: "+colors.c_1+";color: "+colors.c_4+";font-size: 6vw;border: solid .5vw "+colors.c_4+";top: 30vw;";

    this.Crate();
    this.ekle_icon.style.left = (innerWidth - this.ekle_icon.getBoundingClientRect().width-navarabzar.paszamine.getBoundingClientRect().width-innerWidth/100*2)+"px"
    this.m_add_paszamine_s.style.marginTop = this.ekle_icon.getBoundingClientRect().height*2+"px";
    this.m_add_paszamine_s.style.height = AndazeBaraks(90,70)-this.ekle_icon.getBoundingClientRect().height*2+"px";

    this.m_add_paszamine.addEventListener("touchend",(e)=> {
        if (e.changedTouches[0].pageY < this.m_add_paszamine_s.getBoundingClientRect().y || e.changedTouches[0].pageY > this.m_add_paszamine_s.getBoundingClientRect().y+this.m_add_paszamine_s.getBoundingClientRect().height*1.5) {
            this.m_add_paszamine.style.display = "none";
        }
        console.log(e.changedTouches[0].pageY)
    })
    this.ekle_icon.addEventListener("click",(e)=> {
        e.stopPropagation();
        this.m_add_paszamine.style.display = "flex";
    })
    this.button.addEventListener("click",(e)=> {
        e.stopPropagation();
        let reder = new FileReader();
        reder.addEventListener("load",()=> {
            console.log(reder.result);
        })
        // reder.readAsDataURL(this.file.files)
        menolar.push({meno_name: this.text.value,img: "121212ff"});
        socket.emit("data_save","menolar",JSON.stringify(menolar));
        this.m_add_paszamine.style.display = "none";
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
    this.lable.appendChild(this.icon);
}
meno_ekle = new MenoEkle();