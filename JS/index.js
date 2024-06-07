const productosLista = "data/productos.Json"; 

const contenedorProductos = document.getElementById("contenedor-productos")

const verCarrito= document.getElementById("carrito")

const ventanaCart= document.getElementById("ventana-carrito")

const cantidadCarrito = document.getElementById("cantidad-carrito")

let carrito = JSON.parse(localStorage.getItem("carrito")) || []


// se buscan productos en Json 
fetch(productosLista)
.then((respuesta) => respuesta.json())
.then((datos) => {
    mostrarProductos(datos)
})
.catch((error) => console.log(error));
// mostramos los procutos en el html //
function mostrarProductos(productos) {
    productos.forEach((producto) => {
      const card = document.createElement("div");
      card.classList="card"
      card.innerHTML = `
      
          <div class="item">
          <figure>
              <img class="img-producto" src="${producto.img}">
          </figure>
          <div class="info-producto">
              <h2> ${producto.nombre}</h2>
              <p class="precio">$${producto.precio}</p>
              
          </div>
      </div>
     `;
      contenedorProductos.append(card);
  
        let comprar = document.createElement("button")
        comprar.innerText="añadir al carrito";
        comprar.classList="añadir-carrito";

        card.append(comprar);

        comprar.addEventListener("click", ()=>{

            const repeat= carrito.some((repeatProducto)=> repeatProducto.id ===producto.id)
            
            if (repeat){
                carrito.map((prod)=> {
                    if(prod.id === producto.id){
                        prod.cantidad++;
                    }
                });
            }else{
                    carrito.push({
                    id:producto.id,
                    nombre:producto.nombre,
                    precio:producto.precio,
                    cantidad:producto.cantidad,
    
                });
                guardarCompra();
                     }
                     Toastify({
                        text: "se agrego producto al carrito",
                        duration: 3000,
                        destination: "/Pages/carrito.html",
                        newWindow: true,
                        close: true,
                        gravity: "top", 
                        position: "left",
                        stopOnFocus: true, 
                        style: {
                            background: "linear-gradient(to right, black, grey)",
                        },
                        onClick: function(){} 
                    }).showToast();
            console.log(carrito);
            carritoCounter();
          
            
        }
    );
    })
    };

// --------------------- localStorage
const guardarCompra=()=>{
    localStorage.setItem("carrito", JSON.stringify(carrito));
};





// ----------------------------- logica ventana del carrito
    
    const pintarCarrito = ()=> {
    
      // limpia el html 
        ventanaCart.innerHTML=``;
        // muestra la ventana carrito 
        ventanaCart.style.display="flex"
     const cartHeader = document.createElement("div")
     cartHeader.className= "cart-header"
     cartHeader.innerHTML=`
     <h3 class="titulo-carrito"> carrito: </h3>`
     ventanaCart.append(cartHeader);

        const cartbutton = document.createElement("h2");
        cartbutton.innerText="x";
        cartbutton.className="cart-header-button"

        cartbutton.addEventListener("click",() =>{
        ventanaCart.style.display="none";
        });

        cartHeader.append(cartbutton)
        

        carrito.forEach((product)=>{
            let carritoContenedor = document.createElement("div");
            carritoContenedor.className = "modal-content";
            carritoContenedor.innerHTML=`
            <div class="cart-product">
                 <div class="info-cart-producto">
                     <span class="cantidad-producto-carrito">cantidad:${product.cantidad}</span>
                    <p class="titulo-producto-carrito">${product.nombre}</p>
                     <span class="precio-producto-carrito">$${product.precio}</span>
                     <p> total:$ ${product.cantidad * product.precio}</p>
                    
                     </div>
                     </div>;`  
                     
                ventanaCart.append(carritoContenedor);
                   

                let eliminar = document.createElement("span");
                eliminar.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="icon-close">
                <path stroke-linecap="round" stroke-linejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>`
                eliminar.className="icon-close"
                
                carritoContenedor.append(eliminar);


                eliminar.addEventListener("click", eliminarProducto)
        });

        const total = carrito.reduce((acc,el)=>acc + el.precio * el.cantidad,0)

        const totalCompra = document.createElement("div");
        totalCompra.className="cart-total";
        totalCompra.innerHTML=`total a pagar: $${total}  <a href="/Pages/carrito.html">
        <button class="añadir-carrito">comprar ahora</button>  
        </a>`;
        ventanaCart.append(totalCompra);
    };
    verCarrito.addEventListener("click", pintarCarrito);
        
    // -----------------------logica del boton eliminar 
    const eliminarProducto = ()=>{
        const foundId = carrito.find((element) => element.id);

        carrito = carrito.filter((carritoId)=>{
            return carritoId !== foundId;
        });
        pintarCarrito();
        carritoCounter();
        guardarCompra();
        
    };
// -------------------indicador de cantidad de productos 
    const carritoCounter = () =>{
        cantidadCarrito.style.display="block"
        const carritoLength = carrito.length;
        localStorage.setItem("carritoLength", JSON.stringify(carritoLength))
        cantidadCarrito.innerText= JSON.parse(localStorage.getItem("carritoLength"));
    };
    carritoCounter();

    