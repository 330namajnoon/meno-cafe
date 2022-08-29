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


export{araye_element_remove,SerchId,ID_ara,colors,CrateElement,AndazeBaraks,filter};