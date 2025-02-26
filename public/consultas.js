
import { devuelveDia } from "./extras/fecha.js";
import { postUsers,getUsers } from "./llamados.js";

const usuarios = await getUsers("usuarios")
const btnConsultas = document.getElementById("btnConsultas")
const mostrarTiquets = document.getElementById("mostrarTiquets")
const btnCerrarSesion = document.getElementById("btnCerrarSesion")
const tiempo = new Date()


console.log(devuelveDia(tiempo.getDay()));
console.log(tiempo.getMonth())
console.log(tiempo.getFullYear())
console.log(tiempo.getHours())
console.log(tiempo.getMinutes())

btnCerrarSesion.addEventListener("click", function(){
  window.location.href = "index.html"
  localStorage.clear()
})

btnConsultas.addEventListener("click", async function () {
  usuarios.forEach(element => {
    console.log(element);
    
  });
    const { value: formValues } = await Swal.fire({
        title: "Consultas",
        html: `
          <input placeholder="Escriba la consulta" id="swal-input1" class="swal2-input">
        `,
        focusConfirm: false,
        preConfirm: () => {
          return [
            document.getElementById("swal-input1").value
          ];
        }
      });
      if (formValues) {
        let guardarInfo = {
            "idUsuario": localStorage.getItem("idUsuario"),
            "nombreUsuario": localStorage.getItem("nombreUsuario"),
            "consulta":document.getElementById("swal-input1").value,
            "hora-consulta": `${tiempo.getHours()}:${tiempo.getMinutes()}`,
            "dia-consulta": `${devuelveDia(tiempo.getDay())}/${tiempo.getMonth()+1}/${tiempo.getFullYear()}`
        }
        await postUsers(guardarInfo,"consultas")
        const tiquete = document.createElement("div")
        tiquete.innerText=guardarInfo.nombreUsuario +" " + guardarInfo.consulta + " " + guardarInfo["hora-consulta"]+ " " + guardarInfo["dia-consulta"]
        mostrarTiquets.appendChild(tiquete)
        
        console.log(guardarInfo);
        
      }
})