import { useState } from 'react';
import Header from './components/Header';

import './App.scss';

function App() {
	const [month, setMonth] = useState('');
	const [foodsList, setFoodsList] = useState('');
	const [step, setStep] = useState('start');

	function handleStartClick() {
		setStep('step1');
		console.log(step);
	}

	function handleStep1MonthClick(e) {
		setStep('step2');
		console.log(step);
		const form = e.target;
		const formData = new FormData(form);
		const formJson = Object.fromEntries(formData.entries());
		setMonth(formJson.month);
	}

	function handleStep2Click() {
		setStep('step3');
		console.log(step);
		setFoodsList('Recommended');
	}

	return (
		<>
			<Header />

			{/* Step 0 */}

			<div className="tracker__questions mb-6">
				{step === 'start' && (
					<div className="tracker__step0-container">
						<button
							className="mb-3 inline-block bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition-colors text-lg antialiased font-medium uppercase"
							onClick={() => handleStartClick('start')}
						>
							Start
						</button>
					</div>
				)}

				{step === 'step1' && (
					<div className="tracker__step1-container mb-4 bg-slate-100 p-4 pb-6">
						<p className="text-lg mb-2 font-bold">Step 1:</p>
						<p className="text-lg mb-2">What month do you want to track?</p>
						<form onSubmit={handleStep1MonthClick}>
							<label htmlFor="month" className="lu avz awd awo axu hidden">
								Month:
							</label>
							<input
								type="text"
								name="month"
								id="month"
								className="text-center border-b-2 border-lime-600"
								placeholder="May"
							/>
						</form>
					</div>
				)}

				{step === 'step2' && (
					<div className="tracker__step2-container bg-slate-100 p-4 pb-6">
						<p className="text-lg mb-2 font-bold">Step 2:</p>
						<p className="text-lg mb-2">
							Choose how you want to import your desired foods:
						</p>
						<div className="tracker__option-buttons inline-flex flex-col">
							<button
								className="mb-3 inline-block bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition-colors text-lg antialiased font-medium uppercase"
								onClick={() => handleStep2Click('recommended')}
							>
								Recommended
							</button>
							<button className="bg-slate-300 text-black py-2 px-4 rounded opacity-50 cursor-not-allowed text-lg antialiased font-medium uppercase">
								Custom
							</button>
						</div>
					</div>
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
