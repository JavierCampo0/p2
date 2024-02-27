let preguntas = []; // Almacenará las preguntas cargadas desde la API
let indiceActual = 0; // Índice de la pregunta actual
let aciertos = 0; // Contador de respuestas correctas

const contenido = document.getElementById('contenido');
let hue = 0;
let docTitle = document.title;
window.addEventListener("blur", () =>{
    document.title = "Vuelve porfa 😟";
})
window.addEventListener("focus", () =>{
    document.title = docTitle;
})


// Función para cargar una pregunta de trivia desde la API
const cargarPreguntasDesdeAPI = function() {
    fetch('https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple', {
        method: 'GET',
        mode: 'cors',
        headers: {'Accept': 'application/json'}
    }).then(respuesta => respuesta.json())
    .then(data => {
        preguntas = data.results;
        mostrarPregunta(preguntas[indiceActual]); // Mostrar la primera pregunta
    })
    .catch(error => console.error('Error al cargar las preguntas:', error));
};
const mostrarPregunta = function(pregunta) {
    const preguntaDiv = document.getElementById('pregunta');
    const respuestasDiv = document.getElementById('respuestas');
    respuestasDiv.innerHTML = '';

    preguntaDiv.innerHTML = `<h2>${pregunta.question}</h2>`;

    const todasLasRespuestas = [pregunta.correct_answer, ...pregunta.incorrect_answers];
    todasLasRespuestas.sort(() => Math.random() - 0.5);

    todasLasRespuestas.forEach(respuesta => {
        const botonRespuesta = document.createElement('button');
        botonRespuesta.innerHTML = respuesta;
        botonRespuesta.onclick = () => seleccionarRespuesta(respuesta, pregunta.correct_answer);
        respuestasDiv.appendChild(botonRespuesta);
    });
};

// Función para manejar la selección de respuesta
const seleccionarRespuesta = (respuesta, correcta) => {
    if (respuesta === correcta) {
        alert('¡Respuesta correcta!');
        aciertos++;
    } else {
        alert('Respuesta incorrecta.');
    }
    indiceActual++;
    actualizarResultadoParcial();
    if (indiceActual < preguntas.length) {
        mostrarPregunta(preguntas[indiceActual]);
    } else {
        mostrarResultadoFinal();
    }
};

// Función para mostrar el resultado final
const mostrarResultadoFinal = () => {
    const contenido = document.getElementById('contenido');
    if (aciertos == 5) {
        contenido.innerHTML = `<h2>¡Has completado el cuestionario!</h2><p>Tu puntuación es de ${aciertos} aciertos de ${preguntas.length} preguntas. Nuestra más sincera enhorabuena, tu conocimiento de CS te proporciona una participación en el sorteo de un Mazda MX-5 na 👌</p>`;
    
    } else {
        contenido.innerHTML = `<h2>Has completado el cuestionario</h2><p>Tu puntuación es de ${aciertos} aciertos de ${preguntas.length} preguntas. Por desgracia esta puntuación no es suficiente como para entrar en el sorteo 😟</p>`;
    }
};

const actualizarResultadoParcial = () => {
    const resultadoParcial = document.getElementById('resultadoParcial');
    resultadoParcial.innerHTML = `Correctas: ${aciertos} de ${preguntas.length}`;
};

function cambiarColor() {
    contenido.style.color = `hsl(${hue}, 80%, 60%)`;
    hue++;
    if (hue >= 360) hue = 0; // Reinicia el hue después de un ciclo completo
}

setInterval(cambiarColor, 6); // Cambia el color cada 100 milisegundos

// Inicializar la carga de preguntas cuando la página esté lista
window.onload = cargarPreguntasDesdeAPI;
