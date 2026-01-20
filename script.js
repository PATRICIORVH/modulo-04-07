// Variables globales
let personajesGuardados = [];

// Botón 1: Cargar los 10 primeros personajes
document.getElementById('btnCargar').addEventListener('click', function() {
    const datosGuardados = localStorage.getItem('personajes');
    
    if (datosGuardados) {
        personajesGuardados = JSON.parse(datosGuardados);
        mostrarPersonajes();
    } else {
        fetch('https://rickandmortyapi.com/api/character/1,2,3,4,5,6,7,8,9,10')
            .then(res => res.json())
            .then(data => {
                personajesGuardados = data;
                localStorage.setItem('personajes', JSON.stringify(data));
                mostrarPersonajes();
            });
    }
});

function mostrarPersonajes() {
    let html = '<h2>Lista de Personajes</h2>';
    personajesGuardados.forEach(p => {
        html += `
            <div class="personaje">
                <img src="${p.image}">
                <p><strong>ID:</strong> ${p.id}</p>
                <p><strong>Nombre:</strong> ${p.name}</p>
                <p><strong>Especie:</strong> ${p.species}</p>
            </div>
        `;
    });
    document.getElementById('resultado').innerHTML = html;
}

// Botón 2: Agrupar por especie
document.getElementById('btnAgrupar').addEventListener('click', function() {
    if (personajesGuardados.length === 0) {
        alert('Primero debes cargar los personajes');
        return;
    }
    
    let especies = {};
    personajesGuardados.forEach(p => {
        if (!especies[p.species]) {
            especies[p.species] = [];
        }
        especies[p.species].push(p);
    });
    
    let html = '<h2>Agrupación por Especie</h2>';
    for (let especie in especies) {
        html += `<h3>${especie}</h3><ul>`;
        especies[especie].forEach(p => {
            html += `<li>${p.name} (ID: ${p.id})</li>`;
        });
        html += '</ul>';
    }
    document.getElementById('resultado').innerHTML = html;
});

// Botón 3: Ver ficha de un personaje
document.getElementById('btnFicha').addEventListener('click', function() {
    if (personajesGuardados.length === 0) {
        alert('Primero debes cargar los personajes');
        return;
    }
    
    let personaje = personajesGuardados[0];
    let html = `
        <h2>Ficha de Personaje</h2>
        <div class="personaje">
            <img src="${personaje.image}">
            <p><strong>ID:</strong> ${personaje.id}</p>
            <p><strong>Nombre:</strong> ${personaje.name}</p>
            <p><strong>Especie:</strong> ${personaje.species}</p>
        </div>
    `;
    document.getElementById('resultado').innerHTML = html;
});
