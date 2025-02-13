import React, { useState } from "react";
import HolidayList from "./HolidayList";

const HomePage = () => {
  const [country, setCountry] = useState("US");
  const [year, setYear] = useState(new Date().getFullYear());
  const [fetchData, setFetchData] = useState(false); // State to trigger data fetch

  const handleFetchHolidays = () => {
    setFetchData(true); // Trigger data fetch
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Holiday Management App</h1>
      <div className="mb-4">
        <label className="block mb-2">
          Country:
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="ml-2 p-2 border rounded"
          >
            <option value="US">United States</option>
            <option value="IN">India</option>
            <option value="GB">United Kingdom</option>
            {/* Add more countries as needed */}
          </select>
        </label>
        <label className="block mb-2">
          Year:
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="ml-2 p-2 border rounded"
          />
        </label>
        <button
          onClick={handleFetchHolidays}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Fetch Holidays
        </button>
      </div>
      {fetchData && <HolidayList country={country} year={year} />}
    </div>
  );
};

export default HomePage;