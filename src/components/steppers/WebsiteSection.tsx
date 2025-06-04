import { twMerge } from "tailwind-merge";
import { Minus, Plus, HelpCircle } from "lucide-react";
import { useCalculator } from "../../context/CalculatorContext";

interface ToggleSwitchProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  label,
  checked,
  onChange,
}) => (
  <div className="bg-[#1c1c1c] backdrop-blur-sm p-6 rounded-md flex items-center justify-between">
    <div>
      <p className="font-bold text-white text-md">{label}</p>
    </div>
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only peer"
        aria-label={label}
      />
      <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-white/70 relative transition-all duration-200">
        <div
          className={twMerge(
            "absolute top-[2px] left-[2px] w-5 h-5 bg-white rounded-full transition-transform duration-200",
            checked ? "translate-x-5" : ""
          )}
        />
      </div>
    </label>
  </div>
);

const RadioCard = ({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick()}
    className={twMerge(
      "flex items-center gap-4 p-4 rounded-lg border cursor-pointer border-white/10",
      selected && "border-white/30"
    )}
    role="radio"
    aria-checked={selected}
    tabIndex={0}
  >
    <div
      className={twMerge(
        "h-5 w-5 rounded-full flex items-center justify-center",
        selected ? "bg-white" : "bg-white/10"
      )}
    >
      <div
        className={twMerge("h-2.5 w-2.5 rounded-full", selected && "bg-black")}
      />
    </div>
    <span className="text-white tracking-wide">{label}</span>
  </div>
);

const ConfigItem = ({
  label,
  value,
  onChange,
  tooltip,
  maxValue,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  tooltip: string;
  maxValue?: number;
}) => {
  const handleDecrement = () => {
    if (value > 0) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (maxValue === undefined || value < maxValue) {
      onChange(value + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value) || 0;
    if (newValue >= 0 && (maxValue === undefined || newValue <= maxValue)) {
      onChange(newValue);
    }
  };

  return (
    <div className="flex items-center justify-between bg-[#1c1c1c] backdrop-blur-sm p-3 sm:p-6 rounded-md">
      <div className="flex items-center gap-2">
        <span className="text-white font-medium">{label}</span>
        <div className="relative group">
          <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
          <span className="absolute hidden group-hover:block w-48 p-2 text-sm text-white bg-gray-800 rounded-md -top-10 left-6">
            {tooltip}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={handleDecrement}
          className={twMerge(
            "w-7 h-7 rounded-md border flex items-center justify-center transition-colors",
            value <= 0
              ? "border-white/20 text-white/50 cursor-not-allowed"
              : "border-white/40 text-white hover:border-white/60"
          )}
          disabled={value <= 0}
          aria-label={`Decrease ${label.toLowerCase()}`}
        >
          <Minus className="w-4 h-4" />
        </button>
        <input
          type="number"
          value={value}
          onChange={handleInputChange}
          className="w-12 h-8 bg-transparent text-white text-center border-none outline-none font-medium"
          min="0"
          max={maxValue}
          aria-label={label}
        />
        <button
          onClick={handleIncrement}
          className={twMerge(
            "w-7 h-7 rounded-md border flex items-center justify-center transition-colors",
            maxValue !== undefined && value >= maxValue
              ? "border-white/20 text-white/50 cursor-not-allowed"
              : "border-white/40 text-white hover:border-white/60"
          )}
          disabled={maxValue !== undefined && value >= maxValue}
          aria-label={`Increase ${label.toLowerCase()}`}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default function WebsiteSection() {
  const {
    highlightAnimation,
    setHighlightAnimation,
    filteringSorting,
    setFilteringSorting,
    languages,
    setLanguages,
    heroAnimation,
    setHeroAnimation,
  } = useCalculator();

  return (
    <div className="max-w-3xl mx-auto space-y-0 py-10">
      <h1 className="text-4xl font-bold text-white mb-10 tracking-tight">
        Website
      </h1>

      <div className="flex flex-col space-y-1">
        <ToggleSwitch
          label="Highlight animation"
          checked={highlightAnimation}
          onChange={setHighlightAnimation}
        />
        <ToggleSwitch
          label="Filtering/Sorting"
          checked={filteringSorting}
          onChange={setFilteringSorting}
        />

        <div className="bg-[#1c1c1c] backdrop-blur-sm p-3 sm:p-6 rounded-md space-y-4">
          <h2 className="font-bold text-white text-md">
            Hero section animation
          </h2>
          <div className="space-y-2">
            <RadioCard
              label="Time lapse"
              selected={heroAnimation === "time_lapse"}
              onClick={() => setHeroAnimation("time_lapse")}
            />
            <RadioCard
              label="Close up"
              selected={heroAnimation === "close_up"}
              onClick={() => setHeroAnimation("close_up")}
            />
          </div>
        </div>

        <ConfigItem
          label="Languages"
          value={languages}
          onChange={setLanguages}
          tooltip="Number of languages supported on the website"
          maxValue={10} // Reasonable max for languages
        />
      </div>
    </div>
  );
}
