import { FC } from 'react'
import { ISquare } from 'common/models/common.models'
import { Square } from 'app/pages/Square'
import 'app/assets/styles/index.css'

interface IBoardProps {
	squares: ISquare
	onClick: (i: number) => void
	winner: boolean
}

export const Board: FC<IBoardProps> = (props) => {
	const { squares, onClick, winner } = props

	const renderSquare = (i: number) => {
		return (
			<Square
				value={squares.square[i]}
				onClick={() => onClick(i)}
				winner={!!winner}
			/>
		)
	}

	return (
		<div>
			<div className='board-row'>
				{renderSquare(0)}
				{renderSquare(1)}
				{renderSquare(2)}
			</div>
			<div className='board-row'>
				{renderSquare(3)}
				{renderSquare(4)}
				{renderSquare(5)}
			</div>
			<div className='board-row'>
				{renderSquare(6)}
				{renderSquare(7)}
				{renderSquare(8)}
			</div>
		</div>
	)
}
