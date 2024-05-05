import { useState } from 'react';

import './App.css';

function App() {
	return (
		<>
			<header class="flex flex-col items-center">
				<h1 className="tracker__main-heading font-bold text-center text-5xl mb-2">
					How Not To Die Food Tracker
				</h1>
				<p class="mb-3">
					Use this app to track your monthly intake of healthy foods.
				</p>
				<img src="../src/assets/broccoli.svg" />
			</header>
		</>
	);
}

export default App;
