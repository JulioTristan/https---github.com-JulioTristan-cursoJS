let grupo = [
    { id:312, nombre: "Juan P.", calificacion: 8 },
    { id:645, nombre: "Diana S.", calificacion: 5 },
    { id:535, nombre: "Esteban D.", calificacion: 10 },
    { id:812, nombre: "Maria O.", calificacion: 8 },
    { id:092, nombre: "Gonzalo F.", calificacion: 9 }
]

 let solicitud = Number(prompt("Ingesa el id de alumno"))

let alumnoBuscado = grupo.filter(alumno => (alumno.id === solicitud))

console.log(alumnoBuscado)

alert(JSON.stringify(alumnoBuscado[0]))

    