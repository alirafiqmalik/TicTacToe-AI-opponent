// import writeFile from 'fs'; // Import the Node.js 'fs' module

// BOARD 
let currentPlayer = 'X';
let gameBoard = [
  ['e', 'e', 'e'],
  ['e', 'e', 'e'],
  ['e', 'e', 'e']
];

  function makeMove(row, col) {
    if (gameBoard[row][col] === 'e') {
      
      
      if (currentPlayer === 'X') {
        gameBoard[row][col] = currentPlayer;
        const cell = document.getElementById('board').children[row * 3 + col];
        cell.textContent = currentPlayer;
        cell.classList.add('animate');
      }
      else {
        console.log("HERE");
        // log_gameboard();

        gameBoard[row][col] = currentPlayer;
        const cell = document.getElementById('board').children[row * 3 + col];
        cell.textContent = currentPlayer;
        cell.classList.add('animate');
        let empty=null;
        let possibleState=null;
        empty,possibleState=tmp();
        log_gameboard(gameBoard)
      }
        

        if (checkWin()) {
            alert(currentPlayer + ' wins!');
            resetGame();
        } else if (checkDraw()) {
            alert('It\'s a draw!');
            resetGame();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

  function checkWin() {
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

  function checkDraw() {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (gameBoard[row][col] === 'e') {
          return false;
        }
      }
    }
    return true;
  }

  function resetGame() {
    gameBoard = [
      ['e', 'e', 'e'],
      ['e', 'e', 'e'],
      ['e', 'e', 'e']
    ];
    currentPlayer = 'X';
    const cells = document.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; i++) {
      cells[i].textContent = 'e';
      cells[i].classList.remove('animate');
    }
  }


// Min Max Algorithm

function tmp() {
  let possibleState=[];
  let gameBoardCopy=null;

  let empty=0;

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (gameBoard[row][col] === 'e') {
        gameBoardCopy=JSON.parse(JSON.stringify(gameBoard));
        empty+=1;
        gameBoardCopy[row][col]="X";
        possibleState.push(gameBoardCopy);
        // log_gameboard(gameBoardCopy);
        // console.log("===============================================");
      }
    }
  }

  // console.log(empty);
  return empty,possibleState;

  // gameBoardCopy.forEach(i => {
  //   console.log(i[0],i[1],i[2]);
  //   gameBoard[0][1]="O"
  //   const cell = document.getElementById('board').children[0 * 3 + 1];
  //   cell.textContent = "O";
  //   cell.classList.add('animate');
  // });
  
}


function log_gameboard(gameBoard) {
  gameBoard.forEach(row => {
    console.log(row[0],row[1],row[2]);
  });
}





//utils

// const myList = [1, 2, 3, 4, 5];

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