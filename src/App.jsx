import { useState } from 'react';

import Header from './components/Header';
import StartQuestion from './components/StartQuestion';
import MonthQuestion from './components/MonthQuestion';
import UserSettings from './components/UserSettings';
import TrackerInstructions from './components/TrackerInstructions';
import FoodsListQuestion from './components/FoodsListQuestion';
import Food from './components/Food';
import dailyDozen from '../public/assets/dailyDozenFoods.json';

import './App.scss';

function App() {
	const [month, setMonth] = useState('');
	const [foodsList, setFoodsList] = useState('');
	const [step, setStep] = useState('start');
	const [food, setFood] = useState('');
	const [action, setAction] = useState(null);

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

	function handleActionChange(action) {
		setAction(action);
	}

	function handleStartOverClick() {
		setMonth('');
		setFoodsList('');
		setStep('start');
		setFood('');
		setAction(null);
	}

	return (
		<>
			<Header step={step} />

			{step !== 'start' && (
				<div className="text-center">
					<button
						className="mb-3 inline-block bg-slate-500 hover:bg-slate-700 text-white py-2 px-4 rounded transition-colors text-lg antialiased font-medium uppercase"
						onClick={() => handleStartOverClick()}
					>
						Start Over
					</button>
				</div>
			)}

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

			{step === 'chart' && <TrackerInstructions food={food} action={action} />}

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
								onActionChange={(action) => {
									handleActionChange(action);
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
