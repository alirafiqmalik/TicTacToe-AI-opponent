let currentPlayer = 'X';



function checkWin(gameBoard,currentPlayer) {
  for (let i = 0; i < 3; i++) {
    if (gameBoard[i][0] === currentPlayer && gameBoard[i][1] === currentPlayer && gameBoard[i][2] === currentPlayer) {
      return 1;
    }
    if (gameBoard[0][i] === currentPlayer && gameBoard[1][i] === currentPlayer && gameBoard[2][i] === currentPlayer) {
      return 1;
    }
  }
  if (gameBoard[0][0] === currentPlayer && gameBoard[1][1] === currentPlayer && gameBoard[2][2] === currentPlayer) {
    return 1;
  }
  if (gameBoard[0][2] === currentPlayer && gameBoard[1][1] === currentPlayer && gameBoard[2][0] === currentPlayer) {
    return 1;
  }
  return 0;
}



function get_score(gameBoard,depth){
   return (checkWin(gameBoard, "O")-checkWin(gameBoard, "X"));
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




function get_min_states(gameBoard,player,depth){

  let next_states = get_next_states(gameBoard,player);
  let empty_count=next_states[0]; 
  let possible_states=next_states[1];

  if (empty_count==0) {
     return [get_score(gameBoard),gameBoard];
  }
 
  if(player=="X")
    next_player="O";
  else
    next_player="X";

  let score_min=9999;
  let min_state=null;
  possible_states.forEach(state => {
    let [score_i,tmp_state]=get_max_states(state,next_player,depth+1);
    if(score_min>score_i){
      score_min=score_i;
      min_state=state;
    }
    
  });

  return [get_score(min_state,depth),min_state]

}


function get_max_states(gameBoard,player,depth){

  let next_states = get_next_states(gameBoard,player);
  let empty_count=next_states[0]; 
  let possible_states=next_states[1];

  if (empty_count==0) {
     return [get_score(gameBoard),gameBoard];
  }
 
  if(player=="X")
    next_player="O";
  else
    next_player="X";

  let score_max=-9999;
  let max_state=null;
  
  possible_states.forEach(state => {
    let [score_i,tmp_state]=get_min_states(state,next_player,depth+1);
    if(score_max<score_i){
      // console.log(score_i,depth);
       score_max=score_i;
       max_state=state;
    }
    
  });

  return [get_score(max_state,depth),max_state]

}


let gameBoard = [ 
['X', 'e', 'e'],
['O', 'X', 'e'],
['X', 'e', 'O']
];



let [score,state]=get_max_states(gameBoard,"O",0);
// console.log(score,state);



state[0][1]="X";

// console.log(state[1][1]);

[score,state]=get_max_states(state,"O",0);
// console.log(score,state);

