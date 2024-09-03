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
        if (!event.target.matches('#dropdownButton') && !event.target.matches('#dropdownContent') && !event.target.matches('#dropdownContent a')) {
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
        if (!event.target.matches('#dropdownButtonMonth') && !event.target.matches('#dropdownContentMonth') && !event.target.matches('#dropdownContentMonth a')) {
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

function guardarVehiculosEnLocalStorage() {
    localStorage.setItem("vehicles", JSON.stringify(vehicles));
    guardarSlotsEnLocalStorage();
}

function cargarVehiculosDelLocalStorage() {
    const vehiclesString = localStorage.getItem("vehicles");
    if (vehiclesString) {
        vehicles = JSON.parse(vehiclesString);
    } else {
        vehicles = [];
    }
    slots = obtenerSlotsDesdeLocalStorage();
}

//--------------------------------------------------------------------------------------------------------------//

//LLAMADOS DE VARIABLES

const nameInputMember = document.getElementById("nameInputMember");
const memberPlateInput = document.getElementById("plateInputMember");
const modelInputMember = document.getElementById("modelInputMember");
const memberSlotInput = document.getElementById("slotInputMember");
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

    const dropdownButton = document.getElementById('dropdownButton').textContent;
    const dropdownButtonMonth = document.getElementById('dropdownButtonMonth').textContent;

    if (!nameInputMember.value || !memberPlateInput.value || !modelInputMember.value || !memberSlotInput.value || dropdownButton === 'Select Type' || dropdownButtonMonth === 'Select Months') {
        return alert("Debes rellenar todos los campos");
    }

    const placaMayuscula = memberPlateInput.value.toUpperCase();

    if (!expresionRegularVehiculo.test(placaMayuscula)) {
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

    const placaExistente = vehicles.find(vehicle => vehicle.plate === placaMayuscula);
    if (placaExistente) {
        return alert("La placa ya ha sido registrada!");
    }

    let monthPrice;
    switch (dropdownButton) {
        case 'Carro':
            monthPrice = 40000;
            break;
        case 'Moto':
            monthPrice = 20000;
            break;
        case 'Camión':
            monthPrice = 100000;
            break;
        default:
            monthPrice = 0;
    }

    let totalCostMonths;
    switch (parseInt(dropdownButtonMonth)) {
        case 3:
            totalCostMonths = monthPrice * 3;
            break;
        case 6:
            totalCostMonths = monthPrice * 6;
            break;
        case 12:
            totalCostMonths = monthPrice * 12;
            break;
        default:
            totalCostMonths = 0;
            break;
    }

    const newMember = {
        name: nameInputMember.value,
        plate: placaMayuscula, 
        model: modelInputMember.value,
        slot: memberSlotInput.value,
        vehicle_type: dropdownButton,
        months_selected: dropdownButtonMonth,
        total_cost: totalCostMonths
    };

    members.push(newMember);
    guardarMembersEnLocalStorage();
    alert("Miembro registrado exitosamente!");

    nameInputMember.value = '';
    memberPlateInput.value = '';
    modelInputMember.value = '';
    memberSlotInput.value = '';
    document.getElementById('dropdownButton').textContent = 'Select Type';
    document.getElementById('dropdownButtonMonth').textContent = 'Select Months';
}
