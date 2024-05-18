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
import dailyDozen from '/src/assets/dailyDozenFoods.json';

import './App.scss';

function App() {
	const [month, setMonth] = useState('');
	const [foodsList, setFoodsList] = useState('');
	const [step, setStep] = useState('start');
	const [food, setFood] = useState('');
	const [action, setAction] = useState(null);
	const [storedMonths, setStoredMonths] = useState([]);
	const [jsonToRender, setJsonToRender] = useState([]);
	const [negativeServings, setNegativeServings] = useState(false);
	const [displayNotification, setDisplayNotification] = useState('');

	// document.addEventListener(
	// 	'focusin',
	// 	function () {
	// 		console.log('focused: ', document.activeElement);
	// 	},
	// 	true
	// );

	const storedMonthsLoaded = useRef(false);

	function getLocalStorageItems() {
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
		const dailyDozenArr = dailyDozen.dailyDozen;
		getLocalStorageItems();
		setJsonToRender(dailyDozenArr);
	}, []);

	function handleStartClick() {
		setStep('month');
		srMessage('New month started. Step 1: Enter a new month.');
	}

	function handleNewMonthSubmitClick(e) {
		e.preventDefault();
		const form = e.target;
		const formData = new FormData(form);
		const formJson = Object.fromEntries(formData.entries());
		setMonth(formJson.month);
		setStep('foodsList');
		const message = `Month ${formJson.month} created. Step 2: Choose import option.`;
		srMessage(message);
	}

	function handleFoodsListClick() {
		setFoodsList('Daily Dozen');
		setStep('chart');
		const dailyDozenArr = dailyDozen.dailyDozen;
		const newServingsArr = dailyDozenArr.map((foodArr) => {
			return [foodArr[0], 0];
		});
		setJsonToRender(newServingsArr);
	}

	function handleStartOverClick() {
		setMonth('');
		setFoodsList('');
		setStep('start');
		setFood('');
		setAction(null);
		setDisplayNotification('');
		srMessage("You've started over");
	}
	function handleSaveMonthClick() {
		setDisplayNotification('saveMonth');
		localStorage.setItem(`hntd_month_${month}`, JSON.stringify(jsonToRender));
		if (storedMonths.includes(month)) {
			return;
		}
		setStoredMonths((prevStoredMonths) => [...storedMonths, month]);
	}

	function handleDeleteMonthClick() {
		setDisplayNotification('deleteMonth');
		for (const keyName in localStorage) {
			if (!localStorage.hasOwnProperty(keyName)) continue;
			const neededMonth = `hntd_month_${month}`;
			if (keyName.indexOf(neededMonth) !== -1) {
				localStorage.removeItem(neededMonth);
			}
		}
		const newMonths = storedMonths.filter((m) => m !== month);
		setStoredMonths(newMonths);
	}

	function handleLoadMonthClick(e, month) {
		e.preventDefault();
		const neededData = [];
		for (const keyName in localStorage) {
			if (!localStorage.hasOwnProperty(keyName)) continue;
			const neededMonth = `hntd_month_${month}`;
			if (keyName.indexOf(neededMonth) !== -1) {
				neededData.push(JSON.parse(localStorage[keyName]));
			}
		}
		setFoodsList('Daily Dozen');
		setMonth(month);
		setStep('chart');
		setJsonToRender(neededData[0]);
		setDisplayNotification('loadMonth');
		setTimeout(() => {
			const infoLinkListContainer = document.getElementById(
				'tracker__month-wrapper'
			);
			if (step !== 'start') {
				infoLinkListContainer.scrollIntoView({
					behavior: 'smooth',
				});
			}
			infoLinkListContainer.focus({ preventScroll: true });
		}, 500);
	}

	function modifyJsonToRenderArr(foodName, newServings) {
		const newServingsArr = jsonToRender.map((foodArr) => {
			if (foodArr[0] === foodName) {
				foodArr[1] = newServings;
				if (foodArr[1] < 0) {
					foodArr[1] = 0;
					setNegativeServings(true);
				} else {
					setNegativeServings(false);
				}
				return foodArr;
			} else {
				return foodArr;
			}
		});
		return newServingsArr;
	}

	function increaseServings(foodName, newServings) {
		const newServingsArr = modifyJsonToRenderArr(foodName, newServings);
		setJsonToRender(newServingsArr);
		setFood(foodName);
		setAction('added');
		setDisplayNotification('addServing');
		srMessage(`1 ${foodName} added`);
		srMessage(`${newServings} total ${foodName}`);
	}

	function decreaseServings(foodName, newServings) {
		const newServingsArr = modifyJsonToRenderArr(foodName, newServings);
		setJsonToRender(newServingsArr);
		setFood(foodName);
		setAction('removed');
		setDisplayNotification('removeServing');
		if (newServings < 0) {
			srMessage(`No ${foodName} to remove`);
		} else {
			srMessage(`1 ${foodName} removed`);
			srMessage(`${newServings} total ${foodName}`);
		}
	}

	function deleteFoodRow(foodName) {
		const newServingsArr = jsonToRender.filter((foodArr) => {
			if (foodArr[0] !== foodName) {
				return foodArr;
			}
		});
		setJsonToRender(newServingsArr);
		setFood(foodName);
		setDisplayNotification('deletedFood');
	}

	function handleAddFoodClick(e) {
		e.preventDefault();
		const form = e.target;
		const formData = new FormData(form);
		const formJson = Object.fromEntries(formData.entries());
		setJsonToRender((previousJsonToRender) => [
			...jsonToRender,
			[formJson['new-food'], 0],
		]);
		setFood(formJson['new-food']);
		setDisplayNotification('addedNewFood');
	}
	function srMessage(message) {
		document.getElementById('alert').append(message);
		setTimeout(() => {
			document.getElementById('alert').innerHTML = '';
		}, 500);
	}

	return (
		<>
			<Header step={step} />

			{step !== 'start' && (
				<div className="text-center my-1">
					<button
						className="tracker__button mb-3 inline-block bg-slate-500 hover:bg-slate-700 text-white py-2 px-4 rounded transition-colors text-lg antialiased font-medium uppercase"
						onClick={() => handleStartOverClick()}
					>
						Start Over
					</button>
				</div>
			)}

			{step !== 'chart' && (
				<div className="tracker__questions mb-6 text-center">
					{step === 'start' && (
						<StartQuestion handleStartClick={handleStartClick} />
					)}

					{step === 'month' && (
						<MonthQuestion
							handleNewMonthSubmitClick={handleNewMonthSubmitClick}
						/>
					)}

					{step === 'foodsList' && (
						<FoodsListQuestion handleClick={handleFoodsListClick} />
					)}
				</div>
			)}

			{step === 'chart' && <UserSettings month={month} foodsList={foodsList} />}

			{step === 'chart' && (
				<TrackerInstructions
					food={food}
					action={action}
					month={month}
					negativeServings={negativeServings}
					displayNotification={displayNotification}
				/>
			)}

			{/* {step === 'chart' && <TrackerChart />} */}

			{step === 'chart' && (
				<>
					<div className="tracker__chart p-3">
						{jsonToRender.map((food, i) => {
							return (
								<Food
									key={i}
									action={action}
									food={food}
									increaseServings={increaseServings}
									decreaseServings={decreaseServings}
									deleteFoodRow={deleteFoodRow}
									srMessage={srMessage}
								/>
							);
						})}
					</div>
					<form
						className="tracker__add-new-food-form mb-7 p-3"
						onSubmit={handleAddFoodClick}
					>
						<label htmlFor="new-food" className="mr-3">
							Add new food:
						</label>
						<input
							type="text"
							name="new-food"
							id="new-food"
							className="md:text-center border-b-2 border-lime-600 mr-3"
							placeholder="Tacos"
						/>
						<button
							className="tracker__button inline-block bg-green-600 hover:bg-green-700 text-white py-1 px-2 rounded transition-colors text-base antialiased font-medium uppercase"
							type="submit"
						>
							Submit
						</button>
					</form>

					<div className="tracker__user-options p-3">
						<button
							className="tracker__button inline-block bg-green-500 hover:bg-green-700 py-2 px-2 rounded text-white transition-colors text-base antialiased font-medium uppercase my-2 mr-2"
							onClick={() => {
								handleSaveMonthClick();
							}}
						>
							Save Month
						</button>
						<button
							className="tracker__button inline-block bg-red-500 hover:bg-red-700 py-2 px-2 rounded text-white transition-colors text-base antialiased font-medium uppercase my-2"
							onClick={() => {
								handleDeleteMonthClick();
							}}
						>
							Delete Month
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

				<div className="tracker__month-btns-container flex gap-2 flex-wrap">
					{storedMonths.length > 0 &&
						storedMonths.map((month, i) => (
							<button
								key={i}
								className="tracker__button mb-3 inline-block bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition-colors text-lg antialiased font-medium"
								onClick={(e) => handleLoadMonthClick(e, month)}
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
