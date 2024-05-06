import { useState } from 'react';
import Checkmark from './Checkmark';

function Food({ food }) {
	const [count, setCount] = useState(0);

	function handleAddClick() {
		setCount((count) => count + 1);
	}

	function handleRemoveClick() {
		if (count === 0) {
			return;
		}
		setCount((count) => count - 1);
	}

	function createCheckmarks() {
		let checkmarksArr = new Array(count);
		let newArray = [];

		for (let i = 0; i < count; i++) checkmarksArr.push(<Checkmark key={i} />);

		return checkmarksArr;
	}

	const checkmarks = createCheckmarks();

	return (
		<div key={food} className="tracker__row border-b-2 mb-2 pb-1">
			<div className="tracker__chart-buttons">
				<button
					className="inline-block bg-green-500 hover:bg-green-700 text-white py-1/2 px-1 rounded transition-colors text-base antialiased font-medium uppercase mr-2"
					onClick={() => handleAddClick()}
				>
					Add
				</button>
				<button
					className="inline-block bg-slate-500 hover:bg-slate-700 text-white py-1/2 px-1 rounded transition-colors text-base antialiased font-medium uppercase"
					onClick={() => handleRemoveClick()}
				>
					Remove
				</button>
			</div>
			<div className="tracker__food-wrapper">
				<span className="tracker__food-text mr-2 text-right text-base">
					{food}
				</span>
			</div>
			<div className="flex align-middle">
				{/* <Checkmark /> */}
				{checkmarks}
			</div>
		</div>
	);
}

export default Food;
