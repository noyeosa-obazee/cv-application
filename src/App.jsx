import { useState } from "react";
import "./styles/style.css";
import Header from "./components/header.jsx";
import Footer from "./components/footer.jsx";
import CVForm from "./components/cv_form.jsx";

function App() {
  // 1. Variable to track if CVs exist (Simulated Logic)
  const hasCVs = false;

  // 2. State to toggle showing the Form
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="app-container">
      {/* Pass function to header to open form */}
      <Header onStartBuild={() => setShowForm(true)} />

      <main className="main-content">
        {/* CONDITION 1: User clicked "Start Building" -> Show Form */}
        {showForm ? (
          <CVForm />
        ) : (
          /* CONDITION 2: No Form active. Check if user has CVs */
          <div className="content-wrapper">
            {hasCVs ? (
              <div>
                {/* Logic for listing CVs would go here */}
                <h2>Your CVs</h2>
              </div>
            ) : (
              /* CONDITION 3: No Form, No CVs -> Show Empty State */
              <div className="empty-state">
                <h2>No CVs found 📄</h2>
                <p>You haven't created any resumes yet.</p>
                <p>Click "Start Building" to create your first one!</p>
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
