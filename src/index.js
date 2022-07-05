import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

// Renders a single button
// class Square extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       value: null,
//     };
//   }
//   render() {
//     return (
//       <button
//         className="square"
//         // onClick={function () { // replace with arrow function, of course
//         //   alert("click");
//         // }}
//         onClick={() => this.setState({ value: "X" })}
//       >
//         {this.state.value}
//       </button>
//     );
//   }
// }

// Function component version
function Square(props) {
  return (
    <button className='square' onClick={props.onClick}>
      {props.value}
    </button>
  );
}

// Renders 9 squares
class Board extends React.Component {
  // constructor(props) {
  //   // let's manage state from the board...
  //   // ...not now, state has been moved to history
  //   super(props);
  //   this.state = {
  //     squares: Array(9).fill(null),
  //     xIsNext: true,
  //   };
  // }

  renderSquare(i) {
    return (
      // <Square
      //   value={this.state.squares[i]}
      //   onClick={() => this.handleClick(i)}
      // />
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    // const status = "Next player: " + (this.state.xIsNext ? "X" : "O");

    // use calculateWinner to figure out who won or if there's still more game to play
    // const winner = calculateWinner(this.state.squares);
    // let status;
    // if (winner) {
    //   status = `${winner} wins!`;
    // } else {
    //   status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    // }

    return (
      <div>
        {/* <div className='status'>{status}</div> */}
        <div className='board-row'>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className='board-row'>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className='board-row'>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

// Board with placeholder values
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    // const squares = this.state.squares.slice();
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      // ignore click if square is filled or game is won
      return;
    }

    squares[i] = this.state.xIsNext ? "X" : "O";
    // this.setState({ squares: squares, xIsNext: !this.state.xIsNext });
    this.setState({
      // concat instead of push because
      // concat doesn't mutate the original array
      history: history.concat([
        {
          squares, // as opposed to squares:squares
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className='game'>
        <div className='game-board'>
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className='game-info'>
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById("root"));

// Helper function to calculate winner:
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    // console.table(lines);
    console.log(
      `a:${a}, b:${b}, c:${c}, sa:${squares[a]}, sb:${squares[b]}, sc:${squares[c]}`
    );
    // Using truthiness to check: if it exists
    // AND finds all x's or all o's in any of the positions in i
    // we have a winner!
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  console.log("-----");
  return null;
}
