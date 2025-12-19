export function Header({ onStartBuild, cvData }) {
  const hasStarted =
    (cvData.fullName && cvData.fullName.trim() !== "") ||
    (cvData.email && cvData.email.trim() !== "") ||
    (cvData.phoneNo && cvData.phoneNo.trim() !== "");
  return (
    <header className="header">
      <div className="header-logo">CV Forge 🔨</div>
      <button className="btn-nav" onClick={onStartBuild}>
        {hasStarted ? "Update CV ✏️" : "Start Building +"}
      </button>
    </header>
  );
}
export default Header;
