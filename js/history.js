let historial = [];

function cargarHistorial() {
    const historialString = localStorage.getItem("historial");
    historial = historialString ? JSON.parse(historialString) : [];
}

function guardarHistorial() {
    localStorage.setItem("historial", JSON.stringify(historial));
}

function cargarVehiculosDelLocalStorage() {
    const vehiclesString = localStorage.getItem("vehicles");
    return vehiclesString ? JSON.parse(vehiclesString) : [];
}

function actualizarHistorial() {
    const vehicles = cargarVehiculosDelLocalStorage();
    let cambiosRealizados = false;

    vehicles.forEach(function(item) {
        const entradaExistente = historial.find(entrada => entrada.plate === item.plate && entrada.entrada === item.entrance_hour);
        
        if (!entradaExistente) {
            let entrada = {
                plate: item.plate,
                model: item.model,
                slot: item.slot,
                entrada: item.entrance_hour,
                salida: item.exit_hour,
                type: item.type,
                date: new Date().toLocaleDateString()
            };
            historial.push(entrada);
            cambiosRealizados = true;
        } else if (item.exit_hour && entradaExistente.salida !== item.exit_hour) {
            entradaExistente.salida = item.exit_hour;
            cambiosRealizados = true;
        }
    });

    if (cambiosRealizados) {
        guardarHistorial();
    }
}

function mostrarHistorial() {
    const informationModuleContainerHistory = document.getElementById("informationModuleContainerHistory");
    informationModuleContainerHistory.innerHTML = '';

    historial.forEach(function(vehicle, index) {
        const informationModuleHistory = document.createElement("div");
        informationModuleHistory.classList.add("informationModule");
        
        informationModuleHistory.innerHTML = `
            <div class="defaultVehiclesSlots">
                <h3>${index + 1}</h3>
            </div>
            <div class="defaultVehiclesSlots">
                <h3>${vehicle.plate}</h3>
            </div>
            <div class="defaultVehiclesSlots">
                <h3>${vehicle.model}</h3>
            </div>
            <div class="defaultVehiclesSlots">
                <h3>${vehicle.slot}</h3>
            </div>
            <div class="defaultVehiclesSlots">
                <h3>${vehicle.entrada}</h3>
            </div>
            <div class="defaultVehiclesSlots">
                <h3>${vehicle.salida || 'Parking'}</h3>
            </div>`;

        informationModuleContainerHistory.appendChild(informationModuleHistory);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    cargarHistorial();
    actualizarHistorial();
    mostrarHistorial();
});

// Actualizar y mostrar el historial cada minuto
setInterval(() => {
    actualizarHistorial();
    mostrarHistorial();
}, 60000);