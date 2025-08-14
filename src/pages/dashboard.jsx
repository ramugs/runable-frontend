import { useQuery } from "@tanstack/react-query";
import Header from "../components/header";
import axios from "axios";
import { useNavigate } from "@tanstack/react-router";
import { componentStoreData } from "../store/componentData";
import { userStoreData } from "../store/userData";
import { baseURL } from "../config/api";

const Dashboard = () => {
  const navigate = useNavigate();
  const { userData } = userStoreData();
  const { setComponentData } = componentStoreData();

  const { data, isLoading } = useQuery({
    queryKey: ["components"],
    queryFn: async () => {
      const res = await axios.get(
        `${baseURL}/all-component/${userData?.id}`
      );
      return res.data;
    },
  });

  const handleNavigate = async (id, name) => {
    if (id && name) {
      await setComponentData({
        componentName: name,
        id: id,
      });
    } else {
      await setComponentData(null);
    }

    navigate({ to: "/webEditor" });
  };

  return (
    <>
      <Header />
      <div className="h-[calc(100vh-65px)] bg-black p-8">
        <div className="flex justify-center mb-8">
          <button
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            type="button"
            onClick={() => handleNavigate()}
          >
            Create a new component
          </button>
        </div>

        <h2 className="text-center text-xl font-semibold text-white mb-6">
          {data?.data?.length <= 0
            ? "There are no components available. Please create one to continue."
            : "Choose from existing components."}
        </h2>

        {isLoading ? (
          <div className="flex w-full justify-center items-center min-h-[200px]">
            <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {data?.data?.map((card) => (
                <div
                  key={card?._id}
                  className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
                  onClick={() => handleNavigate(card?._id, card?.componentName)}
                >
                  <h3 className="text-lg font-bold mb-2">
                    {card?.componentName}
                  </h3>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
