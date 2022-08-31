


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

function Tarih_Ara(data_,tarih1_,tarih2_) {
    let data = [];
    let tarih = [tarih1_,tarih2_];
    let tarih1 = [];
    let tarih2;
    
    tarih.forEach(e => {
        let tarih = e.split("-");
        tarih1.push({yil: Number(tarih[0]),ay: Number(tarih[1]),gun: Number(tarih[2])})
    });

    data_.forEach(e => {
        let tarih = e.tarih.split("-");
        tarih2 = {yil: Number(tarih[0]),ay: Number(tarih[1]),gun: Number(tarih[2])};
        if (tarih2.yil >= tarih1[0].yil && tarih2.ay >= tarih1[0].ay && tarih2.gun >= tarih1[0].gun&&
        tarih2.yil <= tarih1[1].yil && tarih2.ay <= tarih1[1].ay && tarih2.gun <= tarih1[1].gun) {
            data.push(e);
        }
    })

    return data;

}


export{araye_element_remove,SerchId,ID_ara,CrateElement,AndazeBaraks,filter,Tarih_Ara};