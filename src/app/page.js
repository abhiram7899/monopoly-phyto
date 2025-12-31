'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabaseClient'; // Correct path
import styles from './home.module.css';

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    place: '',
    phone: '',
    email: '',
  });
  const [file, setFile] = useState(null);

  // Handle Text Inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Phone Specific Logic
  const handlePhoneChange = (e) => {
    let val = e.target.value.replace(/[^0-9+]/g, '');
    setFormData({ ...formData, phone: val });
  };

  // Handle File
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const submitData = async () => {
    let { name, phone, email, place, role } = formData;

    // --- VALIDATION LOGIC ---
    if (!role) { alert("Please select who you are."); return; }
    if (!name || !place) { alert("Please fill in Name and Place."); return; }

    // Phone Cleaning
    phone = phone.replace(/[^0-9]/g, '');
    if (phone.length === 12 && phone.startsWith('91')) phone = phone.substring(2);
    else if (phone.length === 11 && phone.startsWith('0')) phone = phone.substring(1);

    if (phone.length !== 10) { alert("Please enter a valid 10-digit Mobile Number."); return; }
    if (/^(\d)\1+$/.test(phone)) { alert("Repeated digits are not allowed."); return; }
    if (phone === "1234567890") { alert("Please enter a real mobile number."); return; }
    if (!/^[6-9]/.test(phone)) { alert("Invalid Mobile Number. Must start with 6-9."); return; }

    if (email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) { alert("Invalid Email Address."); return; }
    }

    setLoading(true);

    try {
      let imageUrl = "";

      // Upload Image
      if (file) {
        const cleanName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
        const fileName = Date.now() + "_" + cleanName;
        const { error: uploadError } = await supabase.storage.from('cards').upload(fileName, file);
        if (uploadError) throw uploadError;
        
        const { data: urlData } = supabase.storage.from('cards').getPublicUrl(fileName);
        imageUrl = urlData.publicUrl;
      }

      // Insert Data
      const { error: dbError } = await supabase.from('visitors').insert([{
        name, phone, email, place, role, card_url: imageUrl
      }]);

      if (dbError) throw dbError;

      // 🔐 SECURITY: Give them the "Ticket"
      sessionStorage.setItem("hasAccess", "true");

      // Navigate
      router.push('/products');

    } catch (error) {
      console.error(error);
      alert("Error: " + error.message);
      setLoading(false);
    }
  };

  return (
    <div className={styles.bodyWrapper}>
      <div className={styles.container}>
        <div className={styles.logoRow}>
          <img src="/logo1.png" alt="Monopoly" className={styles.mainLogo} />
          
        </div>
        <h1 className={styles.heading}>MONOPOLY PHYTO LINKS</h1>
        <p className={styles.subtitle}>Please enter details to view catalog</p>

        <label className={styles.label}>Full Name *</label>
        <input type="text" name="name" className={styles.input} placeholder="Enter your name" onChange={handleChange} />

        <label className={styles.label}>I am a: *</label>
        <div className={styles.roleGroup}>
          {["Ayurvedic Practitioner", "BAMS Student", "Retailer", "Distributor", "Other"].map((r) => (
            <label key={r} className={styles.roleOption}>
              <input type="radio" name="role" value={r} onChange={(e) => setFormData({...formData, role: r})} />
              <span>{r}</span>
            </label>
          ))}
        </div>

        <label className={styles.label}>City / Place *</label>
        <input type="text" name="place" className={styles.input} placeholder="e.g. Bangalore" onChange={handleChange} />

        <label className={styles.label}>Phone Number *</label>
        <input type="tel" name="phone" className={styles.input} placeholder="Mobile Number" maxLength="14" value={formData.phone} onChange={handlePhoneChange} />

        <label className={styles.label}>Email</label>
        <input type="email" name="email" className={styles.input} placeholder="name@example.com" onChange={handleChange} />

        <label className={styles.label}>Visiting Card</label>
        <div className={styles.fileUploadWrapper}>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>

        <button onClick={submitData} className={styles.button} disabled={loading}>
          {loading ? "Processing..." : "Submit and Explore Range"}
        </button>
      </div>
    </div>
  );
}