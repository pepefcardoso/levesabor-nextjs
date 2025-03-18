import { RecipeStep } from "@/typings/recipe";
import { useState } from "react";
import CustomTextAreaInput from "../Inputs/CustomTextAreaInput";
import FilledButton from "../Buttons/FilledButton";
import { Typography } from "@/constants/typography";
import { iconColors, txtColors } from "@/constants/colors";
import clsx from "clsx";
import { FilledButtonHovers } from "@/typings/buttons";
import IconButton from "../Buttons/IconButton"; // Make sure the path is correct
import { FiTrash } from "react-icons/fi"; // Trash icon for delete

interface StepFormProps {
  onStepsChange: (steps: RecipeStep[]) => void;
  initialSteps?: RecipeStep[];
}

export const StepForm = ({
  onStepsChange,
  initialSteps = [],
}: StepFormProps) => {
  const [steps, setSteps] = useState<RecipeStep[]>(initialSteps);

  const addStep = () => {
    setSteps([
      ...steps,
      { id: "", order: steps.length + 1, description: "", recipe_id: "" },
    ]);
  };

  const handleChange = (index: number, value: string) => {
    const newSteps = [...steps];
    newSteps[index].description = value;
    setSteps(newSteps);
    onStepsChange(newSteps);
  };

  const handleDelete = (index: number) => {
    const newSteps = steps.filter((_, i) => i !== index);
    const updatedSteps = newSteps.map((step, idx) => ({
      ...step,
      order: idx + 1,
    }));
    setSteps(updatedSteps);
    onStepsChange(updatedSteps);
  };

  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <div
          key={index}
          className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className={clsx(Typography.Caption, txtColors.gray800, "block")}>
              Passo {step.order}
            </span>
            <IconButton
              onClick={() => handleDelete(index)}
              Icon={FiTrash}
              color={iconColors.red}
              hoverAnimation={FilledButtonHovers.opacity}
              size={20}
            />
          </div>
          <CustomTextAreaInput
            value={step.description}
            onChange={(e) => handleChange(index, e.target.value)}
            placeholder="Descrição do passo"
          />
        </div>
      ))}
      <FilledButton
        text="Adicionar Passo"
        onClick={addStep}
        className="px-8"
        hoverAnimation={FilledButtonHovers.opacity}
      />
    </div>
  );
};
