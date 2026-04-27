function login() {

  const email = document.getElementById("usuario").value;
  const pass = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, pass)
    .then(() => {
      window.location.href = "dashboard/dashboard.html";
    })
    .catch(e => alert(e.message));
}