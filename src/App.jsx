import { useState, useEffect } from 'react';

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

	function getLocalStorageItems() {
		const months = [];
		Object.keys(localStorage).forEach((keyName) => {
			if (keyName.includes('hntd_month')) {
				const cleanMonth = keyName.split('_')[2];
				months.push(cleanMonth);
			}
		});
		setStoredMonths(months);
	}

	useEffect(() => {
		getLocalStorageItems();
	}, []);

	function srMessage(message) {
		const alertEl = document.getElementById('alert');
		alertEl.textContent = message;
		setTimeout(() => {
			alertEl.textContent = '';
		}, 500);
	}

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

	function handleDailyDozenClick() {
		setFoodsList('Daily Dozen');
		setStep('chart');
		const dailyDozenArr = dailyDozen.dailyDozen;
		const newServingsArr = dailyDozenArr.map((food) => {
			return { name: food.name, servings: 0 };
		});
		setJsonToRender(newServingsArr);
		srMessage('Daily Dozen foods chosen');
	}

	function handleCustomClick() {
		setFoodsList('Custom');
		setStep('chart');
		setJsonToRender([]);
		srMessage('Custom foods chosen');
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
		localStorage.setItem(`hntd_${month}_foods_list`, JSON.stringify(foodsList));
		const message = `Month ${month} saved`;
		srMessage(message);
		// If the month already exists in local storage, do not create a new month.
		if (storedMonths.includes(month)) {
			return;
		}
		setStoredMonths((prevStoredMonths) => [...prevStoredMonths, month]);
	}

	function handleDeleteMonthClick() {
		setDisplayNotification('deleteMonth');
		localStorage.removeItem(`hntd_month_${month}`);
		localStorage.removeItem(`hntd_${month}_foods_list`);
		setStoredMonths((prevStoredMonths) => prevStoredMonths.filter((m) => m !== month));
		srMessage(`Month ${month} deleted.`);
	}

	function handleLoadMonthClick(e, month) {
		const rawData = localStorage.getItem(`hntd_month_${month}`);
		const rawFoodsList = localStorage.getItem(`hntd_${month}_foods_list`);

		if (!rawData) return;

		setJsonToRender(JSON.parse(rawData));
		setFoodsList(JSON.parse(rawFoodsList));
		setMonth(month);
		setStep('chart');
		setDisplayNotification('loadMonth');
		setTimeout(() => {
			document
				.getElementById('tracker__month-wrapper')
				?.focus({ preventScroll: true });
		}, 500);
	}

	function modifyJsonToRenderArr(foodName, newServings) {
		setNegativeServings(newServings < 0);
		const newServingsArr = jsonToRender.map((food) => {
			if (food.name === foodName) {
				return { ...food, servings: newServings < 0 ? 0 : newServings };
			}
			return food;
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
		const newServingsArr = jsonToRender.filter((food) => food.name !== foodName);
		setJsonToRender(newServingsArr);
		setFood(foodName);
		setDisplayNotification('deletedFood');
		const message = `You've deleted ${foodName}`;
		srMessage(message);
	}

	function handleAddFoodClick(e) {
		e.preventDefault();
		const form = e.target;
		const formData = new FormData(form);
		const formJson = Object.fromEntries(formData.entries());
		const newFoodName = formJson['new-food'].trim();

		if (!newFoodName) {
			setDisplayNotification('emptyFood');
			return;
		}

		const isDuplicate = jsonToRender.some(
			(food) => food.name.toLowerCase() === newFoodName.toLowerCase()
		);
		if (isDuplicate) {
			setFood(newFoodName);
			setDisplayNotification('duplicateFood');
			return;
		}

		setJsonToRender((previousJsonToRender) => [
			...previousJsonToRender,
			{ name: newFoodName, servings: 0 },
		]);
		setFood(newFoodName);
		setDisplayNotification('addedNewFood');
		const message = `You've added a new food ${newFoodName}`;
		srMessage(message);
		const newFoodInput = document.getElementById('new-food');
		newFoodInput.value = '';
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
						<FoodsListQuestion
							handleDailyDozenClick={handleDailyDozenClick}
							handleCustomClick={handleCustomClick}
						/>
					)}
				</div>
			)}

			{step === 'chart' && <UserSettings month={month} foodsList={foodsList} />}

			{step === 'chart' && (
				<TrackerInstructions
					food={food}
					action={action}
					month={month}
					foodsList={foodsList}
					negativeServings={negativeServings}
					displayNotification={displayNotification}
				/>
			)}

			{/* {step === 'chart' && <TrackerChart />} */}

			{step === 'chart' && (
				<>
					<div className="tracker__chart p-3">
						{jsonToRender.map((food) => {
							return (
								<Food
									key={food.name}
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
							Save Month <span className="sr-only">{month}</span>
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
						storedMonths.map((month) => (
							<button
								key={month}
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
