"use client";
import { useState, useEffect } from "react";

export default function OrderForm() {
  const [formData, setFormData] = useState({
    deliveryType: "",
    storeName: "",
    pickupLocation: "",
    dropoffLocation: "",
    purchaserName: "",
    phoneNumber: "",
    items: [],
    customItem: "",
    dropoffDate: "",
    dropoffTime: "",
    platform: "",
  });
  const [price, setPrice] = useState(0);
  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addItem = (item) => {
    setFormData((prevState) => ({
      ...prevState,
      items: prevState.items.includes(item)
        ? prevState.items.filter((i) => i !== item)
        : [...prevState.items, item],
    }));
  };

  const addCustomItem = () => {
    if (formData.customItem.trim() && !formData.items.includes(formData.customItem.trim())) {
      addItem(formData.customItem.trim());
    }
    setFormData((prevState) => ({ ...prevState, customItem: "" }));
  };

  useEffect(() => {
    const basePrice = 20;
    const itemCost = formData.items.length * 5;
    const distanceCost = 10;
    const total = basePrice + itemCost + distanceCost;
    setPrice(total.toFixed(2));
  }, [formData.items]);

  const isStep1Complete = () => {
    return (
      formData.deliveryType &&
      formData.pickupLocation &&
      formData.dropoffLocation &&
      formData.purchaserName &&
      formData.phoneNumber &&
      (formData.deliveryType !== "storeDelivery" || formData.storeName)
    );
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    alert("Order submitted!");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h3 className="text-2xl font-semibold text-center mb-6 text-[#024BBE]">SnabbDeal Delivery Request</h3>

      {step === 1 && (
        <div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Delivery Type</label>
            <select
              name="deliveryType"
              value={formData.deliveryType}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border border-gray-400 rounded-md bg-white focus:outline-none focus:border-[#024BBE]"
            >
              <option value="" disabled>Select delivery type</option>
              <option value="storeDelivery">Store Delivery</option>
              <option value="secondHand">Second-Hand Market</option>
              <option value="moveFewItems">Move a Few Items</option>
            </select>
            {formData.deliveryType === "storeDelivery" && (
              <p className="text-sm text-[#024BBE] mt-2">Tell the store that SnabbDeal will pick up your purchase. Upload your receipt photo when prompted.</p>
            )}
            {formData.deliveryType === "secondHand" && (
              <p className="text-sm text-[#024BBE] mt-2">
                Simply specify the platform (e.g., Facebook Marketplace, OfferUp, Craigslist) where your item is listed, and
                SnabbDeal will handle the pickup and delivery to your preferred location.
              </p>
            )}
          </div>

          {formData.deliveryType === "secondHand" && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">Platform</label>
              <select
                name="platform"
                value={formData.platform}
                onChange={handleChange}
                className="mt-1 block w-full p-3 border border-gray-400 rounded-md bg-white focus:outline-none focus:border-[#024BBE]"
              >
                <option value="" disabled>Select platform</option>
                <option value="facebookMarketplace">Facebook Marketplace</option>
                <option value="offerUp">OfferUp</option>
                <option value="craigslist">Craigslist</option>
                <option value="other">Other</option>
              </select>
            </div>
          )}

          {formData.deliveryType === "storeDelivery" && (
            <div className="mb-4">
              <input
                type="text"
                placeholder="Store Name"
                name="storeName"
                value={formData.storeName}
                onChange={handleChange}
                className="p-3 border border-gray-400 rounded-md w-full focus:outline-none focus:border-[#024BBE]"
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Pickup Location"
              name="pickupLocation"
              value={formData.pickupLocation}
              onChange={handleChange}
              className="p-3 border border-gray-400 rounded-md focus:outline-none focus:border-[#024BBE]"
            />
            <input
              type="text"
              placeholder="Dropoff Location"
              name="dropoffLocation"
              value={formData.dropoffLocation}
              onChange={handleChange}
              className="p-3 border border-gray-400 rounded-md focus:outline-none focus:border-[#024BBE]"
            />
          </div>

          <input
            type="text"
            placeholder="Your Name"
            name="purchaserName"
            value={formData.purchaserName}
            onChange={handleChange}
            className="mb-4 w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:border-[#024BBE]"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="mb-4 w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:border-[#024BBE]"
          />

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setStep(2)}
              disabled={!isStep1Complete()}
              className={`bg-[#024BBE] text-white p-3 rounded-md mt-6 ${
                !isStep1Complete() ? "opacity-50 cursor-not-allowed" : "hover:bg-[#FBB040]"
              }`}
            >
              Continue to Step 2
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <>
          <div className="flex justify-between mb-4">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="bg-gray-500 text-white p-3 rounded-md hover:bg-gray-600"
            >
              Go Back
            </button>
            <span className="text-lg font-semibold text-[#024BBE]">Step 2 of 2</span>
          </div>

          <ItemPicker
            selectedItems={formData.items}
            addItem={addItem}
            customItem={formData.customItem}
            setCustomItem={(value) => setFormData({ ...formData, customItem: value })}
            addCustomItem={addCustomItem}
          />

          <DateAndTimePicker formData={formData} handleChange={handleChange} />

          <PriceDisplay price={price} />

          <button
            type="submit"
            onClick={handleFinalSubmit}
            className="w-full bg-[#024BBE] text-white p-3 rounded-md hover:bg-[#FBB040] mt-6"
          >
            Submit Order
          </button>
        </>
      )}
    </div>
  );
}

// Updated ItemPicker Component to Display Selected Items with Remove Option
function ItemPicker({ selectedItems, addItem, customItem, setCustomItem, addCustomItem }) {
  const [search, setSearch] = useState("");
  const [filteredItems, setFilteredItems] = useState([
    "Chair", "Box", "Mattress", "Couch", "Dining Table", "TV", "Desk", "Bed Frame", "File Cabinet", "Refrigerator"
  ]);

  useEffect(() => {
    const allItems = ["Chair", "Box", "Mattress", "Couch", "Dining Table", "TV", "Desk", "Bed Frame", "File Cabinet", "Refrigerator"];
    setFilteredItems(allItems.filter((item) => item.toLowerCase().includes(search.toLowerCase())));
  }, [search]);

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">Item(s) Picking Up</label>
      <input
        type="text"
        placeholder="Search items..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-3 w-full border border-gray-400 rounded-md focus:outline-none focus:border-[#024BBE] mb-2"
      />
      <div className="grid grid-cols-2 gap-2">
        {filteredItems.map((item) => (
          <button
            key={item}
            onClick={() => addItem(item)}
            className={`p-2 rounded-md ${selectedItems.includes(item) ? 'bg-[#FBB040] text-white' : 'bg-gray-200'} hover:bg-[#FBB040]`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Custom Item Input */}
      <div className="mt-4">
        <input
          type="text"
          placeholder="Add custom item..."
          value={customItem}
          onChange={(e) => setCustomItem(e.target.value)}
          className="p-3 w-full border border-gray-400 rounded-md focus:outline-none focus:border-[#024BBE] mb-2"
        />
        <button
          onClick={addCustomItem}
          className="w-full bg-[#024BBE] text-white p-3 rounded-md hover:bg-[#FBB040]"
        >
          Add Item
        </button>
      </div>

      {/* Selected Items Display with Remove Option */}
      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Items</h4>
        <div className="flex flex-wrap gap-2">
          {selectedItems.map((item) => (
            <div key={item} className="flex items-center bg-[#FBB040] text-white p-2 rounded-md">
              <span>{item}</span>
              <button
                onClick={() => addItem(item)}
                className="ml-2 hover:text-red-200"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// DateAndTimePicker Component
function DateAndTimePicker({ formData, handleChange }) {
  return (
    <div className="grid grid-cols-2 gap-4 mb-4">
      <input
        type="date"
        name="dropoffDate"
        value={formData.dropoffDate}
        onChange={handleChange}
        className="p-3 border border-gray-400 rounded-md focus:outline-none focus:border-[#024BBE]"
      />
      <input
        type="time"
        name="dropoffTime"
        value={formData.dropoffTime}
        onChange={handleChange}
        className="p-3 border border-gray-400 rounded-md focus:outline-none focus:border-[#024BBE]"
      />
    </div>
  );
}

// PriceDisplay Component
function PriceDisplay({ price }) {
  return (
    <div className="mt-4 p-4 bg-gray-100 rounded-md text-center">
      <span className="text-lg font-semibold">Estimated Price: </span>
      <span className="text-[#024BBE] text-lg font-bold">${price}</span>
    </div>
  );
}
