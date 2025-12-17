import { useState } from "react";
import { CV } from "./classes.js";

function CVForm() {
  //   const cv = new CV();
  //   const [cvInfo, setCvInfo] = useState(cv);
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const GeneralInfo = (
    <div className="form-step">
      <h2>Step 1: General Information</h2>
      <p style={{ marginBottom: "20px", color: "#666" }}>
        Let's start with the basics.
      </p>

      <div className="form-group">
        <label>Full Name</label>
        <input type="text" placeholder="e.g. John Doe" />
      </div>
      <div className="form-group">
        <label>Email Address</label>
        <input type="email" placeholder="john@example.com" />
      </div>
      <div className="form-group">
        <label>Phone Number</label>
        <input type="tel" placeholder="+234..." />
      </div>
    </div>
  );

  const Education = (
    <div className="form-step">
      <h2>Step 2: Education</h2>
      <p style={{ marginBottom: "20px", color: "#666" }}>
        Add your academic background.
      </p>

      <div className="items-list">
        <div className="item-card">
          <div className="item-info">
            <h3>University of Benin</h3>
            <p>LLB - 2021 to 2025</p>
          </div>
          <div className="item-actions">
            <button className="btn-edit" title="Edit">
              ✎
            </button>
            <button className="btn-delete" title="Delete">
              🗑️
            </button>
          </div>
        </div>
      </div>

      <div className="input-section">
        <div
          style={{
            background: "#f8fafc",
            padding: "1.5rem",
            borderRadius: "8px",
            border: "1px solid #e2e8f0",
            marginBottom: "20px",
          }}
        >
          <h4 style={{ marginBottom: "10px", color: "#333" }}>
            Add New School
          </h4>

          <div className="form-group">
            <label>School Name</label>
            <input type="text" placeholder="e.g. UNIBEN" />
          </div>
          <div className="form-group">
            <label>Degree</label>
            <input type="text" placeholder="e.g. LLB" />
          </div>

          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button
              className="btn-save"
              style={{
                background: "#2563eb",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Save
            </button>
            <button
              className="btn-cancel"
              style={{
                background: "#94a3b8",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <button className="btn-add-new">+ Add Education</button>
    </div>
  );

  const Experience = (
    <div className="form-step">
      <h2>Step 3: Practical Experience</h2>
      <p style={{ marginBottom: "20px", color: "#666" }}>
        Add your relevant work history.
      </p>

      <div className="items-list">
        <div className="item-card">
          <div className="item-info">
            <h3>Paystack</h3>
            <p>Frontend Engineer</p>
          </div>
          <div className="item-actions">
            <button className="btn-edit" title="Edit">
              ✎
            </button>
            <button className="btn-delete" title="Delete">
              🗑️
            </button>
          </div>
        </div>
      </div>

      <div className="input-section">
        <div
          style={{
            background: "#f8fafc",
            padding: "1.5rem",
            borderRadius: "8px",
            border: "1px solid #e2e8f0",
            marginBottom: "20px",
          }}
        >
          <h4 style={{ marginBottom: "10px", color: "#333" }}>
            Add Job Position
          </h4>

          <div className="form-group">
            <label>Company Name</label>
            <input type="text" placeholder="e.g. Paystack" />
          </div>

          <div className="form-group">
            <label>Position Title</label>
            <input type="text" placeholder="e.g. Junior Developer" />
          </div>

          <div className="form-group">
            <label>Main Responsibilities</label>

            <textarea
              rows="4"
              placeholder="Describe your main tasks and achievements..."
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                fontSize: "1rem",
                fontFamily: "inherit",
              }}
            ></textarea>
          </div>

          <div style={{ display: "flex", gap: "20px" }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Start Date</label>
              <input type="date" />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>End Date</label>
              <input type="date" />
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button
              className="btn-save"
              style={{
                background: "#2563eb",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Save
            </button>
            <button
              className="btn-cancel"
              style={{
                background: "#94a3b8",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <button className="btn-add-new">+ Add Experience</button>
    </div>
  );

  return (
    <div className="wizard-container">
      <form onSubmit={(e) => e.preventDefault()}>
        {step === 1 && GeneralInfo}
        {step === 2 && Education}
        {step === 3 && Experience}
      </form>

      <div className="wizard-footer">
        {step > 1 ? (
          <button type="button" onClick={prevStep} className="btn-back">
            Back
          </button>
        ) : (
          <div></div>
        )}

        {step < 3 ? (
          <button type="button" onClick={nextStep} className="btn-next">
            Next Step &rarr;
          </button>
        ) : (
          <button type="submit" className="btn-submit">
            Build CV 🚀
          </button>
        )}
      </div>
    </div>
  );
}

export default CVForm;
