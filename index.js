const submitBtn = document.querySelector(".submit-btn");
const Floors = document.querySelector(".floor-num");
const Lifts = document.querySelector(".lift-num");
const contentDiv = document.querySelector(".content-box");

submitBtn.addEventListener("click", () => {
    numFloor = Number(Floors.value)
    numLift = Number(Lifts.value)

    contentDiv.innerHTML = "";

    const allLifts = document.createElement('div')
    allLifts.classList.add('total-lifts')

    //Create the required number of floors
    let floors = [];
    for (let i = 1; i <= numFloor; i++) {
        const floorContainer = document.createElement('div')
        const floor = document.createElement('div');
        const buttonContainer = document.createElement('div')

        floorContainer.classList.add('floor-container')
        floor.classList.add('floor')
        floor.setAttribute('data-floor', i)

        const callLift = document.createElement('button')
        const floorNumber = document.createElement('h3')
        floorNumber.textContent = `Floor ${i}`
        callLift.textContent = "Button"
        callLift.classList.add('call-lift-btn')
        callLift.setAttribute('data-floor', i)
        buttonContainer.appendChild(callLift)

        floorContainer.appendChild(floorNumber)
        floorContainer.appendChild(buttonContainer)
        if (i === 1) floorContainer.append(allLifts)
        floor.appendChild(floorContainer)
        floors.unshift(floor)
    }
    for (let i = 0; i < floors.length; i++) {
        contentDiv.appendChild(floors[i])
    }

    //Add the required number of lifts to the floors
    for (let i = 1; i <= numLift; i++) {
        const lift = document.createElement('div')
        lift.setAttribute('class', 'lift')
        lift.setAttribute('data-floor', 1)
        lift.setAttribute('data-lift', i)
        allLifts.appendChild(lift);
    }
})

let tempFloorCall;
addEventListener('click', (e) => {
    if (e.target.classList.contains("call-lift-btn")) {
        const selectedFloor = Number(e.target.dataset.floor)
        console.log("selected"+selectedFloor);
        //So that two lifts cannot be called to the same floor on the same time
        if (selectedFloor != tempFloorCall) {
            tempFloorCall = selectedFloor;
            startLift(selectedFloor)
        }
    }
})

function liftStatus(targetFloor, selectedLift, distance){
    console.log("floor : ", targetFloor)
    console.log("lift : ", selectedLift)

    const liftOnFloor = Number(selectedLift.dataset.floor);
    if (liftOnFloor !== targetFloor) {
        selectedLift.style.transition = `all ${distance * 2}s ease-in-out`;
        selectedLift.style.transform = `translateY(${-130 * (targetFloor - 1)}px)`;
        selectedLift.dataset.floor = targetFloor;
        selectedLift.classList.add("occupied");

        setTimeout(() => {
            selectedLift.classList.add('door')
        }, distance * 2500)

        selectedLift.addEventListener('transitionend', (e) => {
            setTimeout(() => {
                selectedLift.classList.remove("door");
                selectedLift.classList.remove("occupied");
            }, 6000)
        })

    } else {
        selectedLift.classList.add("door");
        selectedLift.classList.add("occupied");
        setTimeout(() => {
            selectedLift.classList.remove("door");
            selectedLift.classList.remove("occupied");
        }, 6000);
    }
}


function startLift(targetFloor){
   
    let lifts=[];
    let liftAvailable;
          let selectLift=document.getElementsByClassName('lift');
      for(let i=0;i<selectLift.length;i++){
           lifts.push(...selectLift);
      }
//     const lifts = Array.from(document.getElementsByClassName("lift"))
    const nonBusyLift = lifts.filter(lift => !lift.classList.contains('occupied'))
    let distance = null;

    if (nonBusyLift.length != 0) { //If non busy lifts exist start them else call function agian after interval
        for (i = 0; i < nonBusyLift.length; i++) {
            const floorDistance = Math.abs(targetFloor - Number(nonBusyLift[i].dataset.floor))
            if (distance === null) {
                distance = floorDistance;
                liftAvailable = nonBusyLift[i]
            }
        }
        liftStatus(targetFloor, liftAvailable, distance)
    } else {
        setTimeout(() => {
            startLift(targetFloor)
        }, 1000)
    }

}