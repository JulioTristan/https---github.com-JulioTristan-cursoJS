let balance = Number(
    prompt("Ingrese la cantidad de dinero que hay en su cuenta: ")
  );
  let productos = [
    {
      id: 2,
      categorias: ["monster", "secret rare"],
      nombre: "Guardian Chimera",
      precio: 32.46,
      exchange_rate: "USD",
      imgUrl: "https://ms.yugipedia.com//thumb/1/12/GuardianChimera-BACH-EN-ScR-1E.png/300px-GuardianChimera-BACH-EN-ScR-1E.png",
    },
    {
      id: 5,
      categorias: ["spell", "common"],
      nombre: "Dark Hole",
      precio: 0.40,
      exchange_rate: "USD",
      imgUrl: "https://ms.yugipedia.com//thumb/0/0c/DarkHole-OP12-EN-C-UE.png/300px-DarkHole-OP12-EN-C-UE.png",
    },
    {
      id: 8,
      categorias: ["monster", "ultra rare"],
      nombre: "Baronne de Fleur",
      precio: 82.07,
      exchange_rate: "USD",
      imgUrl: "https://ms.yugipedia.com//thumb/f/f6/BaronnedeFleur-LED8-EN-UR-1E.png/300px-BaronnedeFleur-LED8-EN-UR-1E.png",
    },
    {
      id: 9,
      categorias: ["monster", "secret rare"],
      nombre: "Aluber the Jester of Despia",
      precio: 5.18,
      exchange_rate: "USD",
      imgUrl: "https://ms.yugipedia.com//thumb/f/f8/AlubertheJesterofDespia-MP22-EN-PScR-1E.png/300px-AlubertheJesterofDespia-MP22-EN-PScR-1E.png",
    },
  ];
  let carrito = [];
  let contenedorCarrito = document.getElementById("contenedorCarrito");
  let cuenta = document.getElementById("balance");
  cuenta.innerHTML = `Cuentas con el siguiente dinero disponible: $${balance} USD`;
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
  function agregarAlCarrito(id) {
    let cantidad = document.getElementById(`quantity${id}`).valueAsNumber;
    let productoBuscado = productos.find((producto) => producto.id == id);
    let posicionDelProductoBuscado = carrito.findIndex(
      (producto) => producto.id == productoBuscado.id
    );
    if (posicionDelProductoBuscado != -1) {
      carrito[posicionDelProductoBuscado].unidades =
        carrito[posicionDelProductoBuscado].unidades + cantidad;
      carrito[posicionDelProductoBuscado].subtotal =
        carrito[posicionDelProductoBuscado].unidades *
        carrito[posicionDelProductoBuscado].precioUnitario;
    } else {
      carrito.push({
        id: productoBuscado.id,
        nombre: productoBuscado.nombre,
        precioUnitario: productoBuscado.precio,
        unidades: cantidad,
        subtotal: productoBuscado.precio*cantidad,
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
    
    total= Math.round((total + Number.EPSILON) * 100) / 100
    let contenedorTotal = document.getElementById("contenedorTotal");
    contenedorTotal.innerHTML = `
      <h3 id='totalh3' style="text-align:center">Total a Pagar: $${total}</h3>
      <button class="boton" id="total" onclick="pagar(${total})">Pagar</button>
    `;
  }
    function pagar(total){
      if(total>balance){
        alert("No tienes dinero suficiente")
      }
      else{
        balance=balance-total
        contenedorCarrito.innerHTML =``
        carrito=[]
        let contenedorTotal = document.getElementById("totalh3");
        contenedorTotal.innerText = `Total a Pagar: 0`;
        let cuenta = document.getElementById("balance");
        cuenta.innerHTML = `Cuentas con el siguiente dinero disponible: $${balance} USD`;
      }
    }