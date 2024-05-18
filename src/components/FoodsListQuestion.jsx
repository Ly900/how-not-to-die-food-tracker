function FoodsListQuestion({ handleDailyDozenClick, handleCustomClick }) {
	return (
		<div className="tracker__step2-container bg-slate-100 pt-3 pb-6 text-lg">
			<p className="mb-2 font-bold">Step 2:</p>
			<p className="mb-2">Choose how you want to import your desired foods:</p>
			<div className="tracker__option-buttons inline-flex flex-col">
				<button
					className="mb-3 inline-block bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition-colors text-lg antialiased font-medium uppercase"
					onClick={() => handleDailyDozenClick()}
				>
					Daily Dozen
				</button>
				<button
					className="mb-0 inline-block bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition-colors text-lg antialiased font-medium uppercase"
					onClick={() => {
						handleCustomClick();
					}}
				>
					Custom
				</button>
			</div>
		</div>
	);
}

export default FoodsListQuestion;
