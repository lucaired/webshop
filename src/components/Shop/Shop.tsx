import { useContext } from "react";
import { CategoriesContext } from "../../contexts/CategoryContext";
import CategoryPreview from "./CategoryPreview";

const Shop = () => {

    const { categories } = useContext(CategoriesContext);
    console.log(categories);

    return (
        <div>
            {Array.from(categories.keys()).map((category, index) => 
                <CategoryPreview key={index} category={category} index={index} products={categories.get(category) || []} />)
            }
        </div>
    );
}
export default Shop;