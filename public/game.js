let socket = io();
let data = []
socket.on("data_load", (dataa) => {
    let data_s = JSON.parse(dataa);
    data = data_s
    console.log(data);

    data.forEach(element => {
        let img = document.createElement("img");
        img.src = element.img;
        img.className = "img";
        let text = document.createElement("h1");
        text.innerHTML = element.isim;
        document.getElementById("body").appendChild(img);
        document.getElementById("body").appendChild(text);

    });
})

let button = document.getElementById("button");

button.addEventListener("click", () => {

    let text = document.getElementById("text").value;
    let img = document.getElementById("file").files[0];
    let reder = new FileReader();
    reder.addEventListener("load", () => {



        data_save(text, reder.result);


    })
    reder.readAsDataURL(img);

})

function data_save(text, imgg) {
    data.push({ isim: text, img: imgg });
    let dataaa = JSON.stringify([{ isim: text, img: imgg }]);
    socket.emit("data_save", dataaa);


}