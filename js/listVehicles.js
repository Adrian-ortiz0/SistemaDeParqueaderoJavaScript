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

function traerVehiculos() {
    cargarDatos();

    const informationModuleContainer = document.getElementById("informationModuleContainer");
    informationModuleContainer.innerHTML = '';

    vehicles.forEach(function(vehiculo, index) {
        const informationModule = document.createElement("div");
        informationModule.classList.add("informationModule");

        informationModule.innerHTML = `
            <div class="defaultVehiclesSlots">
                <h3>${index + 1}</h3>
            </div>
            <div class="defaultVehiclesSlots">
                <h3>${vehiculo.plate}</h3>
            </div>
            <div class="defaultVehiclesSlots">
                <h3>${vehiculo.model}</h3>
            </div>
            <div class="defaultVehiclesSlots">
                <h3>${vehiculo.slot}</h3>
            </div>
            <div class="defaultVehiclesSlots">
                <h3>${vehiculo.member}</h3>
            </div>
        `;

        informationModuleContainer.appendChild(informationModule);
    });
}

document.addEventListener('DOMContentLoaded', traerVehiculos);