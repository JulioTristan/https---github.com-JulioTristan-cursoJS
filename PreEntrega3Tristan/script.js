async function getProductos() {
  const response = await fetch("productos.json");
  const data = await response.json();
  return data;
}
getProductos().then((productos) => {
  let contenedor = document.getElementById("contenedorProductos");
  renderizarProductos(productos);

  let buscador = document.getElementById("buscador");
  buscador.addEventListener("input", renderizarProductosFiltrados);

  function renderizarProductosFiltrados(e) {
    let productosFiltrados = productos.filter(
      (producto) =>
        producto.nombre.toLowerCase().includes(buscador.value.toLowerCase()) ||
        producto.categorias.find((categoria) =>
          categoria.includes(buscador.value.toLowerCase())
        )
    );
    renderizarProductos(productosFiltrados);
  }

  function renderizarProductos(arrayDeProductos) {
    contenedor.innerHTML = "";
    for (const producto of arrayDeProductos) {
      let tarjetaProducto = document.createElement("div");
      tarjetaProducto.className = "producto";
      tarjetaProducto.id = producto.id;

      tarjetaProducto.innerHTML = `
          <div style="text-align:center;border:2px solid white;padding: 1vh;">
          <h3>${producto.nombre}</h3>
          <p>Precio: $${producto.precio}</p>
          <p>Divisa: ${producto.exchange_rate}</p>
          <img style="padding: 1vh;width: 250px; height: 400px;" src=${producto.imgUrl}>
          <input class="quantity" id="quantity${producto.id}" min="-100" name="quantity" type="number" value=1>
          <button class="boton" id=${producto.id} onclick="agregarAlCarrito(${producto.id})">Agregar a la cartera</button>
          </div>
        `;
      contenedor.appendChild(tarjetaProducto);
    }
  }
});

let balance = document.getElementById("balance");
balance.addEventListener("click", () => {
  swal("Escribe el credito que deseas ingresar:", {
    content: "input",
    background:"red",
  }).then((value) => {
    value = parseInt(value);
    if (value) {
      swal(`Tu credito es: ${value}`);
      let total = document.getElementById("total");
      total.innerHTML = `${value}`;
    } else {
      swal(
        "Hubo un error",
        "No se puede ingresar este credito, favor de escribir un numero",
        "error"
      );
    }
  });
});

let carrito = [];
let contenedorCarrito = document.getElementById("contenedorCarrito");

async function agregarAlCarrito(id) {
  let cantidad = document.getElementById(`quantity${id}`).valueAsNumber;
  let productos = await getProductos();
  let productoBuscado = productos.find((producto) => producto.id == id);
  let posicionDelProductoBuscado = carrito.findIndex(
    (producto) => producto.id == productoBuscado.id
  );
  if (posicionDelProductoBuscado != -1) {
    carrito[posicionDelProductoBuscado].unidades =
      carrito[posicionDelProductoBuscado].unidades + cantidad;
    carrito[posicionDelProductoBuscado].subtotal =
      Math.round(
        (carrito[posicionDelProductoBuscado].unidades *
          carrito[posicionDelProductoBuscado].precioUnitario +
          Number.EPSILON) *
          100
      ) / 100;
  } else {
    carrito.push({
      id: productoBuscado.id,
      nombre: productoBuscado.nombre,
      precioUnitario: productoBuscado.precio,
      unidades: cantidad,
      subtotal:
        Math.round((productoBuscado.precio * cantidad + Number.EPSILON) * 100) /
        100,
    });
  }
  renderizarCarrito(carrito);
}

function renderizarCarrito(arrayDeProductos) {
  contenedorCarrito.innerHTML = "";
  for (const producto of arrayDeProductos) {
    contenedorCarrito.innerHTML += `
        <div style="text-left:center;border:2px solid white;padding: 1vh;">
          <p>Cartas: ${producto.nombre} </p>
          <p>Precio Unitario: ${producto.precioUnitario} USD</p>
          <p>Cantidad: ${producto.unidades}</p>
          <p>SubTotal: $ ${producto.subtotal} USD </p>
        </div>
      `;
  }

  let total = carrito.reduce(
    (acc, valorActual) => acc + valorActual.subtotal,
    0
  );

  total = Math.round((total + Number.EPSILON) * 100) / 100;
  let contenedorTotal = document.getElementById("contenedorTotal");
  contenedorTotal.innerHTML = `
      <h3 id='totalh3' style="text-align:center">Total a Pagar: $${total}</h3>
      <button class="boton" id="total" onclick="pagar(${total})">Pagar</button>
    `;
}
function pagar(total) {
  let cuenta = document.getElementById("total");
  let balance = document.getElementById("total").innerHTML;
  if (total > balance) {
    Toastify({
      text: "No hay fondos suficientes",
      duration: 3000,
      gravity: "bottom",
      position: "right",
    }).showToast();
  } else {
    balance = balance - total;
    balance = Math.round((balance + Number.EPSILON) * 100) / 100;
    contenedorCarrito.innerHTML = ``;
    carrito = [];
    let contenedorTotal = document.getElementById("totalh3");
    contenedorTotal.innerText = `Total a Pagar: 0`;
    cuenta.innerHTML = `${balance}`;
    Swal.fire(
      'Excelente',
      '!Compra realizada con éxito!',
      'success'
    )
  }
}