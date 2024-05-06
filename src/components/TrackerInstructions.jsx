function TrackerInstructions({}) {
	return (
		<div className="tracker__instructions-container p-3">
			<div className="tracker__instructions mb-3">
				<p className="mb-2 font-bold">Instructions:</p>
				<p className="text-base">
					Click <strong>Add</strong> to log 1 serving of food eaten.
				</p>
				<p className="text-base">
					Click <strong>Remove</strong> to remove 1 serving of food eaten.
				</p>
			</div>
			<div className="tracker__notifications">
				<p className="text-base text-green-800">
					Nice! You've logged 1 serving of <strong>apples</strong>.
				</p>
			</div>
		</div>
	);
}

export default TrackerInstructions;
