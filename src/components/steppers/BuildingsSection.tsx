import { Icon, IconOne, IconTwo, IconThree } from "../../assets/icons";
import { twMerge } from "tailwind-merge";
import { Minus, Plus, HelpCircle } from "lucide-react";
import { useCalculator } from "../../context/CalculatorContext";

type InvestmentType =
  | "single_house"
  | "multiple_house"
  | "single_apartment"
  | "multiple_apartment";

const investmentTypes = [
  {
    value: "single_house" as InvestmentType,
    label: "Single houses",
    icon: <Icon className="size-25" />,
  },
  {
    value: "multiple_house" as InvestmentType,
    label: "Multiple houses",
    icon: <IconOne className="size-25" />,
  },
  {
    value: "single_apartment" as InvestmentType,
    label: "Single apartment building",
    icon: <IconTwo className="size-25" />,
  },
  {
    value: "multiple_apartment" as InvestmentType,
    label: "Multiple apartment buildings",
    icon: <IconThree className="size-25" />,
  },
];

const documentationTypes = [
  {
    value: "plans_materials",
    label: "2D plans & materials examples",
  },
  {
    value: "plans_visualizations",
    label: "2D plans & visualizations",
  },
];

const SelectableCard = ({
  icon,
  label,
  selected,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  selected: boolean;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick()}
    className={twMerge(
      "w-full sm:max-w-sm h-32 flex justify-center space-x-10 p-4 rounded-lg border relative cursor-pointer",
      selected
        ? "border-white/30 bg-white/10"
        : "border-white/10 hover:border-white/30 focus:ring-2 "
    )}
    role="radio"
    aria-checked={selected}
    tabIndex={0}
  >
    <div
      className={twMerge(
        "absolute left-4 top-4 h-5 w-5 rounded-full flex items-center justify-center",
        selected ? "bg-white" : "bg-white/10"
      )}
    >
      <div
        className={twMerge("h-2.5 w-2.5 rounded-full", selected && "bg-black")}
      />
    </div>
    <div className="flex flex-col justify-center items-center text-center">
      {icon}
      <p className="text-sm text-white">{label}</p>
    </div>
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
  const handleDecrement = () => onChange(Math.max(0, value - 1));
  const handleIncrement = () =>
    onChange(maxValue ? Math.min(maxValue, value + 1) : value + 1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value) || 0;
    if (newValue >= 0 && (maxValue === undefined || newValue <= maxValue)) {
      onChange(newValue);
    }
  };

  return (
    <div className="flex items-center justify-between bg-[#1c1c1c] backdrop-blur-sm p-6 rounded-md">
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

export default function BuildingsSection() {
  const {
    selectedInvestment,
    setSelectedInvestment,
    hasBuildingModels,
    setHasBuildingModels,
    amenities,
    setAmenities,
    overallBuildings,
    setOverallBuildings,
    uniqueBuildings,
    setUniqueBuildings,
    documentationType,
    setDocumentationType,
  } = useCalculator();

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-10">
      <h1 className="text-4xl font-bold text-white tracking-tight">
        Buildings
      </h1>

      <div className="flex flex-col space-y-1">
        <div className="bg-[#1c1c1c] backdrop-blur-sm p-3 sm:p-6 rounded-md space-y-4">
          <h2 className="font-bold text-white text-md">
            Select investment type
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {investmentTypes.map((item) => (
              <SelectableCard
                key={item.value}
                icon={item.icon}
                label={item.label}
                selected={selectedInvestment === item.value}
                onClick={() => setSelectedInvestment(item.value)}
              />
            ))}
          </div>
        </div>

        {(selectedInvestment === "multiple_house" ||
          selectedInvestment === "multiple_apartment") && (
          <div className="flex flex-col space-y-1">
            <ConfigItem
              label="Overall number of buildings"
              value={overallBuildings}
              onChange={setOverallBuildings}
              tooltip="Total number of buildings in the project"
              maxValue={100}
            />
            <ConfigItem
              label="Number of unique buildings"
              value={uniqueBuildings}
              onChange={setUniqueBuildings}
              tooltip="Number of different building layouts (must be less than or equal to overall buildings)"
              maxValue={overallBuildings}
            />
          </div>
        )}

        <div className="flex flex-col space-y-1">
          <div className="bg-[#1c1c1c] backdrop-blur-sm p-3 sm:p-6 rounded-md space-y-4">
            <h2 className="font-bold text-white text-md">
              Do you have 3D models of your buildings?
            </h2>
            <div className="space-y-1">
              <RadioCard
                label="Yes, I have 3D models of the building"
                selected={hasBuildingModels === true}
                onClick={() => setHasBuildingModels(true)}
              />
              <RadioCard
                label="No, I need to create 3D models from the ground up"
                selected={hasBuildingModels === false}
                onClick={() => setHasBuildingModels(false)}
              />
            </div>
          </div>

          {hasBuildingModels !== null && (
            <div className="bg-[#1c1c1c] backdrop-blur-sm p-6 rounded-md space-y-4">
              <h2 className="font-bold text-white text-md">
                What kind of documentation do you use?
              </h2>
              <div className="space-y-2">
                {documentationTypes.map((doc) => (
                  <RadioCard
                    key={doc.value}
                    label={doc.label}
                    selected={documentationType === doc.value}
                    onClick={() => setDocumentationType(doc.value)}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="bg-[#1c1c1c] backdrop-blur-sm p-3 sm:p-6 rounded-md flex items-center justify-between">
            <div className="flex items-center gap-2">
              <p className="font-bold text-white text-md">
                Additional 3D amenities inside and outside the building
              </p>
              <div className="relative group">
                <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
                <span className="absolute hidden group-hover:block w-48 p-2 text-sm text-white bg-gray-800 rounded-md -top-10 left-6">
                  Includes features like furniture, landscaping, or other
                  enhancements
                </span>
              </div>
            </div>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={amenities}
                onChange={() => setAmenities(!amenities)}
                className="sr-only peer"
                aria-label="Additional 3D amenities"
              />
              <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-white/70 relative transition-all duration-200">
                <div
                  className={twMerge(
                    "absolute top-[2px] left-[2px] w-5 h-5 bg-white rounded-full transition-transform duration-200",
                    amenities ? "translate-x-5" : ""
                  )}
                />
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
