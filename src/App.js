import './App.css';
import Favorites from './components/Favorites';
import Meals from './components/Meals';
import Modal from './components/Modal';
import Search from './components/Search';
import { useGlobalContext } from './context';

const App = () => {
  const { selectedMeal, favorites } = useGlobalContext();
  return (
    <main>
      <Search/>
      {favorites.length > 0 && <Favorites/>}
      <Meals/>
      {selectedMeal && <Modal/>}
    </main>
  );
};

export default App;
