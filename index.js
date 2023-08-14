
let liftQueue=[];

let generateBtn=document.getElementById("generate");

generateBtn.addEventListener("click",()=>{
    let numFloors=parseInt(document.getElementById("nfloors").value);

    let numLifts=parseInt(document.getElementById("nlifts").value);
   

    if(!Number.isInteger(numFloors)||!Number.isInteger(numLifts)){
        alert("Please enter an integer value")
    }
    // set max limit
    else if(numFloors>8 || numLifts>6){
      alert("max 8 floors and 6 lifts are there")
    }
    else{
       const headerElement=document.getElementById("header");
       headerElement.style.display="none";
       
       const floorContainer=document.getElementById("floor-container");
       const btnContainer=document.getElementById("btn-container");

      //  creating buttons

      for(let i=1;i<=numFloors;i++){
         const btnsDiv=document.createElement("div");
         const upBtn=document.createElement("button");
         upBtn.innerHTML="UP";
         upBtn.type="button";
         upBtn.classList.add("upBtn");
         upBtn.setAttribute("id",`upBtn${numFloors-i+1}`);
         upBtn.setAttribute("floorNo",`${numFloors-i+1}`);
         upBtn.addEventListener("click",(e)=>{
           const btnEle=e.target;
           liftQueue.push(btnEle.getAttribute("floorNo"))
         });

         const downBtn=document.createElement("button");
         downBtn.innerHTML="DOWN";
         downBtn.type="button";
         downBtn.classList.add("downBtn");
         downBtn.setAttribute("id",`downBtn${numFloors-i+1}`);
         downBtn.setAttribute("floorNo",`${numFloors-i+1}`);
         downBtn.addEventListener("click",(e)=>{
           const btnEle=e.target;
           liftQueue.push(btnEle.getAttribute("floorNo"));
         });

         const floorNumberDiv=document.createElement("div");
        //  floorNumberDiv.innerHTML=`Floor ${numFloors-i+1}`;
         floorNumberDiv.style.textAlign="center";

         btnsDiv.setAttribute("id","floorBtnDiv");
         if(i!==1){
           btnsDiv.appendChild(upBtn)
         }
         if(i!==numFloors){
          btnsDiv.appendChild(downBtn)
         }
        btnsDiv.appendChild(floorNumberDiv);
        btnContainer.appendChild(btnsDiv)
      }

      // creating floors
      for(let i=1;i<=numFloors;i++){
         const floorElement=document.createElement("div");
         floorElement.setAttribute("id",`floor${numFloors-i+1}`);
         floorElement.classList.add("floor");
         floorContainer.appendChild(floorElement)
// creating Floor Number
         const floorNumber=document.createElement('h3');
         floorNumber.textContent=`Floor ${numFloors-i+1}`;
         floorNumber.classList.add("floor-Number");
         floorElement.appendChild(floorNumber);
      }
      // creating lifts
      for(let i=1;i<=numLifts;i++){
         const liftElement=document.createElement("div");
         liftElement.setAttribute("id", `lift${i}`);
         liftElement.classList.add("lift");
         liftElement.setAttribute("floorNo", "1");
         liftElement.setAttribute("status", "free");
         let x = 100 / (1.2 * numLifts);
         console.log("xxx",x)
         liftElement.style.width = `${x}%`;
        
         liftElement.style.maxWidth = "10%";
        
        let width=10;
         console.log(width);
         if (width >= 10) {
             width = 10;
             liftElement.style.left = `${(i - 1) * (1.2 * width) + 1}%`;
         } 
       
           const leftDoor = document.createElement("div");
            const rightDoor = document.createElement("div");
            leftDoor.setAttribute("id", `leftDoor${i}`);
            rightDoor.setAttribute("id", `rightDoor${i}`);
            leftDoor.classList.add("leftDoor");
            rightDoor.classList.add("rightDoor");

            liftElement.appendChild(leftDoor);
            liftElement.appendChild(rightDoor);

            const floor1 = document.getElementById("floor1");
            floor1.appendChild(liftElement);

      }

    }
})
// lift animation
function animateLift(targetFloor){
   console.log("Targer=t floor",targetFloor);
   const lifts=Array.from(document.querySelectorAll(".lift"));
   
   console.log("liftsssssssssss",lifts);
  //  
  // if lift is on target floor and free
   const isLiftOnTarget=lifts.find((lift)=>{
      const status=lift.getAttribute("status");
      const floor=lift.getAttribute("floorNo");
      console.log("floor")
      return(floor==targetFloor) 
   })
   if(isLiftOnTarget){
     const status=isLiftOnTarget.getAttribute("status");
     if(status=="free"){
       console.log("Lift alreasy there");
       isLiftOnTarget.setAttribute("status","occupied");
       slidingDoorsAniamtion(isLiftOnTarget);
       setTimeout(()=>{
         isLiftOnTarget.setAttribute("status","free");
        //  console.log("STO is LIFtFree",freeLift)
       },5000)
     }
     return
   }

   function getClosestLiftFree(targetFloor){
    const lifts=Array.from(document.querySelectorAll(".lift"));
    const freeLifts=lifts.filter((lift)=>{
      const status=lift.getAttribute("status");
      return status=="free"
    })
    
    if(freeLifts.length>0){
      let min=Number.MAX_VALUE;
      let nearestLiftElement=freeLifts[0];
    
      function getDistanceFromTargetFloor(lift){
        const liftFloor=lift.getAttribute("floorNo");
        const distFromTargetFloor=Math.abs(liftFloor-targetFloor);
        if (distFromTargetFloor < min) {
          min = distFromTargetFloor;
          nearestLiftElement = lift;
      }
    }
    freeLifts.forEach(getDistanceFromTargetFloor);
    return nearestLiftElement;
    } else {
    return ; // No free lifts available
    }
    
      }
    
    

 const freeLift=getClosestLiftFree(targetFloor);

//  moving any lift if free
const distBetweenTargetFloorAndLift=targetFloor-freeLift.getAttribute("floorNo");
console.log(distBetweenTargetFloorAndLift);
freeLift.setAttribute("status","occupied");
freeLift.setAttribute("floorNo",targetFloor);
freeLift.style.transition = `all ${2 * Math.abs(distBetweenTargetFloorAndLift)}s linear`;
freeLift.style.transform = `translate(0, ${-110 * (targetFloor - 1)}px)`;

// make the door toggle
setTimeout(()=>{
  slidingDoorsAniamtion(freeLift)
},Math.abs(distBetweenTargetFloorAndLift)*2000+300)

// Make the status oflift free after certain time
setTimeout(()=>{
   freeLift.setAttribute("status","free");
   console.log("STO isLIftFree",freeLift)
},2000*Math.abs(distBetweenTargetFloorAndLift)+5000+300)

}

function slidingDoorsAniamtion(availableLift){
   availableLift.children[0].classList.add("leftDoorSlide");
   availableLift.children[1].classList.add("rightDoorSlide");

   setTimeout(()=>{
       availableLift.children[0].classList.remove("leftDoorSlide");
       availableLift.children[1].classList.remove("rightDoorSlide");

   },2500)
}


setInterval(checkQueue,100);
function checkQueue() {
  if (!liftQueue.length) {
    return;
  } else {
    const lifts=Array.from(document.querySelectorAll(".lift"));
    const freeLift=lifts.find((lift)=>{
     
           const status=lift.getAttribute("status");
           return (status=="free")
         });

    if (freeLift) {
      animateLift(liftQueue.shift());
    } else {
      return;
    }
  }
}



