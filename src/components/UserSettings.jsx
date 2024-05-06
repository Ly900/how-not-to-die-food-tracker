function UserSettings({ month, foodsList }) {
	return (
		<div className="tracker__user-settings text-center">
			<p className="font-bold">
				<span className="text-3xl">Month:</span>
				<span className="text-green-600 text-3xl"> {month}</span>
			</p>
			<p className="font-bold">
				<span className="text-3xl">Foods List:</span>
				<span className="text-green-600 text-3xl"> {foodsList}</span>
			</p>
		</div>
	);
}

export default UserSettings;
