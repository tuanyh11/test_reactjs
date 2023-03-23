import { useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { pdfFromReact } from "generate-pdf-from-react-html";
import i18next from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import { useReactToPrint } from "react-to-print";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const vietnameseFont = {
  "Arial Unicode MS": {
    normal: "ARIALUNI.ttf",
    bold: "ARIALUNI-Bold.ttf",
    italics: "ARIALUNI-Italic.ttf",
    bolditalics: "ARIALUNI-BoldItalic.ttf",
  },
};

pdfMake.fonts = {
  ...pdfMake.fonts,
  ...vietnameseFont,
};

const data = {
  "PRODUCT NAME": "TÊN SẢN PHẨM",
  IMAGE: "HÌNH ẢNH",
  COLOR: "MÀU SẮC",
  CATEGORY: "DANH MỤC",
  PRICE: "GIÁ",
  ACTION: "HÀNH ĐỘNG",
  'Apple MacBook Pro 17"': 'Apple MacBook Pro 17"',
  Silver: "Bạc",
  Laptop: "Laptop",
  $2999: "$2999",
  Edit: "Chỉnh sửa",
};

i18next.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  resources: {
    en: {
      translation: {
        // English translation keys and values go here
      },
    },
    vn: {
      translation: data,
    },
    // Add more languages and translations as needed
  },
});

const App = () => {
  const printDocument = () => {
    const input = document.getElementById("divToPrint");
    html2canvas(input, { useCORS: true, dpi: 300 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      console.log(imgData);
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("html2canvas.pdf");
    });
  };

  function handleLanguageChange(event) {
    i18next.changeLanguage(event.target.value);
  }

  const { t } = useTranslation();

  const [file, setFile] = useState(null);

  return (
    <div className="App max-w-[1200px] mx-auto">
      <div className="mt-4">
        <div className="my-5 flex items-center justify-between">
          <button
            onClick={printDocument}
            type="button"
            className="py-2.5 w-3/12 px-5  text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Download With HTML2canvas
          </button>

          <button
             onClick={() =>
              pdfFromReact("#divToPrint", "generate-pdf-from-react-html", "p", true, false)
            }
            type="button"
            className="py-2.5 w-3/12 px-5  text-sm  font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Download with generate-pdf-from-react-html
          </button>
         
          <select
            id="countries"
            onChange={handleLanguageChange}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Choose Your Languages</option>
            <option value="vn">Vietnamese</option>
            <option value="en">English</option>
          </select>
        </div>
        <div id="divToPrint" className="mt4">
          <div className="mt4 test">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 billing">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-all"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label for="checkbox-all" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    {t("PRODUCT NAME")}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    {t("IMAGE")}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    {t("COLOR")}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    {t("CATEGORY")}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    {t("PRICE")}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    {t("ACTION")}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-1"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label for="checkbox-table-1" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </td>

                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Apple MacBook Pro 17"
                  </th>
                  <td className="p-4">
                    <div className="w-[100px] h-[100px] ">
                      <img
                        src={file}
                        alt=""
                        className="w-full h-full object-cover  "
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">Silver</td>
                  <td className="px-6 py-4">Laptop</td>
                  <td className="px-6 py-4">$2999</td>

                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <form className="mt-4 shadow-xl p-10">
            <label className="block">
              <span className="sr-only">Choose profile photo</span>
              <input
                onChange={(e) =>
                  setFile(URL.createObjectURL(e.target.files[0] || ""))
                }
                type="file"
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-500 file:text-white
                  hover:file:bg-blue-600
                "
              />
            </label>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
