// en este archivo se van a cargar la informacion inicial de los salones junto con la inicializacion del localstorage

//se crea una variable const con la info de los salones que ya habia con un id unico 
const Salones = [
    {
        id: 'salon1',
        nombre: 'Salón Patagonia',
        descripcion: 'Ubicado en el piso 12, con vista panorámica. Ideal para conferencias y eventos ejecutivos.',
        direccion: 'Av. Libertador 1450',
        precio: 120000,
        imagen: 'img/salon-ejemplo.jpg',
        disponible: true
    },
    {
        id: 'salon2',
        nombre: 'Salón Andino',
        descripcion: 'Espacio elegante con ambientación cálida. Perfecto para reuniones privadas o presentaciones.',
        direccion: 'Calle Mendoza 320',
        precio: 95000,
        imagen: 'img/salon-ejemplo.jpg',
        disponible: false
    },
    {
        id: 'salon3',
        nombre: 'Salón Río de la Plata',
        descripcion: 'Amplio salón con capacidad para 150 personas, equipado con sonido envolvente.',
        direccion: 'Puerto Madero 101',
        precio: 160000,
        imagen: 'img/salon-ejemplo.jpg',
        disponible: true
    },
    {
        id: 'salon4',
        nombre: 'Salón Pampa',
        descripcion: 'Estilo moderno y minimalista. Ideal para workshops, coworking y capacitaciones.',
        direccion: 'Diagonal Norte 670',
        precio: 85000,
        imagen: 'img/salon-ejemplo.jpg',
        disponible: true
    },
    {
        id: 'salon5',
        nombre: 'Salón Norte',
        descripcion: 'Pequeño pero acogedor. Espacio funcional para entrevistas o reuniones ágiles.',
        direccion: 'Calle Santa Fe 987',
        precio: 60000,
        imagen: 'img/salon-ejemplo.jpg',
        disponible: false
    },
    {
        id: 'salon6',
        nombre: 'Salón Austral',
        descripcion: 'Ubicado en planta baja. Rápido acceso y versatilidad para múltiples configuraciones.',
        direccion: 'Av. Belgrano 233',
        precio: 110000,
        imagen: 'img/salon-ejemplo.jpg',
        disponible: true
    }
];

// ********************** AGREGADO POR JOAQUIN ***************************//
// *******************  inicio del nuevo codigo para servicios *******************//

const Servicios = [
    { id: 'serv1', nombre: 'Animación Infantil', descripcion: 'Payasos, juegos y actividades recreativas' },
    { id: 'serv2', nombre: 'Catering Básico', descripcion: 'Comida y bebida para 30 personas' }
];

// inicializamos servicios si no existen
function inicializarServicios() {
    if (!localStorage.getItem('servicios')) {
        localStorage.setItem('servicios', JSON.stringify(Servicios));
        console.log('LocalStorage inicializado con servicios por defecto.');
    }
}

// obtenemos servicios
function getServicios() {
    const servicios = localStorage.getItem('servicios');
    return servicios ? JSON.parse(servicios) : [];
}

// guardamos servicios
function guardarServicios(servicios) {
    localStorage.setItem('servicios', JSON.stringify(servicios));
}

inicializarServicios(); // Ejecutamos inicialización

// ------------------ fin del nuevo codigo para servicios ------------------


// ------------------ inico del nuevo codigo para imagenes ------------------

const Imagenes = [
    { id: 'img1', url: 'img/fiesta1.jpg', descripcion: 'Fiesta de cumpleaños con globos' },
    { id: 'img2', url: 'img/fiesta2.jpg', descripcion: 'Mesa dulce decorada' }
];

// inicializamos imagenes si no existen
function inicializarImagenes() {
    if (!localStorage.getItem('imagenes')) {
        localStorage.setItem('imagenes', JSON.stringify(Imagenes));
        console.log('LocalStorage inicializado con imágenes por defecto.');
    }
}

// obtenemos imagenes
function getImagenes() {
    const imagenes = localStorage.getItem('imagenes');
    return imagenes ? JSON.parse(imagenes) : [];
}

// guardamos imagens
function guardarImagenes(imagenes) {
    localStorage.setItem('imagenes', JSON.stringify(imagenes));
}

inicializarImagenes(); // Ejecutamos inicializacion

// ------------------ fin del nuevo codigo para imagenes ------------------//

// **************** FIN AGREGADO POR JOAQUIN ***************//

// funcion para inicializar el localstorage si la const no existe
function inicializarLocalStorage() {
    if (!localStorage.getItem('salones')) {
        localStorage.setItem('salones', JSON.stringify(Salones));
        console.log('LocalStorage inicializado con salones por defecto.');
    }
}

// funcion que devuelve todos los salones del localstorage
function getSalones() {
    const salones = localStorage.getItem('salones');
    return salones ? JSON.parse(salones) : [];
}

// funcion para guardar todos los salones en el localstorage
function guardarSalones(salones) {
    localStorage.setItem('salones', JSON.stringify(salones));
}

// este script debeiria ejecutarse en todas las paginas donde se llama a data.js
inicializarLocalStorage();