import './Header.scss';

function Header({ step }) {
	return (
		<header
			className={`flex flex-col items-center ${
				step === 'chart' ? 'mb-0' : 'mb-5'
			}`}
		>
			<div className="flex mb-2">
				<h1
					className={`tracker__main-heading font-bold text-center text-5xl mb-0`}
				>
					<i className="text-green-700">How Not To Die</i> Food Tracker
				</h1>
			</div>
			<p className="mb-3 text-2xl text-center w-5/6">
				Use this app to track your monthly intake of healthy foods.
			</p>
			{step !== 'chart' && (
				<img src="/how-not-to-die/src/assets/broccoli.svg" />
			)}
		</header>
	);
}

export default Header;
