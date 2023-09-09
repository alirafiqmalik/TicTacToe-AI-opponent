




# [
#     ["X","e","O"],
#     ["e","X","X"],
#     ["e","e","O"]
# ]



def check_win(gameBoard, current_player):
  for i in range(3):
      if (gameBoard[i][0] == current_player and gameBoard[i][1] == current_player and gameBoard[i][2] == current_player):
          return 1
      if (gameBoard[0][i] == current_player and gameBoard[1][i] == current_player and gameBoard[2][i] == current_player):
          return 1
  
  if (gameBoard[0][0] == current_player and gameBoard[1][1] == current_player and gameBoard[2][2] == current_player):
      return 1
  if (gameBoard[0][2] == current_player and gameBoard[1][1] == current_player and gameBoard[2][0] == current_player):
      return 1
  return 0
    


def get_score(gameBoard,depth):
  # if(check_win(gameBoard, "O")):
  #   return 1
  # elif(check_win(gameBoard, "X")):
  #   return -1
  # else:
  #   return depth

  if(check_win(gameBoard, "O")):
    return 10-depth
  elif(check_win(gameBoard, "X")):
    return depth-10
  else:
   return depth
  


def get_next_states(gameBoard,player):
  possibleState = []
  gameBoardCopy = None

  empty = 0

  for row in range(3):
    for col in range(3):
      if gameBoard[row][col] == 'e':
        gameBoardCopy = [row_i[:] for row_i in gameBoard]
        empty += 1
        gameBoardCopy[row][col] = player
        possibleState.append(gameBoardCopy)
        # log_gameBoard(gameBoardCopy);
        # print("===============================================")

  # print(empty)
  return empty, possibleState


def get_min_states(gameBoard,player,depth):

  empty_count, possible_states = get_next_states(gameBoard,player)
  if(empty_count==0):
     return get_score(gameBoard,depth),gameBoard
  
  if(player=="X"):
    next_player="O"
  else:
    next_player="X"
   

  score_min=9999
  min_state=None
  for state in possible_states:
    score_i,tmps=get_max_states(state,next_player,depth+1)
    if(score_min>score_i):
       score_min=score_i
       min_state=state
      
  return get_score(min_state,depth),min_state


def get_max_states(gameBoard,player,depth):
  empty_count, possible_states = get_next_states(gameBoard,player)
  
  if(empty_count==0):
     return get_score(gameBoard,depth),gameBoard
  
  if(player=="X"):
    next_player="O"
  else:
    next_player="X"
  
  score_max=-9999
  max_state=[]
  for state in possible_states:
    score_i,tmps=get_min_states(state,next_player,depth+1)
    if(score_max<=score_i):
       score_max=score_i
       max_state=state

  # print("MAX ",score_i,depth,max_state,tmpi)
  return get_score(max_state,depth),max_state
  
  


# tmp=[['X', 'e', 'e'],
#      ['O', 'X', 'e'],
#      ['X', 'e', 'O']]

tmp=[ 
  ['X', 'O', 'X'],
  ['O', 'O', 'e'],
  ['X', 'X', 'e']
]


a,b=get_max_states(tmp,player="O",depth=0)
print(b)



# if(player=="X"):
#     next_player="O"
#   else:
#     next_player="X"