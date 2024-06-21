import { ChangeEvent, Dispatch, FormEvent, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { categories } from "../data/categories";
import { Activity } from "../types";
import { ActivityActions, ActivityState } from "../reducers/activity-reducer";

type FormProps = {
  dispatch: Dispatch<ActivityActions>;
  state: ActivityState;
};

const initialStateActivity: Activity = {
  id: uuidv4(),
  category: 1,
  name: "",
  calories: 0,
};

export default function Form({ dispatch, state }: FormProps) {
  const [activity, setActivity] = useState<Activity>(initialStateActivity);

  useEffect(() => {
    if (state.activeId) {
      const updateActivity = state.activities.filter(
        (stateActivity) => stateActivity.id === state.activeId
      )[0];

      setActivity(updateActivity);
    }
  }, [state.activeId]);

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) => {
    const isNumberField = ["category", "calories"].includes(e.target.name);
    setActivity({
      ...activity,
      [e.target.name]: isNumberField ? +e.target.value : e.target.value,
    });
  };

  const isValidActivity = () => {
    const { name, calories } = activity;

    return name.trim() !== "" && calories > 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "save-activity", payload: { newActivity: activity } });
    setActivity({ ...initialStateActivity, id: uuidv4() });
  };

  return (
    <>
      <form
        action=""
        className="flex flex-col gap-5 p-5 bg-white shadow rounded-lg"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="category" className="font-bold">
            Categoría
          </label>
          <select
            id="category"
            name="category"
            className="border border-slate-300 p-2 rounded-lg w-full bg-white"
            value={activity.category}
            onChange={handleChange}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="font-bold">
            Actividad:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="border border-slate-300 p-2 rounded-lg"
            placeholder="Ej. Comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta"
            value={activity.name}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="calories" className="font-bold">
            Calorías:
          </label>
          <input
            type="number"
            name="calories"
            id="calories"
            className="border border-slate-300 p-2 rounded-lg"
            placeholder="Calorías, ej. 300 o 500"
            value={activity.calories}
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            type="submit"
            value={
              activity.category === 1 ? "Guardar Comida" : "Guardar Ejercicios"
            }
            className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
            disabled={!isValidActivity()}
          />
        </div>
      </form>
    </>
  );
}
