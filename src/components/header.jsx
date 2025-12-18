export function Header({ onStartBuild }) {
  return (
    <header className="header">
      <div className="header-logo">CV Forge 🔨</div>
      <button className="btn-nav" onClick={onStartBuild}>
        Start Building +
      </button>
    </header>
  );
}
export default Header;
