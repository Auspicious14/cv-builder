import Link from "next/link";
import { useRouter } from "next/router";
import {
  FiMoon,
  FiSun,
  FiUser,
  FiFileText,
  FiBriefcase,
  FiAward,
  FiBook,
} from "react-icons/fi";
import { useTheme } from "../../styles/theme";

const navigation = [
  { name: "Personal Info", href: "/personalinfo", icon: FiUser },
  { name: "Experience", href: "/experience", icon: FiBriefcase },
  { name: "Education", href: "/academy", icon: FiBook },
  { name: "Certificates", href: "/certificate", icon: FiAward },
  { name: "Skills", href: "/skill", icon: FiFileText },
];

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-dark-card border-r border-gray-200 dark:border-dark-border">
        <div className="h-full px-3 py-4 overflow-y-auto">
          <Link href="/" className="flex items-center mb-5 px-2">
            <span className="self-center text-2xl font-semibold font-display text-primary-600 dark:text-primary-400">
              CV Builder
            </span>
          </Link>
          <ul className="space-y-2 font-medium">
            {navigation.map((item) => {
              const isActive = router.pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group transition-colors duration-200 ${
                      isActive
                        ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
                        : "text-gray-900 dark:text-gray-300"
                    }`}
                  >
                    <item.icon className="w-5 h-5 transition duration-75" />
                    <span className="ml-3">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1">
        <header className="bg-white dark:bg-dark-card border-b border-gray-200 dark:border-dark-border px-6 py-4">
          <div className="flex justify-end">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? (
                <FiSun className="w-5 h-5" />
              ) : (
                <FiMoon className="w-5 h-5" />
              )}
            </button>
          </div>
        </header>

        <main className="p-6">
          <div className="max-w-7xl mx-auto animate-fade-in">{children}</div>
        </main>
      </div>
    </div>
  );
};
