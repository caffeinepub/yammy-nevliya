import { useLanguage } from '../i18n/LanguageProvider';
import { Badge } from '@/components/ui/badge';
import { Clock, ChefHat, Users, Calendar } from 'lucide-react';
import type { Recipe } from '../backend';

interface RecipeMetadataProps {
  recipe: Recipe;
  variant?: 'card' | 'detail';
}

export default function RecipeMetadata({ recipe, variant = 'card' }: RecipeMetadataProps) {
  const { t } = useLanguage();

  const isDetail = variant === 'detail';

  return (
    <div className={`flex flex-wrap gap-${isDetail ? '4' : '3'} ${isDetail ? 'text-base' : 'text-sm'}`}>
      <div className="flex items-center gap-2">
        <Badge variant="secondary" className={isDetail ? 'text-base px-3 py-1' : ''}>
          {t(recipe.category)}
        </Badge>
        <Badge variant="outline" className={isDetail ? 'text-base px-3 py-1' : ''}>
          {t(recipe.cuisine)}
        </Badge>
      </div>
      <div className="flex items-center gap-1 text-muted-foreground">
        <Clock className={`h-${isDetail ? '5' : '4'} w-${isDetail ? '5' : '4'}`} />
        <span>
          {t('prepTime')}: {Number(recipe.prepTimeMinutes)} {t('minutes')}
        </span>
      </div>
      <div className="flex items-center gap-1 text-muted-foreground">
        <ChefHat className={`h-${isDetail ? '5' : '4'} w-${isDetail ? '5' : '4'}`} />
        <span>
          {t('cookTime')}: {Number(recipe.cookTimeMinutes)} {t('minutes')}
        </span>
      </div>
      <div className="flex items-center gap-1 text-muted-foreground">
        <Users className={`h-${isDetail ? '5' : '4'} w-${isDetail ? '5' : '4'}`} />
        <span>
          {t('servings')}: {Number(recipe.servings)}
        </span>
      </div>
    </div>
  );
}
