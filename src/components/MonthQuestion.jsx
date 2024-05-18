function MonthQuestion({ handleNewMonthSubmitClick }) {
	return (
		<div className="tracker__month-container mb-4 bg-slate-100 p-4 pb-3">
			<p className="text-lg mb-2 font-bold">Step 1:</p>
			<p className="text-lg mb-2">What month do you want to track?</p>
			<form className="tracker__form mb-3" onSubmit={handleNewMonthSubmitClick}>
				<label htmlFor="month" className="lu avz awd awo axu hidden">
					Month:
				</label>
				<input
					type="text"
					name="month"
					id="month"
					className="text-center border-b-2 border-lime-600 mr-3 mb-3"
					placeholder="May"
					required
				/>
				<button
					className="tracker__button inline-block bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded transition-colors text-base antialiased font-medium uppercase"
					type="submit"
				>
					Submit
				</button>
			</form>
		</div>
	);
}

export default MonthQuestion;
