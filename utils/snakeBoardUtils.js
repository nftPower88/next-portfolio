import { Direction } from '../constants/snake'

function getStartingSnakeLLValue(board) {
  const rowSize = board.length
  const colSize = board[0].length
  const startingRow = Math.round(rowSize / 3)
  const startingCol = Math.round(colSize / 3)
  const startingCell = board[startingRow][startingCol]
  return {
    row: startingRow,
    col: startingCol,
    cell: startingCell,
  }
}

function createBoard(BOARD_SIZE) {
  let counter = 1
  const board = []
  for (let row = 0; row < BOARD_SIZE; row++) {
    const currentRow = []
    for (let col = 0; col < BOARD_SIZE; col++) {
      currentRow.push(counter++)
    }
    board.push(currentRow)
  }
  return board
}

function getCoordsInDirection(coords, direction) {
  if (direction === Direction.UP) {
    return {
      row: coords.row - 1,
      col: coords.col,
    }
  }
  if (direction === Direction.RIGHT) {
    return {
      row: coords.row,
      col: coords.col + 1,
    }
  }
  if (direction === Direction.DOWN) {
    return {
      row: coords.row + 1,
      col: coords.col,
    }
  }
  if (direction === Direction.LEFT) {
    return {
      row: coords.row,
      col: coords.col - 1,
    }
  }
}

function isOutOfBounds(coords, board) {
  const { row, col } = coords
  if (row < 0 || col < 0) return true
  if (row >= board.length || col >= board[0].length) return true
  return false
}

function getDirectionFromKey(key) {
  if (key === 'ArrowUp') return Direction.UP
  if (key === 'ArrowRight') return Direction.RIGHT
  if (key === 'ArrowDown') return Direction.DOWN
  if (key === 'ArrowLeft') return Direction.LEFT
  return ''
}

function getNextNodeDirection(node, currentDirection) {
  if (node.next === null) return currentDirection
  const { row: currentRow, col: currentCol } = node.value
  const { row: nextRow, col: nextCol } = node.next.value
  if (nextRow === currentRow && nextCol === currentCol + 1) {
    return Direction.RIGHT
  }
  if (nextRow === currentRow && nextCol === currentCol - 1) {
    return Direction.LEFT
  }
  if (nextCol === currentCol && nextRow === currentRow + 1) {
    return Direction.DOWN
  }
  if (nextCol === currentCol && nextRow === currentRow - 1) {
    return Direction.UP
  }
  return ''
}

function getGrowthNodeCoords(snakeTail, currentDirection) {
  const tailNextNodeDirection = getNextNodeDirection(
    snakeTail,
    currentDirection
  )
  const growthDirection = getOppositeDirection(tailNextNodeDirection)
  const currentTailCoords = {
    row: snakeTail.value.row,
    col: snakeTail.value.col,
  }
  const growthNodeCoords = getCoordsInDirection(
    currentTailCoords,
    growthDirection
  )
  return growthNodeCoords
}

function getOppositeDirection(direction) {
  if (direction === Direction.UP) return Direction.DOWN
  if (direction === Direction.RIGHT) return Direction.LEFT
  if (direction === Direction.DOWN) return Direction.UP
  if (direction === Direction.LEFT) return Direction.RIGHT
}

function getCellClassName(cellValue, foodCell, snakeCells) {
  let className = 'cell'
  if (cellValue === foodCell) {
    className = 'cell cell-red'
  }
  if (snakeCells.has(cellValue)) className = 'cell cell-green'

  return className
}

export {
  getStartingSnakeLLValue,
  createBoard,
  getCoordsInDirection,
  isOutOfBounds,
  getDirectionFromKey,
  getNextNodeDirection,
  getGrowthNodeCoords,
  getOppositeDirection,
  getCellClassName,
}
