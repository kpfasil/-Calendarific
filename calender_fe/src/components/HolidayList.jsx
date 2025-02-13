import React, { useState, useEffect } from "react";
import axios from "axios";

const HolidayList = ({ country, year }) => {
  const [holidays, setHolidays] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch holidays from the Django backend
  const fetchHolidays = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/holidays/?country=${country}&year=${year}&page=${page}`
      );
      setHolidays(response.data.results);
      setCount(response.data.count);
    } catch (error) {
      console.error("Error fetching holidays:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load holidays when the component mounts or the page changes
  useEffect(() => {
    fetchHolidays(page);
  }, [page, country, year]);

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= Math.ceil(count / 10)) {
      setPage(newPage);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Holidays</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ul className="space-y-2">
            {holidays.map((holiday) => (
              <li key={holiday.name} className="p-2 border rounded">
                <strong>{holiday.name}</strong> - {holiday.date} ({holiday.type})
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            >
              Previous
            </button>
            <span>
              Page {page} of {Math.ceil(count / 10)}
            </span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === Math.ceil(count / 10)}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default HolidayList;