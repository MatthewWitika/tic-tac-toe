
    let chaqBtn = document.querySelectorAll(".button-option");
    let popupMsg = document.querySelector(".popup");
    let msg = document.getElementById("message");
    let newGbtn = document.getElementById("new-game");
    let restartbtn = document.getElementById("restart");
    let choice = document.querySelector("form");
    let containa = document.querySelector(".choix");
    let playermsg = document.getElementById("game_on");
    let wrap = document.querySelector(".wrapper");
    var mark;
    var xTurn;
    let won = false;


    // collect player X/O and hide form
    choice.addEventListener("click", () => {
 let player = document.querySelector('input[name=rGroup]:checked');
    if(player){
        mark = player.value;
        containa.classList.add("hide");
        playermsg.textContent = "You're currently : ---" + player.value +"--- GoodLuck!";
        if(playermsg.classList.contains("hide")){
            playermsg.classList.remove("hide");
        }
        wrap.classList.remove("dip");
        wrap.classList.remove("hide");
    
        commence();
        }
    });

    //UNHIDES
    const reup = ()=>{
      containa.classList.remove("hide");
    }

    const commence = () => {
     if( mark == 'X'){
     xTurn = true;
    }else{
       xTurn = false;
      }
   }

   function switchMark() {
  if (mark == 'X') {
    mark = 'O';
  } else {
    mark = 'X';
  }
}

    let winpattern = [
      [0, 1, 2],
      [0, 3, 6],
      [0, 4, 8],
      [1, 4, 7],
      [2, 5, 8],
      [3, 4, 5],
      [6, 7, 8],
      [2, 4, 6]
    ];
     
  

    let count = 0;

// DISABLE BUTTONS
  const disableBtn = () => {
      chaqBtn.forEach((element) => (element.disabled = true));
       setTimeout(()=>{
        wrap.classList.add('dip'); 
        wrap.classList.add('hide'); 
        
    },1000);
      
    setTimeout(()=>{
      popupMsg.classList.remove("hide");
    },1000);
    }

//COMPUTER MOVES

const computerMove = () => {
 var blanks = [];
 var random;

 chaqBtn.forEach((element) =>{
   if(element.textContent ==''){
    blanks.push(element)
   }
  });
    if( count == 9){
        tieFun();
      } else{
  // CHOOSE RANDOM BLANKS(FOR PC)
   random = Math.ceil(Math.random() * blanks.length) - 1;
   blanks[random].textContent = mark;
   blanks[random].disabled = true;
   verifierFun();
   count+=1;
  
   switchMark();
}
}


// ENABLE BUTTONS
    const enableBtn = () => {
      chaqBtn.forEach((element) => { 
      element.innerText = "";
      element.disabled = false;
      if( element.style.border != 'none')
      { element.style.border ='none';}
    });
     
    popupMsg.classList.add("hide");
   }


   //DECLARE WINNER
   const winnerFun = (lettr) => {
      disableBtn();
    if (lettr == 'X') {
      msg.innerHTML= '&#x1F389; <br> <strong> X </strong> gets the Win!';
      
   } else {
    msg.innerHTML= '&#x1F389; <br> <strong> O </strong> gets the Win!';
   }

  }
// DRAW A TIE
   const tieFun = () => {
      disableBtn();
      playermsg.classList.add("hide");
      msg.innerHTML= '&#x1F60E; WHOA!<br> Its a DRAW!'
  }

  //START NEW GAME
  newGbtn.addEventListener("click", () => {
    count = 0; 
    won = false;
    playermsg.classList.add("hide");
    reup();
    enableBtn();
  });
   
  //RESTART PLAYER SELECTION AND GAME
  restartbtn.addEventListener("click", () => {
    count = 0; 
    won=false;
    playermsg.classList.add("hide");
   
    wrap.classList.add('hide'); 
    wrap.classList.add('dip');
  
    reup();
    enableBtn();
  });
  
  //VERIFY WINNER
  const verifierFun = () => {
  
    for( let i of winpattern){
      let [x,y,z] = [
        chaqBtn[i[0]].innerHTML,
        chaqBtn[i[1]].innerHTML,
        chaqBtn[i[2]].innerHTML
      ];

      if (x !== "" && y !== "" && z !== ""){
        if (x == y && y == z){
          chaqBtn[i[0]].style.border = "3px groove #2ADD8D";
          chaqBtn[i[1]].style.border = "3px groove #2ADD8D";
          chaqBtn[i[2]].style.border = "3px groove #2ADD8D";
         winnerFun(x);
          won = true;
        }
    }
  }
}

chaqBtn.forEach((element) => {
element.addEventListener("click", ()=> {
  if (xTurn) {
   // xTurn = false;
   if( count == 9){
    tieFun();
  }
  element.innerHTML = "X";
  element.disabled = true;
    switchMark();
    verifierFun();
    count+=1;
  
  if(!won) computerMove();
  } else {
    //xTurn = true;
    if( count == 9){
     tieFun();
    }
  element.innerHTML = "O";
  element.disabled = true;
   switchMark(); 
   verifierFun();
   count+=1;
   
    if(!won) computerMove(); 
  }
 
})
});
window.onload = enableBtn; 