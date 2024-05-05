function UserSettings({ month, foodsList }) {
	return (
		<div className="tracker__user-settings text-center p-3">
			<p className="font-bold">
				<span className="text-4xl">Month:</span>
				<span className="text-green-600 text-4xl"> {month}</span>
			</p>
			<p className="font-bold">
				<span className="text-4xl">Foods List:</span>
				<span className="text-green-600 text-4xl"> {foodsList}</span>
			</p>
		</div>
	);
}

export default UserSettings;
