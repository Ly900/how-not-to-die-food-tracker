function FoodsListQuestion({ handleClick }) {
	return (
		<div className="tracker__step2-container bg-slate-100 p-4 pb-6">
			<p className="text-lg mb-2 font-bold">Step 2:</p>
			<p className="text-lg mb-2">
				Choose how you want to import your desired foods:
			</p>
			<div className="tracker__option-buttons inline-flex flex-col">
				<button
					className="mb-3 inline-block bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition-colors text-lg antialiased font-medium uppercase"
					onClick={() => handleClick('dailyDozen')}
				>
					Daily Dozen
				</button>
				<button className="bg-slate-300 text-black py-2 px-4 rounded opacity-50 cursor-not-allowed text-lg antialiased font-medium uppercase">
					Custom
				</button>
			</div>
		</div>
	);
}

export default FoodsListQuestion;
