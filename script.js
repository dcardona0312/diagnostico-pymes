// LOGIN
function login() {
  console.log("Click login");

  const email = document.getElementById("usuario").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Completa los campos");
    return;
  }

  auth.signInWithEmailAndPassword(email, password)
    .then(user => {
      console.log("Login OK");

      return db.collection("usuarios").doc(user.user.uid).get();
    })
    .then(doc => {

      if (!doc.exists) {
        alert("No tiene rol en Firestore");
        return;
      }

      const data = doc.data();

      if (data.rol === "admin") {
        document.getElementById("login").style.display = "none";
        document.getElementById("adminPanel").style.display = "block";

        cargarUsuarios();
      } else {
        alert("No eres admin");
      }

    })
    .catch(error => {
      console.error(error);
      alert(error.message);
    });
}

// CREAR USUARIO
function crearUsuarioAdmin() {
  const email = document.getElementById("newEmail").value;
  const password = document.getElementById("newPassword").value;

  if (!email || !password) {
    alert("Completa los campos");
    return;
  }

  auth.createUserWithEmailAndPassword(email, password)
    .then(user => {

      return db.collection("usuarios").doc(user.user.uid).set({
        email: email,
        rol: "empresa"
      });

    })
    .then(() => {
      alert("Usuario creado");
      logout();
    })
    .catch(err => {
      alert(err.message);
    });
}

// LISTAR USUARIOS
function cargarUsuarios() {
  const lista = document.getElementById("listaUsuarios");
  lista.innerHTML = "";

  db.collection("usuarios").get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        let data = doc.data();

        let li = document.createElement("li");
        li.textContent = data.email + " - " + data.rol;

        lista.appendChild(li);
      });
    });
}

// LOGOUT
function logout() {
  auth.signOut().then(() => location.reload());
}