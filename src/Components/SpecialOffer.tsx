import React from "react";
import ProductCard from "./Shop/ProductCard";
import { Product } from "../Contexts/CategoryContext";

interface SpecialOfferProps {
    products: Product[];
}

const SpecialOffer: React.FC<SpecialOfferProps> = ({products}) => {

    return (
        <div style={{
            height: "100%",
            margin: "0 7.5px 15px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <h1 className="title">Special Offers</h1>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "15px",
                }}
            >
                {products.map((product, index) => <ProductCard key={index} product={product} />)}
            </div>
        </div>
    );
}

export default SpecialOffer;