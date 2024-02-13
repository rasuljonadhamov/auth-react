import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Products from "../components/Products";
import Modal from "react-modal";

const MainPage = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    status: "",
    price: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: 0,
  });

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
  }, [searchTerm]);

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

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://auth-rg69.onrender.com/api/products",
        newProduct
      );

      setProducts((prevProducts) => [...prevProducts, response.data]);

      setNewProduct({
        name: "",
        description: "",
        price: 0,
      });

      alert("Product added successfully!");
      closeModal();
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Product addition failed.");
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      fetchProducts();
    } else {
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setProducts(filteredProducts);
    }
  };

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

  return (
    <div>
      <div className="flex justify-between items-center p-4 bg-blue-600 text-white">
        <div>
          <Link to="/main" className="text-lg font-bold">
            Rasuljon
          </Link>
        </div>
        <div>{user && <p>{user.username}</p>}</div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Add Product Modal"
      >
        <form
          onSubmit={handleAddProduct}
          className="mb-8 w-96 mx-auto relative"
        >
          {renderInput("Product Name", newProduct.name, "name", (e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          )}
          {renderInput(
            "Description",
            newProduct.description,
            "description",
            (e) => setNewProduct({ ...newProduct, description: e.target.value })
          )}
          {renderInput("Price", newProduct.price, "number", (e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          )}

          <button
            onClick={handleAddProduct}
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 my-5 w-full rounded-md font-bold shadow hover:bg-blue-700"
          >
            Add Product
          </button>
          <button
            className="absolute top-0 -right-[300px] text-4xl"
            onClick={closeModal}
          >
            x
          </button>
        </form>
      </Modal>

      <div className="flex justify-evenly items-center justify-center">
        <button
          onClick={openModal}
          className="bg-blue-600  ml-10 text-white px-4 py-2 rounded-md font-bold shadow hover:bg-blue-700"
        >
          Add New Product
        </button>

        <div className="mb-4 mt-3 p-4">
          <input
            type="search"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded-md"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 ml-2 rounded-md font-bold shadow hover:bg-blue-700"
          >
            Search
          </button>
        </div>
      </div>

      {products && <Products products={products} handleDelete={handleDelete} />}
    </div>
  );
};

const renderInput = (label, value, type, onChange) => (
  <div>
    <label className="block mb-2 text-lg font-medium text-gray-700">
      {label}
    </label>
    {type === "number" ? (
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="mb-4 p-2 w-full border rounded-md"
        required
      />
    ) : (
      <textarea
        value={value}
        onChange={onChange}
        className="mb-4 p-2 w-full border rounded-md"
        required
      />
    )}
  </div>
);

export default MainPage;
