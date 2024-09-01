let vehicles = [];
let slots = [];

function actualizarHoraActual() {
    const ahora = new Date();
    const horas = ahora.getHours().toString().padStart(2, '0');
    const minutos = ahora.getMinutes().toString().padStart(2, '0');
    const horaActual = `${horas}:${minutos}`;
    document.getElementById('horaActual').textContent = horaActual;
}

document.addEventListener('DOMContentLoaded', () => {
    cargarDatos();
    actualizarHoraActual();
    setInterval(actualizarHoraActual, 60000);
});

function cargarDatos() {
    vehicles = cargarVehiculosDelLocalStorage();
    slots = obtenerSlotsDesdeLocalStorage();
}

function guardarDatos() {
    guardarVehiculosEnLocalStorage();
    guardarSlotsEnLocalStorage();
}

function guardarVehiculosEnLocalStorage() {
    localStorage.setItem("vehicles", JSON.stringify(vehicles));
}

function cargarVehiculosDelLocalStorage() {
    const vehiclesString = localStorage.getItem("vehicles");
    return vehiclesString ? JSON.parse(vehiclesString) : [];
}

function guardarSlotsEnLocalStorage() {
    localStorage.setItem('slots', JSON.stringify(slots));
}

function obtenerSlotsDesdeLocalStorage() {
    const slotsData = localStorage.getItem('slots');
    return slotsData ? JSON.parse(slotsData) : [];
}

const plateInputExit = document.getElementById("plateInputExit");
const hourInputExit = document.getElementById("hourInputExit");
const exitCost = document.getElementById("exitCost");
const registerExitBtn = document.getElementById("registerExitBtn");
const horaActual = document.getElementById("horaActual");
const payToExit = document.getElementById("payToExit");

registerExitBtn.addEventListener("click", registerExit);

function registerExit() {
    const expresionRegularHora = /^([01]\d|2[0-3]):([0-5]\d)$/;
    const expresionRegularVehiculo = /^[A-Za-z]{3}\d{3}$/;

    if (plateInputExit.value === "" || hourInputExit.value === "") {
        return alert("Rellena todos los campos!");
    }

    if (!expresionRegularVehiculo.test(plateInputExit.value)) {
        return alert("Placa escrita en el formato incorrecto! (ABC123)");
    }

    const vehiculoSaliendo = vehicles.find(vehicle => vehicle.plate === plateInputExit.value);
    if (!vehiculoSaliendo) {
        return alert("El vehículo con esta placa no se encontró.");
    }
    
    if (!expresionRegularHora.test(hourInputExit.value)) {
        return alert("Hora escrita en mal formato! (XX:XX)");
    }
    
    if (!horaActual) {
        return alert("El elemento de hora actual no se encontró en el DOM.");
    }
    if (hourInputExit.value !== horaActual.innerText) {
        return alert("La hora no coincide con la hora actual!");
    }
    vehiculoSaliendo.exit_hour = hourInputExit.value;

    const entranceMinutes = convertToMinutes(vehiculoSaliendo.entrance_hour);
    const exitMinutes = convertToMinutes(hourInputExit.value);
    const durationMinutes = exitMinutes - entranceMinutes;

    const durationHours = Math.ceil(durationMinutes / 60); 
    const totalCost = durationHours * vehiculoSaliendo.price;

    vehiculoSaliendo.total_cost = totalCost;

    console.log("Costo total:", totalCost);
    exitCost.innerText = `${totalCost}$`;
    console.log(vehiculoSaliendo);

    payToExit.addEventListener("click", finalizarSalida);
}

function finalizarSalida() {
    const vehiculoSaliendo = vehicles.find(vehicle => vehicle.plate === plateInputExit.value);
    if (!vehiculoSaliendo) {
        return alert("Error: No se encontró el vehículo.");
    }

    vehicles = vehicles.filter(vehicle => vehicle.plate !== plateInputExit.value);
    
    const slotLiberado = slots.find(slot => slot.name === vehiculoSaliendo.slot);
    if (slotLiberado) {
        slotLiberado.available = true;
    }

    guardarDatos();

    alert("Salida registrada exitosamente. El slot ha sido liberado.");
    plateInputExit.value = "";
    hourInputExit.value = "";
    exitCost.innerText = "";

    console.log("Vehículo eliminado y slot actualizado.");
}

function convertToMinutes(time) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
}

window.addEventListener('beforeunload', guardarDatos);