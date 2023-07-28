const submitBtn = document.querySelector(".submit-btn");
const Floors = document.querySelector(".floor-num");
const Lifts = document.querySelector(".lift-num");
const contentDiv = document.querySelector(".content-box");
const FloorInput=document.querySelector(".floor-num");
const FloorLabel=document.querySelector(".floor-label");
const liftInput=document.querySelector(".lift-num");
const LiftLabel=document.querySelector(".lift-label");


submitBtn.addEventListener("click", () => {
    numFloor = Number(Floors.value)
    numLift = Number(Lifts.value);

   FloorInput.style.display="none";
   liftInput.style.display="none";
   FloorLabel.style.display="none";
   LiftLabel.style.display="none";
   submitBtn.style.display="none";
    contentDiv.innerHTML = "";

    const allLifts = document.createElement('div')
    allLifts.classList.add('total-lifts')

    //Create the required number of floors
    let floors = [];
    for (let i = 1; i <= numFloor; i++) {
        const floorContainer = document.createElement('div')
        const floor = document.createElement('div');
        const buttonContainer = document.createElement('div')
        buttonContainer.classList.add('button-container');

        floorContainer.classList.add('floor-container')
        floor.classList.add('floor')
        floor.setAttribute('data-floor', i)

        const upLiftButton = document.createElement('button');
        const downLiftButton=document.createElement('button')
        const floorNumber = document.createElement('h3')
        floorNumber.textContent = `Floor ${i}`
        floorNumber.classList.add('floor-Number');

        upLiftButton.textContent = "Up"
        upLiftButton.classList.add('call-lift-up-btn')
        upLiftButton.setAttribute('data-floor', i)

        downLiftButton.textContent="Down"
        downLiftButton.classList.add('call-lift-down-btn')
        downLiftButton.setAttribute('data-floor',i)
         
        // if(i==1){
        //   buttonContainer.appendChild(upLiftButton)
        // }
        // if(i==numFloor){
        //   buttonContainer.appendChild(downLiftButton)
        // }
        buttonContainer.appendChild(upLiftButton)
        buttonContainer.appendChild(downLiftButton)

        floorContainer.appendChild(floorNumber)
        floorContainer.appendChild(buttonContainer)
        if (i === 1) floorContainer.append(allLifts)
        if(i==1){
          downLiftButton.style.display="none"
        }
        if(i==numFloor){
          upLiftButton.style.display="none";
        }
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
         
        leftDoor=document.createElement('div');
        RightDoor=document.createElement('div');

        leftDoor.setAttribute("class", "left-door");
        RightDoor.setAttribute("class", "right-door");

       lift.appendChild(leftDoor);
       lift.appendChild(RightDoor);

        lift.setAttribute('data-lift', i)
        allLifts.appendChild(lift);
    }
})

let x = [];
let floorArr = [];
let liftsOnWay = [];

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("call-lift-up-btn")) {
    const selectedFloor = Number(e.target.dataset.floor);

    if (liftsOnWay.includes(selectedFloor)) {
      console.log("A lift is already on the way to this floor.");
      return;
    }

    const liftsOnFloor = document.querySelectorAll(
      `.lift[data-floor="${selectedFloor}"]`
    );

    if (liftsOnFloor.length > 0) {
      openLiftDoor(liftsOnFloor[0],selectedFloor);
      console.log("There is already a lift on this floor");
    } else {
      x.push(selectedFloor);
      if (x.length >= 1) {
        MoveLift();
      }
    }
  }
});

function MoveLift() {
  // Code for moving the lift to the selected floor
  // When the lift arrives, remove the floor from the x array
  // and add it to the liftsOnWay array.
}

function openLiftDoor(lift,selectedFloor) {
  if(lift.dataset.floor==selectedFloor){
  lift.classList.add("busy");
  setTimeout(() => {
    lift.children[0].style.transform = "translateX(-100%)";
    lift.children[1].style.transform = "translateX(100%)";
  }, 1000);
  setTimeout(() => {
    lift.children[0].style.transform = "none";
    lift.children[1].style.transform = "none";
  }, 4000);
  setTimeout(() => {
    lift.classList.remove("busy");
    const floor = lift.dataset.floor;
    const index = liftsOnWay.indexOf(floor);
    if (index !== -1) {
      liftsOnWay.splice(index, 1);
    }
  }, 7000);
}}


// let x=[];;
// let floorArr=[];
// document.addEventListener("click",(e)=>{
//   if(e.target.classList.contains("call-lift-up-btn")){
//     const selectedFloor = Number(e.target.dataset.floor);

//     const liftsOnFloor = document.querySelectorAll(`.lift[data-floor="${selectedFloor}"]`);
//     if (liftsOnFloor.length > 0) {
      
//       // liftsOnFloor.forEach(lift => {
//       //   lift.classList.add("busy");
//       openLiftDoor(liftsOnFloor);
//       // }
//       // );

//     // setTimeout(()=>{
//     //   liftsOnFloor.children[0].style.transform="translateX(-100%)";
//     //   liftsOnFloor.children[1].style.transform="translateX(100%)"
//     // },1000)

//     // setTimeout(() => {
//     //   liftsOnFloor.children[0].style.transform="none";
//     //   liftsOnFloor.children[1].style.transform="none"
//     // },4000)

