function Notification({ displayNotification, food, month, negativeServings }) {
	return (
		<>
			{displayNotification === 'addServing' && (
				<p className="text-green-800">
					Nice! You've added 1 serving of <strong>{food}</strong>.
				</p>
			)}
			{displayNotification === 'removeServing' && !negativeServings && (
				<p className="text-red-800">
					You've removed 1 serving of <strong>{food}</strong>.
				</p>
			)}
			{displayNotification === 'removeServing' && negativeServings && (
				<p className="text-red-800">
					You have no <strong>{food}</strong> to remove.
				</p>
			)}
			{displayNotification === 'saveMonth' && (
				<p className="text-green-800">
					You've saved month <strong>{month}</strong>.
				</p>
			)}
			{displayNotification === 'loadMonth' && (
				<p className="text-green-800">
					You've loaded month <strong>{month}</strong>.
				</p>
			)}
			{displayNotification === 'deleteMonth' && (
				<p className="text-red-800">
					You've deleted month <strong>{month}</strong>.
				</p>
			)}
			{displayNotification === 'addedNewFood' && (
				<p className="text-green-800">
					You've added a new food called <strong>{food}</strong>.
				</p>
			)}
			{displayNotification === 'deletedFood' && (
				<p className="text-red-800">
					You've deleted <strong>{food}</strong>.
				</p>
			)}
		</>
	);
}

export default Notification;
