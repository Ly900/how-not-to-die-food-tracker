function TrackerInstructions({
	food,
	month,
	negativeServings,
	displayNotification,
}) {
	function getNotificationText() {
		let notification;

		if (displayNotification === 'addServing') {
			notification = (
				<p className="text-green-800">
					Nice! You've added 1 serving of <strong>{food}</strong>.
				</p>
			);
		} else if (displayNotification === 'removeServing') {
			if (!negativeServings) {
				notification = (
					<p className="text-red-800">
						You've removed 1 serving of <strong>{food}</strong>.
					</p>
				);
			} else {
				notification = (
					<p className="text-red-800">
						You have no <strong>{food}</strong> to remove.
					</p>
				);
			}
		} else if (displayNotification === 'saveMonth') {
			notification = (
				<p className="text-green-800">
					You've saved month <strong>{month}</strong>.
				</p>
			);
		} else if (displayNotification === 'deleteMonth') {
			notification = (
				<p className="text-red-800">
					You've deleted month <strong>{month}</strong>.
				</p>
			);
		} else if (displayNotification === 'loadMonth') {
			notification = (
				<p className="text-green-800">
					You've loaded month <strong>{month}</strong>.
				</p>
			);
		}
		return notification;
	}

	const notification = getNotificationText();

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
			<div className="tracker__notifications min-h-10 text-sm sm:text-base">
				{notification}
			</div>
		</div>
	);
}

export default TrackerInstructions;
