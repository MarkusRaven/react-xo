import { FC } from 'react'
import 'app/assets/styles/index.css'

interface ISquareProps {
	value: string | null
	onClick: () => void
	winner: boolean
}

export const Square: FC<ISquareProps> = (props) => {
	const { value, onClick, winner } = props

	const getButtonState = (value: string | null) => {
		if (value || winner) {
			return true
		}
	}

	return (
		<button
			className='square'
			disabled={getButtonState(value)}
			onClick={onClick}>
			{value}
		</button>
	)
}
