import React, { useState } from "react";
import { RecipeStep } from "../typings/api";

interface StepFormProps {
  onStepsChange: (steps: RecipeStep[]) => void;
}

export const StepForm = ({ onStepsChange }: StepFormProps) => {
  const [steps, setSteps] = useState<RecipeStep[]>([]);

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

  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <div key={index} className="p-4 border rounded shadow-sm">
          <span className="block font-medium mb-2">Passo {step.order}</span>
          <textarea
            className="w-full p-2 border rounded shadow-sm"
            placeholder="Descrição do passo"
            value={step.description}
            onChange={(e) => handleChange(index, e.target.value)}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={addStep}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Adicionar Passo
      </button>
    </div>
  );
};