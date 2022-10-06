import { useGlobalContext } from "../context";

const Modal = () => {
    
    const {
        closeModal,
        selectedMeal: {
            strMealThumb: imageSrc,
            strMeal: name,
            strInstructions: instructions,
            strSource: source,
        },
    } = useGlobalContext();

    return (
        <aside className="modal-overlay">
            <div className="modal-container">
                <img src={ imageSrc } alt={ name } className="img modal-img"/>
                <div className="modal-content">
                    <h4>{ name }</h4>
                    <p>Cooking Instructions</p>
                    <p>{ instructions }</p>
                    <a href={ source } target="_blank">Original Source</a>
                    <button onClick={ closeModal } className="btn close-btn" type="button">Close</button>
                </div>
            </div>
        </aside>
    );
};

export default Modal;
