export default function Header() {
  const menuItems = [
    { label: "Home", url: "/" },
    { label: "demo", url: "/demo" },
    { label: "drum", url: "/drum" },
    { label: "Contact", url: "/contact-us" },
    { label: "events", url: "/events" },
    { label: "csr", url: "/csr" },
    { label: "customization", url: "/customization" },
    { label: "exhibit", url: "/exhibit" },
    { label: "reveal", url: "/reveal" },
    { label: "drag", url: "/drag" },
    { label: "policies", url: "/policies" },
    { label: "what-we-do", url: "/what-we-do" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-black/80 text-white shadow-md z-50 backdrop-blur">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <a href="/" className="text-xl font-bold">
          Arjiv Exports
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6">
          {menuItems.map((item) => (
            <a
              key={item.url}
              href={item.url}
              className="hover:text-gray-300"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Mobile Icon */}
        <button className="md:hidden text-2xl">☰</button>
      </nav>
    </header>
  );
}
