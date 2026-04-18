// LOGIN
function login() {
  const email = document.getElementById("usuario").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(user => {

      db.collection("usuarios").doc(user.user.uid).get()
        .then(doc => {
          const data = doc.data();

          if (data.rol === "admin") {
            document.getElementById("login").style.display = "none";
            document.getElementById("adminPanel").style.display = "block";
            cargarUsuarios();
          } else {
            document.getElementById("login").style.display = "none";
            document.getElementById("empresa").style.display = "block";
          }
        });

    })
    .catch(err => alert(err.message));
}

// CREAR USUARIO (ADMIN)
function crearUsuarioAdmin() {
  const email = document.getElementById("newEmail").value;
  const pass = document.getElementById("newPassword").value;

  if (!email || !pass) {
    alert("Completa todos los campos");
    return;
  }

  auth.createUserWithEmailAndPassword(email, pass)
    .then(user => {

      return db.collection("usuarios").doc(user.user.uid).set({
        email: email,
        rol: "empresa"
      });

    })
    .then(() => {
      alert("Usuario creado. Debes volver a iniciar sesión como admin");
      logout();
    })
    .catch(err => alert(err.message));
}

// LISTAR USUARIOS
function cargarUsuarios() {
  const lista = document.getElementById("listaUsuarios");
  lista.innerHTML = "";

  db.collection("usuarios").get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        const data = doc.data();

        let li = document.createElement("li");
        li.textContent = data.email + " - " + data.rol;

        lista.appendChild(li);
      });
    });
}

// GUARDAR EMPRESA
function guardarEmpresa() {
  const nombre = document.getElementById("nombreEmpresa").value;
  const nit = document.getElementById("nitEmpresa").value;

  const user = auth.currentUser;

  db.collection("empresas").doc(user.uid).set({
    nombre,
    nit
  }).then(() => {
    document.getElementById("empresa").style.display = "none";
    document.getElementById("cuestionario").style.display = "block";
  });
}

// ANALIZAR
function analizar() {
  let op1 = document.getElementById("op1").value;
  let op2 = document.getElementById("op2").value;
  let fin1 = document.getElementById("fin1").value;
  let fin2 = document.getElementById("fin2").value;

  if (!op1 || !op2 || !fin1 || !fin2) {
    alert("Responde todo");
    return;
  }

  let puntaje =
    (op1 == 1 ? 25 : 0) +
    (op2 == 1 ? 25 : 0) +
    (fin1 == 1 ? 25 : 0) +
    (fin2 == 1 ? 25 : 0);

  const user = auth.currentUser;

  db.collection("diagnosticos").add({
    userId: user.uid,
    puntaje,
    fecha: new Date()
  });

  document.getElementById("cuestionario").style.display = "none";
  document.getElementById("app").style.display = "block";

  document.getElementById("resultado").innerText =
    "Puntaje: " + puntaje;
}

// LOGOUT
function logout() {
  auth.signOut().then(() => location.reload());
}