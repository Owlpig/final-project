import { BrowserRouter } from 'react-router-dom';
import AppWithRouterAccess from './AppWithRouterAccess';

function App() {
  return (
    <BrowserRouter>
      <AppWithRouterAccess/>
    </BrowserRouter>
  );
}

export default App;
