// ESENCIALES AL CARGAR LA PAGINA
document.addEventListener('DOMContentLoaded', (event) => {
    const dropdownButton = document.getElementById('dropdownButton');
    const dropdownContent = document.getElementById('dropdownContent');
    const dropdownButtonMonth = document.getElementById("dropdownButtonMonth");
    const dropdownContentMonth = document.getElementById("dropdownContentMonth");

    dropdownButton.addEventListener('click', () => {
        dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
    });

    dropdownContent.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            dropdownButton.textContent = event.target.textContent;
            dropdownContent.style.display = 'none';
        }
    });

    window.addEventListener('click', (event) => {
        if (!event.target.matches('.dropdown-button')) {
            if (dropdownContent.style.display === 'block') {
                dropdownContent.style.display = 'none';
            }
        }
    });

    dropdownButtonMonth.addEventListener('click', () => {
        dropdownContentMonth.style.display = dropdownContentMonth.style.display === 'block' ? 'none' : 'block';
    });

    dropdownContentMonth.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            dropdownButtonMonth.textContent = event.target.textContent;
            dropdownContentMonth.style.display = 'none';
        }
    });

    window.addEventListener('click', (event) => {
        if (!event.target.matches('.dropdown-button')) {
            if (dropdownContentMonth.style.display === 'block') {
                dropdownContentMonth.style.display = 'none';
            }
        }
    });

    slots = obtenerSlotsDesdeLocalStorage();
    cargarMembersDelLocalStorage();
});

//--------------------------------------------------------------------------------------------------------------//

// Declarar variables globales
let slots = [];
let members = [];
let vehicles = [];

//--------------------------------------------------------------------------------------------------------------//

//FUNCIONES DE LLAMADA AL LOCALSTORAGE

function guardarMembersEnLocalStorage() {
    localStorage.setItem("members", JSON.stringify(members));
    guardarSlotsEnLocalStorage();
}

function cargarMembersDelLocalStorage() {
    const membersString = localStorage.getItem("members");
    if (membersString) {
        members = JSON.parse(membersString);
    } else {
        members = [];
    }
}

function guardarSlotsEnLocalStorage() {
    localStorage.setItem('slots', JSON.stringify(slots));
}

function obtenerSlotsDesdeLocalStorage() {
    const slotsData = localStorage.getItem('slots');
    return slotsData ? JSON.parse(slotsData) : [];
}

//--------------------------------------------------------------------------------------------------------------//

//LLAMADOS DE VARIABLES

const nameInputMember = document.getElementById("nameInputMember");
const memberPlateInput = document.getElementById("plateInputMember");
const modelInputMember = document.getElementById("modelInputMember");
const memberSlotInput = document.getElementById("slotInputMember");
const dropdownButton = document.getElementById("dropdownButton").innerText;
const dropdownButtonMonth = document.getElementById("dropdownButtonMonth").innerText;
const registerMemberBtn = document.getElementById("registerMemberBtn");

//--------------------------------------------------------------------------------------------------------------//

//EXPRESIONES REGULARES

const expresionRegularVehiculo = /^[A-Za-z]{3}\d{3}$/;
const expresionRegularSlot = /^A([1-9]|[1-9]\d|50)$/;

//--------------------------------------------------------------------------------------------------------------//

//LLAMADO DE BOTON

registerMemberBtn.addEventListener("click", function(){
    registrarMiembros();
})

//--------------------------------------------------------------------------------------------------------------//

//FUNCION DE REGISTRAR MIEMBROS

function registrarMiembros() {
    cargarMembersDelLocalStorage();

    if (!nameInputMember.value || !memberPlateInput.value || !modelInputMember.value || !memberSlotInput.value || !dropdownButton || !dropdownButtonMonth) {
        return alert("Debes rellenar todos los campos");
    }

    if (!expresionRegularVehiculo.test(memberPlateInput.value)) {
        return alert("Placa escrita en el formato incorrecto! (ABC123)");
    }

    if (!expresionRegularSlot.test(memberSlotInput.value)) {
        return alert("El slot está escrito en un formato incorrecto! (A1-A50)");
    }

    const slotDisponible = slots.find(slot => slot.name === memberSlotInput.value);

    if (!slotDisponible) {
        return alert("El slot no existe!");
    }
    if (!slotDisponible.available) {
        return alert("El slot ya ha sido ocupado!");
    }

    const placaExistente = vehicles.find(vehicle => vehicle.plate === memberPlateInput.value);
    if (placaExistente) {
        return alert("La placa ya ha sido registrada!");
    }

    let price;
    switch (dropdownButton) {
        case 'Carro':
            price = 3000;
            break;
        case 'Moto':
            price = 1000;
            break;
        case 'Camión':
            price = 6000;
            break;
        default:
            price = 0;
    }

    const monthsSelected = parseInt(dropdownButtonMonth);
    const totalCost = price * monthsSelected;

    const newMember = {
        name: nameInputMember.value,
        plate: memberPlateInput.value,
        model: modelInputMember.value,
        slot: memberSlotInput.value,
        vehicle_type: dropdownButton,
        months_selected: dropdownButtonMonth,
        total_cost: totalCost
    };

    members.push(newMember);
    guardarMembersEnLocalStorage();
    alert("Miembro registrado exitosamente!");

    nameInputMember.value = '';
    memberPlateInput.value = '';
    modelInputMember.value = '';
    memberSlotInput.value = '';
    document.getElementById('dropdownButton').innerText = 'Select Type';
    document.getElementById('dropdownButtonMonth').innerText = 'Select Months';
}
