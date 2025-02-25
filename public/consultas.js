
import { devuelveDia } from "./extras/fecha.js";
import { postUsers,getUsers } from "./llamados.js";

const btnConsultas = document.getElementById("btnConsultas")

const tiempo = new Date()

console.log(devuelveDia(tiempo.getDay()));
console.log(tiempo.getMonth())
console.log(tiempo.getFullYear())
console.log(tiempo.getHours())
console.log(tiempo.getMinutes())

btnConsultas.addEventListener("click", async function () {
    console.log("click");
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
            "consulta": document.getElementById("swal-input1").value
        }
        console.log(guardarInfo);
        
        await postUsers(guardarInfo,"consultas")
        console.log("estoy aqui");
        
      }
})