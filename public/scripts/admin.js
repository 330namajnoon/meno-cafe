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

///////////////////////
////////////////////////
//    navar abzar    //
////////////////////////
////////////////////////
let navarabzar;
function NavarAbzar() {
    function Abzar(name) {
        let icon = CrateElement("span",name,"","material-symbols-rounded");
        icon.style.cssText = "font-size: "+AndazeBaraks(10,15)+"px;color: goldenrod;margin-left: 10%;margin-top: "+AndazeBaraks(5,10)+"px;margin-bottom: "+AndazeBaraks(5,10)+"px;";
        return icon;
    }
    this.paszamine = CrateElement("div");
    this.paszamine.style.cssText = "width: "+AndazeBaraks(15,20)+"px;height: 100%;background-color: rgb(0, 0, 0);"
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
paszamine.style.cssText = "position: absolute;width: "+(innerWidth-navarabzar.paszamine.style.width)+"px;height: 100%;left: "+navarabzar.paszamine.style.width+"px;top: 10px;background-color: aqua;"
paszamine.appendChild(paszamine_s);