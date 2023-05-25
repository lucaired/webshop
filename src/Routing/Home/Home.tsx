import { Outlet } from "react-router-dom";
import Directory from "../../Components/Directory";
import { CategoryInfo } from "../../Components/CategoryContainer/CategoryContainer";
import SpecialOffer from "../../Components/SpecialOffer";
import { useSelector } from "react-redux";
import { selectCategories } from "../../Store/categories/categories.selector";

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

    const categories = useSelector(selectCategories);
    let specialOffer = null;

    if (categories && categories.size) {
      const products = Array.from(categories.values()).flat();
      specialOffer = <SpecialOffer products={products.slice(0, 3)} />;
    }

    return (
      <div>
        <Directory categories={categoriesInfos} />
        {specialOffer}
        <Outlet />
      </div>
    );
}
    
export default Home;
