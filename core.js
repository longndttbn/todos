// Sử dụng Tagged template literals để export file = > sau sẽ gọi trước các hàm khác để render ra HTML
// Sử dụng destracturing = > lấy cái chuỗi

export default function html([first, ...strings], ...values) {
  return values
    .reduce ((acc, current) => acc.concat(current, strings.shift()), [first])
    .filter((x) => (x && x !== true) || x === 0)
    .join("");
}

// them callback la reduce
export function createStore(reducer) {
  let state = reducer();
  const roots = new Map();

  function render() {
    // Get all element
    for (const [root, component] of roots) {
      const output = component();
      root.innerHTML = output;
    }
  }

  // attach : Nhận view => đẩy ra root
  // connect: đẩy dữ liệu từ store vào view
  return {
    attach(component, root) {
      roots.set(root, component);
      render();
    },
    connect(selector = (state) => state) {
      // Nhận đối số
      return (component) =>
        (props, ...args) =>
          // object.assign => MEGE ĐƯỢC  và tạo ra object mới
          component(Object.assign([], props, selector(state), ...args));
    },
    dispatch(action, ...args) {
      state = reducer(state, action, args);
      render();
    },
  };
}
