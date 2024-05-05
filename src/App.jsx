import { useState } from 'react';
import Header from './components/Header';
import StartQuestion from './components/StartQuestion';
import MonthQuestion from './components/MonthQuestion';
import UserSettings from './components/UserSettings';

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
		setFoodsList('Recommended');
		setStep('showRecommended');
	}

	return (
		<>
			<Header />

			{/* Step 0 */}

			<div className="tracker__questions mb-6">
				{step === 'start' && <StartQuestion handleClick={handleStartClick} />}

				{step === 'month' && <MonthQuestion handleClick={handleMonthClick} />}

				{step === 'foodsList' && (
					<FoodsListQuestion handleClick={handleFoodsListClick} />
				)}
			</div>

			{step !== 'start' && <UserSettings month={month} foodsList={foodsList} />}
		</>
	);
}

export default App;
