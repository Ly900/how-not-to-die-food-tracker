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
import mayData from '../public/assets/may.json';

import './App.scss';

function App() {
	const [month, setMonth] = useState('');
	const [foodsList, setFoodsList] = useState('');
	const [step, setStep] = useState('chart');
	const [food, setFood] = useState('');
	const [action, setAction] = useState(null);
	// const [count, setCount] = useState(0);
	// const [initialServings, setInitialServings] = useState([]);
	// const [finalServings, setFinalServings] = useState([]);
	const [storedMonths, setStoredMonths] = useState([]);
	/**  */
	const [jsonToRender, setJsonToRender] = useState([]);

	const storedMonthsLoaded = useRef(false);

	function getLocalStorageItems() {
		const storedMonthKeys = [];
		const storedMonths = [];
		for (const keyName in localStorage) {
			if (!localStorage.hasOwnProperty(keyName)) continue;
			if (keyName.indexOf('hntd_month') !== -1) {
				const cleanMonth = keyName.split('_')[2];
				storedMonths.push(cleanMonth);
			}
		}
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
		setStoredMonths((prevStoredMonths) => [...storedMonths, month]);
	}

	const dailyDozenArr = dailyDozen.dailyDozen;
	const mayArr = mayData.May;

	function handleLoadMonthClick(month) {
		// const neededData = [];
		// for (const keyName in localStorage) {
		// 	if (!localStorage.hasOwnProperty(keyName)) continue;
		// 	const neededMonth = `hntd_month_${month}`;
		// 	if (keyName.indexOf(neededMonth) !== -1) {
		// 		neededData.push(JSON.parse(localStorage[keyName]));
		// 	}
		// }
		// console.log('neededData: ', neededData[0]);
		// setStep('chart');
		// setMonth(month);
		// setFoodsList('Daily Dozen');
		// setTempMonthData(neededData[0]);
		// setFinalServings((finalServings) => []);
		// setFinalServings(neededData[0]);
		// setInitialServings([]);
		// setInitialServings([...finalServings, neededData[0]]);
		// setFinalServings([...finalServings, neededData[0]]);
		// setInitialServings(neededData[0]);
		// setFinalServings(neededData[0]);
		// setFinalServings((prevFinalServings) => [...finalServings, neededData[0]]);
		if (month === 'May') {
			setJsonToRender(mayArr);
		} else if (month === 'DailyDozen') {
			setJsonToRender(dailyDozenArr);
		}
	}

	function modifyJsonToModifyArr(foodName, newServings) {
		const newServingsArr = jsonToRender.map((foodArr) => {
			if (foodArr[0] === foodName) {
				foodArr[1] = newServings;
				if (foodArr[1] < 0) {
					foodArr[1] = 0;
				}
				return foodArr;
			} else {
				return foodArr;
			}
		});
		return newServingsArr;
	}

	function increaseServings(foodName, newServings) {
		const newServingsArr = modifyJsonToModifyArr(foodName, newServings);
		setJsonToRender(newServingsArr);
		setFood(foodName);
		setAction('added');
	}

	function decreaseServings(foodName, newServings) {
		const newServingsArr = modifyJsonToModifyArr(foodName, newServings);
		setJsonToRender(newServingsArr);
		setFood(foodName);
		setAction('removed');
	}

	function getJsonToRender() {
		if (jsonToRender.length === 0) {
			setJsonToRender(dailyDozenArr);
		}
	}

	getJsonToRender();

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
				<TrackerInstructions food={food} action={action} /* count={count}*/ />
			)}

			{/* {step === 'chart' && <TrackerChart />} */}

			{/* {step === 'chart' && ( */}
			<>
				<div className="tracker__chart p-3">
					{/* {dataToRender.map((food, i) => {
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
					})} */}
					{jsonToRender.map((food, i) => {
						return (
							<Food
								food={food}
								key={i}
								increaseServings={increaseServings}
								decreaseServings={decreaseServings}
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

			<div className="tracker__saved-charts-container p-3">
				<hr className="w-100 min-h-1 my-1 mb-5 bg-gray-300 border-0 rounded"></hr>
				<h2 className="mb-3 tracker__saved-chart-heading text-3xl">
					<b>Saved Charts</b>
				</h2>

				{storedMonths.length === 0 && <p>No stored months.</p>}

				<div className="tracker__month-btns-container flex gap-2 flex-wrap">
					{storedMonths.length > 0 &&
						storedMonths.map((month, i) => (
							<button
								key={i}
								className="mb-3 inline-block bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition-colors text-lg antialiased font-medium"
								onClick={() => handleLoadMonthClick(month)}
							>
								<span className="sr-only">Load </span>
								{month} <span className="sr-only">data</span>
							</button>
						))}
				</div>
			</div>
		</>
	);
}

export default App;
