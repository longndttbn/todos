import storage from "./utils/storage.js";

const init = {
  toDos: storage.get(),
  filter: "all",
  filters: {
    all: () => true,
    active: (todo) => !todo.completed,
    completed: (todo) => todo.completed,
  },
  editIndex: null,
};

const actions = {
  add({ toDos }, title) {
    if (title) {
      toDos.push({ title, completed: false });
      storage.set(toDos);
    }
  },
  toggle({ toDos }, index) {
    const todo = toDos[index];
    todo.completed = !todo.completed;
    storage.set(toDos);
  },
  toggleAll({ toDos }, completed) {
    toDos.forEach((todo) => (todo.completed = completed));
    storage.set(toDos);
  },
  delete({ toDos }, index) {
    toDos.splice(index, 1);
    storage.set(toDos);
  },
  switchFilter(state, filter) {
    state.filter = filter; // do là state thì mới chọc được vào filter
  },
  clearCompleted(state) {
    state.toDos = state.toDos.filter(state.filters.active);
    storage.set(state.toDos);
  },
  startEdit(state, index) {
    state.editIndex = index;
  },
  endEdit(state, title) {
    if (state.editIndex !== null) {
        if (title) {
            state.toDos[state.editIndex].title = title;
            storage.set(state.toDos);
        } else {
            this.delete(state, state.editIndex)
        }
     
      state.editIndex = null;
     
    }
  },
  cancelEdit(state) {
    state.editIndex = null;
  },
};

export default function reducer(state = init, action, args) {
  actions[action] && actions[action](state, ...args);
  return state;
}
