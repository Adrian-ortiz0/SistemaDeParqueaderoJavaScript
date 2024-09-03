document.addEventListener("DOMContentLoaded", function(){
    cargarMembersDelLocalStorage()
})

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


function mostrarMembers(){
    cargarMembersDelLocalStorage()
    const informationModuleContainer = document.getElementById("informationModuleContainer")
    members.forEach(function(member, index){
        const informationModule = document.createElement("div")
        informationModule.classList.add("informationModule")
        informationModule.innerHTML = `<div class="defaultVehiclesSlots">
                <h3>${index + 1}</h3>
            </div>
            <div class="defaultVehiclesSlots">
                <h3>${member.name}</h3>
            </div>
            <div class="defaultVehiclesSlots">
                <h3>${member.plate}</h3>
            </div>
            <div class="defaultVehiclesSlots">
                <h3>${member.vehicle_type}</h3>
            </div>
            <div class="defaultVehiclesSlots">
                <h3>${member.model}</h3>
            </div>
            <div class="defaultVehiclesSlots">
                <h3>${member.months_selected}</h3>
            </div>`
            
            informationModuleContainer.appendChild(informationModule)
    })
}

mostrarMembers()