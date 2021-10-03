import html from "../core.js";
import Header from "./Header.js";
import TodoList from "./TodoList.js";
import Footer from "./Footer.js";
import { connect } from "../store.js";

function App({ toDos }) {
  return html`
    <section class="todoapp">
      ${Header()} 
      ${toDos.length > 0 && TodoList()} 
      ${toDos.length > 0 && Footer()}
    </section>
  `;
}

export default connect()(App);
