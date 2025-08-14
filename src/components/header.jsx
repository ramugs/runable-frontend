import { userStoreData } from "../store/userData";
import { useNavigate } from "@tanstack/react-router";

const Header = () => {
  const { userData } = userStoreData();
  const navigate = useNavigate;
  const logout = () => {
    localStorage.clear();
    window.location.reload();
    navigate({ to: "/log-in" });
  };
  return (
    <nav className="bg-black text-white h-[65px]">
      <div className="flex justify-between border-b border-gray-700 p-4">
        <div>
          <span className="bg-white text-black px-2 py-1 rounded-lg font-semibold">
            Web Editor - Ramu
          </span>
        </div>
        <div>
          <span className="mr-4">{userData?.userName}</span>
          <button
            type="button"
            onClick={logout}
            className="bg-white text-black px-2 py-1 rounded-lg font-semibold cursor-pointer"
          >
            Log out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
