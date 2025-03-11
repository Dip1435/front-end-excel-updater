export const reducer = (state, action) => {
    switch (action.type) {
      case "increment_age": {
        return {
          name: state.name,
          age: state.age + 1,
        };
      }
      case "decrement_age": {
        return {
          name: state.name,
          age: state.age - 1,
        };
      }
      case "change_name": {
        return {
          name: action.nextName,
          age: state.age,
        };
      }
      default:
        throw Error("Unknown action: " + action.type);
    }
  };
