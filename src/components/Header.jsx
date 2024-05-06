import './Header.scss';

function Header({ step }) {
	return (
		<header
			className={`flex flex-col items-center ${
				step === 'trackFoods' ? 'mb-0' : 'mb-5'
			}`}
		>
			<h1 className="tracker__main-heading font-bold text-center text-5xl mb-2">
				How Not To Die Food Tracker
			</h1>
			<p className="mb-3 text-2xl">
				Use this app to track your monthly intake of healthy foods.
			</p>
			{step !== 'trackFoods' && (
				<img src="../src/assets/broccoli.svg" className="" />
			)}
		</header>
	);
}

export default Header;
