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
					className={`tracker__main-heading font-bold text-center text-5xl mb-1`}
				>
					<i className="text-green-700">How Not To Die</i> Food Tracker
				</h1>
			</div>
			<p className="mb-3 text-xl text-center w-5/6 mb-1">
				Use this app to track your monthly intake of healthy foods.
			</p>
			<div>
				<p className="mb-1 text-base text-center">
					Learn more about How Not to Die at the following links:
				</p>
				<ul
					className="tracker__info-links-list-container mb-3 text-base text-center gap-2 justify-center sm:flex"
					tab-index="-1"
				>
					<li>
						<a
							href="https://www.amazon.com/How-Not-Die-Discover-Scientifically/dp/1250066115"
							className="tracker__info-link underline text-blue-600 hover:text-blue-800 font-medium"
						>
							Amazon.com
						</a>{' '}
						<span className="invisible sm:visible">|</span>
					</li>
					<li>
						<a
							href="https://nutritionfacts.org/book/how-not-to-die/"
							className="tracker__info-link underline text-blue-600 hover:text-blue-800 font-medium"
						>
							NutritionFacts.org
						</a>{' '}
						<span className="invisible sm:visible">|</span>
					</li>
					<li>
						<a
							href="https://www.goodreads.com/book/show/25663961-how-not-to-die"
							className="tracker__info-link underline text-blue-600 hover:text-blue-800 font-medium"
						>
							GoodReads
						</a>
					</li>
				</ul>
			</div>
			{step !== 'chart' && (
				<img src="/how-not-to-die-food-tracker/assets/broccoli.svg" />
			)}
		</header>
	);
}

export default Header;
