import React, { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { DownloadIcon } from "../assets/icons";
import PdfDocument from "./PdfDocument";
import { useCalculator } from "../context/CalculatorContext";

const ResultSection: React.FC = () => {
  const { totalPrice } = useCalculator();
  const [isGenerating, setIsGenerating] = useState(false);

  // Handle click to start generating
  const handleClick = () => {
    setIsGenerating(true);
  };

  return (
    <section className="bg-white/5 backdrop-blur-sm px-6 py-6 w-full">
      <div className="max-w-4xl mx-auto flex items-center justify-between relative">
        <div>
          <h3 className="text-white/40 text-2xl tracking-wide">Total</h3>
          <p className="text-2xl sm:text-5xl font-bold text-white">
            ${totalPrice.toFixed(2)}
          </p>
        </div>
        <div>
          {isGenerating ? (
            <button className="flex items-center space-x-2 bg-white/80 rounded-3xl px-6 py-3 cursor-not-allowed">
              <span className="font-bold text-xs text-black tracking-wide">
                Generating...
              </span>
            </button>
          ) : (
            <PDFDownloadLink
              document={<PdfDocument />}
              fileName={`investment-calculator-${new Date()
                .toISOString()
                .slice(0, 10)}.pdf`}
              className="flex items-center space-x-2 bg-white rounded-3xl px-6 py-3 cursor-pointer hover:bg-white/90 transition-colors"
              onClick={handleClick}
            >
              {({ loading }) => (
                <>
                  <DownloadIcon className="size-5 text-gray-400" />
                  <span className="font-bold text-xs text-black tracking-wide">
                    {loading ? "Generating..." : "DOWNLOAD RECEIPT"}
                  </span>
                </>
              )}
            </PDFDownloadLink>
          )}
        </div>
      </div>
    </section>
  );
};

export default ResultSection;
