import { useCallback, useState } from "react";
import "./App.css";

import {
  ComplexContextProvider,
  RxJsComplex,
  RxJsSimple,
} from "./modules/rxjs";

function App() {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const onToggleContextVisibility = useCallback(() => {
    setIsVisible(!isVisible);
  }, [isVisible]);

  return (
    <div className="App">
      <button type="button" onClick={onToggleContextVisibility}>
        Is Context Visible
      </button>
      <br />
      <br />
      {isVisible && (
        <>
          <ComplexContextProvider>
            <RxJsComplex>
              <RxJsSimple />
            </RxJsComplex>
          </ComplexContextProvider>
        </>
      )}
    </div>
  );
}

export default App;
