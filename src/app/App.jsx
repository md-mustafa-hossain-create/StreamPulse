import { Provider } from "react-redux";
import appStore from "./appStore";
import { RouterProvider } from "react-router-dom";
import router from "./router";

function App() {
  return (
    <Provider store={appStore}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
