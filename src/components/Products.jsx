const Products = ({ products, handleDelete }) => {
  return (
    <div className="grid grid-cols-1 mt-16 px-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <div key={product.id} className="bg-white p-4 rounded-md shadow-md">
          <h3 className="text-xl font-bold mb-2">{product.name}</h3>
          <p className="text-gray-700 mb-2">{product.description}</p>
          <p className="text-green-600 font-bold">Price: ${product.price}</p>
          <button
            onClick={() => handleDelete(product.id)}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Products;
