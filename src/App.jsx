import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./dataSlice";

function App() {
  const dispatch = useDispatch();
  const { items, total, loading } = useSelector((state) => state.data);

  const [page, setPage] = useState(1);
  const limit = 50;
  const totalPages = total > 0 ? Math.ceil(total / limit) : null; // null until API responds

  useEffect(() => {
    dispatch(fetchData({ page, limit }));
  }, [dispatch, page]);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>React Pagination (100 per page)</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Prev
        </button>

        <span style={{ margin: "0 10px" }}>
          Page {page} {totalPages ? `of ${totalPages}` : ""}
        </span>

        <button
          onClick={() => setPage((p) => (totalPages ? Math.min(p + 1, totalPages) : p + 1))}
          disabled={totalPages ? page === totalPages : false} // ✅ only disable when on last page
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
