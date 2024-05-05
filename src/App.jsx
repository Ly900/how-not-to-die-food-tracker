import { useState } from 'react';
import Header from './components/Header';
import StartQuestion from './components/StartQuestion';
import MonthQuestion from './components/MonthQuestion';
import UserSettings from './components/UserSettings';
import dailyDozen from './assets/dailyDozenFoods.json';

import './App.scss';
import FoodsListQuestion from './components/FoodsListQuestion';

function App() {
	const [month, setMonth] = useState('');
	const [foodsList, setFoodsList] = useState('');
	const [step, setStep] = useState('start');

	function handleStartClick() {
		setStep('month');
	}

	function handleMonthClick(e) {
		e.preventDefault();
		const form = e.target;
		const formData = new FormData(form);
		const formJson = Object.fromEntries(formData.entries());
		setMonth(formJson.month);
		setStep('foodsList');
	}

	function handleFoodsListClick() {
		setFoodsList('Daily Dozen');
		setStep('trackFoods');
	}

	const dailyDozenArr = dailyDozen.dailyDozenFoods;

	return (
		<>
			<Header />

			{/* Step 0 */}

			<div className="tracker__questions mb-6 text-center">
				{step === 'start' && <StartQuestion handleClick={handleStartClick} />}

				{step === 'month' && <MonthQuestion handleClick={handleMonthClick} />}

				{step === 'foodsList' && (
					<FoodsListQuestion handleClick={handleFoodsListClick} />
				)}
			</div>

			{step === 'trackFoods' && (
				<UserSettings month={month} foodsList={foodsList} />
			)}

			<div className="tracker__daily-dozen p-3">
				{step === 'trackFoods' &&
					dailyDozenArr.map((food) => {
						return (
							<div key={food}>
								<span>{food}</span>
							</div>
						);
					})}
			</div>
		</>
	);
}

export default App;
