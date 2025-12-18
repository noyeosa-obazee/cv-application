import { useState, useEffect } from "react";
import { CV, Experience, Education } from "./classes.js";

export function CVForm({ onBuild }) {
  const [cvInfo, setCvInfo] = useState(() => {
    const savedData = localStorage.getItem("myCVData");

    return savedData ? JSON.parse(savedData) : new CV();
  });
  const [educationInfo, setEducationInfo] = useState(() => new Education());
  const [experienceInfo, setExperienceInfo] = useState(() => new Experience());
  const [step, setStep] = useState(1);

  useEffect(() => {
    localStorage.setItem("myCVData", JSON.stringify(cvInfo));
  }, [cvInfo]);

  function updateCv(e) {
    if (!Array.isArray(cvInfo[e.target.name])) {
      setCvInfo({ ...cvInfo, [e.target.name]: e.target.value });
    }
  }

  function updateEducation(e) {
    setEducationInfo({ ...educationInfo, [e.target.name]: e.target.value });
  }

  function updateExperience(e) {
    setExperienceInfo({ ...experienceInfo, [e.target.name]: e.target.value });
  }

  function addEducationToCv() {
    setCvInfo({
      ...cvInfo,
      educations: [...cvInfo.educations, educationInfo],
    });
    const newEducation = new Education();
    setEducationInfo(newEducation);
  }

  function addExperienceToCv() {
    setCvInfo({
      ...cvInfo,
      experiences: [...cvInfo.experiences, experienceInfo],
    });
    const newExperience = new Experience();
    setExperienceInfo(newExperience);
  }
  const nextStep = () => setStep(step + 1);
  const prevStep = () => {
    if (step === 1) onBuild();
    else setStep(step - 1);
  };

  const GeneralInfo = (
    <div className="form-step">
      <h2>Step 1: General Information</h2>
      <p style={{ marginBottom: "20px", color: "#666" }}>
        Let's start with the basics.
      </p>

      <div className="form-group">
        <label>Full Name</label>
        <input
          type="text"
          name="fullName"
          onChange={updateCv}
          placeholder="e.g. John Doe"
          value={cvInfo.fullName}
        />
      </div>
      <div className="form-group">
        <label>Email Address</label>
        <input
          type="email"
          name="email"
          onChange={updateCv}
          placeholder="john@example.com"
          value={cvInfo.email}
        />
      </div>
      <div className="form-group">
        <label>Phone Number</label>
        <input
          type="tel"
          name="phoneNo"
          onChange={updateCv}
          placeholder="+234..."
          value={cvInfo.phoneNo}
        />
      </div>
    </div>
  );

  const EducationForm = (
    <div className="form-step">
      <h2>Step 2: Education</h2>
      <p style={{ marginBottom: "20px", color: "#666" }}>
        Add your academic background.
      </p>

      <div className="items-list">
        {cvInfo.educations.map((education) => {
          return (
            <div className="item-card">
              <div className="item-info">
                <h3>{education.schoolName}</h3>
                <p>
                  {education.degree} - {education.startDate} to{" "}
                  {education.endDate}
                </p>
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
          );
        })}
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
            <input
              type="text"
              name="schoolName"
              onChange={updateEducation}
              placeholder="e.g. UNIBEN"
            />
          </div>
          <div className="form-group">
            <label>Degree</label>
            <input
              type="text"
              name="degree"
              onChange={updateEducation}
              placeholder="e.g. LLB"
            />
          </div>

          <div style={{ display: "flex", gap: "20px" }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Start Date</label>
              <input type="date" name="startDate" onChange={updateEducation} />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>End Date</label>
              <input type="date" name="endDate" onChange={updateEducation} />
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
                fontWeight: "600",
              }}
              onClick={addEducationToCv}
            >
              + Add Education
            </button>
            {/* {cvInfo.educations.length > 0 && (
              <button
                className="btn-cancel"
                style={{
                  background: "#94a3b8",
                  color: "white",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                Cancel
              </button>
            )} */}
          </div>
        </div>
      </div>

      {/* <button className="btn-add-new">+ Add Education</button> */}
    </div>
  );

  const ExperienceForm = (
    <div className="form-step">
      <h2>Step 3: Practical Experience</h2>
      <p style={{ marginBottom: "20px", color: "#666" }}>
        Add your relevant work history.
      </p>

      <div className="items-list">
        {cvInfo.experiences.map((experience) => {
          return (
            <div className="item-card">
              <div className="item-info">
                <h3>{experience.companyName}</h3>
                <p>{experience.positionTitle}</p>
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
          );
        })}
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
            <input
              type="text"
              name="companyName"
              onChange={updateExperience}
              placeholder="e.g. Paystack"
            />
          </div>

          <div className="form-group">
            <label>Position Title</label>
            <input
              type="text"
              name="positionTitle"
              onChange={updateExperience}
              placeholder="e.g. Junior Developer"
            />
          </div>

          <div className="form-group">
            <label>Main Responsibilities</label>

            <textarea
              name="mainResponsibilities"
              rows="4"
              onChange={updateExperience}
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
              <input type="date" name="startDate" onChange={updateExperience} />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>End Date</label>
              <input type="date" name="endDate" onChange={updateExperience} />
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
                fontWeight: "600",
              }}
              onClick={addExperienceToCv}
            >
              + Add Experience
            </button>
            {/* {cvInfo.experiences.length > 0 && (
              <button
                className="btn-cancel"
                style={{
                  background: "#94a3b8",
                  color: "white",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                Cancel
              </button>
            )} */}
          </div>
        </div>
      </div>

      {/* <button className="btn-add-new">+ Add Experience</button> */}
    </div>
  );

  return (
    <div className="wizard-container">
      <form onSubmit={(e) => e.preventDefault()}>
        {step === 1 && GeneralInfo}
        {step === 2 && EducationForm}
        {step === 3 && ExperienceForm}
      </form>

      <div className="wizard-footer">
        <button type="button" onClick={prevStep} className="btn-back">
          Back
        </button>

        {step < 3 ? (
          <button type="button" onClick={nextStep} className="btn-next">
            Next Step &rarr;
          </button>
        ) : (
          <button type="submit" onClick={onBuild} className="btn-submit">
            Build CV 🚀
          </button>
        )}
      </div>
    </div>
  );
}

export default CVForm;
