import './Header.scss';

function Header({ step }) {
	return (
		<header
			className={`flex flex-col items-center ${
				step === 'trackFoods' ? 'mb-0' : 'mb-5'
			}`}
		>
			<div className="flex">
				<h1
					className={`tracker__main-heading font-bold text-center text-5xl ${
						step === 'trackFoods' ? 'mb-0 mr-2' : 'mb-2'
					}`}
				>
					How Not To Die Food Tracker
				</h1>
				{step === 'trackFoods' && (
					<span className="flex align-middle">
						<img src="../src/assets/broccoli.svg" className="" width="40px" />
					</span>
				)}
			</div>
			<p className="mb-3 text-2xl">
				Use this app to track your monthly intake of healthy foods.
			</p>
			{step !== 'trackFoods' && <img src="../src/assets/broccoli.svg" />}
		</header>
	);
}

export default Header;
