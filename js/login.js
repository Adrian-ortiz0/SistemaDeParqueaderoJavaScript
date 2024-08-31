const adminEmail = "1";
const adminPassword = 1;
//bruce@wayne.com

const adminEnterButton = document.getElementById("adminEnterButton")


//---------------------------------------------------------------------------------------------------------------------//

adminEnterButton.addEventListener("click", function(){
    const adminEmailInput = document.getElementById("adminEmailInput");
    const adminPasswordInput = document.getElementById("adminPasswordInput")
    if (adminEmailInput.value !== adminEmail && adminPasswordInput.value !== adminPassword) {
        alert("Correo y contraseña incorrectos, vuelve a intentarlo")
        adminEmailInput.value = "";
        adminPasswordInput.value = "";
    } else if(adminEmailInput.value === "" && adminPasswordInput.value === ""){
        alert("Los campos estan vacios")
    } else {
        alert("Ingreso de usuario exitoso!")
        adminEmailInput.value = "";
        adminPasswordInput.value = "";
        window.location.href = "/sub_pages/home.html";
    }
})