document.addEventListener("DOMContentLoaded", function(){
    actualizarHoraActual();
    setInterval(actualizarHoraActual, 60000);
})

function actualizarHoraActual() {
    const ahora = new Date();
    const horas = ahora.getHours().toString().padStart(2);
    const minutos = ahora.getMinutes().toString().padStart(2, '0');
    const horaActual = `${horas}:${minutos}`;
    document.getElementById('horaActual').textContent = horaActual;
}

//------------------------------------------------------------------------------------------------------------------//

let slots = []
let members = []
let vehicles = []

//------------------------------------------------------------------------------------------------------------------//

//FUNCIONES DE GUARDAR Y CARGAR DESDE EL LOCALSTORAGE

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

function guardarSlotsEnLocalStorage() {
    localStorage.setItem('slots', JSON.stringify(slots));
}

function obtenerSlotsDesdeLocalStorage() {
    const slotsData = localStorage.getItem('slots');
    if (slotsData) {
        return JSON.parse(slotsData);
    } else {
        const initialSlots = Array.from({length: 50}, (_, i) => ({
            name: `A${i + 1}`,
            available: true
        }));
        localStorage.setItem('slots', JSON.stringify(initialSlots));
        return initialSlots;
    }
}

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

//-----------------------------------------------------------------------------------------------------------------//

//REGISTRAR LA ENTRADA DE LOS MIEMBROS

const registerEntranceBtn = document.getElementById("registerEntranceBtn");

registerEntranceBtn.addEventListener("click", function() {
    registerMemberEntrance();
});

function registerMemberEntrance(){
    cargarMembersDelLocalStorage()
    cargarVehiculosDelLocalStorage()
    obtenerSlotsDesdeLocalStorage()
    const plateInputEntrance = document.getElementById("plateInputEntrance");
    const hourInputEntrance = document.getElementById("hourInputEntrance");
    const horaActual = document.getElementById("horaActual").innerText;
    
    const expresionRegularVehiculo = /^[A-Za-z]{3}\d{3}$/;
    const expresionRegularHora = /^([01]\d|2[0-3]):([0-5]\d)$/;

    const plate = plateInputEntrance.value.toUpperCase();

    if (!plateInputEntrance.value || !hourInputEntrance.value) {
        alert("Rellena todos los campos!")
    }

    if (!expresionRegularVehiculo.test(plate)) {
        return alert("Placa escrita en el formato incorrecto! (ABC123)");
    }
    if (!expresionRegularHora.test(hourInputEntrance.value)) {
        return alert("Hora escrita en mal formato! (XX:XX)");
    }
    if (hourInputEntrance.value !== horaActual) {
        return alert("La hora no coincide con la hora actual!");
    }
    members.forEach(function(member){
        if (member.plate === plateInputEntrance.value) {
            console.log("Es miembro")
            const newMemberVehicle = {
            plate: plate,
            model: member.model,
            entrance_hour: hourInputEntrance.value,
            slot: member.slot,
            exit_hour: "",
            price: 0,
            type: member.vehicle_type,
            total_cost: 0,
            member: true
            }
            vehicles.push(newMemberVehicle)
            const slotDisponible = slots.find(slotItem => slotItem.name === member.slot);
            slotDisponible.available = false
            alert(`Bienvenido miembro ${member.name}!`)
        } else {
            console.log("No es miembro")
        }
        guardarVehiculosEnLocalStorage();
        plateInputEntrance.value = '';
        hourInputEntrance.value = '';
    })
}

window.addEventListener('beforeunload', () => {
    guardarVehiculosEnLocalStorage();
});