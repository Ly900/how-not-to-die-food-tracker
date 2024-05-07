import { useState } from 'react';

function FoodsListQuestion({ handleClick }) {
	const [customError, setCustomError] = useState(false);

	function handleCustomClick() {
		setCustomError(true);
	}
	return (
		<div className="tracker__step2-container bg-slate-100 p-4 pb-6 text-lg">
			<p className="mb-2 font-bold">Step 2:</p>
			<p className="mb-2">Choose how you want to import your desired foods:</p>
			<div className="tracker__option-buttons inline-flex flex-col mb-3">
				<button
					className="mb-3 inline-block bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition-colors text-lg antialiased font-medium uppercase"
					onClick={() => handleClick('dailyDozen')}
				>
					Daily Dozen
				</button>
				<button
					className="bg-slate-300 text-black py-2 px-4 rounded opacity-50 cursor-not-allowed text-lg antialiased font-medium uppercase"
					id="custom-button"
					onClick={() => {
						handleCustomClick();
					}}
				>
					Custom
				</button>
			</div>
			{customError && (
				<div className="tracker__custom-alert text-red-700">
					<p>*This feature is not yet available.</p>
				</div>
			)}
		</div>
	);
}

export default FoodsListQuestion;
