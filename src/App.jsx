import { useState } from "react";
import "./styles/style.css";
import Header from "./components/header.jsx";
import Footer from "./components/footer.jsx";
import CVForm from "./components/cv_form.jsx";
import CVPreview from "./components/cv_paper.jsx";

export function App() {
  const cvData = JSON.parse(localStorage.getItem("myCVData")) || null;

  const [showForm, setShowForm] = useState(false);

  return (
    <div className="app-container">
      <Header onStartBuild={() => setShowForm(true)} />

      <main className="main-content">
        {showForm ? (
          <CVForm onBuild={() => setShowForm(false)} />
        ) : (
          <div className="content-wrapper">
            {cvData ? (
              <CVPreview info={cvData} onEdit={() => setShowForm(true)} />
            ) : (
              <div className="empty-state">
                {/* <h2>No CV found 📄</h2> */}
                <p>You haven't created a CV yet.</p>
                <p>Click "Start Building" to create one!</p>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
