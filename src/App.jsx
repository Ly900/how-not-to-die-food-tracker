import { useState } from 'react';
import Header from './components/Header';
import StartQuestion from './components/StartQuestion';
import MonthQuestion from './components/MonthQuestion';

import './App.scss';
import FoodsListQuestion from './components/FoodsListQuestion';

function App() {
	const [month, setMonth] = useState('');
	const [foodsList, setFoodsList] = useState('');
	const [step, setStep] = useState('start');

	function handleStartClick() {
		setStep('step1');
		console.log(step);
	}

	function handleMonthClick(e) {
		setStep('step2');
		console.log(step);
		const form = e.target;
		const formData = new FormData(form);
		const formJson = Object.fromEntries(formData.entries());
		setMonth(formJson.month);
	}

	function handleFoodsListClick() {
		setStep('step3');
		console.log(step);
		setFoodsList('Recommended');
	}

	return (
		<>
			<Header />

			{/* Step 0 */}

			<div className="tracker__questions mb-6">
				{step === 'start' && <StartQuestion handleClick={handleStartClick} />}

				{step === 'step1' && <MonthQuestion handleClick={handleMonthClick} />}

				{step === 'step2' && (
					<FoodsListQuestion handleClick={handleFoodsListClick} />
				)}
			</div>

			{step !== 'start' && (
				<div className="tracker__settings">
					<p className="font-bold">
						<span className="text-4xl">Month:</span>
						<span className="text-green-600 text-4xl"> {month}</span>
					</p>
					<p className="font-bold">
						<span className="text-4xl">Foods List:</span>
						<span className="text-green-600 text-4xl"> {foodsList}</span>
					</p>
				</div>
			)}
		</>
	);
}

export default App;
