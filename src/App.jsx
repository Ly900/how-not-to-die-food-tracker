import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

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
	const [count, setCount] = useState(0);
	const [initialServings, setInitialServings] = useState([]);
	const [finalServings, setFinalServings] = useState([]);
	const [storedMonths, setStoredMonths] = useState([]);

	const storedMonthsLoaded = useRef(false);

	function getLocalStorageItems() {
		const storedMonths = [];
		for (const keyName in localStorage) {
			if (!localStorage.hasOwnProperty(keyName)) continue;
			if (keyName.indexOf('hntd_month') !== -1) {
				const month = keyName.split('_')[2];
				storedMonths.push(month);
			}
		}
		console.log(storedMonths);
		setStoredMonths(storedMonths);
	}

	useEffect(() => {
		if (!storedMonthsLoaded.current) {
			storedMonthsLoaded.current = true;
			return;
		}
		getLocalStorageItems();
	}, []);

	function srMessage(message) {
		document.getElementById('alert').append(message);
		setTimeout(() => {
			document.getElementById('alert').innerHTML = '';
		}, 500);
	}

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
		setFinalServings([]);
	}
	function giveCountToParent(count) {
		setCount(count);
	}
	const foodAndCountArray = [];

	function giveMonthDataToParent(foodAndCount) {
		foodAndCountArray.push(foodAndCount);
		setInitialServings(foodAndCountArray);
	}
	function handleUpdatedServings(updatedServing) {
		const finalServings = initialServings.map((serving) => {
			if (serving[0] === updatedServing[0]) {
				serving[1] = updatedServing[1];
				if (serving[1] < 0) {
					serving[1] = 0;
				}
				return serving;
			} else {
				return serving;
			}
		});
		setFinalServings(finalServings);
	}
	function handleSaveMonthClick() {
		localStorage.setItem(`hntd_month_${month}`, JSON.stringify(finalServings));
	}

	return (
		<>
			<Header step={step} />

			{step !== 'start' && (
				<div className="text-center my-1">
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

			{step === 'chart' && (
				<TrackerInstructions food={food[0]} action={action} count={count} />
			)}

			{/* {step === 'chart' && <TrackerChart />} */}

			{step === 'chart' && (
				<>
					<div className="tracker__chart p-3">
						{dailyDozenArr.map((food, i) => {
							return (
								<Food
									key={i}
									food={food}
									action={action}
									month={month}
									onFoodChange={() => {
										updateFood(food);
									}}
									onActionChange={(action) => {
										handleActionChange(action);
									}}
									srMessage={(food, action) => srMessage(food, action)}
									giveCountToParent={(count) => giveCountToParent(count)}
									giveMonthDataToParent={(foodAndCount) =>
										giveMonthDataToParent(foodAndCount)
									}
									getUpdatedServings={(updatedServings) => {
										handleUpdatedServings(updatedServings);
									}}
								/>
							);
						})}
					</div>
					<div className="tracker__user-options p-3">
						<button
							className="inline-block bg-green-500 hover:bg-green-700 py-2 px-2 rounded text-white transition-colors text-base antialiased font-medium uppercase my-2"
							onClick={() => {
								handleSaveMonthClick();
							}}
						>
							Save Month
						</button>
					</div>
				</>
			)}

			<div className="tracker__saved-charts-container p-3">
				<hr className="w-100 min-h-1 my-1 mb-5 bg-gray-300 border-0 rounded"></hr>
				<h2 className="mb-3 tracker__saved-chart-heading text-3xl">
					<b>Saved Charts</b>
				</h2>

				{storedMonths.length === 0 && <p>No stored months.</p>}
			</div>
		</>
	);
}

export default App;
