import { useEffect, useMemo, useReducer } from "react";
import { activityReducer, initialState } from "./reducers/activity-reducer";
import Form from "./components/Form";
import ActivityList from "./components/ActivityList";
import CalorieTracker from "./components/CalorieTracker";

function App() {
  const [state, dispatch] = useReducer(activityReducer, initialState);

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(state.activities));
  }, [state.activities]);

  const resetApp = () =>
    useMemo(() => state.activities.length, [state.activities]);

  return (
    <>
      <header className="bg-lime-600 py-3 ">
        <div className="w-11/12 mx-auto flex justify-between items-center">
          <h1 className="text-center text-lg font-bold text-white uppercase">
            Contador de Calorías
          </h1>

          <button
            className="bg-gray-700 hover:bg-gray-900 font-bold uppercase text-white cursor-pointer rounded-lg text-sm p-3 md:duration-300 disabled:opacity-10"
            disabled={!resetApp()}
            onClick={() => dispatch({ type: "reset-app" })}
          >
            Reiniciar App
          </button>
        </div>
      </header>
      <main>
        <section className="bg-lime-500">
          <div className="w-11/12 mx-auto py-10">
            <Form dispatch={dispatch} state={state} />
          </div>
        </section>

        <section className="bg-gray-800 py-10">
          <div className="flex flex-col gap-10">
            <CalorieTracker activities={state.activities} />
          </div>
        </section>

        <section className="w-11/12 mx-auto">
          <ActivityList activities={state.activities} dispatch={dispatch} />
        </section>
      </main>
    </>
  );
}

export default App;
