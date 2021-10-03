// Storage value

const TODO_STORAGE_KEY = "TODO";

export default {
  get() {
    return JSON.parse(localStorage.getItem(TODO_STORAGE_KEY)) || [];
  },
  set(toDos) {
    localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(toDos));
  },
};
