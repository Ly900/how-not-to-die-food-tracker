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
					className={`tracker__main-heading font-bold text-center text-5xl mb-3`}
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
				<ul className="mb-3 text-base text-center flex gap-2 justify-center">
					<li>
						<a
							href="https://www.amazon.com/How-Not-Die-Discover-Scientifically/dp/1250066115"
							className="underline text-blue-600 hover:text-blue-800 font-medium"
						>
							Amazon.com
						</a>{' '}
						|
					</li>
					<li>
						<a
							href="https://nutritionfacts.org/book/how-not-to-die/"
							className="underline text-blue-600 hover:text-blue-800 font-medium"
						>
							NutritionFacts.org
						</a>{' '}
						|
					</li>
					<li>
						<a
							href="https://www.goodreads.com/book/show/25663961-how-not-to-die"
							className="underline text-blue-600 hover:text-blue-800 font-medium"
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
