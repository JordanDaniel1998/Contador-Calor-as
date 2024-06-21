import { useMemo } from "react";
import { Activity } from "../types";

type CalorieTrackerProps = {
  activities: Activity[];
};

export default function CalorieTracker({ activities }: CalorieTrackerProps) {
  console.log(activities);
  const caloriesConsumed = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 1 ? total + activity.calories : total,
        0
      ),
    [activities]
  );

  const caloriesBurned = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 2 ? total + activity.calories : total,
        0
      ),
    [activities]
  );

  return (
    <>
      <h2 className="text-4xl font-black text-white text-center">
        Resumen de Calorías
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
          <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center">
            {caloriesConsumed}
            <span className="block">Consumidas</span>
          </p>
        </div>

        <div>
          <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center">
            {caloriesBurned}
            <span className="block">Ejercicios</span>
          </p>
        </div>

        <div>
          <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center">
            {caloriesConsumed - caloriesBurned}
            <span className="block">Diferencia</span>
          </p>
        </div>
      </div>
    </>
  );
}
