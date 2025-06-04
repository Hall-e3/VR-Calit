import { DownloadIcon } from "../assets/icons";
import { useCalculator } from "../context/CalculatorContext";

export default function ResultSection() {
  const { totalPrice } = useCalculator();
  return (
    <section className="bg-white/5 backdrop-blur-sm px-6 py-6 w-full">
      <div className="max-w-4xl mx-auto flex items-center justify-between relative">
        <div>
          <h3 className="text-white/40 text-2xl tracking-wide">Total</h3>
          <p className="text-2xl sm:text-5xl font-bold text-white">
            ${totalPrice}
          </p>
        </div>
        <div>
          <button
            onClick={() => {}}
            className="flex items-center space-x-2 bg-white rounded-3xl px-6 py-3 cursor-pointer"
          >
            <DownloadIcon className="size-5 text-gray-400" />
            <p className="font-bold text-xs text-black tracking-wide">
              DOWNLOAD RESULT
            </p>
          </button>
        </div>
      </div>
    </section>
  );
}
