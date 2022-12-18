import { FC, useState } from 'react'
import { Board } from 'app/pages/Board'
import { ISquare } from 'common/models/common.models'
import 'app/assets/styles/index.css'

export const Game: FC = () => {
	const [history, setHistory] = useState<ISquare[]>([
		{
			square: Array(9).fill(null),
		},
	])

	const [xIsNext, setXIsNext] = useState<boolean>(true)
	const [stepNumber, setStepNumber] = useState<number>(0)

	const handleClick = (i: number) => {
		const currentHistory = history.slice(0, stepNumber + 1)
		const current = currentHistory[currentHistory.length - 1]
		const squares = current.square.slice()
		if (calculateWinner({ square: squares }) || squares[i]) {
			return
		}
		squares[i] = xIsNext ? 'X' : 'O'
		setHistory(history.concat([{ square: squares }]))
		setXIsNext((prevState) => !prevState)
		setStepNumber(currentHistory.length)
	}

	function calculateWinner(squares: ISquare) {
		const lines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		]
		for (let i = 0; i < lines.length; i++) {
			const [a, b, c] = lines[i]
			if (
				squares[a] &&
				squares[a] === squares[b] &&
				squares[a] === squares[c]
			) {
				return squares[a]
			}
		}
		return null
	}

	const current = history[stepNumber]
	const winner = calculateWinner(current)

	const jumpTo = (step: number) => {
		setStepNumber(step)
		setXIsNext(step % 2 === 0)
	}

	const moves = history.map((step, move) => {
		const desc = move ? `Перейти к ходу #${move}` : 'К началу игры'
		return (
			<li key={move}>
				<button onClick={() => jumpTo(move)}>{desc}</button>
			</li>
		)
	})

	let status
	if (winner) {
		status = 'Выиграл ' + winner
	} else {
		status = 'Следующий ход: ' + (xIsNext ? 'X' : 'O')
	}

	return (
		<div className='game'>
			<div className='game-board'>
				<Board
					squares={current}
					onClick={(i: number) => handleClick(i)}
					winner={!!winner}
				/>
			</div>
			<div className='game-info'>
				<div>{status}</div>
				<ol>{moves}</ol>
			</div>
		</div>
	)
}
