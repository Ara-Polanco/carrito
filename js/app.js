/* Variables */
const carrito = document.querySelector('#carrito')
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
const listaCursos = document.querySelector('#lista-cursos')
let articulosCarrito = []

const cargarEvenListeners = () => {
    /* Cuando agregas un curso presionando "Agregar al Carrito" */
    listaCursos.addEventListener('click', agregarCurso)

    /* Elimina cursos del carrito */
    carrito.addEventListener('click', eliminarCurso)

    /* Vaciar carrito */
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [] /* Reiniciamos el arreglo, lo vaciamos */
        limpiarHTML()
    })
}

/* Funciones */
const agregarCurso = (e) => {
    e.preventDefault()

    if(e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement
        leerDatosCurso(cursoSeleccionado)
    }
}
/* Elimina cursos del carrito */
const eliminarCurso = (e) => {
    if(e.target.classList.contains('borrar-curso')){ 
        const cursoId = e.target.getAttribute('data-id')
        
        articulosCarrito.forEach( curso => {
            if(cursoId === curso.id) {
                curso.cantidad > 1 ? curso.cantidad-- : articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId) 
            }
        })
        // Elimina del arreglo por el data-id 
       /*  articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId) 
        carritoHTML()  // Iterar sobre el carrito y mostrar su HTML 
         */
    }
    carritoHTML()  /* Iterar sobre el carrito y mostrar su HTML */
}

/* Leer el contenido del HTML al que le dimos click y extrar la informacion del curso */
const leerDatosCurso = (cursoSeleccionado) => {
    /* Crear un objeto con el contenido del curso seleccionado*/
    const infoCurso = {
        imagen: cursoSeleccionado.querySelector('img').src,
        titulo: cursoSeleccionado.querySelector('.info-card h4').textContent,
        precio: cursoSeleccionado.querySelector('.precio span').textContent,
        id: cursoSeleccionado.querySelector('a').getAttribute('data-id'), 
        cantidad: 1, 
    }
    
    /* Revisa si un elemento ya existe en el carrito */
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id)

    if(existe) {
        /* Actualizamos la cantidad */
        const cursos = articulosCarrito.map( curso  => {
            if(curso.id === infoCurso.id) {
                curso.cantidad++
                return curso  /* Retorna el objeto actualizado (cantidad: actualizada) */
            } else {
                return curso    /* Retorna los objetos exactamente igual, los que no han sido duplicados  */
            }
        })
        articulosCarrito = [...cursos]
    } else {
        /* Agregamos el curso al carrito */
        articulosCarrito = [...articulosCarrito, infoCurso]
    }
    console.log(articulosCarrito)
    carritoHTML()
}

/* Muestra el carrito de compras en el HTML */
const carritoHTML = () => {
    /* Limpiamos el HTML */
    limpiarHTML()

    /* Recorre el carrito y genera el HTML */
    articulosCarrito.forEach( curso => {
        const {imagen, titulo, precio, cantidad, id } = curso
        const row = document.createElement('tr')
        row.innerHTML = `
        <td>
            <img src=" ${imagen} " >
        </td>
        <td>
            ${titulo}
        </td>
        <td>
            ${precio}
        </td>
        <td>
            ${cantidad}
        </td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}"> X </a>
        </td>

        `
        /* Agregar el HTML del carrito en el tbody */
        contenedorCarrito.appendChild(row)
    })
}

/* Elimina los cursos del tbody */
const limpiarHTML = () => {
    /* Forma lenta de eliminar  */
   // contenedorCarrito.innerHTML = ''

    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}

cargarEvenListeners()