import { PrimeReactProvider } from "primereact/api";
import Quiz from "./components/Quiz";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "/node_modules/primeflex/primeflex.css";

function App() {
  return (
    <PrimeReactProvider>
      <div className="m-5">
        <header>
          <h1>Quiz</h1>
        </header>
        <Quiz />
      </div>
    </PrimeReactProvider>
  );
}

export default App;
