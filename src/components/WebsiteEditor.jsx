import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { userStoreData } from "../store/userData";
import { componentStoreData } from "../store/componentData";
import { useQuery } from "@tanstack/react-query";
import { baseURL } from "../config/api";

const WebsiteEditor = ({ onIdCreated, onSave }) => {
  const [selectedEl, setSelectedEl] = useState(null);
  const [htmlInput, setHtmlInput] = useState("");
  const [textValue, setTextValue] = useState("");
  const [colorValue, setColorValue] = useState("#000000");
  const [fontSizeValue, setFontSizeValue] = useState(16);
  const [fontFamilyValue, setFontFamilyValue] = useState("Arial");
  const [isBold, setIsBold] = useState(false);
  const [paddingValue, setPaddingValue] = useState(0);
  const [marginValue, setMarginValue] = useState(0);
  const [borderWidthValue, setBorderWidthValue] = useState(0);
  const [borderRadiusValue, setBorderRadiusValue] = useState(0);
  const [borderColorValue, setBorderColorValue] = useState("#000000");
  const [componentName, setComponentName] = useState("");
  const { userData } = userStoreData();
  const { componentData, setComponentData } = componentStoreData();
  const [loading, setLoading] = useState(false);

  const previewRef = useRef();

  const rgbToHex = (rgb) => {
    if (!rgb.startsWith("rgb")) return "#000000";
    const [r, g, b] = rgb.match(/\d+/g).map(Number);
    return `#${((1 << 24) + (r << 16) + (g << 8) + b)
      .toString(16)
      .slice(1)
      .toUpperCase()}`;
  };

  const handleSelect = (e) => {
    e.stopPropagation();
    if (selectedEl) {
      selectedEl.classList.remove("selected-outline");
    }
    const target = e.target;
    setSelectedEl(target);
    if (target) {
      target.classList.add("selected-outline");
      const styles = window.getComputedStyle(target);
      setTextValue(target.textContent || "");
      setColorValue(rgbToHex(styles.color));
      setFontSizeValue(parseInt(styles.fontSize, 10) || 16);
      setFontFamilyValue(
        styles.fontFamily.split(",")[0].replace(/['"]/g, "") || "Arial"
      );
      setIsBold(
        styles.fontWeight === "bold" || parseInt(styles.fontWeight, 10) >= 700
      );
      setPaddingValue(parseInt(styles.padding, 10) || 0);
      setMarginValue(parseInt(styles.margin, 10) || 0);
      setBorderWidthValue(parseInt(styles.borderWidth, 10) || 0);
      setBorderRadiusValue(parseInt(styles.borderRadius, 10) || 0);
      setBorderColorValue(rgbToHex(styles.borderColor));
    }
  };

  const handleChangeText = (value) => {
    if (selectedEl) selectedEl.textContent = value;
  };
  const handleChangeColor = (color) => {
    if (selectedEl) selectedEl.style.color = color;
  };
  const handleChangeFontSize = (size) => {
    if (selectedEl) selectedEl.style.fontSize = size + "px";
  };
  const handleChangeFontFamily = (family) => {
    if (selectedEl) selectedEl.style.fontFamily = family;
  };
  const handleToggleBold = () => {
    if (selectedEl) {
      const newWeight = isBold ? "normal" : "bold";
      selectedEl.style.fontWeight = newWeight;
      setIsBold(!isBold);
    }
  };

  const handleChangePadding = (value) => {
    if (selectedEl) selectedEl.style.padding = value + "px";
  };
  const handleChangeMargin = (value) => {
    if (selectedEl) selectedEl.style.margin = value + "px";
  };
  const handleChangeBorderWidth = (value) => {
    if (selectedEl) {
      selectedEl.style.borderWidth = value + "px";
      selectedEl.style.borderStyle = "solid";
    }
  };
  const handleChangeBorderRadius = (value) => {
    if (selectedEl) selectedEl.style.borderRadius = value + "px";
  };
  const handleChangeBorderColor = (color) => {
    if (selectedEl) {
      selectedEl.style.borderColor = color;
      selectedEl.style.borderStyle = "solid";
    }
  };

  const getComponentById = async (id) => {
    const res = await axios.get(`${baseURL}/component/${id}`);
    return res.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["component", componentData?.id],
    queryFn: () => getComponentById(componentData.id),
    enabled: !!componentData?.id,
  });

  useEffect(() => {
    if (data?.data?.html && previewRef.current) {
      previewRef.current.innerHTML = data.data.html;
      setComponentName(data.data.componentName);
    }
  }, [data]);

  const saveComponent = async () => {
    setLoading(true);
    if (selectedEl) {
      selectedEl.classList.remove("selected-outline");
    }
    if (!componentName.trim()) {
      alert("Please provide component name");
      setLoading(false);
      return;
    }
    let html;
    if (!componentData?.id) {
      if (!htmlInput.trim()) {
        alert("Please paste HTML first");
        setLoading(false);
        return;
      }

      html = htmlInput;
    } else if (previewRef.current) {
      html = previewRef.current.innerHTML;
    } else {
      return;
    }

    if (!componentData?.id && previewRef.current) {
      previewRef.current.innerHTML = html;
    }

    const method = componentData?.id ? "put" : "post";
    const url = componentData?.id
      ? `${baseURL}/component/${componentData?.id}`
      : `${baseURL}/component`;

    try {
      const { data } = await axios({
        method,
        url,
        headers: { "Content-Type": "application/json" },
        data: {
          html: html,
          user_id: userData?.id,
          componentName,
        },
      });
      setLoading(false);

      if (!componentData?.id) {
        setComponentData({
          componentName: data?.data?.componentName,
          id: data?.data?._id,
        });
        if (onIdCreated) onIdCreated(data.id);

        onSave(html, data.id);
      } else {
        onSave(html, componentData?.id);
      }
    } catch (err) {
      setLoading(false);
      console.error("Error saving component:", err);
    }
  };
  return (
    <div className="flex">
      <div className="w-64 p-4 border-r space-y-3 text-white h-[calc(100vh-65px)] overflow-y-auto bg-black">
        {!componentData?.id && (
          <textarea
            placeholder="Paste the component HTML here"
            value={htmlInput}
            onChange={(e) => setHtmlInput(e.target.value)}
            className="border rounded-lg p-1 w-full h-40"
          />
        )}
        <div>
          <label>Component Name</label>
          <input
            type="text"
            placeholder="Component name"
            value={componentName}
            onChange={(e) => {
              setComponentName(e.target.value);
            }}
            className="border rounded-lg p-1 px-2 w-full mt-1"
          />
        </div>

        <div>
          <label>Text Edit</label>
          <input
            type="text"
            placeholder="Edit text"
            value={textValue}
            onChange={(e) => {
              setTextValue(e.target.value);
              handleChangeText(e.target.value);
            }}
            disabled={!selectedEl}
            className="border rounded-lg p-1 px-2 w-full mt-1"
          />
        </div>

        <div className="flex items-center">
          <label>Color:</label>
          <input
            type="color"
            value={colorValue}
            onChange={(e) => {
              setColorValue(e.target.value);
              handleChangeColor(e.target.value);
            }}
            disabled={!selectedEl}
          />
        </div>

        <div className="">
          <label>Font size</label>
          <input
            type="number"
            placeholder="Font size"
            value={fontSizeValue}
            onChange={(e) => {
              const size = parseInt(e.target.value, 10);
              setFontSizeValue(size);
              handleChangeFontSize(size);
            }}
            disabled={!selectedEl}
            className="border rounded-lg p-1 px-2 w-full mt-1"
          />
        </div>

        <div className="pt-1">
          <label>Font family</label>
          <select
            value={fontFamilyValue}
            onChange={(e) => {
              setFontFamilyValue(e.target.value);
              handleChangeFontFamily(e.target.value);
            }}
            disabled={!selectedEl}
            className="border rounded-lg p-1 px-2 w-full mt-1"
          >
            <option className="text-black" value="Arial">
              Arial
            </option>
            <option className="text-black" value="Helvetica">
              Helvetica
            </option>
            <option className="text-black" value="Times New Roman">
              Times New Roman
            </option>
            <option className="text-black" value="Courier">
              Courier
            </option>
            <option className="text-black" value="Verdana">
              Verdana
            </option>
            <option className="text-black" value="Georgia">
              Georgia
            </option>
            <option className="text-black" value="Palatino">
              Palatino
            </option>
            <option className="text-black" value="Garamond">
              Garamond
            </option>
            <option className="text-black" value="Bookman">
              Bookman
            </option>
            <option className="text-black" value="Comic Sans MS">
              Comic Sans MS
            </option>
            <option className="text-black" value="Trebuchet MS">
              Trebuchet MS
            </option>
            <option className="text-black" value="Arial Black">
              Arial Black
            </option>
            <option className="text-black" value="Impact">
              Impact
            </option>
          </select>
        </div>

        <button
          onClick={handleToggleBold}
          disabled={!selectedEl}
          className={`border rounded-lg px-3 py-1 ${
            isBold ? "bg-blue-200" : ""
          }`}
        >
          Bold
        </button>

        <div>
          <label>Padding</label>
          <input
            type="number"
            placeholder="Padding"
            value={paddingValue}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              setPaddingValue(val);
              handleChangePadding(val);
            }}
            disabled={!selectedEl}
            className="border rounded-lg p-1 px-2 w-full mt-1"
          />
        </div>

        <div>
          <label>Margin</label>
          <input
            type="number"
            placeholder="Margin"
            value={marginValue}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              setMarginValue(val);
              handleChangeMargin(val);
            }}
            disabled={!selectedEl}
            className="border rounded-lg p-1 px-2 w-full mt-1"
          />
        </div>

        <div>
          <label>Border width</label>
          <input
            type="number"
            placeholder="Border width"
            value={borderWidthValue}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              setBorderWidthValue(val);
              handleChangeBorderWidth(val);
            }}
            disabled={!selectedEl}
            className="border rounded-lg p-1 px-2 w-full mt-1"
          />
        </div>

        <div>
          <label>Border radius</label>
          <input
            type="number"
            placeholder="Border radius"
            value={borderRadiusValue}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              setBorderRadiusValue(val);
              handleChangeBorderRadius(val);
            }}
            disabled={!selectedEl}
            className="border rounded-lg p-1 px-2 w-full mt-1"
          />
        </div>

        <div className="flex items-center">
          <label>Border Color:</label>
          <input
            type="color"
            value={borderColorValue}
            onChange={(e) => {
              setBorderColorValue(e.target.value);
              handleChangeBorderColor(e.target.value);
            }}
            disabled={!selectedEl}
          />
        </div>

        <button
          onClick={saveComponent}
          disabled={loading}
          className={`${
            loading ? "bg-gray-500" : "bg-blue-500"
          }  rounded-lg text-white px-3 py-1 w-full cursor-pointer`}
        >
          {loading ? "loading..." : "Save"}
        </button>
      </div>

      {isLoading ? (
        <div className="flex w-full justify-center items-center min-h-[200px]">
          <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div
          ref={previewRef}
          className="flex-1 p-4 h-[calc(100vh-65px)] overflow-y-auto"
          onClick={(e) => handleSelect(e)}
        ></div>
      )}
    </div>
  );
};

export default WebsiteEditor;
