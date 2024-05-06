import { useState } from 'react';

import Header from './components/Header';
import StartQuestion from './components/StartQuestion';
import MonthQuestion from './components/MonthQuestion';
import UserSettings from './components/UserSettings';
import TrackerInstructions from './components/TrackerInstructions';
import FoodsListQuestion from './components/FoodsListQuestion';
import Food from './components/Food';
import dailyDozen from './assets/dailyDozenFoods.json';

import './App.scss';
import TrackerChart from './components/TrackerChart';

function App() {
	const [month, setMonth] = useState('');
	const [foodsList, setFoodsList] = useState('');
	const [step, setStep] = useState('start');
	const [food, setFood] = useState('');

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
		setStep('chart');
	}

	const dailyDozenArr = dailyDozen.dailyDozenFoods;

	function updateFood(food) {
		setFood(food);
	}

	return (
		<>
			<Header step={step} />

			{step !== 'chart' && (
				<div className="tracker__questions mb-6 text-center">
					{step === 'start' && <StartQuestion handleClick={handleStartClick} />}

					{step === 'month' && <MonthQuestion handleClick={handleMonthClick} />}

					{step === 'foodsList' && (
						<FoodsListQuestion handleClick={handleFoodsListClick} />
					)}
				</div>
			)}

			{step === 'chart' && <UserSettings month={month} foodsList={foodsList} />}

			{/* {step === 'chart' && <TrackerInstructions />} */}

			{step === 'chart' && (
				<div className="tracker__instructions-container p-3">
					<div className="tracker__instructions mb-3">
						<p className="mb-2 font-bold">Instructions:</p>
						<p className="text-base">
							Click <strong>Add</strong> to log 1 serving of food eaten.
						</p>
						<p className="text-base">
							Click <strong>Remove</strong> to remove 1 serving of food eaten.
						</p>
					</div>
					<div className="tracker__notifications">
						{food && (
							<p className="text-base text-green-800">
								Nice! You've added 1 serving of <strong>{food}</strong>.
							</p>
						)}
					</div>
				</div>
			)}

			{/* {step === 'chart' && <TrackerChart />} */}

			{step === 'chart' && (
				<div className="tracker__chart p-3">
					{dailyDozenArr.map((food, i) => {
						return (
							<Food
								key={i}
								food={food}
								onFoodChange={() => {
									updateFood(food);
								}}
							/>
						);
					})}
				</div>
			)}
		</>
	);
}

export default App;
