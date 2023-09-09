


// BOARD 
let currentPlayer = 'X';
let gameBoard = [ 
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];


  function makeMove(row, col) {
    if (gameBoard[row][col] === '') {
      
      if (currentPlayer === 'X') {
        gameBoard[row][col] = currentPlayer;
        const cell = document.getElementById('board').children[row * 3 + col];
        cell.textContent = currentPlayer;
        cell.classList.add('animate');


        let [score,state]=get_max_states(gameBoard,"O",0);

        const cells = document.getElementsByClassName('cell');
        for (let i = 0; i < cells.length; i++) {
          const row_i = Math.floor(i / 3); // Calculate the row index
          const col_i = i % 3;            // Calculate the column index
          gameBoard[row_i][col_i]=state[row_i][col_i];
          cells[i].textContent = state[row_i][col_i];
          cells[i].classList.add('animate');
        }
      }
        if (checkWin(gameBoard,currentPlayer)) {
        alert('You win!');
        resetGame();
        } 
        else if(checkWin(gameBoard,"O")){
          alert('AI wins!');
          resetGame();
        } 
        else if (checkDraw()) {
            alert('It\'s a draw!');
            resetGame();
        } 
        // else {
        //     // currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        // }
    }
  }


  function checkDraw() {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (gameBoard[row][col] === '') {
          return false;
        }
      }
    }
    return true;
  }


  function resetGame() {
    gameBoard = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
    currentPlayer = 'X';
    const cells = document.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; i++) {
      cells[i].textContent = '';
      cells[i].classList.remove('animate');
    }
  }

// Min Max Algorithm

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

  if(checkWin(gameBoard, "O")){
    return 10-depth;
  }
  else if(checkWin(gameBoard, "X")){
    return depth-10;
  }
  else{
   return depth;
  }
}


function get_next_states(gameBoard,player){
    let possibleState=[];
    let gameBoardCopy=null;
    let empty=0;
  
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (gameBoard[row][col] === '') {
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

  let [empty_count,possible_states] = get_next_states(gameBoard,player);

  if (empty_count==0) {
     return [get_score(gameBoard,depth),gameBoard];
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

  let [empty_count,possible_states] = get_next_states(gameBoard,player);

  if (empty_count==0) {
     return [get_score(gameBoard,depth),gameBoard];
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


//utils
function log_gameboard(gameBoard) {
  gameBoard.forEach(row => {
    console.log(row[0],row[1],row[2]);
  });
}



// // Convert the array to a string
// const myListString = JSON.stringify(myList);

// // Write the string to a file
// writeFile('myList.txt', myListString, (err) => {
//     if (err) {
//         console.error('Error writing to file:', err);
//     } else {
//         console.log('List written to file successfully');
//     }
// });