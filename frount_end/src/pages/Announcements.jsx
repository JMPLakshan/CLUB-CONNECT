import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./announcements.css";

export default function Announcements() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAudience, setSelectedAudience] = useState("All"); 

  const fetchData = () => {
    axios.get("http://localhost:5000/api/announcements")
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this announcement?")) {
      await axios.delete(`http://localhost:5000/api/announcements/${id}`);
      fetchData();
    }
  };

  const getStatusBadge = (expiryDate) => {
    const now = new Date();
    const expiry = new Date(expiryDate);
    return expiry > now ? (
      <span className="badge active">Active</span>
    ) : (
      <span className="badge expired">Expired</span>
    );
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  
  const filteredData = data.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAudience = selectedAudience === "All" || item.targetAudience === selectedAudience;
    return matchesSearch && matchesAudience;
  });

  const pinned = filteredData.filter(item => item.isPinned);
  const others = filteredData.filter(item => !item.isPinned);

  return (
    <div className="container">
      <div className="header">
        <h2>Announcements</h2>
        <Link to="/create" className="btn">+ Post New</Link>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by title..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      
      <div className="filter-tabs">
        {["All", "Volunteers", "Freshers", "Final Year"].map(tab => (
          <button 
            key={tab}
            className={`tab-btn ${selectedAudience === tab ? "active-tab" : ""}`}
            onClick={() => setSelectedAudience(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      
      {pinned.length > 0 && <h4 className="section-title">Pinned Announcements</h4>}
      {pinned.map(item => (
        <div key={item._id} className={`card pinned ${new Date(item.expiryDate) < new Date() ? 'is-expired' : ''}`}>
          <div className="card-top">
            <div className="badges-wrapper">
              <span className="badge pinned-badge">Pinned</span>
              {getStatusBadge(item.expiryDate)}
              <span className="badge audience-badge">{item.targetAudience}</span>
            </div>
            <button className="delete-btn" onClick={() => handleDelete(item._id)}>Delete</button>
          </div>

          <h3>{item.title}</h3>
          <div className="date-info">
            <span>📅 Published: <b>{formatDateTime(item.createdAt)}</b></span>
            <span>⏳ Expiry: <b>{formatDateTime(item.expiryDate)}</b></span>
          </div>
          <p>{item.description}</p>

          <div className="card-footer">
            <Link to={`/edit/${item._id}`}>Edit details →</Link>
            {item.sendEmail && <span title="Email Sent">📧</span>}
          </div>
        </div>
      ))}

      
      <h4 className="section-title">Latest Updates</h4>
      {others.length > 0 ? (
        others.map(item => (
          <div key={item._id} className={`card ${new Date(item.expiryDate) < new Date() ? 'is-expired' : ''}`}>
            <div className="card-top">
              <div className="badges-wrapper">
                {getStatusBadge(item.expiryDate)}
                <span className="badge audience-badge">{item.targetAudience}</span>
              </div>
              <button className="delete-btn" onClick={() => handleDelete(item._id)}>Delete</button>
            </div>

            <h3>{item.title}</h3>
            <div className="date-info">
              <span>📅 Published: <b>{formatDateTime(item.createdAt)}</b></span>
              <span>⏳ Expiry: <b>{formatDateTime(item.expiryDate)}</b></span>
            </div>
            <p>{item.description}</p>

            <div className="card-footer">
              <Link to={`/edit/${item._id}`}>Edit details →</Link>
            </div>
          </div>
        ))
      ) : (
        <p className="no-data">No announcements found for this category.</p>
      )}
    </div>
  );
}