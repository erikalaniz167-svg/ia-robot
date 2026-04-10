import fetch from "node-fetch";

const FIREBASE_URL = "https://robotbuzon-default-rtdb.firebaseio.com";

function IA(msg){

  msg = msg.toLowerCase();

  if(msg.includes("hola")) return "Hola hermosa";
  if(msg.includes("amor")) return "Te quiero mucho";
  if(msg.includes("quien eres")) return "Soy tu robot";
  if(msg.includes("adios")) return "Adios preciosa";

  const respuestas = [
    "Estoy pensando...",
    "Dime mas",
    "Eso suena interesante",
    "No entendi pero me gusta"
  ];

  return respuestas[Math.floor(Math.random()*respuestas.length)];
}

async function loop(){

  try{

    let res = await fetch(FIREBASE_URL + "/chat/mensaje.json");
    let msg = await res.json();

    if(msg){

      console.log("Mensaje:", msg);

      let respuesta = IA(msg);

      await fetch(FIREBASE_URL + "/chat/respuesta.json", {
        method: "PUT",
        body: JSON.stringify(respuesta)
      });

      await fetch(FIREBASE_URL + "/chat/mensaje.json", {
        method: "PUT",
        body: "null"
      });

    }

  }catch(e){
    console.log("ERROR:", e);
  }

}

setInterval(loop, 2000);