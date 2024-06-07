
const carrito = JSON.parse(localStorage.getItem("carrito")) || []; 
console.log(carrito);

const carritoContent = document.getElementById("table"); 


if (carrito.length > 0) {
  carrito.forEach(element => {
    const productElement = document.createElement("tr");
    productElement.innerHTML = `
    
            <td>${element.cantidad}</td>
            <td>${element.nombre}</td>
            <td>$${element.precio}</td>
        
`;
    carritoContent.appendChild(productElement);
  });

  const carritoTotal = carrito.reduce((acc, producto) => acc + producto.precio, 0);
  const infoTotalElements = document.querySelectorAll(".total"); 

 
  infoTotalElements.forEach(element => {
    element.innerText = `Total a pagar: $${carritoTotal}`;
  });
} else {
  
  carritoContent.innerHTML = "<p>tu carrito esta vacio.</p>";
};



const btnComprar= document.getElementById("btn-comprar");
 
    btnComprar.addEventListener("click",limpiarStorage)
    function limpiarStorage() {
      
      if (confirm("estas seguro de realizar la compra?")) {
        localStorage.removeItem("carrito");
        alert("gracias por tu compra")
  
    }};
    
