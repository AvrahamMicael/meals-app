import { useGlobalContext } from "../context";
import { BsHandThumbsUp } from "react-icons/bs";

const Meals = () => {

    const { meals, loading, selectMeal, addToFavorites } = useGlobalContext();

    if(loading) return (
        <section className="section">
            <h4>Loading...</h4>
        </section>
    );

    if(!meals.length) return (
        <section className="section">
            <h4>No meals matched your search term. Please try again.</h4>
        </section>
    );

    return (
        <section className="section-center">
            {meals.map(({ idMeal: id, strMealThumb: imageSrc, strMeal: name }) => (
                <article key={ id } className="single-meal">
                    <img src={ imageSrc } alt={ name } className="img" onClick={ () => selectMeal(id) }/>
                    <footer>
                        <h5>{ name }</h5>
                        <button onClick={ () => addToFavorites(id) } className="like-btn">
                            <BsHandThumbsUp/>
                        </button>
                    </footer>
                </article>
            ))}
        </section>
    );
};

export default Meals;
