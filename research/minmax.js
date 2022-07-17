// MINIMAX Algo from GitHub Pilot

function minimax_search(game, state) {
  // this is what github pilot returned
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
