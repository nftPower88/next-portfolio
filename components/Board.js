import React, { useState, useRef, useEffect } from 'react'
import { useSnake } from '../context/SnakeContext'
import { useInterval } from '../hooks/useInterval'
import {
  CANVAS_SIZE,
  SNAKE_START,
  APPLE_START,
  SCALE,
  SPEED,
  DIRECTIONS,
} from '../constants/snake'

export default function Board() {
  const { score, setScore, addScore } = useSnake()

  const canvasRef = useRef()
  const [snake, setSnake] = useState(SNAKE_START)
  const [apple, setApple] = useState(APPLE_START)
  const [dir, setDir] = useState([0, -1])
  const [speed, setSpeed] = useState(null)
  const [gameOver, setGameOver] = useState(false)

  useInterval(() => gameLoop(), speed)

  const endGame = () => {
    setSpeed(null)
    setGameOver(true)
    addScore()
  }

  const moveSnake = ({ keyCode }) =>
    keyCode >= 37 && keyCode <= 40 && setDir(DIRECTIONS[keyCode])

  const createApple = () =>
    apple.map((_a, i) => Math.floor(Math.random() * (CANVAS_SIZE[i] / SCALE)))

  const checkCollision = (piece, snk = snake) => {
    if (
      piece[0] * SCALE >= CANVAS_SIZE[0] ||
      piece[0] < 0 ||
      piece[1] * SCALE >= CANVAS_SIZE[1] ||
      piece[1] < 0
    )
      return true

    for (const segment of snk) {
      if (piece[0] === segment[0] && piece[1] === segment[1]) return true
    }
    return false
  }

  const checkAppleCollision = (newSnake) => {
    if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
      let newApple = createApple()
      while (checkCollision(newApple, newSnake)) {
        newApple = createApple()
      }
      setApple(newApple)
      return true
    }
    return false
  }

  const gameLoop = () => {
    const snakeCopy = JSON.parse(JSON.stringify(snake))
    const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]]
    snakeCopy.unshift(newSnakeHead)
    if (checkCollision(newSnakeHead)) endGame()
    if (!checkAppleCollision(snakeCopy)) snakeCopy.pop()
    if (checkAppleCollision(snakeCopy)) setScore(score + 1)
    setSnake(snakeCopy)
  }

  const startGame = () => {
    setScore(0)
    setSnake(SNAKE_START)
    setApple(APPLE_START)
    setDir([0, -1])
    setSpeed(SPEED)
    setGameOver(false)
  }

  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      if (e.keyCode >= 37 && e.keyCode <= 40) e.preventDefault()
      moveSnake(e)
    })
  }, [])

  useEffect(() => {
    const context = canvasRef.current.getContext('2d')
    context.setTransform(SCALE, 0, 0, SCALE, 0, 0)
    context.clearRect(0, 0, window.innerWidth, window.innerHeight)
    context.fillStyle = 'LightPink'
    snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1))
    context.fillStyle = 'LightGreen'
    context.fillRect(apple[0], apple[1], 1, 1)
  }, [snake, apple, gameOver])

  return (
    <div className='w-1/2 p-5'>
      <div className='flex flex-row justify-between my-2 mx-4'>
        <div
          className='px-4 py-3 leading-normal bg-green-300 rounded-md'
          role='alert'
        >
          <p>Your Score: {score}</p>
        </div>

        <button
          onClick={startGame}
          className='px-4 py-3 leading-normal bg-red-300 rounded-md'
          role='alert'
        >
          {gameOver ? 'Play Again' : 'Start Game'}
        </button>
      </div>

      <div className='flex justify-center'>
        <canvas
          style={{ border: '1px solid black' }}
          ref={canvasRef}
          width={`${CANVAS_SIZE[0]}px`}
          height={`${CANVAS_SIZE[1]}px`}
        />
      </div>
    </div>
  )
}
