import { useQuery } from "@tanstack/react-query";
import Header from "../components/header";
import axios from "axios";
import { useNavigate } from "@tanstack/react-router";
import { componentStoreData } from "../store/componentData";
import { userStoreData } from "../store/userData";
import { baseURL } from "../config/api";
import { useState } from "react";

const componentData = [
  {
    label: "Example 1",
    value: `<body>
        <nav style="display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.5rem; background: linear-gradient(to right, #2d2d2d, #4f4f4f, #2d2d2d); color: white; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);">
          <div style="font-size: 1.25rem; font-weight: bold;">My Website</div>
          <div style="display: flex; gap: 1.5rem;">
            <a href="#" style="color: white; text-decoration: none;">
              Home
            </a>
            <a href="#" style="color: white; text-decoration: none;">
              About
            </a>
            <a href="#" style="color: white; text-decoration: none;">
              Services
            </a>
            <a href="#" style="color: white; text-decoration: none;">
              Contact
            </a>
          </div>
          <div>
            <button style="background-color: white; color: #2d2d2d; padding: 0.5rem 1rem; border: none; border-radius: 6px; cursor: pointer;">
              Sign In
            </button>
          </div>
        </nav>

        <section style="padding: 2rem; background-color: #f9f9f9; text-align: center;">
          <h2 style="font-size: 2rem; margin-bottom: 1rem;">Featured Books</h2>
          <div style="display: flex; justify-content: center; gap: 2rem; flex-wrap: wrap;">
            <div style="background-color: white; border: 1px solid #ddd; border-radius: 8px; padding: 1rem; width: 200px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
              <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem;">
                The Great Adventure
              </h3>
              <p style="color: #666; margin-bottom: 0.5rem;">
                Author: Jane Doe
              </p>
              <button style="background-color: #4CAF50; color: white; padding: 0.5rem 1rem; border: none; border-radius: 4px; cursor: pointer;">
                Buy Now
              </button>
            </div>
            <div style="background-color: white; border: 1px solid #ddd; border-radius: 8px; padding: 1rem; width: 200px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
              <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem;">
                Mystery of the Night
              </h3>
              <p style="color: #666; margin-bottom: 0.5rem;">
                Author: John Smith
              </p>
              <button style="background-color: #4CAF50; color: white; padding: 0.5rem 1rem; border: none; border-radius: 4px; cursor: pointer;">
                Buy Now
              </button>
            </div>
            <div style="background-color: white; border: 1px solid #ddd; border-radius: 8px; padding: 1rem; width: 200px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
              <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem;">
                Sci-Fi Worlds
              </h3>
              <p style="color: #666; margin-bottom: 0.5rem;">
                Author: Alex Johnson
              </p>
              <button style="background-color: #4CAF50; color: white; padding: 0.5rem 1rem; border: none; border-radius: 4px; cursor: pointer;">
                Buy Now
              </button>
            </div>
          </div>
        </section>

        <footer style="display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.5rem; background: linear-gradient(to right, #2d2d2d, #4f4f4f, #2d2d2d); color: white; box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.2);">
          <div style="font-size: 1rem;">
            &copy; 2025 My Website. All rights reserved.
          </div>
          <div style="display: flex; gap: 1.5rem;">
            <a href="#" style="color: white; text-decoration: none;">
              Privacy Policy
            </a>
            <a href="#" style="color: white; text-decoration: none;">
              Terms of Service
            </a>
            <a href="#" style="color: white; text-decoration: none;">
              Contact Us
            </a>
          </div>
          <div style="display: flex; gap: 1rem;">
            <a href="#" style="color: white; text-decoration: none;">
              Facebook
            </a>
            <a href="#" style="color: white; text-decoration: none;">
              Twitter
            </a>
            <a href="#" style="color: white; text-decoration: none;">
              Instagram
            </a>
          </div>
        </footer>
      </body>`,
  },
  {
    label: "Example 2",
    value: `<body style="margin: 0; font-family: Arial, sans-serif;">
  <nav style="display: flex; justify-content: space-between; align-items: center; padding: 1rem 2rem; background-color: #ffffff; border-bottom: 1px solid #ddd;">
    <div style="font-size: 1.5rem; font-weight: bold; color: #333;">BookStore</div>
    <div style="display: flex; gap: 1.5rem;">
      <a href="#" style="color: #333; text-decoration: none;">Home</a>
      <a href="#" style="color: #333; text-decoration: none;">Shop</a>
      <a href="#" style="color: #333; text-decoration: none;">Blog</a>
      <a href="#" style="color: #333; text-decoration: none;">Contact</a>
    </div>
    <button style="background-color: #ff7043; color: white; padding: 0.5rem 1rem; border: none; border-radius: 5px; cursor: pointer;">
      Login
    </button>
  </nav>

  <section style="padding: 2rem; background-color: #f5f5f5; text-align: center;">
    <h2 style="font-size: 2rem; margin-bottom: 2rem; color: #333;">Our Top Picks</h2>
    <div style="display: flex; justify-content: center; gap: 2rem; flex-wrap: wrap;">
      <div style="background-color: white; padding: 1rem; border-radius: 8px; border: 1px solid #ddd; width: 220px;">
        <h3 style="margin: 0.5rem 0;">Ocean Dreams</h3>
        <p style="color: #666;">By Mia Taylor</p>
        <button style="background-color: #ff7043; color: white; padding: 0.5rem; border: none; border-radius: 5px; cursor: pointer;">
          Buy
        </button>
      </div>
      <div style="background-color: white; padding: 1rem; border-radius: 8px; border: 1px solid #ddd; width: 220px;">
        <h3 style="margin: 0.5rem 0;">Hidden Forest</h3>
        <p style="color: #666;">By Liam Wood</p>
        <button style="background-color: #ff7043; color: white; padding: 0.5rem; border: none; border-radius: 5px; cursor: pointer;">
          Buy
        </button>
      </div>
      <div style="background-color: white; padding: 1rem; border-radius: 8px; border: 1px solid #ddd; width: 220px;">
        <h3 style="margin: 0.5rem 0;">Space Tales</h3>
        <p style="color: #666;">By Ethan Cole</p>
        <button style="background-color: #ff7043; color: white; padding: 0.5rem; border: none; border-radius: 5px; cursor: pointer;">
          Buy
        </button>
      </div>
    </div>
  </section>

  <footer style="background-color: #ffffff; padding: 1rem 2rem; border-top: 1px solid #ddd; display: flex; justify-content: space-between;">
    <p>&copy; 2025 BookStore. All rights reserved.</p>
    <div style="display: flex; gap: 1rem;">
      <a href="#" style="color: #333;">Privacy</a>
      <a href="#" style="color: #333;">Terms</a>
    </div>
  </footer>

</body>
`,
  },
  {
    label: "Example 3",
    value: `<body style="margin: 0; font-family: Arial, sans-serif; background-color: #121212; color: #f5f5f5;">
  <nav style="display: flex; justify-content: space-between; align-items: center; padding: 1rem 2rem; background: #1f1f1f;">
    <div style="font-size: 1.5rem; font-weight: bold; color: #4cafef;">DarkReads</div>
    <div style="display: flex; gap: 1.5rem;">
      <a href="#" style="color: #f5f5f5; text-decoration: none;">Home</a>
      <a href="#" style="color: #f5f5f5; text-decoration: none;">Genres</a>
      <a href="#" style="color: #f5f5f5; text-decoration: none;">Authors</a>
      <a href="#" style="color: #f5f5f5; text-decoration: none;">Contact</a>
    </div>
    <button style="background-color: #4cafef; color: #121212; padding: 0.5rem 1rem; border: none; border-radius: 5px; cursor: pointer;">
      Sign Up
    </button>
  </nav>

  <section style="padding: 2rem; text-align: center;">
    <h2 style="font-size: 2rem; margin-bottom: 2rem;">Best Sellers</h2>
    <div style="display: flex; justify-content: center; gap: 2rem; flex-wrap: wrap;">
      <div style="background-color: #1f1f1f; padding: 1rem; border-radius: 8px; width: 220px;">
        <h3 style="margin: 0.5rem 0;">Shadow City</h3>
        <p style="color: #ccc;">By Oliver Gray</p>
        <button style="background-color: #4cafef; color: #121212; padding: 0.5rem; border: none; border-radius: 5px; cursor: pointer;">
          Buy
        </button>
      </div>
      <div style="background-color: #1f1f1f; padding: 1rem; border-radius: 8px; width: 220px;">
        <h3 style="margin: 0.5rem 0;">Neon Streets</h3>
        <p style="color: #ccc;">By Ava Lee</p>
        <button style="background-color: #4cafef; color: #121212; padding: 0.5rem; border: none; border-radius: 5px; cursor: pointer;">
          Buy
        </button>
      </div>
      <div style="background-color: #1f1f1f; padding: 1rem; border-radius: 8px; width: 220px;">
        <h3 style="margin: 0.5rem 0;">Midnight Quest</h3>
        <p style="color: #ccc;">By Noah Black</p>
        <button style="background-color: #4cafef; color: #121212; padding: 0.5rem; border: none; border-radius: 5px; cursor: pointer;">
          Buy
        </button>
      </div>
    </div>
  </section>

  <footer style="background-color: #1f1f1f; padding: 1rem 2rem; display: flex; justify-content: space-between; border-top: 1px solid #333;">
    <p>&copy; 2025 DarkReads. All rights reserved.</p>
    <div style="display: flex; gap: 1rem;">
      <a href="#" style="color: #f5f5f5;">Privacy</a>
      <a href="#" style="color: #f5f5f5;">Terms</a>
    </div>
  </footer>

</body>
`,
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { userData } = userStoreData();
  const { setComponentData } = componentStoreData();

  const [copied, setCopied] = useState(null);

  const handleCopy = async (value, index) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(index);

      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ["components"],
    queryFn: async () => {
      const res = await axios.get(`${baseURL}/all-component/${userData?.id}`);
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
            : "Choose from existing components to edit."}
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

        <div className="text-center py-2 pt-5">
          <span className="text-white  text-xl font-semibold">
            Please copy these example components by clicking on it, paste them to create a new
            one, and then edit the component as needed.
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {componentData?.map((item, index) => (
            <div
              key={index}
              className="bg-gray-500 p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
              onClick={() => handleCopy(item.value, index)}
            >
              <h3 className="text-lg font-bold mb-2">{item.label}</h3>
              {copied === index && (
                <p className="text-green-600 text-sm mt-2">Copied!</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
