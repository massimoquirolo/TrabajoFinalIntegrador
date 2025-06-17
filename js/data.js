// En este archivo se van a cargar la informacion inicial de los salones junto con la inicializacion del localstorage
// se crea una variable const con la info de los salones que ya habia con un id unico 
const Salones = [
    {
        id: 'salon1',
        nombre: 'Salón Patagonia',
        descripcion: 'Ubicado en el piso 12, con vista panorámica. Ideal para conferencias y eventos ejecutivos.',
        direccion: 'Av. Libertador 1450',
        precio: 120000,
        disponible: true
    },
    {
        id: 'salon2',
        nombre: 'Salón Andino',
        descripcion: 'Espacio elegante con ambientación cálida. Perfecto para reuniones privadas o presentaciones.',
        direccion: 'Calle Mendoza 320',
        precio: 95000,
        disponible: false
    },
    {
        id: 'salon3',
        nombre: 'Salón Río de la Plata',
        descripcion: 'Amplio salón con capacidad para 150 personas, equipado con sonido envolvente.',
        direccion: 'Puerto Madero 101',
        precio: 160000,
        disponible: true
    },
    {
        id: 'salon4',
        nombre: 'Salón Pampa',
        descripcion: 'Estilo moderno y minimalista. Ideal para workshops, coworking y capacitaciones.',
        direccion: 'Diagonal Norte 670',
        precio: 85000,
        disponible: true
    },
    {
        id: 'salon5',
        nombre: 'Salón Norte',
        descripcion: 'Pequeño pero acogedor. Espacio funcional para entrevistas o reuniones ágiles.',
        direccion: 'Calle Santa Fe 987',
        precio: 60000,
        disponible: false
    },
    {
        id: 'salon6',
        nombre: 'Salón Austral',
        descripcion: 'Ubicado en planta baja. Rápido acceso y versatilidad para múltiples configuraciones.',
        direccion: 'Av. Belgrano 233',
        precio: 110000,
        disponible: true
    }
];

function inicializarSalones() {
    if (!localStorage.getItem('salones')) {
        localStorage.setItem('salones', JSON.stringify(Salones));
    }
}

function getSalones() {
    const salones = localStorage.getItem('salones');
    return salones ? JSON.parse(salones) : [];
}

function guardarSalones(salones) {
    localStorage.setItem('salones', JSON.stringify(salones));
}

inicializarSalones();


/////////////////////////////////////////////////////////////////////////////////////////////////////////


const Servicios = [
    { id: 'serv1', descripcion: 'DJ en vivo durante el evento', precio: '5000' },
    { id: 'serv2', descripcion: 'Catering completo para 30 personas', precio: '12000' },
    { id: 'serv3', descripcion: 'Decoración temática personalizada', precio: '7000' },
    { id: 'serv4', descripcion: 'Servicio de animación infantil', precio: '4500' },
    { id: 'serv5', descripcion: 'Fotografía y video profesional', precio: '10000' }
];

// inicializamos servicios si no existen
function inicializarServicios() {
    if (!localStorage.getItem('servicios')) {
        localStorage.setItem('servicios', JSON.stringify(Servicios));
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

//  fin del nuevo codigo para servicios 

/////////////////////////////////////////////////////////////////////////////////////////////////////////

//  inico del nuevo codigo para imagenes 

// Le pedimos a la IA que aleatoriamente nos genere de 1 a 3 imagenes para los 6 salones ejemplos que se cargan por default.
let Imagenes = [
    { id: 'img1', idsitio: 'salon1', url: 'img/fiesta2.jpg' },
    { id: 'img2', idsitio: 'salon1', url: 'img/fiesta1.jpg' },
    { id: 'img3', idsitio: 'salon1', url: 'img/salon-ejemplo.jpg' },
    { id: 'img4', idsitio: 'salon2', url: 'img/fiesta1.jpg' },
    { id: 'img5', idsitio: 'salon2', url: 'img/fiesta2.jpg' },
    { id: 'img6', idsitio: 'salon3', url: 'img/salon-ejemplo.jpg' },
    { id: 'img7', idsitio: 'salon4', url: 'https://cdn0.casamientos.com.ar/vendor/4107/3_2/960/jpg/fachada_7_114107.jpeg' },
    { id: 'img8', idsitio: 'salon4', url: 'https://cdn0.bodas.com.mx/vendor/1031/3_2/960/jpeg/3aecf5fc-c702-40e5-9c74-786f983f8664_5_251031-162604050917968.jpeg' },
    { id: 'img9', idsitio: 'salon4', url: 'https://media.xcons.com.ar/media/magefan_blog/slide-1_mini_fuy548iu.jpg' },
    { id: 'img10', idsitio: 'salon5', url: 'img/fiesta1.jpg' },
    { id: 'img11', idsitio: 'salon5', url: 'img/fiesta2.jpg' },
    { id: 'img12', idsitio: 'salon6', url: 'img/fiesta1.jpg' }
];

// inicializamos imagenes si no existen
function inicializarImagenes() {
    if (!localStorage.getItem('imagenes')) {
        localStorage.setItem('imagenes', JSON.stringify(Imagenes));
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

//  fin del nuevo codigo para imagenes 