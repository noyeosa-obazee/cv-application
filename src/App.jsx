import { useState } from "react";
import "./styles/style.css";
import Header from "./components/header.jsx";
import Footer from "./components/footer.jsx";
import CVForm from "./components/cv_form.jsx";

function App() {
  const hasCVs = false;

  const [showForm, setShowForm] = useState(false);

  return (
    <div className="app-container">
      <Header onStartBuild={() => setShowForm(true)} />

      <main className="main-content">
        {showForm ? (
          <CVForm />
        ) : (
          <div className="content-wrapper">
            {hasCVs ? (
              <div>
                <h2>Your CVs</h2>
              </div>
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
