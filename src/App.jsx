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
				<div className="tracker__option-buttons inline-flex flex-col">
					<button className="mb-3 inline-block bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition-colors text-lg antialiased font-medium uppercase">
						Recommended
					</button>
					<button className="bg-slate-300 text-black py-2 px-4 rounded opacity-50 cursor-not-allowed text-lg antialiased font-medium uppercase">
						Custom
					</button>
				</div>
			</div>
		</>
	);
}

export default App;
