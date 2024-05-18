function StartQuestion({ handleStartClick }) {
	return (
		<div className="tracker__step0-container">
			<button
				className="mb-3 inline-block bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition-colors text-lg antialiased font-medium uppercase"
				onClick={() => handleStartClick('start')}
			>
				Start
			</button>
		</div>
	);
}

export default StartQuestion;
