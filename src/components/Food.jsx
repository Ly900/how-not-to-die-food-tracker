import Checkmark from './Checkmark';

function Food({ food }) {
	return (
		<div className="tracker__row border-b-2 mb-2 pb-1">
			<div className="tracker__chart-buttons">
				<button className="inline-block bg-green-500 hover:bg-green-700 text-white py-1/2 px-1 rounded transition-colors text-base antialiased font-medium uppercase mr-2">
					Add
				</button>
				<button className="inline-block bg-slate-500 hover:bg-slate-700 text-white py-1/2 px-1 rounded transition-colors text-base antialiased font-medium uppercase">
					Remove
				</button>
			</div>
			<div className="tracker__food-wrapper">
				<span className="tracker__food-text mr-2 text-right text-base">
					{food}
				</span>
			</div>
			<div className="flex align-middle">
				<Checkmark />
				<Checkmark />
			</div>
		</div>
	);
}

export default Food;
