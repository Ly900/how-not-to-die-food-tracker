import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import Checkmark from './Checkmark';
import XButton from './XButton';

function Food({
	action,
	food,
	increaseServings,
	decreaseServings,
	deleteFoodRow,
}) {
	const foodName = food[0];
	let servings = food[1];

	function srMessage(message) {
		document.getElementById('alert').append(message);
		setTimeout(() => {
			document.getElementById('alert').innerHTML = '';
		}, 500);
	}

	function handleAddClick() {
		servings = servings + 1;
		increaseServings(foodName, servings);
		srMessage(`1 ${foodName} ${action}`);
		srMessage(`${servings} total ${foodName}`);
	}
	function handleRemoveClick() {
		servings = servings - 1;
		decreaseServings(foodName, servings);
		if (servings < 0) {
			srMessage(`No ${foodName} to remove`);
		} else {
			srMessage(`1 ${foodName} ${action}`);
			srMessage(`${servings} total ${foodName}`);
		}
	}
	function createCheckmarks(servings) {
		if (servings > 0) {
			let checkmarksArr = new Array(servings);

			for (let i = 0; i < servings; i++)
				checkmarksArr.push(<Checkmark key={i} />);

			return checkmarksArr;
		}
	}

	function handleDeleteFoodRow() {
		deleteFoodRow(foodName);
	}

	const checkmarks = createCheckmarks(servings);
	return (
		<div className="tracker__row border-b-2 mb-2 pb-1 md:py-2">
			<div className="tracker__chart-buttons">
				<button
					className="inline-block bg-green-500 hover:bg-green-700 text-white py-1/2 px-1 rounded transition-colors text-base antialiased font-medium uppercase mr-2"
					onClick={() => handleAddClick()}
				>
					Add <span className="sr-only">1 serving of {foodName}</span>
				</button>
				<button
					className="inline-block bg-slate-500 hover:bg-slate-700 text-white py-1/2 px-1 rounded transition-colors text-base antialiased font-medium uppercase"
					onClick={() => handleRemoveClick()}
				>
					Remove <span className="sr-only">1 serving of {foodName}</span>
				</button>
			</div>
			<div className="tracker__food-wrapper">
				<span className="tracker__food-text mr-2 text-right text-base">
					{foodName}
				</span>
			</div>
			<div className="flex flex-wrap mb-2 md:mb-0">{checkmarks}</div>
			<div className="grid m:place-items-center mb-1">
				<p className="text-base inline-block">
					<strong>Total:</strong> {servings >= 0 ? servings : 0}
				</p>
			</div>
			<div className="grid m:place-items-center mb-1">
				<button onClick={handleDeleteFoodRow}>
					<XButton />
				</button>
			</div>
		</div>
	);
}

export default Food;
