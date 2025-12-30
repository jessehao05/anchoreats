
import SwipesResults from './SwipesResults'
import { useState } from 'react';

const SwipesForm = () => {

    const [swipes, setSwipes] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [fallBreak, setFallBreak] = useState(false);
    const [thanksgiving, setThanksgiving] = useState(false);
    const [springBreak, setSpringBreak] = useState(false);
    const [farmers, setFarmers] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const [finalMeals, setFinalMeals] = useState(0);
    const [finalDays, setFinalDays] = useState(0);

    const calculateDays = (firstMonth, lastMonth, firstDay, lastDay, year) => {
        const daysInMonth = [31, (year % 4 === 0 ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        let days;
        
        // determine if dates are in the same month, one month apart, or other
        if (firstMonth === lastMonth) {
            days = lastDay - firstDay;
            // console.log('same month. days is:', days)
        } else if (firstMonth + 1 === lastMonth) {
            days = daysInMonth[firstMonth - 1] - firstDay + lastDay;
            // console.log('one month apart. days is:', days)
        } else {
            days = daysInMonth[firstMonth - 1] - firstDay // days = the remaining amount of days in current month
            // console.log('more than one month apart. initial days value:', days)

            for (let i = firstMonth; i < lastMonth - 1; ++i) {
                days += daysInMonth[i];
                // console.log('adding', daysInMonth[i])
                // console.log("added one month's days. days is:", days)
            }
            days += lastDay;
            // console.log('added last day. final days value',days)
        };
        return days;
    }

    const removeBreakDays = (fall, turkey, spring, days) => {
        if (fall) {
            days -= 3;
        } 
        if (turkey) {
            days -= 8; 
        } 
        if (spring) {
            days -= 8;
        }
        return days;
    }

    const removeFarmers = (meals, farmerSwipes) => {
        meals -= farmerSwipes;
        return meals;
    }
    

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("form submitted");

        let meals = parseInt(swipes);
        const farmerSwipes = farmers === '' ? 0 : parseInt(farmers);
        const startDateArray = startDate.split("-");
        const year = parseInt(startDateArray[0]);
        const firstMonth = parseInt(startDateArray[1]);
        const firstDay = parseInt(startDateArray[2]);

        const endDateArray = endDate.split("-");
        const lastMonth = parseInt(endDateArray[1]);
        const lastDay = parseInt(endDateArray[2]);

        // console.log('meals', meals)
        // console.log('start date array:', startDateArray)
        // console.log('end date array', endDateArray)

        let days = calculateDays(firstMonth, lastMonth, firstDay, lastDay, year);
        // console.log('days initial', days)
        days = removeBreakDays(fallBreak, thanksgiving, springBreak, days);
        // console.log('days after breaks', days)
        meals = removeFarmers(meals, farmerSwipes);
        // console.log('days final', days)
        // console.log('meals: ', meals)

        setFinalDays(days);
        setFinalMeals(meals);

        setSubmitted(true);
    }

    const handleReset = () => {
        console.log('reset')
        setSwipes('');
        setStartDate('');
        setEndDate('');
        setFallBreak(false);
        setThanksgiving(false);
        setSpringBreak(false);
        setFarmers('');
        setSubmitted(false);
    }



    return (
        <div className="flex flex-col justify-center items-center gap-4">

            {submitted && <SwipesResults meals={finalMeals} days={finalDays}/>}

            <form action="" className="flex flex-col gap-4 my-10" onSubmit={(e) => handleSubmit(e)}>
                
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Meal swipes remaining:</span>
                    </div>
                    <input 
                        type="number" 
                        placeholder="Ex. 225" 
                        className="input input-bordered w-full max-w-xs rounded-md" 
                        onChange={(e) => setSwipes(e.target.value)} 
                        required 
                    />
                </label>

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Start date (today):</span>
                    </div>
                    <input 
                        type="date" 
                        className="input input-bordered w-full max-w-xs rounded-md" 
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                    />
                </label>

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Final day:</span>
                    </div>
                    <input 
                        type="date" 
                        className="input input-bordered w-full max-w-xs rounded-md" 
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                    />
                </label>

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Remaining breaks (unless staying on campus):</span>
                    </div>
                    <label className="label justify-normal gap-2 cursor-pointer">
                        <input 
                            type="checkbox" 
                            className="checkbox rounded-lg" 
                            onChange={(e) => setFallBreak(e.target.checked)}
                        />
                        <span className="label-text">Fall Break</span>
                    </label>
                    <label className="label justify-normal gap-2 cursor-pointer">
                        <input 
                            type="checkbox" 
                            className="checkbox rounded-lg" 
                            onChange={(e) => setThanksgiving(e.target.checked)}
                        />
                        <span className="label-text">Thanksgiving Break</span>
                    </label>
                    <label className="label justify-normal gap-2 cursor-pointer">
                        <input 
                            type="checkbox" 
                            className="checkbox rounded-lg" 
                            onChange={(e) => setSpringBreak(e.target.checked)}
                        />
                        <span className="label-text">Spring Break</span>
                    </label>
                </label>

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Estimated swipes for Farmers' Market:</span>
                    </div>
                    <input 
                        type="number" 
                        placeholder="Ex. 4" 
                        className="input input-bordered w-full max-w-xs rounded-md"
                        onChange={(e) => setFarmers(e.target.value)}
                    />
                </label>

                <div className="flex gap-2 justify-end mt-4">
                    <button type="reset" className="btn btn-secondary w-20 rounded-lg"onClick={handleReset}>Clear</button>
                    <button type="submit" className="btn btn-primary w-20 rounded-lg">Submit</button>
                </div>
               
            </form>
            
        </div>
  )
}

export default SwipesForm