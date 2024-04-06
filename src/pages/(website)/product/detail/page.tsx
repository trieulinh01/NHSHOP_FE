import { useProductQuery } from "@/common/hooks/useProductQuery";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./../../../../styles/detail.scss";
import { Rate } from "antd";
import { useState } from "react";
const DetailProduct = () => {
    const [quantity, setQuantity] = useState(1);
    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };
    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };
    const { id } = useParams();
    const { data: product, isLoading } = useProductQuery({ id: id! });
    const { data: relatedProduct } = useQuery({
        queryKey: ["RELATED_PRODUCT"],
        queryFn: async () => {
            const { data } = await axios.get(
                `http://localhost:8080/api/v1/products/${product.category}/related/${product._id}`,
            );
            return data;
        },
    });
    if (isLoading) return <p>Loading...</p>;
    console.log("relatedProduct", relatedProduct);
    return (
        <div>
            <section className="nav-bar">
                <div className="container">
                    <ul className="nav-bar-deltail">
                        <li className="nav-bar-item">
                            <a href="" className="nav-bar-link">
                                Home
                            </a>
                        </li>
                        <i className="fa-solid fa-chevron-right" />
                        <li className="nav-bar-item">
                            <a href="" className="nav-bar-link">
                                Shop
                            </a>
                        </li>
                        <i className="fa-solid fa-chevron-right" />
                        <li className="nav-bar-item">
                            <a href="" className="nav-bar-link1">
                                {" "}
                                Asgaard sofa
                            </a>
                        </li>
                    </ul>
                </div>
            </section>
            <section className="deltail-product">
                <div className="container">
                    <div className="detail-product-list">
                        <div className="detail-product-img">
                            <div className="detail-product-img1">
                                {product.gallery.map((image, index) => (
                                    <img src={image} alt={`gallery ${index}`} />
                                ))}
                            </div>
                            <div className="detail-product-img2">
                                <img src={product.image} alt="image_product" />
                            </div>
                        </div>
                        <div className="detail-product-item">
                            <div className="detail-product-heading">
                                <div className="detail-title">
                                    <h2>{product.product_name}</h2>
                                </div>
                                <div className="detail-price">
                                    <h3>$ {product.price}</h3>
                                </div>
                                <div className="detail-evaluate">
                                    <Rate disabled defaultValue={4} />
                                    <span className="custom-review">
                                        {product.countStocks} Customer Review
                                    </span>
                                </div>
                                <div className="detail-reviews">
                                    <p className="text-review">
                                        {product.description}
                                    </p>
                                </div>
                                <div className="detail-size">
                                    <h4 className="text-size">Size</h4>
                                    <div className="size">
                                        <button className="size-l">L</button>
                                        <button className="size-m">M</button>
                                        <button className="size-s">S</button>
                                    </div>
                                </div>
                                <div className="detail-color">
                                    <h4 className="text-size">Color</h4>
                                    <div className="color">
                                        <div className="color-purple">
                                            <img
                                                src="./assets/img/Rectangle 421.png"
                                                alt=""
                                            />
                                        </div>
                                        <div className="color-black">
                                            <img
                                                src="./assets/img/Rectangle 432.png"
                                                alt=""
                                            />
                                        </div>
                                        <div className="color-brown">
                                            <img
                                                src="./assets/img/Rectangle 443.png"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="detail-listtocart">
                                    <button
                                        className="slots"
                                        onClick={handleDecrease}
                                    >
                                        <span className="remove">-</span>
                                    </button>
                                    <span className="slot">{quantity}</span>
                                    <button
                                        className="slots"
                                        onClick={handleIncrease}
                                    >
                                        <span className="add">+</span>
                                    </button>

                                    <Link to={`/cart`}>
                                        <button className="detail-addtocarts">
                                            Add To Cart
                                        </button>
                                    </Link>
                                    <button className="detail-compare">
                                        Compare
                                    </button>
                                </div>
                            </div>
                            <hr className="line-pruduct" />
                            <div className="detail-product-body">
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>SKU</th>
                                            <td>:</td>
                                            <td className="itemss">SS001</td>
                                        </tr>
                                        <tr>
                                            <th>Category</th>
                                            <td>:</td>
                                            <td className="itemss">
                                                {product.category.category_name}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Tags</th>
                                            <td>:</td>
                                            <td className="itemss">
                                                {product.tags.map((tag) => (
                                                    <>{tag} </>
                                                ))}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <hr className="title-line" />
            <section className="detail-information">
                <div className="container">
                    <div className="nav-information">
                        <ul className="nav-informations">
                            <li>
                                <a href="" className="text-informations">
                                    Description
                                </a>
                            </li>
                            <li>
                                <a href="" className="text-informations">
                                    Additional Information
                                </a>
                            </li>
                            <li>
                                <a href="" className="text-informations">
                                    Reviews [5]
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="title-information">
                        <p className="title-information1">
                            {product.description}
                        </p>
                        <p className="title-information2">
                            Weighing in under 7 pounds, the Kilburn is a
                            lightweight piece of vintage styled engineering.
                            Setting the bar as one of the loudest speakers in
                            its class, the Kilburn is a compact, stout-hearted
                            hero with a well-balanced audio which boasts a clear
                            midrange and extended highs for a sound that is both
                            articulate and pronounced. The analogue knobs allow
                            you to fine tune the controls to your personal
                            preferences while the guitar-influenced leather
                            strap enables easy and stylish travel.
                        </p>
                    </div>
                    <div className="img-information">
                        <div className="img-information1">
                            <img src="/Group 1071.png" alt="" />
                        </div>
                        <div className="img-information2">
                            <img src="/Group 1062.png" alt="" />
                        </div>
                    </div>
                </div>
            </section>
            <hr />
            <h3
                style={{
                    textAlign: "center",
                    fontSize: "30px",
                    fontWeight: "bold",
                }}
            >
                Related Products
            </h3>

            <div
                className="product-list"
                style={{ paddingLeft: "40px", paddingRight: "40px" }}
            >
                {relatedProduct?.map((product, index) => (
                    <div key={index} className="product-item">
                        <div className="product-image">
                            <img
                                src={product?.image}
                                alt="#"
                                className="product__thumbnail"
                            />
                            <span className="product-sale">
                                {product?.discount}%
                            </span>
                        </div>
                        <div className="product-info">
                            <h3 className="product__name">
                                <Link
                                    to={`/products/${product._id}`}
                                    className="product__link"
                                >
                                    {product?.name}
                                </Link>
                            </h3>
                            <a href="#" className="product__category">
                                {product.categories}
                            </a>
                            <div className="product-price">
                                <span className="product-price__new">
                                    {product?.price -
                                        product?.price *
                                            (product?.discount / 100)}
                                </span>
                                <span className="product-price__old">
                                    {product?.price}
                                </span>
                            </div>
                        </div>
                        <div className="product-actions">
                            <Link
                                to={`/products/${product._id}`}
                                className="btn product-action__quickview"
                            >
                                Quick View
                            </Link>
                            <Link
                                to={`/cart`}
                                className="btn product-action__addtocart"
                                // onClick={() => mutate({ productId: product._id, quantity: 1 })}
                            >
                                Add To Cart
                            </Link>
                            <div className="product-actions-more">
                                <span className="product-action__share">
                                    Share
                                </span>
                                <span className="product-action__compare">
                                    Compare
                                </span>
                                <span className="product-action__like">
                                    Like
                                </span>
                            </div>
                        </div>
                    </div>
                    // <div>
                    //     <Link to={`/products/${item._id}`}>{item.name}</Link>
                    // </div>
                ))}
            </div>
        </div>
    );
};

export default DetailProduct;
