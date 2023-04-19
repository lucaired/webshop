import CategoryContainer, { Category } from "./CategoryContainer/CategoryContainer";

interface DirectoryProps {
    categories: Category[];
}

const Directory = (props: DirectoryProps) => {
    const { categories } = props;
    return (
        <div className="categories-container">
        {categories.map((category) =>
            <CategoryContainer 
                key={`category-container-${category.id}`} 
                category={category} 
            />
        )}
    </div>
    );
}

export default Directory;