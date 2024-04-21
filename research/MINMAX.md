# AI TIC-TAC-TOE

## MINIMAX

Pseudocode from Norvig & Russell's *Artificial Intelligence*, p. 196

"An algorithm for calculating the optimal move using minimax – the move that leads to a terminal state with maximum utility, under the assumption
that the opponent plays to minimize utility.  The functions MAX-VALUE and MIN-VALUE go through the whole game tree, all the way to the leaves, to determine the backed-up value of a state and the move to get there."

function MINIMAX-SEARCH(*game, state*) **returns** *an action*  
     player <- *game*.TO-MOVE(*state*)  
     *value, move* <- MAX-VALUE(*game, state*)  
     **return** *move*

function MAX-VALUE(*game, state*) **returns** a (*utility, move*) pair  
     **if** game.IS-TERMINAL(*state*) **then return** *game*.UTILITY(*state, player*), *null*  
     *v, move* = -∞  
     **for each** *a* **in** *game*.ACTIONS(*state*) **do**  
          *v2, a2* <- MIN-VALUE(*game, game*.RESULT(*state, a*))  
          **if** *v2* > *v* **then**  
               *v, move* <- *v2, a*  
          **return** *v, move*  

function MIN-VAL(*game, state*) **returns** a (*utility, move*) pair  
     **if** *game*.IS_TERMINAL(*state*) **then return** *game*.UTILITY(*state, player*), *null*  
       v, move = +∞  
     **for each** *a* in *game*.ACTIONS(*state*) **do**  
          *v2, a2* <- MAX-VALUE(*game*, *game*.RESULT(*state, a*))  
          **if** *v2 < v* **then**  
               *v, move* <- *v2, a*  
     **return** *v, move*

### Notes:

Utility values = [-1, 0, 1] or [x win, draw, o win]  
Move = Action  
Position = State  
MAX moves first  

* S$_0$: The **initial state**, which specifies how the game is set up at the start.  
* TO-MOVE(*s*): The player whose turn it is to move in state *s*.
* ACTIONS(s): The set of legal moves in state *s*.
* RESULT(*s, a*): The **transition model**, which defines the state resulting from taking action *a* in state *s*.
* IS-TERMINAL(*s*): A **terminal test**, which is true when the game is over and false otherwise. States where the game has ended are called **terminal states.**
* UTILITY(*s, p*): A **utility function** (also called an objective function or payoff function), which defines the final numeric value to player *p* when the game ends in terminal state *s*.

## ALPHA-BETA PRUNING

http://www.cs.cornell.edu/courses/cs312/2002sp/lectures/rec21.htm

[Geeks for Geeks Minimax Algorithm in Game Theory:](https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-4-alpha-beta-pruning/)

"Alpha-Beta pruning is an optimization technique for [the] minimax algorithm. It reduces the computation time by a huge factor...by cutting off branches in the game tree which need not be searched because there is already a better move available. It is called Alpha-Beta pruning because it passes 2 extra parameters in the minimax function, namely alpha and beta."


**Alpha** is the best value that the maximizer currently can guarantee at that level or above.  

**Beta** is the best value that the minimizer currently can guarantee at that level or above.
