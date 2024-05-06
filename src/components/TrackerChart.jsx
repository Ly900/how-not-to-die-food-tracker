import Food from './Food';
import dailyDozen from '../assets/dailyDozenFoods.json';

function TrackerChart({}) {
	const dailyDozenArr = dailyDozen.dailyDozenFoods;

	return (
		<div className="tracker__chart p-3">
			{dailyDozenArr.map((food) => {
				return <Food key={food} food={food} />;
			})}
		</div>
	);
}

export default TrackerChart;
