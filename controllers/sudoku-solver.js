class SudokuSolver {
  // Validate the puzzle string
  validate(puzzleString) {
    const validCharacters = /^[1-9.]{81}$/;
    return validCharacters.test(puzzleString);
  }

  // Check if a value can be placed in the specified row
  checkRowPlacement(puzzleString, row, column, value) {
    const rowStart = row * 9;
    const rowEnd = rowStart + 9;
    const rowValues = puzzleString.slice(rowStart, rowEnd);
    return !rowValues.includes(value);
  }

  // Check if a value can be placed in the specified column
  checkColPlacement(puzzleString, row, column, value) {
    let colValues = "";
    for (let i = 0; i < 9; i++) {
      colValues += puzzleString[i * 9 + column];
    }
    return !colValues.includes(value);
  }

  // Check if a value can be placed in the specified region
  checkRegionPlacement(puzzleString, row, column, value) {
    const regionRow = Math.floor(row / 3) * 3;
    const regionCol = Math.floor(column / 3) * 3;
    let regionValues = "";

    for (let r = regionRow; r < regionRow + 3; r++) {
      for (let c = regionCol; c < regionCol + 3; c++) {
        regionValues += puzzleString[r * 9 + c];
      }
    }

    return !regionValues.includes(value);
  }

  // Solve the Sudoku puzzle using backtracking
  solve(puzzleString) {
    const board = puzzleString.split("");

    const findEmptySpot = () => {
      for (let i = 0; i < board.length; i++) {
        if (board[i] === ".") return i; // Return index of empty spot
      }
      return -1; // No empty spots left
    };

    const backtrack = () => {
      const emptySpotIndex = findEmptySpot();
      if (emptySpotIndex === -1) return true; // Solved

      const row = Math.floor(emptySpotIndex / 9);
      const column = emptySpotIndex % 9;

      for (let num = 1; num <= 9; num++) {
        const value = num.toString();
        if (
          this.checkRowPlacement(board.join(""), row, column, value) &&
          this.checkColPlacement(board.join(""), row, column, value) &&
          this.checkRegionPlacement(board.join(""), row, column, value)
        ) {
          board[emptySpotIndex] = value; // Place the number

          if (backtrack()) return true; // Continue solving

          board[emptySpotIndex] = "."; // Reset on backtrack
        }
      }
      return false; // Trigger backtrack
    };

    if (backtrack()) {
      return board.join("");
    } else {
      return false; // No solution found
    }
  }
}

module.exports = SudokuSolver;
