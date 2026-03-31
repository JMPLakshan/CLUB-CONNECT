import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./create.css";

export default function CreateAnnouncement() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    expiryDate: "",
    targetAudience: "All Members",
    sendEmail: false,
    isPinned: false
  });

  
  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async () => {
    
    const now = new Date();
    const selectedExpiry = new Date(form.expiryDate);

    
    if (!form.title.trim() || !form.description.trim() || !form.expiryDate) {
      alert("Please fill in all required fields (Title, Description, and Expiry Date).");
      return;
    }

    
    if (selectedExpiry <= now) {
      alert("Expiry Date and Time must be a future date and time.");
      return;
    }
    

    try {
      await axios.post("http://localhost:5000/api/announcements", form);
      alert("Announcement Created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error creating announcement:", error);
      alert("Failed to create announcement. Please check your connection.");
    }
  };

  return (
    <div className="container">
      <h1>Create Announcement</h1>

      <div className="card">
        <h3>Primary Content</h3>

        <label>Announcement Title</label>
        <input
          name="title"
          placeholder="Enter title"
          value={form.title}
          onChange={handleChange}
        />

        <label>Description</label>
        <textarea
          name="description"
          placeholder="Enter description"
          value={form.description}
          onChange={handleChange}
        />

        <div className="row">
          <div>
            <label>Expiry Date</label>
            <input
              type="datetime-local"
              name="expiryDate"
              onChange={handleChange}
              min={getCurrentDateTime()} 
            />
          </div>

          <div>
            <label>Target Audience</label>
            <select name="targetAudience" value={form.targetAudience} onChange={handleChange}>
              <option>All Members</option>
              <option>Final Year Students</option>
              <option>Freshers</option>
              <option>Volunteers</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Notifications</h3>

        <label className="checkbox row-align">
          Send Email Notification
          <input 
            type="checkbox" 
            name="sendEmail" 
            checked={form.sendEmail}
            onChange={handleChange} 
          />
        </label>

        <label className="checkbox row-align">
          Pin to Dashboard
          <input 
            type="checkbox" 
            name="isPinned" 
            checked={form.isPinned}
            onChange={handleChange} 
          />
        </label>
      </div>

      <div className="actions">
        <button className="cancel" onClick={() => navigate("/")}>
          Cancel
        </button>
        <button className="create" onClick={handleSubmit}>
          Create Announcement
        </button>
      </div>
    </div>
  );
}