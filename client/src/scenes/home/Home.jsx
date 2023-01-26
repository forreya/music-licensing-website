import MainCarousel from "./MainCarousel";
import ShoppingList from "./ShoppingList"

const Home = () => {
    return (
        <div className="home">
            <MainCarousel />
            <ShoppingList />
        </div>
    );
};

export default Home;