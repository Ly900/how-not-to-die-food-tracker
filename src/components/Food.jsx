import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import Checkmark from './Checkmark';
import XButton from './XButton';

function Food({ action, food, increaseServings, decreaseServings }) {
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

	const checkmarks = createCheckmarks(servings);
	return (
		<div className="tracker__row border-b-2 mb-2 pb-1">
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
			<div className="flex align-middle flex-wrap">{checkmarks}</div>
			<div className="">
				<p className="text-base inline-block align-middle">
					<strong>Total:</strong> {servings >= 0 ? servings : 0}
				</p>
			</div>
			<div className="flex">
				<XButton />
			</div>
		</div>
	);
}

export default Food;
