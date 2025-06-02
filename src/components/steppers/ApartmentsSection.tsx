import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Minus, Plus, HelpCircle } from "lucide-react";

export const ApartmentType = {
  Needs: "need_models",
  Has: "has_models",
} as const;

export type ApartmentType = (typeof ApartmentType)[keyof typeof ApartmentType];

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

export default function ApartmentsSection() {
  const [averageRooms, setAverageRooms] = useState<number>(1);
  const [uniqueApartments, setUniqueApartments] = useState<number>(1);
  const [has3DModels, setHas3DModels] = useState<ApartmentType | null>(null);
  const [overallApartments, setOverallApartments] = useState<number>(1);

  const handle3DModelsChange = (value: ApartmentType) => {
    setHas3DModels(value);
    if (value === ApartmentType.Has) {
      setOverallApartments(1);
      setUniqueApartments(1);
      setAverageRooms(1);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-10">
      <h1 className="text-4xl font-bold text-white tracking-tight">
        Apartments
      </h1>

      <div className="flex flex-col space-y-1">
        <div className="bg-[#1c1c1c] backdrop-blur-sm p-3 sm:p-6 rounded-md space-y-4">
          <h2 className="font-bold text-white text-md">
            Do you need 3D representations of apartments?
          </h2>
          <div className="flex flex-col space-y-1">
            <RadioCard
              label="Yes, I need 3D visualizations of the apartments"
              selected={has3DModels === ApartmentType.Needs}
              onClick={() => handle3DModelsChange(ApartmentType.Needs)}
            />
            <RadioCard
              label="No, I don't need 3D visualizations of apartments"
              selected={has3DModels === ApartmentType.Has}
              onClick={() => handle3DModelsChange(ApartmentType.Has)}
            />
          </div>
        </div>
        {has3DModels === ApartmentType.Needs && (
          <div className="flex flex-col space-y-1">
            <ConfigItem
              label="Overall number of apartments"
              value={overallApartments}
              onChange={(value) => {
                setOverallApartments(value);
                if (value < uniqueApartments) {
                  setUniqueApartments(value);
                }
              }}
              tooltip="Total number of apartments in the building"
              maxValue={100} // Arbitrary max limit
            />
            <ConfigItem
              label="Number of unique apartments"
              value={uniqueApartments}
              onChange={setUniqueApartments}
              tooltip="Number of different apartment layouts (must be less than or equal to overall apartments)"
              maxValue={overallApartments}
            />
            <ConfigItem
              label="Average number of rooms per apartment"
              value={averageRooms}
              onChange={setAverageRooms}
              tooltip="Average room count per apartment unit (e.g., living room, bedrooms)"
              maxValue={10} // Reasonable max for rooms
            />
          </div>
        )}
      </div>
    </div>
  );
}
