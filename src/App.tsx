import { PrimeReactProvider } from "primereact/api";
import Quiz from "./components/Quiz";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "/node_modules/primeflex/primeflex.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient()
function App() {
  return (
    <PrimeReactProvider>
      <QueryClientProvider client={queryClient}>
      <div className="m-5">
        <header>
          <h1>Quiz</h1>
        </header>
          <Quiz />
      </div>
      </QueryClientProvider>
      
    </PrimeReactProvider>
  );
}

export default App;
