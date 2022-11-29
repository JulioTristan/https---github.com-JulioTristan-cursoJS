let calificacion1 = Number(prompt("Ingresa tu calificacion del primer periodo"))
let calificacion2 = Number(prompt("Ingresa tu calificacion del segundo periodo"))
let calificacion3 = Number(prompt("Ingresa tu calificacion del tercer periodo"))
let calificacionFinal = (calificacion1 + calificacion2 + calificacion3)/3

if (calificacionFinal >= 6) {
    alert("La calificacion final es: " + calificacionFinal + " Aprobado")
} else {
    alert("La calificacion final es: " + calificacionFinal + " Reprobado")
}