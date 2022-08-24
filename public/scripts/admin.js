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
        icon.style.cssText = "font-size: "+AndazeBaraks(20,20)+"px;color: goldenrod;margin-left: 0%;margin-top: 10vw;margin-bottom: 10vw;";
        return icon;
    }
    this.paszamine = CrateElement("div");
    this.paszamine.style.cssText = "width: "+AndazeBaraks(20,20)+"px;height: 100%;background-color: rgb(0, 0, 0);"
    this.home = Abzar("home");
    this.Crate();
}
NavarAbzar.prototype.Crate = function() {
    paszamine.appendChild(this.paszamine);
    this.paszamine.appendChild(this.home);
}
navarabzar = new NavarAbzar();