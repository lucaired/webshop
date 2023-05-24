import { Outlet } from "react-router-dom";
import Directory from "../../Components/Directory";
import { CategoryInfo } from "../../Components/CategoryContainer/CategoryContainer";
import SpecialOffer from "../../Components/SpecialOffer";
import { useContext } from "react";
import { CategoriesContext, Product } from "../../Contexts/CategoryContext";

const Home = () => {
    const categoriesJSON = `[
        {
          "id": 1,
          "title": "hats",
          "imageUrl": "https://i.ibb.co/cvpntL1/hats.png"
        },
        {
          "id": 2,
          "title": "jackets",
          "imageUrl": "https://i.ibb.co/px2tCc3/jackets.png"
        },
        {
          "id": 3,
          "title": "sneakers",
          "imageUrl": "https://i.ibb.co/0jqHpnp/sneakers.png"
        },
        {
          "id": 4,
          "title": "womens",
          "imageUrl": "https://i.ibb.co/GCCdy8t/womens.png"
        },
        {
          "id": 5,
          "title": "mens",
          "imageUrl": "https://i.ibb.co/R70vBrQ/men.png"
        }
    ]`;
  
    const categoriesInfos: CategoryInfo[] = JSON.parse(categoriesJSON);

    const { categories } = useContext(CategoriesContext);

    // extract the procucts from the categories
    const products: Product[] = [];
    categories.forEach((value, key) => {
        value.forEach(product => {
            products.push(product);
        });
    });

    return (
            <div>
              <Directory categories={categoriesInfos} />
              <SpecialOffer products={products.slice(0,3)}/>
              <Outlet />
            </div>
    );
}
    
export default Home;