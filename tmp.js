let currentPlayer = 'X';

let gameBoard = [
  ['X', 'X', 'O'],
  ['O', 'X', 'X'],
  ['e', 'e', 'O']
];



function checkWin(gameBoard,currentPlayer) {
  for (let i = 0; i < 3; i++) {
    if (gameBoard[i][0] === currentPlayer && gameBoard[i][1] === currentPlayer && gameBoard[i][2] === currentPlayer) {
      return true;
    }
    if (gameBoard[0][i] === currentPlayer && gameBoard[1][i] === currentPlayer && gameBoard[2][i] === currentPlayer) {
      return true;
    }
  }
  if (gameBoard[0][0] === currentPlayer && gameBoard[1][1] === currentPlayer && gameBoard[2][2] === currentPlayer) {
    return true;
  }
  if (gameBoard[0][2] === currentPlayer && gameBoard[1][1] === currentPlayer && gameBoard[2][0] === currentPlayer) {
    return true;
  }
  return false;
}



function get_score(gameBoard){
   return checkWin(gameBoard, "O")-checkWin(gameBoard, "X");
}






function get_next_states(gameBoard,player){
    let possibleState=[];
    let gameBoardCopy=null;
    let empty=0;
  
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (gameBoard[row][col] === 'e') {
          gameBoardCopy=JSON.parse(JSON.stringify(gameBoard));
          empty+=1;
          gameBoardCopy[row][col]=player;
          possibleState.push(gameBoardCopy);
        }
      }
    }

    return [empty, possibleState];
}




function get_min_states(gameBoard,player){
  let score=get_score(gameBoard);
  
  if(Math.abs(score)==1){
    return [score,gameBoard];
  }


  let next_states = get_next_states(gameBoard,player);
  let empty_count=next_states[0]; 
  let possible_states=next_states[1];

  if (empty_count==0) {
     return [0,gameBoard];
  }
 
  if(player=="X")
    next_player="O";
  else
    next_player="X";

  let score_min=9999;
  let min_state=null;
  possible_states.forEach(state => {
    let score_i=get_max_states(state,next_player);
    if(score_min>score_i[0]){
      score_min=score_i[0];
      min_state=state;
    }
    
  });

  return [score_min,min_state]

}


function get_max_states(gameBoard,player){
  let score=get_score(gameBoard);
  
  if(Math.abs(score)==1){
    return [score,gameBoard];
  }


  let next_states = get_next_states(gameBoard,player);
  let empty_count=next_states[0]; 
  let possible_states=next_states[1];

  if (empty_count==0) {
     return [0,gameBoard];
  }
 
  if(player=="X")
    next_player="O";
  else
    next_player="X";

  let score_max=-9999;
  let max_state=null;
  
  possible_states.forEach(state => {
    let score_i=get_min_states(state,next_player);
    if(score_max<score_i[0]){
       score_max=score_i[0];
       max_state=state;
    }
    
  });

  return [score_max,max_state]

}




let [score,state]=get_max_states(gameBoard,"O");
console.log(score,state);
