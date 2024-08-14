import React, { useState } from 'react';
import { useAppContext } from './AppContext';
import { toast, ToastContainer } from 'react-toastify';
import { Modal, Image, Pagination } from 'antd';

const Menu = () => {
  const { products, setCart } = useAppContext();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState(1500);
  const productsPerPage = 6;

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    toast.success(`${product.title} added to cart!`);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedImage('');
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearchTerm = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriceRange = product.price <= priceRange;
    return matchesSearchTerm && matchesPriceRange;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="menu-container p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Our Menu</h1>
      <div className="mb-6 text-center">
        <input
          type="text"
          placeholder="Search for a product..."
          className="px-4 py-2 border rounded shadow focus:outline-none focus:ring"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="mb-6 text-center">
        <h2 className="mb-2 text-lg font-semibold">Price Range: Up to ${priceRange}</h2>
        <input
          type="range"
          min="0"
          max="1500"
          value={priceRange}
          className="mr-2"
          onChange={(e) => setPriceRange(parseFloat(e.target.value))}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {currentProducts.length === 0 ? (
          <p>No products available</p>
        ) : (
          currentProducts.map((product) => (
            <div 
              key={product.id} 
              className="product-card bg-slate-400 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl hover:bg-gray-50"
            >
              <img 
                src={product.image} 
                alt={product.title} 
                className="w-full h-48 object-cover transition duration-300 transform hover:scale-110 cursor-pointer" 
                onClick={() => handleImageClick(product.image)} 
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 text-center">{product.title}</h2>
                <p className="text-lg font-bold text-blue-600 text-center">${product.price}</p>
                <div className='text-center'>
                  <button 
                    onClick={() => addToCart(product)}
                    className="mt-4 w-24 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200 transform hover:translate-y-1"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="mt-6 flex justify-end">
        <Pagination
          current={currentPage}
          pageSize={productsPerPage}
          total={filteredProducts.length}
          onChange={handlePageChange}
        />
      </div>
      <Modal
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <Image src={selectedImage} alt="Selected Product" style={{ width: '100%' }} />
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default Menu;
