import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Products from "../components/Products";

const MainPage = () => {
  const [products, setProducts] = useState([]);

  const location = useLocation();
  const user = location.state && location.state.user;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://auth-rg69.onrender.com/api/products/all"
        );

        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmDelete) {
      try {
        await axios.delete(
          `https://auth-rg69.onrender.com/api/products/${productId}`
        );

        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productId)
        );
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };


  return (
    <div>
      <div className="flex  justify-between items-center p-4 bg-blue-600 text-white">
        <div>
          <Link to="/main" className="text-lg font-bold">
            Rasuljon
          </Link>
        </div>
        <div>
          {user ? (
            <div>
              <p>{user.username}</p>
            </div>
          ) : (
            <Link to="/signin" className="hover:underline cursor-pointer">
              Sign In
            </Link>
          )}
        </div>
      </div>

      {products && <Products products={products} handleDelete={handleDelete}/>}
    </div>
  );
};

export default MainPage;
