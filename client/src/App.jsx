import { Provider } from 'react-redux';
import Router from './router';
import store from './redux';

function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;
