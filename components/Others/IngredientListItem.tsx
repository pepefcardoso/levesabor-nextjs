import { RecipeIngredient } from "../../typings/recipe";

interface IngredientListItemProps {
    ingredient: RecipeIngredient;
}

export const IngredientListItem: React.FC<IngredientListItemProps> = ({ ingredient }) => {
    return (
        <li>
            {ingredient.quantity} {ingredient.unit?.name} de {ingredient.name}
        </li>
    );
};