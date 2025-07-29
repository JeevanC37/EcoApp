import React, { useState } from 'react';
import { Star, Filter, Search, Heart, ShoppingCart, Leaf } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  rating: number;
  image: string;
  sustainability: 'excellent' | 'good' | 'fair';
  category: string;
  certifications: string[];
  isWishlisted: boolean;
}

const Marketplace: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [wishlist, setWishlist] = useState<string[]>([]);

  const categories = ['all', 'clothing', 'food', 'beauty', 'home', 'electronics'];
  const filters = ['all', 'excellent', 'good', 'certified-organic', 'fair-trade'];

  const products: Product[] = [
    {
      id: '1',
      name: 'Organic Cotton T-Shirt',
      brand: 'EcoWear',
      price: 2499,
      rating: 4.8,
      image: 'https://images.pexels.com/photos/1126993/pexels-photo-1126993.jpeg?auto=compress&cs=tinysrgb&w=300',
      sustainability: 'excellent',
      category: 'clothing',
      certifications: ['Organic', 'Fair Trade'],
      isWishlisted: false
    },
    {
      id: '2',
      name: 'Bamboo Toothbrush Set',
      brand: 'GreenBrush',
      price: 1099,
      rating: 4.6,
      image: 'https://images.pexels.com/photos/3737564/pexels-photo-3737564.jpeg?_gl=1*3s77z5*_ga*OTUxNDkwMzY4LjE3NTI3NDE4NTE.*_ga_8JE65Q40S6*czE3NTI3NDE4NTEkbzEkZzEkdDE3NTI3NDE4NTUkajU2JGwwJGgw',
      sustainability: 'excellent',
      category: 'beauty',
      certifications: ['Biodegradable', 'Plastic-Free'],
      isWishlisted: false
    },
    {
      id: '3',
      name: 'Solar Power Bank',
      brand: 'SunCharge',
      price: 3899,
      rating: 4.4,
      image: 'https://images.pexels.com/photos/2387532/pexels-photo-2387532.jpeg?auto=compress&cs=tinysrgb&w=300',
      sustainability: 'good',
      category: 'electronics',
      certifications: ['Energy Star'],
      isWishlisted: false
    },
    {
      id: '4',
      name: 'Organic Quinoa Bowl',
      brand: 'NatureNutrition',
      price: 749,
      rating: 4.7,
      image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=300',
      sustainability: 'excellent',
      category: 'food',
      certifications: ['Organic', 'Gluten-Free'],
      isWishlisted: false
    },
    {
      id: '5',
      name: 'Recycled Yoga Mat',
      brand: 'EcoYoga',
      price: 3399,
      rating: 4.5,
      image: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=300',
      sustainability: 'excellent',
      category: 'home',
      certifications: ['Recycled Materials'],
      isWishlisted: false
    },
    {
      id: '6',
      name: 'Natural Skincare Set',
      brand: 'PureBeauty',
      price: 4649,
      rating: 4.9,
      image: 'https://images.pexels.com/photos/6621187/pexels-photo-6621187.jpeg?auto=compress&cs=tinysrgb&w=300',
      sustainability: 'excellent',
      category: 'beauty',
      certifications: ['Organic', 'Cruelty-Free'],
      isWishlisted: false
    }
  ];

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesFilter = selectedFilter === 'all' || 
                         product.sustainability === selectedFilter ||
                         (selectedFilter === 'certified-organic' && product.certifications.includes('Organic')) ||
                         (selectedFilter === 'fair-trade' && product.certifications.includes('Fair Trade'));
    
    return matchesSearch && matchesCategory && matchesFilter;
  });

  const getSustainabilityColor = (level: string) => {
    switch (level) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'fair': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const getSustainabilityBg = (level: string) => {
    switch (level) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'fair': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Sustainable Marketplace
        </h1>
        <p className="text-gray-600">
          Discover verified sustainable brands and products
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search sustainable products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>

        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="all">All Ratings</option>
          <option value="excellent">Excellent</option>
          <option value="good">Good</option>
          <option value="certified-organic">Certified Organic</option>
          <option value="fair-trade">Fair Trade</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="relative">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
              >
                <Heart 
                  size={16} 
                  className={wishlist.includes(product.id) ? 'text-red-500 fill-current' : 'text-gray-400'}
                />
              </button>
              <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium ${getSustainabilityBg(product.sustainability)}`}>
                <Leaf size={12} className="inline mr-1" />
                {product.sustainability}
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 mb-1">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
              
              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={12} 
                      className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 ml-2">{product.rating}</span>
              </div>
              
              <div className="flex flex-wrap gap-1 mb-3">
                {product.certifications.map(cert => (
                  <span key={cert} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    {cert}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-800">₹{product.price}</span>
                <button className="flex items-center px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <ShoppingCart size={14} className="mr-1" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Marketplace;