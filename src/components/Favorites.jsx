import { useGlobalContext } from "../context";

const Favorites = () => {

    const { favorites, selectMeal, removeFromFavorites } = useGlobalContext();

    return (
        <section className="favorites">
            <div className="favorites-content">
                <h5>Favorites</h5>
                <div className="favorites-container">
                    {favorites.map(({ idMeal: id, strMealThumb: imageSrc, strMeal: name }) => (
                        <div key={ id } className="favorite-item">
                            <img onClick={ () => selectMeal(id, true) } src={ imageSrc } alt={ name } className="favorites-img img"/>
                            <button onClick={ () => removeFromFavorites(id) } type="button" className="remove-btn">
                                remove
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Favorites;
