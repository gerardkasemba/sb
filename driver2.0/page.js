"use client"
import { useState } from "react";

// Sample job data structure based on form information
const sampleJobs = [
  {
    id: 1,
    deliveryType: "Store Delivery",
    storeName: "Best Buy",
    pickupLocation: "123 Main St, Boston, MA",
    dropoffLocation: "456 Elm St, Boston, MA",
    purchaserName: "John Doe",
    phoneNumber: "123-456-7890",
    items: ["TV", "Desk"],
    pickupDate: "2024-11-10",
    pickupTime: "14:00",
    price: 50,
    platform: "",
    status: "Pending",
  },
  {
    id: 2,
    deliveryType: "Second-Hand Market",
    platform: "Facebook Marketplace",
    pickupLocation: "789 Oak St, Boston, MA",
    dropoffLocation: "321 Maple St, Cambridge, MA",
    purchaserName: "Jane Smith",
    phoneNumber: "987-654-3210",
    items: ["Couch", "Dining Table"],
    pickupDate: "2024-11-12",
    pickupTime: "16:00",
    price: 65,
    status: "Pending",
  },
];

// Status colors for different job states
const statusStyles = {
  Pending: "bg-yellow-100 text-yellow-800",
  "On Route": "bg-blue-100 text-blue-800",
  Arrived: "bg-purple-100 text-purple-800",
  "Picked up": "bg-green-100 text-green-800",
  "Dropped-off": "bg-gray-100 text-gray-800",
};

export default function JobBoard() {
  const [jobs, setJobs] = useState(sampleJobs);
  const [expandedJob, setExpandedJob] = useState(null);

  // Toggle expanded state of a job card
  const toggleJobDetails = (jobId) => {
    setExpandedJob(expandedJob === jobId ? null : jobId);
  };

  // Handle status update
  const handleStatusChange = (jobId, newStatus) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId ? { ...job, status: newStatus } : job
      )
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 rounded-lg mt-10">
      <h3 className="text-2xl font-semibold text-center mb-6 text-[#024BBE]">Available Jobs</h3>
      <div className="grid grid-cols-1 gap-4">
        {jobs.map((job) => (
          <div key={job.id} className="border border-gray-300 rounded-md p-4 bg-white shadow-md">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleJobDetails(job.id)}
            >
              <div>
                <h4 className="text-lg font-semibold text-[#024BBE]">{job.deliveryType}</h4>
                <p className="text-sm text-gray-700">{job.pickupLocation} to {job.dropoffLocation}</p>
                <p className="text-sm font-semibold text-gray-700">Pickup Date: {job.pickupDate}</p>
                <p className="text-sm font-semibold text-gray-700">Estimated Price: ${job.price}</p>

                {/* Status display with dynamic color styling */}
                <span
                  className={`inline-block mt-2 px-3 py-1 text-sm font-semibold rounded-full ${statusStyles[job.status]}`}
                >
                  {job.status}
                </span>
              </div>
              <button className="text-[#024BBE] font-bold text-lg">
                {expandedJob === job.id ? "–" : "+"}
              </button>
            </div>

            {/* Expanded job details */}
            {expandedJob === job.id && (
              <div className="mt-4 border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-700"><strong>Purchaser Name:</strong> {job.purchaserName}</p>
                <p className="text-sm text-gray-700"><strong>Phone Number:</strong> {job.phoneNumber}</p>
                {job.deliveryType === "Store Delivery" && (
                  <p className="text-sm text-gray-700"><strong>Store Name:</strong> {job.storeName}</p>
                )}
                {job.deliveryType === "Second-Hand Market" && job.platform && (
                  <p className="text-sm text-gray-700"><strong>Platform:</strong> {job.platform}</p>
                )}
                <p className="text-sm text-gray-700"><strong>Items to Pickup:</strong> {job.items.join(", ")}</p>
                <p className="text-sm text-gray-700"><strong>Pickup Location:</strong> {job.pickupLocation}</p>
                <p className="text-sm text-gray-700"><strong>Dropoff Location:</strong> {job.dropoffLocation}</p>
                <p className="text-sm text-gray-700"><strong>Pickup Time:</strong> {job.pickupTime}</p>
                
                {/* Status Dropdown */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Update Status</label>
                  <select
                    value={job.status}
                    onChange={(e) => handleStatusChange(job.id, e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:border-[#024BBE]"
                  >
                    <option value="Pending">Pending</option>
                    <option value="On Route">On Route</option>
                    <option value="Arrived">Arrived</option>
                    <option value="Picked up">Picked up</option>
                    <option value="Dropped-off">Dropped-off</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

