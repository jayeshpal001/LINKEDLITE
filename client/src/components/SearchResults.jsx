// components/SearchResults.jsx
import { Link } from "react-router-dom";
import { FaHistory, FaSearch, FaTimes } from "react-icons/fa";

export default function SearchResults({ query, history, onSelect }) {
  return (
    <div className="absolute top-full mt-1 w-full bg-white shadow-lg rounded-md z-50 border border-gray-200">
      {/* Current search results */}
      <div className="p-2 border-b border-gray-100">
        <Link 
          to={`/search?q=${encodeURIComponent(query)}`} 
          className="flex items-center p-2 hover:bg-gray-100 rounded"
          onClick={onSelect}
        >
          <FaSearch className="mr-2 text-gray-500" />
          <span>Search for "{query}"</span>
        </Link>
      </div>
      
      {/* Search history */}
      {history.length > 0 && (
        <div className="p-2">
          <div className="flex justify-between items-center text-xs text-gray-500 px-2 py-1">
            <span>Recent searches</span>
            <button className="text-blue-500 hover:underline">Clear</button>
          </div>
          {history.map((item, index) => (
            <Link
              key={index}
              to={`/search?q=${encodeURIComponent(item)}`}
              className="flex items-center justify-between p-2 hover:bg-gray-100 rounded"
              onClick={onSelect}
            >
              <div className="flex items-center">
                <FaHistory className="mr-2 text-gray-400" />
                <span>{item}</span>
              </div>
              <FaTimes className="text-gray-400 hover:text-gray-600" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}