import { RecipeStep } from "../../typings/recipe";

interface StepListItemProps {
    step: RecipeStep;
    index: number;
}

export const StepListItem: React.FC<StepListItemProps> = ({ step, index }) => {
    return (
        <div className="flex items-start gap-4">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full">
                {index + 1}
            </div>
            <p className="text-gray-800">{step.description}</p>
        </div>
    );
};