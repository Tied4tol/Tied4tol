function registrar(){

    const nombre =
        document.getElementById("nombre").value;

    const correo =
        document.getElementById("correo").value;

    const password =
        document.getElementById("password").value;

    if(password.length < 8){
        alert("La contraseña debe tener mínimo 8 caracteres");
        return;
    }

    const usuario = {
        nombre,
        correo,
        password
    };

    localStorage.setItem(
        "usuario",
        JSON.stringify(usuario)
    );

    alert("Usuario registrado");

    window.location.href = "index.html";
}

function login(){

    const correo =
        document.getElementById("correo").value;

    const password =
        document.getElementById("password").value;

    const usuario = JSON.parse(
        localStorage.getItem("usuario")
    );

    if(
        usuario &&
        usuario.correo === correo &&
        usuario.password === password
    ){
        window.location.href =
            "catalogo.html";
    }else{
        alert("Datos incorrectos");
    }
}