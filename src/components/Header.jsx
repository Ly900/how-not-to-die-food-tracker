import './Header.scss';

function Header() {
	return (
		<header className="flex flex-col items-center">
			<h1 className="tracker__main-heading font-bold text-center text-5xl mb-2">
				How Not To Die Food Tracker
			</h1>
			<p className="mb-3">
				Use this app to track your monthly intake of healthy foods.
			</p>
			<img src="../src/assets/broccoli.svg" className="" />
		</header>
	);
}

export default Header;
