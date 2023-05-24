import { Route, Routes } from "react-router-dom";
import CategoryPreview from "./CategoryPreviewPage";
import CategoryFullPage from "./CategoryFullPage";

const Shop = () => {
    return (
        <Routes>
            <Route index element={<CategoryPreview />} />
            <Route path=':categorySlug' element={<CategoryFullPage />} />
        </Routes>
    );
}
export default Shop;