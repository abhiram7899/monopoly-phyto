'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './products.module.css';

// 📝 PRODUCT LIST
const products = [
  { title: "Suman Laboratories", thumb: "/thumb1.jpg", pdf: "/Suman Laboratories.pdf" },
  { title: "Bellan Pharmaceuticals", thumb: "/thumb2.jpg", pdf: "/Bellan Pharmaceuticals.pdf" },
  { title: "Ayulabs", thumb: "/thumb3.jpg", pdf: "/Ayulabs.pdf" },
  { title: "BVC max", thumb: "/thumb4.jpg", pdf: "/BVC max.pdf" },
  { title: "AyurYog Healthcare Services LLP", thumb: "/thumb5.jpg", pdf: "/AyurYog Healthcare Services LLP.pdf" },
  { title: "Ayulabs PVT LTD", thumb: "/thumb6.jpg", pdf: "/Ayulabs PVT LTD.pdf" },
  { title: "Sun Nutra Labs", thumb: "/thumb7.jpg", pdf: "/Sun Nutra Labs.pdf" },
  { title: "Recure Healthcare", thumb: "/thumb8.jpg", pdf: "/Recure Healthcare.pdf" },
  { title: "Rutarth Pharma", thumb: "/thumb9.jpg", pdf: "/Rutarth Pharma.pdf" },
  { title: "Phyto Specialities Pvt. Ltd.", thumb: "/thumb10.jpg", pdf: "/Phyto Specialities Pvt. Ltd..pdf" },
  { title: "Natural (Rutarth)", thumb: "/thumb11.jpg", pdf: "/natural.pdf" },
  { title: "Ayushri", thumb: "/thumb12.jpg", pdf: "/Ayushri.pdf" },
];

export default function ProductsPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  // 🔒 SECURITY CHECK
  useEffect(() => {
    const hasTicket = sessionStorage.getItem("hasAccess");
    if (!hasTicket) {
      router.push('/'); // Kick them out
    } else {
      setIsAuthorized(true); // Let them in
    }
  }, [router]);

  if (!isAuthorized) return null; // Show nothing while checking

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.header}>
        <img src="/logo1.png" alt="Monopoly Phyto Links" className={styles.logoImg} />
        <h1>MONOPOLY PHYTO LINKS</h1>
        <h3>Marketing & Distribution</h3>
      </header>

      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Our Visual Aids & Catalogs</h2>

        <div className={styles.gridLayout}>
          {products.map((item, index) => (
            <div key={index} className={styles.catalogCard}>
              <img src={item.thumb} alt={item.title} className={styles.pdfThumbImg} />
              <div className={styles.cardBody}>
                <div className={styles.cardTitle}>{item.title}</div>
                <div className={styles.btnGroup}>
                  <a href={item.pdf} target="_blank" className={`${styles.btn} ${styles.btnView}`}>View</a>
                  <a href={item.pdf} download className={`${styles.btn} ${styles.btnDownload}`}>Download</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerGrid}>
          <div className={styles.footerCol}>
            <h3>Our Location</h3>
            <p><strong>Monopoly Phyto Links</strong></p>
            <p>H Anjanappa Building, 1st Floor, 228/4,<br/>4th cross Road, Bahubali Nagar, Jalahalli Village,<br/>Bengaluru-560013</p>
          </div>
          <div className={styles.footerCol}>
            <h3>Contact Us</h3>
            <a href="tel:+919900819819" className={styles.contactBtn} style={{backgroundColor: '#1b5e20'}}>
               📞 Call Now
            </a>
            <a href="https://wa.me/919448315459" target="_blank" className={styles.contactBtn} style={{backgroundColor: '#1b5e20'}}>
               💬 Chat on WhatsApp
            </a>
            <a href="mailto:mphytolinks@gmail.com?subject=Product%20Inquiry" className={styles.contactBtn} style={{backgroundColor: '#1b5e20'}}>
               ✉ Click to Email Us
            </a>
          </div>
          <div className={styles.footerCol}>
            <h3>About Us</h3>
            <p>Monopoly Phyto Links provides you the best range of Ayurvedic Syrup, Essential Oils, Pharmaceutical Tablets Other Products in Bengaluru, Karnataka.</p>
          </div>
        </div>
        <p className={styles.copyright}>
            &copy; 2025 Monopoly Phyto Links. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}