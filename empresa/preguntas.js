// preguntas.js COMPLETO NUEVO - 18 PREGUNTAS

auth.onAuthStateChanged(user => {

  if (!user) {
    window.location.href = "../index.html";
    return;
  }

});


function guardar() {

  let total = 0;

  for (let i = 1; i <= 18; i++) {
    total += parseInt(document.getElementById("p" + i).value);
  }

  const maximo = 36;
  const porcentaje = Math.round((total / maximo) * 100);

  /* BLOQUES */

  let contexto = 0;      // 1 a 4
  let identificar = 0;  // 5 a 10
  let proteger = 0;     // 11 a 18

  for (let i = 1; i <= 4; i++) {
    contexto += parseInt(document.getElementById("p" + i).value);
  }

  for (let i = 5; i <= 10; i++) {
    identificar += parseInt(document.getElementById("p" + i).value);
  }

  for (let i = 11; i <= 18; i++) {
    proteger += parseInt(document.getElementById("p" + i).value);
  }

  const contextoPct = Math.round((contexto / 8) * 100);
  const identPct = Math.round((identificar / 12) * 100);
  const protPct = Math.round((proteger / 16) * 100);

  let nivel = "";

  if (porcentaje <= 40) nivel = "Crítico";
  else if (porcentaje <= 70) nivel = "Medio";
  else nivel = "Maduro";

  let fallas = [];

  /* LOGICA */

  if (contextoPct < 50) {
    fallas.push("Infraestructura pequeña sin madurez tecnológica definida.");
  }

  if (parseInt(p3.value) === 0) {
    fallas.push("Uso de red doméstica o WiFi no empresarial.");
  }

  if (parseInt(p4.value) === 0) {
    fallas.push("Trabajo remoto sin controles de acceso.");
  }

  if (identPct < 60) {
    fallas.push("No identifica correctamente activos, datos o riesgos.");
  }

  if (parseInt(p5.value) === 0) {
    fallas.push("No existe inventario de equipos.");
  }

  if (parseInt(p6.value) === 0) {
    fallas.push("No existe inventario de software.");
  }

  if (protPct < 60) {
    fallas.push("Controles de protección insuficientes.");
  }

  if (parseInt(p15.value) === 0) {
    fallas.push("No realiza copias de seguridad.");
  }

  if (parseInt(p11.value) === 0) {
    fallas.push("No existe política de contraseñas.");
  }

  if (parseInt(p13.value) === 0) {
    fallas.push("No tiene antivirus.");
  }

  if (parseInt(p18.value) === 0) {
    fallas.push("Correo empresarial vulnerable.");
  }

  if (fallas.length === 0) {
    fallas.push("No se detectaron fallas críticas.");
  }

  const uid = auth.currentUser.uid;

  db.collection("usuarios").doc(uid).get()

    .then(doc => {

      let empresa = auth.currentUser.email;

      if (doc.exists) {
        empresa = doc.data().nombre;
      }

      return db.collection("diagnosticos").add({
        uid: uid,
        usuario: empresa,
        correo: auth.currentUser.email,

        puntaje: total,
        porcentaje: porcentaje,
        nivel: nivel,

        contexto: contextoPct,
        identificar: identPct,
        proteger: protPct,

        fallas: fallas,
        fecha: new Date()
      });

    })

    .then(() => {
      alert("Diagnóstico enviado correctamente");
    })

    .catch(error => {
      alert(error.message);
    });

}


function logout() {

  auth.signOut()
    .then(() => {
      window.location.href = "../index.html";
    });

}