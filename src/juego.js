let preguntas = []; 
let indiceActual = 0; 
let aciertos = 0; 

const contenido = document.getElementById('contenido'); //para la animación del color del texto
let hue = 0;


let docTitle = document.title;
window.addEventListener("blur", () =>{
    document.title = "Vuelve porfa 😟";
})
window.addEventListener("focus", () =>{
    document.title = docTitle;
})



// para cargar las preguntas de trivia 
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
    respuestasDiv.innerHTML = '';   //borro lo que haya

    preguntaDiv.innerHTML = `<h2>${pregunta.question}</h2>`;

    const todasLasRespuestas = [pregunta.correct_answer, ...pregunta.incorrect_answers];
    todasLasRespuestas.sort(() => Math.random() - 0.5);     //randomizo el orden de las respuestas posibles ya que vienen ordenadas con a correcta la primera

    todasLasRespuestas.forEach(respuesta => {
        const botonRespuesta = document.createElement('button');
        botonRespuesta.innerHTML = respuesta;
        botonRespuesta.onclick = () => seleccionarRespuesta(respuesta, pregunta.correct_answer);
        respuestasDiv.appendChild(botonRespuesta);
    });
};

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
/////////////

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

setInterval(cambiarColor, 5); // Cambia el color cada 5 milisegundos

// carga rpeguntas cuando la página esté lista
window.onload = cargarPreguntasDesdeAPI;