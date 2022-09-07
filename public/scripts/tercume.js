////////  imports 

import {Serchobject,araye_element_remove,SerchId,ID_ara,CrateElement,AndazeBaraks,filter,Tarih_Ara,ChengeElements} from "./acharfaranse.js";

/////// elements
let socket = io();


/////// donload datas

let tarcume_data = {
    turkce: {
        dil: "turkce",
        isyeri: "isyeri",
        ad: "ad",
        soyad: "soyad",
        meil: "meil",
        sifre: "sifre",
        tekrarsifre: "tekrar sifre",
        lisans: "lisans",
        giris: "giris",
        uyeol: "uye ol",
        meno_adi: "meno adi",
        kaydet: "kaydet",
        sil: "sil",
        urun_adi: "urun adi",
        fiyat: "fiyat",
        aciklama: "aciklama",
        kisi: "kisi",
        tarih: "tarih",
        siparis: "siparis",
        adet: "adet",
        tutar: "tutar",
        masa_no: "masa no",
        
    }
};
socket.emit("data_save","tercume",JSON.stringify(tarcume_data));





