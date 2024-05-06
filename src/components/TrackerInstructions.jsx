function TrackerInstructions({ food, action }) {
	return (
		<div className="tracker__instructions-container p-3">
			<div className="tracker__instructions mb-3 text-center">
				<p className="mb-2 font-bold">Instructions:</p>
				<p className="text-sm">
					Click <strong>Add</strong> to log 1 serving of food eaten.
				</p>
				<p className="text-sm">
					Click <strong>Remove</strong> to remove 1 serving of food eaten.
				</p>
			</div>
			<div className="tracker__notifications">
				{food && action === 'add' && (
					<p className="text-sm text-green-800">
						Nice! You've added 1 serving of <strong>{food}</strong>.
					</p>
				)}
				{food && action === 'remove' && (
					<p className="text-sm text-red-800">
						You've removed 1 serving of <strong>{food}</strong>.
					</p>
				)}
			</div>
		</div>
	);
}

export default TrackerInstructions;
