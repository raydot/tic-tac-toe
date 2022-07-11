// MINIMAX Algo from Artificial Intelligence

function minimax_search(game, state) { // this is what github pilot returned
    var moves = game.MOVES(state);
    var best_move = null;
    var best_score = -Infinity;
    for (var i = 0; i < moves.length; i++) {
        var move = moves[i];
        var score = -minimax_search(game, game.NEXT_STATE(state, move));
        if (score > best_score) {
            best_score = score;
            best_move = move;
        }
    }
    return best_move;
}

// From Artificial Intelligence (pseudocode)
/**
 * An algorithm for calculating the optimal move using minimax -- the move
 * that leads to a terminal state with maximum utility, under the assumption
 * that the opponent plays to minimize utility.  The functions max_value and
 * min_value go through the whole game tree, all the way to the leaves, to 
 * determine the backed-up value of a state and the move to get there.
 */
function minimax_search(game, state) // returns an action
  player <- game.TO-MOVE(state)
  value, move -< max_value(game, state)
  return move


function max_value(game, state) { // returns a (utility, move) pair
  if game.IS_TERMINAL(state) then return game.UTILITY(state, player), null
  v, move = -Infinity
  for each a in game.ACTIONS(state) do
    v2, a2 <- min_value(game, game.RESULT(state, a))
    if v2 > v then
      v, move <- v2, a2
  end if
  return v, move
}

function min_value(game, state) { // returns a (utility, move) pair
  if game.IS_TERMINAL(state) then return game.UTILITY(state, player), null
  v, move = Infinity
  for each a in game.ACTIONS(state) do
    v2, a2 <- max_value(game, game.RESULT(state, a))
    if v2 < v then
      v, move <- v2, a2
  end if
  return v, move
}

// Seems GHPilot already knew all about this algo
// So now the trick is to figure out how to represent GAME and
// GAME.ACTIONS (set of legal moves in state s)
// GAME.MOVES
// GAME.UTILITY (value of a given move)
// GAME.RESULT(s, a) (the state that results from taking action a in state s)
// GAME.IS_TERMINAL (game over)
// GAME.NEXT_STATE
// GAME.TO-MOVE (player to move)

