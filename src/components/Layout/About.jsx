import { useReducer } from "react";
import { reducer } from "../reducers/reducer";

const About = () => {
  const intialState = { name: "dip patel", age: 22 };

  const [state, dispatch] = useReducer(reducer, intialState);

  const incrementAge = () => {
    dispatch({
      type: "increment_age",
    });
  };
  const decrementAge = () => {
    dispatch({
      type: "decrement_age",
    });
  };
  const handleNameChange = (e) => {
    dispatch({
      type: "change_name",
      nextName: e.target.value,
    });
  };
  return (
    <>
      <div className="space-x-1.5">
        <label htmlFor="name">name :</label>
        <input
          type="text"
          name="name"
          id="name"
          className="outline-1 rounded-md"
          onChange={(e) => handleNameChange(e)}
          value={state.name}
        />
        <button className="p-1 rounded-md bg-green-500" onClick={incrementAge}>
          Increment Age
        </button>
        <button className="p-1 rounded-md bg-green-500" onClick={decrementAge}>
          Decrement Age
        </button>
      </div>
      <div>
        my name is {state.name} and age is {state.age}
      </div>
    </>
  );
};

export default About;
