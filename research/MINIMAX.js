// From Norvig & Russell's Artificial Intelligence p. 196 (pseudocode)
/**
 * An algorithm for calculating the optimal move using minimax -- the move
 * that leads to a terminal state with maximum utility, under the assumption
 * that the opponent plays to minimize utility.  The functions max_value and
 * min_value go through the whole game tree, all the way to the leaves, to
 * determine the backed-up value of a state and the move to get there.
 */
function MINIMAX() { }
-SEARCH(game, state);
returns;
an;
action;
player < -game.TO - MOVE(state);
value, move < -MAX_VALUE(game, state);
return move;
function MAX() { }
-VALUE(game, state);
returns;
a(utility, move);
pair;
if (game.IS - TERMINAL(state))
  then;
return game.UTILITY(state, player), null;
v, move = -Infinity;
for (each; a in game.ACTIONS(state);)
  do
    v2, a2 < -MIN - VALUE(game, game.RESULT(state, a));
  while ();
if (v2 > v)
  then;
v, move < -v2, a2;
end;
if ()
  return v, move;
function MIN() { }
-VAL(game, state);
returns;
a(utility, move);
pair;
if (game.IS_TERMINAL(state))
  then;
return game.UTILITY(state, player), null;
v, move = +Infinity;
for (each; a in game.ACTIONS(state);)
  do
    v2, a2 < -max_value(game, game.RESULT(state, a));
  while ();
if (v2 < v)
  then;
v, move < -v2, a2;
return v, move;
