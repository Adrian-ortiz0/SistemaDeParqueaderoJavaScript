document.addEventListener('DOMContentLoaded', (event) => {
    const dropdownButton = document.getElementById('dropdownButton');
    const dropdownContent = document.getElementById('dropdownContent');

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
});

function actualizarHoraActual() {
    const ahora = new Date();
    const horas = ahora.getHours().toString().padStart(2, '0');
    const minutos = ahora.getMinutes().toString().padStart(2, '0');
    const horaActual = `${horas}:${minutos}`;
    document.getElementById('horaActual').textContent = horaActual;
}
document.addEventListener('DOMContentLoaded', () => {
    actualizarHoraActual();
    setInterval(actualizarHoraActual, 60000);
});



let vehicles = []
let slots = []

for (let i = 1; i <= 100; i++) {
    slots.push({ name: `A${i}`, available: true });
}

function guardarVehiculosEnLocalStorage() {
    localStorage.setItem("vehicles", JSON.stringify(vehicles));
}

function cargarVehiculosDelLocalStorage() {
    const vehiclesString = localStorage.getItem("vehicles");
    if (vehiclesString) {
        users = JSON.parse(vehiclesString);
    } else {
        vehicles = [];
    }
}

function guardarSlotsEnLocalStorage() {
    localStorage.setItem('slots', JSON.stringify(slots));
}
function obtenerSlotsDesdeLocalStorage() {
    const slotsData = localStorage.getItem('slots');
    return slotsData ? JSON.parse(slotsData) : [];
}

const registerEntranceBtn = document.getElementById("registerEntranceBtn");

registerEntranceBtn.addEventListener("click", function(){
    registerEntranceVehicles()
})

function registerEntranceVehicles() {
    const plateInputEntrance = document.getElementById("plateInputEntrance");
    const modelInputEntrance = document.getElementById("modelInputEntrance");
    const hourInputEntrance = document.getElementById("hourInputEntrance");
    const slotInputEntrance = document.getElementById("slotInputEntrance");
    const horaActual = document.getElementById("horaActual");
    const dropdownButton = document.getElementById("dropdownButton");

    const expresionRegularVehiculo = /^[A-Za-z]{3}\d{3}$/;
    const expresionRegularHora = /^([01]\d|2[0-3]):([0-5]\d)$/;
    const expresionRegularSlot = /^A([1-9]|[1-9]\d|100)$/;

    const vehicleType = dropdownButton.textContent === 'Select Type' ? '' : dropdownButton.textContent;

    if (
        !plateInputEntrance.value ||
        !modelInputEntrance.value ||
        !hourInputEntrance.value ||
        !slotInputEntrance.value ||
        !vehicleType
    ) {
        return alert("Rellena todos los campos!");
    }
    if (!expresionRegularVehiculo.test(plateInputEntrance.value)) {
        return alert("Placa escrita en el formato incorrecto! (ABC123)");
    }
    if (!expresionRegularHora.test(hourInputEntrance.value)) {
        return alert("Hora escrita en mal formato! (XX:XX)");
    }
    if (hourInputEntrance.value !== horaActual.innerText) {
        return alert("La hora no coincide con la hora actual!");
    }
    if (!expresionRegularSlot.test(slotInputEntrance.value)) {
        return alert("El slot está escrito en un formato incorrecto! (A1-A100)");
    }
    
    if (!slotDisponible) {
        return alert("El slot no existe!");
    }
    if (!slotDisponible.available) {
        return alert("El slot ya ha sido ocupado!");
    }

    const validVehicleTypes = ['Carro', 'Moto', 'Camión'];
    if (!validVehicleTypes.includes(vehicleType)) {
        return alert("Tipo de vehículo seleccionado no es válido!");
    }

    const placaExistente = vehicles.find(vehicle => vehicle.plate === plateInputEntrance.value);
    if (placaExistente) {
        return alert("La placa ya ha sido registrada!");
    }

    let price;
    switch (vehicleType) {
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

    const newVehicle = {
        plate: plateInputEntrance.value,
        model: modelInputEntrance.value,
        entrance_hour: hourInputEntrance.value,
        slot: slotInputEntrance.value,
        exit_hour: "",
        price: price,
        type: vehicleType,
        total_cost : 0 
    };
    vehicles.push(newVehicle);
    slotDisponible.available = false;
    guardarSlotsEnLocalStorage();
    alert("Entrada registrada exitosamente");
    console.log(vehicles);
    guardarVehiculosEnLocalStorage();
}
