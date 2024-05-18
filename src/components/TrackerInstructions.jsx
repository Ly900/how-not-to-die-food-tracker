import Notification from './Notification';

function TrackerInstructions({
	food,
	foodsList,
	month,
	negativeServings,
	displayNotification,
}) {
	return (
		<div className="tracker__instructions-container p-3 text-center sm:text-left">
			<div className="tracker__instructions mb-3 text-sm sm:text-base">
				<p className="mb-2 font-bold">Instructions:</p>
				{foodsList === 'Custom' && (
					<p>
						<strong>Add</strong> a new food.
					</p>
				)}
				<p className="">
					Click <strong>Add</strong> to log 1 serving of food eaten.
				</p>
				<p className="mb-2">
					Click <strong>Remove</strong> to remove 1 serving of food eaten.
				</p>
			</div>
			<div className="tracker__notifications min-h-10 text-sm sm:text-base">
				<Notification
					displayNotification={displayNotification}
					food={food}
					month={month}
					negativeServings={negativeServings}
				/>
			</div>
		</div>
	);
}

export default TrackerInstructions;
