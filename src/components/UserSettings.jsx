function UserSettings({ month, foodsList }) {
	return (
		<div className="tracker__user-settings text-center">
			<p
				className="tracker__month-text font-bold"
				id="tracker__month"
				tabIndex="-1"
			>
				<span className="text-2xl sm:text-3xl">Month:</span>
				<span className="text-green-600 text-2xl sm:text-3xl"> {month}</span>
			</p>
			<p className="font-bold">
				<span className="text-2xl sm:text-3xl">Foods List:</span>
				<span className="text-green-600 text-2xl sm:text-3xl">
					{' '}
					{foodsList}
				</span>
			</p>
		</div>
	);
}

export default UserSettings;
