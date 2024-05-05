function FoodsList({ handleClick }) {
	return (
		<div className="tracker__Month-container mb-4 bg-slate-100 p-4 pb-6">
			<p className="text-lg mb-2 font-bold">Step 1:</p>
			<p className="text-lg mb-2">What month do you want to track?</p>
			<form onSubmit={handleClick}>
				<label htmlFor="month" className="lu avz awd awo axu hidden">
					Month:
				</label>
				<input
					type="text"
					name="month"
					id="month"
					className="text-center border-b-2 border-lime-600"
					placeholder="May"
				/>
			</form>
		</div>
	);
}

export default FoodsList;
