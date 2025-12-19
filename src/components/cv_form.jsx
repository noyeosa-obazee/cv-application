import { useState, useEffect } from "react";
import { CV, Experience, Education, Link } from "./classes.js";
import ErrorToast from "../error.jsx";

export function CVForm({ onBuild }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [cvInfo, setCvInfo] = useState(() => {
    const savedData = localStorage.getItem("myCVData");

    return savedData ? JSON.parse(savedData) : new CV();
  });
  const [educationInfo, setEducationInfo] = useState(() => new Education());
  const [experienceInfo, setExperienceInfo] = useState(() => new Experience());
  const [linkInfo, setLinkInfo] = useState(() => new Link());
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
  function updateLink(e) {
    setLinkInfo({ ...linkInfo, [e.target.name]: e.target.value });
  }

  function addEducationToCv() {
    for (const edu in educationInfo) {
      if (!educationInfo[edu] && edu !== "endDate") {
        setErrorMessage("All required must be filled");
        return;
      }
    }
    if (!cvInfo.educations.some((edu) => edu.id === educationInfo.id)) {
      setCvInfo({
        ...cvInfo,
        educations: [...cvInfo.educations, educationInfo],
      });
    } else {
      const updatedEducations = cvInfo.educations.map((edu) => {
        if (edu.id === educationInfo.id) {
          return educationInfo;
        }
        return edu;
      });

      setCvInfo({ ...cvInfo, educations: updatedEducations });
    }

    const newEducation = new Education();
    setEducationInfo(newEducation);
  }

  function addExperienceToCv() {
    for (const exp in experienceInfo) {
      if (
        !experienceInfo[exp] &&
        exp !== "endDate" &&
        exp !== "mainResponsibilities"
      ) {
        setErrorMessage("All required fields must be filled");
        return;
      }
    }
    if (!cvInfo.experiences.some((exp) => exp.id === experienceInfo.id)) {
      setCvInfo({
        ...cvInfo,
        experiences: [...cvInfo.experiences, experienceInfo],
      });
    } else {
      const updatedExperiences = cvInfo.experiences.map((exp) => {
        if (exp.id === experienceInfo.id) {
          return experienceInfo;
        }
        return exp;
      });

      setCvInfo({ ...cvInfo, experiences: updatedExperiences });
    }

    const newExperience = new Experience();
    setExperienceInfo(newExperience);
  }

  function addLinkToCv() {
    for (const linkProp in linkInfo) {
      if (!linkInfo[linkProp]) {
        setErrorMessage("All required must be filled");
        return;
      }
    }
    if (!cvInfo.links.some((link) => link.id === linkInfo.id)) {
      setCvInfo({
        ...cvInfo,
        links: [...cvInfo.links, linkInfo],
      });
    } else {
      const updatedLinks = cvInfo.links.map((link) => {
        if (link.id === linkInfo.id) {
          return linkInfo;
        }
        return link;
      });

      setCvInfo({ ...cvInfo, links: updatedLinks });
    }

    const newLink = new Link();
    setLinkInfo(newLink);
  }

  function deleteEducation(id) {
    setCvInfo({
      ...cvInfo,
      educations: cvInfo.educations.filter((edu) => edu.id !== id),
    });
  }

  function deleteExperience(id) {
    setCvInfo({
      ...cvInfo,
      experiences: cvInfo.experiences.filter((exp) => exp.id !== id),
    });
  }

  function deleteLink(id) {
    setCvInfo({
      ...cvInfo,
      links: cvInfo.links.filter((link) => link.id !== id),
    });
  }

  function editEducation(id) {
    setEducationInfo(cvInfo.educations.find((edu) => edu.id === id));
  }

  function editExperience(id) {
    setExperienceInfo(cvInfo.experiences.find((exp) => exp.id === id));
  }

  function editLink(id) {
    setLinkInfo(cvInfo.links.find((link) => link.id === id));
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
      <p style={{ marginBottom: "7px", color: "#666" }}>
        Required fields are marked with asterisk (*)
      </p>
      <div className="form-group">
        <label>Full Name*</label>
        <input
          type="text"
          name="fullName"
          onChange={updateCv}
          placeholder="e.g. John Doe"
          value={cvInfo.fullName}
          required
        />
      </div>
      <div className="form-group">
        <label>Email Address*</label>
        <input
          type="email"
          name="email"
          onChange={updateCv}
          placeholder="john@example.com"
          value={cvInfo.email}
          required
        />
      </div>
      <div className="form-group">
        <label>Phone Number*</label>
        <input
          type="tel"
          name="phoneNo"
          onChange={updateCv}
          placeholder="+234..."
          value={cvInfo.phoneNo}
          required
        />
      </div>
    </div>
  );

  const EducationForm = (
    <div className="form-step">
      <h2>Step 2: Education (optional)</h2>
      <p style={{ marginBottom: "20px", color: "#666" }}>
        Add your academic background.
      </p>

      <div className="items-list">
        {cvInfo.educations.map((education) => {
          return (
            <div className="item-card" key={education.id}>
              <div className="item-info">
                <h3>{education.schoolName}</h3>
                <p>{education.titleOfStudy}</p>
                <p>
                  {education.degree} from {education.startDate} to{" "}
                  {education.endDate}
                </p>
              </div>
              <div className="item-actions">
                <button
                  className="btn-edit"
                  onClick={() => editEducation(education.id)}
                  title="Edit"
                >
                  ✎
                </button>
                <button
                  className="btn-delete"
                  onClick={() => deleteEducation(education.id)}
                  title="Delete"
                >
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
            <label>School Name*</label>
            <input
              type="text"
              name="schoolName"
              onChange={updateEducation}
              value={educationInfo.schoolName}
              placeholder="e.g. UNIBEN"
            />
          </div>
          <div className="form-group">
            <label>Title of study*</label>
            <input
              type="text"
              name="titleOfStudy"
              onChange={updateEducation}
              value={educationInfo.titleOfStudy}
              placeholder="e.g. Electircal Engineering"
            />
          </div>
          <div className="form-group">
            <label>Degree*</label>
            <input
              type="text"
              name="degree"
              onChange={updateEducation}
              value={educationInfo.degree}
              placeholder="e.g. BSC"
            />
          </div>

          <div
            style={{ display: "flex", gap: "20px" }}
            className="date-arranger"
          >
            <div className="form-group" style={{ flex: 1 }}>
              <label>Start Date*</label>
              <input
                type="date"
                name="startDate"
                onChange={updateEducation}
                value={educationInfo.startDate}
              />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>End Date (optional)</label>
              <input
                type="date"
                name="endDate"
                onChange={updateEducation}
                // value={
                //   educationInfo.endDate !== "Present" && educationInfo.endDate
                // }
              />
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
              {cvInfo.educations.some((edu) => edu.id === educationInfo.id)
                ? "+ Update Education"
                : "+ Add Education"}
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
      <h2>Step 3: Practical Experience (optional)</h2>
      <p style={{ marginBottom: "20px", color: "#666" }}>
        Add your relevant work history.
      </p>
      <div className="items-list">
        {cvInfo.experiences.map((experience) => {
          return (
            <div className="item-card" key={experience.id}>
              <div className="item-info">
                <h3>{experience.companyName}</h3>
                <p>
                  {experience.positionTitle} from {experience.startDate} to{" "}
                  {experience.endDate}
                </p>
              </div>
              <div className="item-actions">
                <button
                  className="btn-edit"
                  onClick={() => editExperience(experience.id)}
                  title="Edit"
                >
                  ✎
                </button>
                <button
                  className="btn-delete"
                  onClick={() => deleteExperience(experience.id)}
                  title="Delete"
                >
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
            <label>Company Name*</label>
            <input
              type="text"
              name="companyName"
              onChange={updateExperience}
              value={experienceInfo.companyName}
              placeholder="e.g. Paystack"
            />
          </div>

          <div className="form-group">
            <label>Position Title*</label>
            <input
              type="text"
              name="positionTitle"
              onChange={updateExperience}
              value={experienceInfo.positionTitle}
              placeholder="e.g. Junior Developer"
            />
          </div>

          <div className="form-group">
            <label>Main Responsibilities (optional)</label>

            <textarea
              name="mainResponsibilities"
              rows="4"
              onChange={updateExperience}
              value={experienceInfo.mainResponsibilities}
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

          <div
            style={{ display: "flex", gap: "20px" }}
            className="date-arranger"
          >
            <div className="form-group" style={{ flex: 1 }}>
              <label>Start Date*</label>
              <input
                type="date"
                name="startDate"
                onChange={updateExperience}
                value={experienceInfo.startDate}
              />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>End Date (optional)</label>
              <input
                type="date"
                name="endDate"
                onChange={updateExperience}
                // value={
                //   experienceInfo.endDate !== "Present" && experienceInfo.endDate
                // }
              />
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
              {cvInfo.experiences.some((exp) => exp.id === experienceInfo.id)
                ? "+ Update Experience"
                : "+ Add Experience"}
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

  const LinksForm = (
    <div className="form-step">
      <h2>Step 4: Social Links (optional)</h2>
      <p style={{ marginBottom: "20px", color: "#666" }}>
        Add links to your portfolio, LinkedIn, or GitHub.
      </p>

      {/* --- LIST OF ADDED LINKS --- */}
      <div className="items-list">
        {cvInfo.links.map((link) => (
          <div className="item-card" key={link.id}>
            <div className="item-info">
              <h3>{link.label}</h3>
              <p style={{ fontSize: "0.9rem", color: "#666" }}>{link.url}</p>
            </div>
            <div className="item-actions">
              <button
                className="btn-edit"
                onClick={() => editLink(link.id)}
                title="Edit"
              >
                ✎
              </button>
              <button
                className="btn-delete"
                onClick={() => deleteLink(link.id)}
                title="Delete"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* --- INPUT FORM --- */}
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
          <h4 style={{ marginBottom: "10px", color: "#333" }}>Add New Link</h4>

          <div className="form-group">
            <label>Site Name*</label>
            <input
              type="text"
              name="label"
              value={linkInfo.label}
              onChange={updateLink}
              placeholder="e.g. LinkedIn, GitHub, Portfolio"
            />
          </div>

          <div className="form-group">
            <label>URL*</label>
            <input
              type="url"
              name="url"
              value={linkInfo.url}
              onChange={updateLink}
              placeholder="e.g. https://linkedin.com/in/john-doe"
            />
          </div>

          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button
              className="btn-save"
              type="button" // Important: type="button" so it doesn't submit the whole form
              style={{
                background: "#2563eb",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "600",
              }}
              onClick={addLinkToCv}
            >
              {cvInfo.links.some((link) => link.id === linkInfo.id)
                ? "+ Update Link"
                : "+ Add New Link"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="wizard-container">
      <ErrorToast message={errorMessage} onClose={() => setErrorMessage("")} />
      <form
        id="cv-form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        {step === 1 && GeneralInfo}
        {step === 2 && EducationForm}
        {step === 3 && ExperienceForm}
        {step === 4 && LinksForm}
      </form>

      <div className="wizard-footer">
        <button type="button" onClick={prevStep} className="btn-back">
          Back
        </button>

        {step < 4 ? (
          <button type="button" onClick={nextStep} className="btn-next">
            Next Step &rarr;
          </button>
        ) : (
          <button
            type="submit"
            form="cv-form"
            onClick={(e) => {
              e.preventDefault();
              if (cvInfo.fullName && cvInfo.email && cvInfo.phoneNo) {
                onBuild();
              } else {
                setErrorMessage("Please fill in all required fields");
              }
            }}
            className="btn-submit"
          >
            Build CV 🚀
          </button>
        )}
      </div>
    </div>
  );
}

export default CVForm;
