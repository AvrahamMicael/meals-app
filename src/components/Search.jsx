import { useState } from 'react';
import { useGlobalContext } from '../context';

const Search = () => {

    const { setSearchTerm, fetchRandomMeal, incrementSearchCount } = useGlobalContext();
    const [ text, setText ] = useState('');

    const handleInput = ev => {
        setText(ev.currentTarget.value);
    };

    const handleSubmit = ev => {
        ev.preventDefault();
        setSearchTerm(text);
        incrementSearchCount();
    };
    
    return (
        <header className="search-container">
            <form onSubmit={ handleSubmit }>
                <input
                    type="text"
                    className="form-input"
                    value={ text }
                    onInput={ handleInput }
                    placeholder="Type your favorite meal"
                />
                <button type="submit" className="btn">Search</button>
                <button onClick={ fetchRandomMeal } type="button" className="btn btn-hipster">Surprise Me!</button>
            </form>
        </header>
    );
};

export default Search;
