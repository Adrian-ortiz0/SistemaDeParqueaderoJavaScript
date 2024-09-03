
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

function traerSlots() {
    const slots = obtenerSlotsDesdeLocalStorage();
    const cuadriculaSlots = document.getElementById("cuadriculaSlots");
    cuadriculaSlots.innerHTML = '';

    slots.forEach(slot => {
        const slotCell = document.createElement("div");
        slotCell.classList.add("containerSlot");

        let slotChosen = slot.available ? "availableSlot" : "unavailableSlot";

        slotCell.innerHTML = `<div class="${slotChosen}"></div><p>${slot.name}</p>`;
        cuadriculaSlots.appendChild(slotCell);
    });
}

window.addEventListener('storage', (event) => {
    if (event.key === 'slots') {
        traerSlots();
    }
});

document.addEventListener('DOMContentLoaded', traerSlots);