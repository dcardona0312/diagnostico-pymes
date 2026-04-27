// 🔐 VALIDAR SESIÓN
auth.onAuthStateChanged(user => {

  if (!user) {
    window.location.href = "../index.html";
    return;
  }

  document.getElementById("titulo").innerText = "Bienvenido Admin";

  cargarHistorial();
});


// 🧑‍💼 CREAR USUARIO
function crearUsuario() {

  const email = document.getElementById("newEmail").value;
  const password = document.getElementById("newPassword").value;

  if (!email || !password) {
    alert("Completa los campos");
    return;
  }

  auth.createUserWithEmailAndPassword(email, password)
    .then(res => {

      return db.collection("usuarios").doc(res.user.uid).set({
        email: email,
        rol: "empresa"
      });

    })
    .then(() => alert("Usuario creado"))
    .catch(e => alert(e.message));
}


// 📊 HISTORIAL + GRAFICA
function cargarHistorial() {

  const tabla = document.getElementById("historial");
  tabla.innerHTML = "";

  let labels = [];
  let datos = [];

  db.collection("diagnosticos").get()
    .then(snapshot => {

      snapshot.forEach(doc => {

        const data = doc.data();

        const usuario = data.usuario || "Empresa";
        const puntaje = data.puntaje ?? 0;

        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${usuario}</td>
          <td>${puntaje}</td>
        `;
        tabla.appendChild(row);

        labels.push(usuario);
        datos.push(puntaje);
      });

      crearGrafica(labels, datos);

    });
}


// 🥧 GRAFICA TORTA
function crearGrafica(labels, datos) {

  const ctx = document.getElementById("grafica").getContext("2d");

  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        data: datos,
        backgroundColor: [
          '#1d4ed8',
          '#2563eb',
          '#3b82f6',
          '#60a5fa',
          '#93c5fd',
          '#0ea5e9'
        ]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  });
}


// 🚪 LOGOUT
function logout() {
  auth.signOut().then(() => {
    window.location.href = "../index.html";
  });
}