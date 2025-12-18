import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export function CVPreview({ info, onEdit }) {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `${info.fullName || "My_CV"}_Resume`,
  });

  return (
    <div className="preview-container">
      <div className="print-controls">
        <button className="btn-back" onClick={onEdit}>
          ← Edit Information
        </button>
        <button className="btn-download" onClick={handlePrint}>
          Download PDF ⬇
        </button>
      </div>

      <div ref={componentRef} className="cv-paper">
        {/* HEADER */}
        <header
          style={{
            borderBottom: "2px solid #333",
            paddingBottom: "20px",
            marginBottom: "30px",
          }}
        >
          <h1 className="cv-name">{info.fullName}</h1>
          <div
            style={{
              display: "flex",
              gap: "15px",
              marginTop: "10px",
              color: "#555",
              fontSize: "0.9rem",
              flexWrap: "wrap",
              fontWeight: "600",
              fontFamily: "Elms Sans",
              letterSpacing: "1px",
            }}
          >
            {info.email && <span>📧 {info.email}</span>}
            {info.phoneNo && <span>📞 {info.phoneNo}</span>}
            {/* {info.address && <span>📍 {info.address}</span>} */}
          </div>
        </header>

        {/* EDUCATION */}
        {info.educations.length > 0 && (
          <section style={{ marginBottom: "30px", fontFamily: "Elms Sans" }}>
            <h3 className="cv-heading">Education</h3>
            {info.educations.map((edu) => (
              <div key={edu.id} style={{ marginTop: "15px", color: "#555" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontWeight: "bold",
                  }}
                >
                  <span>School name: {edu.schoolName}</span>
                  <span>
                    Date: {edu.startDate} to {edu.endDate || "Present"}
                  </span>
                </div>
                <div style={{ fontWeight: "600" }}>Degree: {edu.degree}</div>
              </div>
            ))}
          </section>
        )}

        {/* EXPERIENCE */}
        {info.experiences.length > 0 && (
          <section style={{ marginBottom: "30px", fontFamily: "Elms Sans" }}>
            <h3 className="cv-heading">Experience</h3>
            {info.experiences.map((exp) => (
              <div key={exp.id} style={{ marginTop: "20px", color: "#555" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontWeight: "bold",
                  }}
                >
                  <span>Company: {exp.companyName}</span>
                  <span>
                    Date: {exp.startDate} to {exp.endDate || "Present"}
                  </span>
                </div>
                <div
                  style={{
                    fontWeight: "600",
                    marginBottom: "5px",
                  }}
                >
                  Role: {exp.positionTitle}
                </div>
                <p
                  style={{
                    fontWeight: "600",
                    whiteSpace: "pre-wrap",
                    fontSize: "0.95rem",
                    lineHeight: "1.5",
                  }}
                >
                  Description: {exp.mainResponsibilities}
                </p>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}

export default CVPreview;
