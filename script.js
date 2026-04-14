// LOGIN
function login() {
  const usuario = document.getElementById("usuario").value;
  const password = document.getElementById("password").value;

  if (usuario === "admin" && password === "1234") {
    document.getElementById("login").style.display = "none";
    document.getElementById("empresa").style.display = "block";
  } else {
    alert("Credenciales incorrectas");
  }
}

// GUARDAR EMPRESA
function guardarEmpresa() {
  const nombre = document.getElementById("nombreEmpresa").value;
  const nit = document.getElementById("nitEmpresa").value;

  if (!nombre || !nit) {
    alert("Completa todos los campos");
    return;
  }

  localStorage.setItem("empresa", nombre);
  localStorage.setItem("nit", nit);

  document.getElementById("empresa").style.display = "none";
  document.getElementById("cuestionario").style.display = "block";
}

// ANALIZAR CUESTIONARIO
function analizar() {

  // IDs de preguntas (solo las que suman puntaje)
  let respuestas = [
    "op1","op2","op3","op4","op5",
    "fin1","fin2","fin3","fin4","fin5",
    "tal1","tal2","tal3","tal4","tal5",
    "com1","com2","com3","com4","com5"
  ];

  let puntaje = 0;
  let total = respuestas.length * 10;

  // Validación
  for (let id of respuestas) {
    let valor = document.getElementById(id).value;

    if (valor === "") {
      alert("Por favor responde todas las preguntas antes de continuar");
      return;
    }

    if (valor === "1") {
      puntaje += 10;
    }
  }

  // Calcular nivel
  let nivel = "Bajo";
  if (puntaje >= 60) nivel = "Medio";
  if (puntaje >= 120) nivel = "Alto";

  // Cambiar vista
  document.getElementById("cuestionario").style.display = "none";
  document.getElementById("app").style.display = "block";

  // Mostrar empresa
  document.getElementById("empresaNombre").innerText =
    "Empresa: " + localStorage.getItem("empresa");

  // Mostrar resultado
  document.getElementById("resultado").innerText =
    `Puntaje: ${puntaje}/${total} - Nivel ${nivel}`;

  // Alertas
  generarAlertas(puntaje);

  // Análisis por área (PRO)
  analizarPorArea();
}

// ALERTAS GENERALES
function generarAlertas(puntaje) {
  let mensaje = "";

  if (puntaje < 80) {
    mensaje = "⚠️ Alto riesgo empresarial. Se recomienda estructurar procesos y control financiero.";
  } else if (puntaje < 140) {
    mensaje = "⚠️ Empresa en crecimiento, pero con debilidades internas.";
  } else {
    mensaje = "✅ Empresa sólida. Lista para escalar y optimizar.";
  }

  document.getElementById("resultado").innerText += "\n\n" + mensaje;
}

// ANÁLISIS POR ÁREA 🔥
function analizarPorArea() {

  let areas = {
    "Operaciones": ["op1","op2","op3","op4","op5"],
    "Finanzas": ["fin1","fin2","fin3","fin4","fin5"],
    "Talento Humano": ["tal1","tal2","tal3","tal4","tal5"],
    "Comercial": ["com1","com2","com3","com4","com5"]
  };

  let resultadoArea = "\n\n--- Diagnóstico por Área ---\n";

  for (let area in areas) {
    let preguntas = areas[area];
    let puntos = 0;

    preguntas.forEach(id => {
      if (document.getElementById(id).value === "1") {
        puntos += 10;
      }
    });

    let estado = "Bajo";
    if (puntos >= 30) estado = "Medio";
    if (puntos >= 50) estado = "Alto";

    resultadoArea += `${area}: ${estado}\n`;
  }

  document.getElementById("resultado").innerText += resultadoArea;
}

// LOGOUT
function logout() {
  localStorage.clear();
  location.reload();
}