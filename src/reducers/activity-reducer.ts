import { Activity } from "../types";

// Actions
export type ActivityActions =
  | {
      type: "save-activity";
      payload: { newActivity: Activity };
    }
  | {
      type: "set-activeId";
      payload: { id: Activity["id"] };
    }
  | {
      type: "delete-activity";
      payload: { id: Activity["id"] };
    }
  | {
      type: "reset-app";
    };

// State cuya lógica se maneja dentro del Reducer
export type ActivityState = {
  activities: Activity[];
  activeId: Activity["id"];
};

const localStorageActivity = (): Activity[] => {
  const activities = localStorage.getItem("activities");
  return activities ? JSON.parse(activities) : [];
};
// State inicial del reducer
export const initialState: ActivityState = {
  activities: localStorageActivity(),
  activeId: "",
};

// reducer
export const activityReducer = (
  state: ActivityState = initialState, // Estado actual
  action: ActivityActions // Acción
) => {
  if (action.type === "save-activity") {
    let updatedActivities: Activity[] = [];

    if (state.activeId) {
      updatedActivities = state.activities.map((activity) =>
        activity.id === state.activeId ? action.payload.newActivity : activity
      );
    } else {
      updatedActivities = [...state.activities, action.payload.newActivity];
    }

    return {
      ...state,
      activities: updatedActivities,
      activeId: "",
    };
  }

  if (action.type === "set-activeId") {
    return {
      ...state,
      activeId: action.payload.id,
    };
  }

  if (action.type === "delete-activity") {
    return {
      ...state,
      activities: state.activities.filter(
        (activity) => activity.id !== action.payload.id
      ),
    };
  }

  if (action.type === "reset-app") {
    return {
      activities: [],
      activeId: "",
    };
  }

  return state;
};
