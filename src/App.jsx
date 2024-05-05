import { useState } from 'react';
import Header from './components/Header';

import './App.css';

function App() {
	return (
		<>
			<Header />
			<div className="tracker__options">
				<p className="text-lg mb-2">
					Choose how you want to import your desired foods:
				</p>
				<div className="tracker__option-buttons flex flex-col">
					<button className="mb-3 inline-block bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full">
						Recommended
					</button>
					<button className="bg-blue-500 text-white py-2 px-4 rounded-full opacity-50 cursor-not-allowed">
						Custom
					</button>
				</div>
			</div>
		</>
	);
}

export default App;
