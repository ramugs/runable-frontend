import { useState } from "react";
import WebsiteEditor from "../components/WebsiteEditor";
import Header from "../components/header";

export default function App() {
  const [componentId, setComponentId] = useState("");

  const handleSave = (updatedHTML, id) => {
    console.log(updatedHTML);
    console.log(id);
  };

  return (
    <>
      <Header />
      <div className="">
        <WebsiteEditor onIdCreated={setComponentId} onSave={handleSave} />

        {/* <body>
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
              <img
                src="https://via.placeholder.com/150x200?text=Book+1"
                alt="Book 1"
                style="width: 100%; height: auto; margin-bottom: 1rem;"
              />
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
              <img
                src="https://via.placeholder.com/150x200?text=Book+2"
                alt="Book 2"
                style="width: 100%; height: auto; margin-bottom: 1rem;"
              />
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
              <img
                src="https://via.placeholder.com/150x200?text=Book+3"
                alt="Book 3"
                style="width: 100%; height: auto; margin-bottom: 1rem;"
              />
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
      </body> */}
      </div>
    </>
  );
}
