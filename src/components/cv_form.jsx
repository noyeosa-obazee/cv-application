import { useState } from "react";

function CVForm() {
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
        Where did you learn your skills?
      </p>

      <div className="form-group">
        <label>School / University Name</label>
        <input type="text" placeholder="e.g. UNIBEN" />
      </div>
      <div className="form-group">
        <label>Title of Study / Degree</label>
        <input type="text" placeholder="e.g. Bachelor of Laws (LLB)" />
      </div>
      <div className="form-group">
        <label>Date of Study</label>
        <input type="date" />
      </div>
    </div>
  );

  const Experience = (
    <div className="form-step">
      <h2>Step 3: Practical Experience</h2>
      <p style={{ marginBottom: "20px", color: "#666" }}>
        Tell us about your work history.
      </p>

      <div className="form-group">
        <label>Company Name</label>
        <input type="text" placeholder="e.g. Paystack" />
      </div>
      <div className="form-group">
        <label>Position Title</label>
        <input type="text" placeholder="e.g. Junior Frontend Developer" />
      </div>
      <div className="form-group">
        <label>Main Responsibilities</label>
        <textarea rows="4" placeholder="Describe what you did..." />
      </div>
      <div className="form-group">
        <label>Start Date</label>
        <input type="date" />
      </div>
      <div className="form-group">
        <label>End Date</label>
        <input type="date" />
      </div>
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
