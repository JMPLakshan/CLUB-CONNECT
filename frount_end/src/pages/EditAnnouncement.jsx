import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./edit.css"; 

export default function EditAnnouncement() {
  const { id } = useParams();
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

  useEffect(() => {
    axios.get(`http://localhost:5000/api/announcements/${id}`)
      .then(res => {
        const data = res.data;
        if (data.expiryDate) {
          data.expiryDate = data.expiryDate.substring(0, 16);
        }
        setForm(data); 
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ 
      ...form, 
      [name]: type === "checkbox" ? checked : value 
    });
  };

  const handleUpdate = async () => {
    const now = new Date();
    const selectedExpiry = new Date(form.expiryDate);

    if (!form.title.trim() || !form.description.trim() || !form.expiryDate) {
      alert("Please fill in all required fields (Title, Description, and Expiry Date).");
      return;
    }

    if (selectedExpiry <= now) {
      alert("Expiry Date must be a future date and time.");
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/announcements/${id}`, form);
      alert("Announcement Updated Successfully!");
      navigate("/");
    } catch (err) {
      alert("Update failed!");
    }
  };

  return (
    <div className="container">
      <h1>Edit Announcement</h1>

      <div className="card">
        <h3>Primary Content</h3>
        
        <label>Announcement Title</label>
        <input 
          name="title" 
          value={form.title || ""} 
          onChange={handleChange} 
          placeholder="Enter title"
        />

        <label>Description</label>
        <textarea 
          name="description" 
          value={form.description || ""} 
          onChange={handleChange} 
          placeholder="Enter description"
        />

        
        <label>Target Audience</label>
        <select 
          name="targetAudience" 
          value={form.targetAudience} 
          onChange={handleChange}
          className="form-select" 
          style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ccc' }}
        >
          <option value="All Members">All Members</option>
          <option value="Volunteers">Volunteers</option>
          <option value="Freshers">Freshers</option>
          <option value="Final Year">Final Year</option>
        </select>

        <label>Expiry Date</label>
        <input
          type="datetime-local"
          name="expiryDate"
          value={form.expiryDate || ""}
          onChange={handleChange}
          min={getCurrentDateTime()} 
        />
      </div>

      <div className="card">
        <h3>Notifications</h3>

        <label className="checkbox">
          Send Email Notification
          <input 
            type="checkbox" 
            name="sendEmail" 
            checked={form.sendEmail || false} 
            onChange={handleChange} 
          />
        </label>

        <label className="checkbox">
          Pin to Dashboard
          <input 
            type="checkbox" 
            name="isPinned" 
            checked={form.isPinned || false} 
            onChange={handleChange} 
          />
        </label>
      </div>

      <div className="actions">
        <button className="cancel" onClick={() => navigate("/")}>
          Cancel
        </button>
        <button className="update-btn" onClick={handleUpdate}>
          Update Announcement
        </button>
      </div>
    </div>
  );
}