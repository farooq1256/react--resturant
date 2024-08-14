import React, { useState } from 'react';
import { Form, Upload, Input, Pagination } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useAppContext } from './AppContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  
  const initialstate = {
    id: '',
    image: '',
    title: '',
    description: '',
    price: '',
  };

  const { products, setProducts } = useAppContext();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(initialstate);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = ({ fileList }) => {
    if (fileList.length > 0) {
      const file = fileList[0].originFileObj;
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({ ...prevData, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.price || !formData.description || !formData.image) {
      toast.error('Please fill all fields.', { position: 'top-center' });
      return;
    }

    if (isEditing) {
      const updatedProducts = products.map((product) =>
        product.id === formData.id ? { ...formData } : product
      );
      setProducts(updatedProducts);
      toast.success('Product updated successfully!', { position: 'top-center' });
    } else {
      const newProduct = { ...formData, id: Math.random().toString(32).slice(2) };
      setProducts((prevProducts) => [...prevProducts, newProduct]);
      toast.success('Product added successfully!', { position: 'top-center' });
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData(initialstate);
    setIsModalVisible(false);
    setIsEditing(false);
  };

  const handleEdit = (product) => {
    setFormData(product);
    setIsEditing(true);
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    const filteredProducts = products.filter((product) => product.id !== id);
    setProducts(filteredProducts);
    toast.success('Product deleted successfully!', { position: 'top-center' });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="dashboard-container p-4 max-w-4xl mx-auto">
      <h2 className="text-center text-2xl font-bold mb-6">Dashboard</h2>
      <div className="text-center mb-6">
        <button
          onClick={() => setIsModalVisible(true)}
          className="bg-green-500 text-white py-2 px-4 rounded transition duration-200 ease-in-out transform hover:scale-105"
        >
          Add Product
        </button>
      </div>
      
      {products.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Image</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Title</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Description</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Price</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentProducts.map((product) => (
                <tr key={product.id}>
                  <td className="px-4 py-2">
                    <img src={product.image} alt="product" className="w-12 h-12 object-cover rounded" />
                  </td>
                  <td className="px-4 py-2">{product.title}</td>
                  <td className="px-4 py-2">{product.description}</td>
                  <td className="px-4 py-2">{product.price}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="bg-blue-500 mb-1 ms-2 text-white py-1 px-2 rounded transition duration-200 ease-in-out transform hover:scale-105 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-500 text-white py-1 px-2 rounded transition duration-200 ease-in-out transform hover:scale-105"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-6 flex justify-end">
            <Pagination
              current={currentPage}
              pageSize={productsPerPage}
              total={products.length}
              onChange={handlePageChange}
              className="mt-4 text-center"
            />
          </div>
        </div>
      )}

      {isModalVisible && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg transition-transform transform scale-95 animate-fadeIn">
            <h3 className="text-xl font-semibold mb-4">
              {isEditing ? 'Edit Product' : 'Add Product'}
            </h3>
            <Form layout="vertical">
              <Form.Item label="Product Image">
                <Upload
                  listType="picture-card"
                  showUploadList={false}
                  beforeUpload={() => false}
                  onChange={handleImageChange}
                >
                  {formData.image ? (
                    <img
                      src={formData.image}
                      alt="product"
                      style={{
                        width: '100%',
                        height: 'auto',
                        maxHeight: '200px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                      }}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <PlusOutlined className="text-2xl" />
                      <div className="mt-2">Upload</div>
                    </div>
                  )}
                </Upload>
              </Form.Item>
              <Form.Item label="Product Title">
                <Input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Product Title"
                  size="large"
                  className="transition duration-200 ease-in-out focus:ring-2 focus:ring-blue-500"
                />
              </Form.Item>
              <Form.Item label="Product Description">
                <Input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Product Description"
                  size="large"
                  className="transition duration-200 ease-in-out focus:ring-2 focus:ring-blue-500"
                />
              </Form.Item>
              <Form.Item label="Product Price">
                <Input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Product Price"
                  size="large"
                  className="transition duration-200 ease-in-out focus:ring-2 focus:ring-blue-500"
                />
              </Form.Item>
            </Form>
            <div className="flex justify-end mt-4">
              <button
                className="mr-2 bg-gray-300 text-gray-700 py-2 px-4 rounded transition duration-200 ease-in-out transform hover:scale-105"
                onClick={resetForm}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded transition duration-200 ease-in-out transform hover:scale-105"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
