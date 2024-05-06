function TrackerInstructions({ food, action }) {
	return (
		<div className="tracker__instructions-container p-3 text-center sm:text-left">
			<div className="tracker__instructions mb-3 text-sm sm:text-base">
				<p className="mb-2 font-bold">Instructions:</p>
				<p className="">
					Click <strong>Add</strong> to log 1 serving of food eaten.
				</p>
				<p className="mb-2">
					Click <strong>Remove</strong> to remove 1 serving of food eaten.
				</p>
			</div>
			<div className="tracker__notifications min-h-10 sm:min-h-0 text-sm sm:text-base">
				{food && action === 'add' && (
					<p className="text-green-800">
						Nice! You've added 1 serving of <strong>{food}</strong>.
					</p>
				)}
				{food && action === 'remove' && (
					<p className="text-red-800">
						You've removed 1 serving of <strong>{food}</strong>.
					</p>
				)}
			</div>
		</div>
	);
}

export default TrackerInstructions;