//     // setTimeout(()=>{
//     //   liftsOnFloor.forEach(lift => {
//     //   liftsOnFloor.classList.remove("busy");
//     //   });
//     // },7000)
   
//       console.log("There is already a lift on this floor");
//       // return;
//     }
//     console.log("selectedfloor"+selectedFloor);
//     if(x.includes(selectedFloor)){
//       console.log("x-----"+x)
      
//       return;
//     }
//     else{
//       x.push(selectedFloor);
//       if(x.length>=1){
//         MoveLift()
//       }
//     }
//     // x=selectedFloor;
//   }
// });
// document.addEventListener("click",(e)=>{
//   if(e.target.classList.contains("call-lift-down-btn")){
//     const selectedFloor = Number(e.target.dataset.floor)

//     if(selectedFloor===x){
//       return;
//     }
//     else{
//       floorArr.push(selectedFloor);
//       if(floorArr.length>=1){
//         MoveLift()
//       }
//     }
//     x=selectedFloor;
//   }
// });
// function openLiftDoor(lift) {
//   lift.classList.add("busy");
//   setTimeout(() => {
//     lift.children[0].style.transform="translateX(-100%)";
//     lift.children[1].style.transform="translateX(100%)";
//   }, 1000);
//   setTimeout(() => {
//     lift.children[0].style.transform="none";
//     lift.children[1].style.transform="none";
//   }, 3000);
//   setTimeout(() => {
//     lift.classList.remove("busy");
//   }, 4000);
// }

// function openLiftDoor(lift) {
//   lift.classList.add("busy");
//   setTimeout(() => {
//     lift.children[0].style.transform = "translateX(-100%)";
//     lift.children[1].style.transform = "translateX(100%)";
//   }, 1000);
//   setTimeout(() => {
//     lift.children[0].style.transform = "none";
//     lift.children[1].style.transform = "none";
//   }, 3000);
//   setTimeout(() => {
//     lift.classList.remove("busy");
//     const floor = lift.dataset.floor;
//     const index = liftsOnWay.indexOf(floor);
//     if (index !== -1) {
//       liftsOnWay.splice(index, 1);
//     }
//   }, 4000);
// }
// function openLiftDoor(liftsOnFloor) {
//   for(let i=0; i<liftsOnFloor.length; i++) {
//     let lift = liftsOnFloor[i];
//     lift.classList.add("busy");
//     setTimeout(() => {
//       lift.children[0].style.transform="translateX(-100%)";
//       lift.children[1].style.transform="translateX(100%)";
//     }, 1000);
//     setTimeout(() => {
//       lift.children[0].style.transform="none";
//       lift.children[1].style.transform="none";
//     }, 3000);
//     setTimeout(() => {
//       lift.classList.remove("busy");
//     }, 4000);
//   }
// }

function LiftStatus(targetFloor, selectedLift, distance){
  console.log("floor : ", targetFloor)
  console.log("lift : ", selectedLift)

  const liftOnFloor = Number(selectedLift.dataset.floor);
  if (liftOnFloor !== targetFloor) {
    selectedLift.style.transition = `all ${distance * 2}s ease-in-out`;
    selectedLift.style.transform = `translateY(${-130 * (targetFloor - 1)}px)`;
    selectedLift.dataset.floor = targetFloor;

    selectedLift.classList.add("busy");

    setTimeout(()=>{
      selectedLift.children[0].style.transform="translateX(-100%)";
      selectedLift.children[1].style.transform="translateX(100%)"
    },distance * 2000 + 2000)

    setTimeout(() => {
      selectedLift.children[0].style.transform="none";
      selectedLift.children[1].style.transform="none"
    },distance*2000 + 4000)

    setTimeout(()=>{
      selectedLift.classList.remove("busy");
     
    },distance*2000 + 7000)
   

  } 
  else {
    selectedLift.classList.add("busy");
    setTimeout(()=>{
      selectedLift.children[0].style.transform="translateX(-100%)";
      selectedLift.children[1].style.transform="translateX(100%)"
    },1000)

    setTimeout(() => {
      selectedLift.children[0].style.transform="none";
      selectedLift.children[1].style.transform="none"
    }, 4000);

    setTimeout(()=>{
      selectedLift.classList.remove('busy');
      
    },7000);
  }
}

function MoveLift(){
  let lifts=[];

  let selectLift=document.getElementsByClassName('lift');
  for(let i=0;i<selectLift.length;i++){
    lifts.push(...selectLift);
  }
  const clickedFloor=x[0];

  const freeLift = lifts.filter(lift => !lift.classList.contains('busy'))
  let distance = null;

  if(freeLift.length>=1){
    for(i=0;i<freeLift.length;i++){
      const floorDistance=Math.abs(clickedFloor-(freeLift[i].dataset.floor))
      console.log("floordistance"+floorDistance)
      if(distance==null || floorDistance<=distance){
        distance=floorDistance;
        liftAvailable=freeLift[i];
      }
    }
    LiftStatus(clickedFloor,liftAvailable,distance);
    x.shift();
    console.log("floorArr"+floorArr[i]);
  }
  else{
    setTimeout(()=>{
      MoveLift()
    },1000);
  }
}