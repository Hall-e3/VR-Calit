import {
  EnvironmentIcon,
  EnvironmentOneIcon,
  EnvironmentTwoIcon,
  EnvironmentThreeIcon,
  NeighborhoodIcon,
  NeighborhoodOneIcon,
  NeighborhoodTwoIcon,
  NeighborhoodThreeIcon,
} from "../../assets/icons";
import { twMerge } from "tailwind-merge";
import { useCalculator } from "../../context/CalculatorContext";

type EnvironmentTypeValue =
  | "basic"
  | "grass_trees"
  | "detailed"
  | "photogrammetry";

type NeighborhoodTypeValue =
  | "neighborhood-basic"
  | "neighborhood_grass_trees"
  | "neighborhood_detailed"
  | "neighborhood_photogrammetry";

type FileFormat =
  | "unreal_engine"
  | "3d_max_blender_corona"
  | "sketchfab_autocad"
  | null;

const plotOptions = [
  {
    value: "basic" as EnvironmentTypeValue,
    label: "Just basic plan & plot plan as a ground",
    icon: <EnvironmentIcon className="size-25" />,
  },
  {
    value: "grass_trees" as EnvironmentTypeValue,
    label: "Plot with grass, couple trees and basic neighborhood",
    icon: <EnvironmentOneIcon className="size-25" />,
  },
  {
    value: "detailed" as EnvironmentTypeValue,
    label:
      "Detailed plot with gardens, sidewalks, fences & detailed neighborhood blocks",
    icon: <EnvironmentTwoIcon className="size-25" />,
  },
  {
    value: "photogrammetry" as EnvironmentTypeValue,
    label: "Fully detailed environment based on photogrammetry",
    icon: <EnvironmentThreeIcon className="size-25" />,
  },
];

const neighborhoodOptions = [
  {
    value: "neighborhood_basic" as NeighborhoodTypeValue,
    label: "Just basic plan & plot plan as a ground",
    icon: <NeighborhoodIcon className="size-25" />,
  },
  {
    value: "neighborhood_grass_trees" as NeighborhoodTypeValue,
    label: "Plot with grass, couple trees and basic neighborhood",
    icon: <NeighborhoodOneIcon className="size-25" />,
  },
  {
    value: "neighborhood_detailed" as NeighborhoodTypeValue,
    label:
      "Detailed plot with gardens, sidewalks, fences & detailed neighborhood blocks",
    icon: <NeighborhoodTwoIcon className="size-25" />,
  },
  {
    value: "neighborhood_photogrammetry" as NeighborhoodTypeValue,
    label: "Fully detailed environment based on photogrammetry",
    icon: <NeighborhoodThreeIcon className="size-25" />,
  },
];

const fileFormats = [
  { value: "unreal_engine" as FileFormat, label: "Building in Unreal Engine" },
  {
    value: "3d_max_blender_corona" as FileFormat,
    label: "Building in 3D Max, Blender, Corona",
  },
  { value: "sketchfab_autocad" as FileFormat, label: "Sketchfab, AutoCAD" },
];

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
      "w-full max-w-sm h-32 flex justify-center space-x-10 p-4 rounded-lg border relative cursor-pointer",
      selected
        ? "border-white/20 bg-white/10"
        : "border-white/10 hover:border-white/30"
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

export default function EnvironmentSection() {
  const {
    hasEnvironmentModel,
    setHasEnvironmentModel,
    plotDetail,
    setPlotDetail,
    fileFormat,
    setFileFormat,
    neighborhoodDetail,
    setNeighborhoodDetail,
  } = useCalculator();

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-10">
      <h1 className="text-4xl font-bold text-white tracking-tight">
        Environment
      </h1>

      {/* 3D Model Selection */}
      <div className="bg-[#1c1c1c] backdrop-blur-sm p-3 sm:p-6 rounded-md space-y-4">
        <h2 className="font-bold text-white text-md">
          Do you have your own environment model?
        </h2>
        <div className="space-y-2">
          <RadioCard
            label="Yes, I have my own environment model that I want to use"
            selected={hasEnvironmentModel === true}
            onClick={() => setHasEnvironmentModel(true)}
          />
          <RadioCard
            label="No, I don't have a model and I want you to create one for me"
            selected={hasEnvironmentModel === false}
            onClick={() => setHasEnvironmentModel(false)}
          />
        </div>
      </div>

      {/* If they have models, ask format */}
      {hasEnvironmentModel && (
        <div className="bg-[#1c1c1c] backdrop-blur-sm p-3 sm:p-6 rounded-md space-y-4">
          <h2 className="font-bold text-white text-md">
            Select the file format used for your 3D models
          </h2>
          <div className="space-y-2">
            {fileFormats.map((option) => (
              <RadioCard
                key={option.value}
                label={option.label}
                selected={fileFormat === option.value}
                onClick={() => setFileFormat(option.value)}
              />
            ))}
          </div>
        </div>
      )}

      {/* If they don't have models, ask how detailed */}
      {!hasEnvironmentModel && (
        <>
          <div className="bg-[#1c1c1c] backdrop-blur-sm p-4 sm:p-8 rounded-md space-y-4">
            <h2 className="font-bold text-white text-md">
              How detailed should the **plot** be?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {plotOptions.map((item) => (
                <SelectableCard
                  key={item.value}
                  icon={item.icon}
                  label={item.label}
                  selected={plotDetail === item.value}
                  onClick={() => setPlotDetail(item.value)}
                />
              ))}
            </div>
          </div>

          <div className="bg-[#1c1c1c] backdrop-blur-sm p-4 sm:p-8 rounded-md space-y-4">
            <h2 className="font-bold text-white text-md">
              How detailed should the **neighborhood** be?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {neighborhoodOptions.map((item) => (
                <SelectableCard
                  key={item.value}
                  icon={item.icon}
                  label={item.label}
                  selected={neighborhoodDetail === item.value}
                  onClick={() => setNeighborhoodDetail(item.value)}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
