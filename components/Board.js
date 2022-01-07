import React, { useEffect, useState } from 'react'
import { LinkedListNode, LinkedList } from '../models/LinkedList'
import { randomIntFromInterval } from '../utils/randomIntFromInterval'
import { useInterval } from '../hooks/useInterval'
import {
  BOARD_SIZE,
  MIN_SNAKE_SPEED,
  DEFAULT_SNAKE_SPEED,
  Direction,
} from '../constants/snake'
import {
  getStartingSnakeLLValue,
  createBoard,
  getCoordsInDirection,
  isOutOfBounds,
  getDirectionFromKey,
  getGrowthNodeCoords,
  getOppositeDirection,
  getCellClassName,
} from '../utils/snakeBoardUtils'
import ScoreTable from './ScoreTable'

export default function Board({ scores }) {
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [score, setScore] = useState(0)
  const [board, setBoard] = useState(createBoard(BOARD_SIZE))
  const [snake, setSnake] = useState(
    new LinkedList(getStartingSnakeLLValue(board))
  )
  const [snakeCells, setSnakeCells] = useState(new Set([snake.head.value.cell]))
  const [foodCell, setFoodCell] = useState(snake.head.value.cell + 5)
  const [direction, setDirection] = useState(Direction.RIGHT)
  const [snakeSpeed, setSnakeSpeed] = useState(MIN_SNAKE_SPEED)

  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      handleKeydown(e)
    })
  }, [])

  useInterval(() => {
    moveSnake()
  }, snakeSpeed)

  function handleKeydown(e) {
    const newDirection = getDirectionFromKey(e.key)
    const isValidDirection = newDirection !== ''
    if (!isValidDirection) return
    const snakeWillRunIntoItself =
      getOppositeDirection(newDirection) === direction && snakeCells.size > 1
    if (snakeWillRunIntoItself) return
    setDirection(newDirection)
  }

  function moveSnake() {
    const currentHeadCoords = {
      row: snake.head.value.row,
      col: snake.head.value.col,
    }

    const nextHeadCoords = getCoordsInDirection(currentHeadCoords, direction)
    if (isOutOfBounds(nextHeadCoords, board)) {
      handleGameOver()
      return
    }
    const nextHeadCell = board[nextHeadCoords.row][nextHeadCoords.col]
    if (snakeCells.has(nextHeadCell)) {
      handleGameOver()
      return
    }

    const newHead = new LinkedListNode({
      row: nextHeadCoords.row,
      col: nextHeadCoords.col,
      cell: nextHeadCell,
    })
    const currentHead = snake.head
    snake.head = newHead
    currentHead.next = newHead

    const newSnakeCells = new Set(snakeCells)
    newSnakeCells.delete(snake.tail.value.cell)
    newSnakeCells.add(nextHeadCell)

    snake.tail = snake.tail.next
    if (snake.tail === null) snake.tail = snake.head

    const foodConsumed = nextHeadCell === foodCell
    if (foodConsumed) {
      growSnake(newSnakeCells)
      handleFoodConsumption(newSnakeCells)
    }

    setSnakeCells(newSnakeCells)
  }

  function growSnake(newSnakeCells) {
    const growthNodeCoords = getGrowthNodeCoords(snake.tail, direction)
    if (isOutOfBounds(growthNodeCoords, board)) {
      return
    }
    const newTailCell = board[growthNodeCoords.row][growthNodeCoords.col]
    const newTail = new LinkedListNode({
      row: growthNodeCoords.row,
      col: growthNodeCoords.col,
      cell: newTailCell,
    })
    const currentTail = snake.tail
    snake.tail = newTail
    snake.tail.next = currentTail

    newSnakeCells.add(newTailCell)
  }

  function handleFoodConsumption(newSnakeCells) {
    const maxPossibleCellValue = BOARD_SIZE * BOARD_SIZE
    let nextFoodCell

    while (true) {
      nextFoodCell = randomIntFromInterval(1, maxPossibleCellValue)
      if (newSnakeCells.has(nextFoodCell) || foodCell === nextFoodCell) continue
      break
    }

    setFoodCell(nextFoodCell)
    setScore(score + 1)
  }

  function handleGameOver() {
    setScore(0)
    const snakeLLStartingValue = getStartingSnakeLLValue(board)
    setSnake(new LinkedList(snakeLLStartingValue))
    setFoodCell(snakeLLStartingValue.cell + 5)
    setSnakeCells(new Set([snakeLLStartingValue.cell]))
    setDirection(Direction.RIGHT)
  }

  function handleStartOrPauseGame() {
    snakeSpeed === MIN_SNAKE_SPEED
      ? setSnakeSpeed(DEFAULT_SNAKE_SPEED)
      : setSnakeSpeed(MIN_SNAKE_SPEED)
  }

  return (
    <div className='bg-white flex p-10 -mt-5'>
      <div className='w-1/2 '>
        <div className='flex flex-row items-start justify-between'>
          <button className='px-8 py-4 mx-2 rounded-md bg-green-400 shadow-lg text-xl font-semibold'>
            <p>Your Score: {score}</p>
          </button>
          <button
            onClick={handleStartOrPauseGame}
            className='px-8 py-4 mx-2 rounded-md bg-red-400 shadow-lg text-xl font-semibold'
          >
            {snakeSpeed === MIN_SNAKE_SPEED ? 'Start' : 'Pause'}
          </button>
        </div>

        <div className='flex'>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type='text'
            className='font-light rounded-md border focus:outline-none py-2 mt-2 px-1 mx-4 focus:ring-2 focus:border-none ring-green-300'
            placeholder='Your Name...'
          />

          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            type='text'
            className='font-light rounded-md border focus:outline-none py-2 mt-2 px-1 mx-4 focus:ring-2 focus:border-none ring-green-300'
            placeholder='Your Company...'
          />
        </div>

        <ScoreTable scores={scores} />
      </div>

      <div className='w-1/2'>
        {board.map((row, i) => (
          <div key={i} className='row'>
            {row.map((cellValue, i) => {
              const className = getCellClassName(
                cellValue,
                foodCell,
                snakeCells
              )
              return <div key={i} className={className}></div>
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
