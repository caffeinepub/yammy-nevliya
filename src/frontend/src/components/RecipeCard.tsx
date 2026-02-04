import { useNavigate } from '@tanstack/react-router';
import { useLanguage } from '../i18n/LanguageProvider';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users } from 'lucide-react';
import type { Recipe } from '../backend';

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const navigate = useNavigate();
  const { language, t } = useLanguage();

  const title = language === 'en' ? recipe.titleEn : recipe.titleHi;
  const description = language === 'en' ? recipe.descriptionEn : recipe.descriptionHi;
  const categoryKey = recipe.category;
  const cuisineKey = recipe.cuisine;

  return (
    <Card
      className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow group"
      onClick={() => navigate({ to: '/recipe/$recipeId', params: { recipeId: recipe.id.toString() } })}
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={recipe.photoAssetPath}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-1">{title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{description}</p>
        <div className="flex gap-2 flex-wrap">
          <Badge variant="secondary">{t(categoryKey)}</Badge>
          <Badge variant="outline">{t(cuisineKey)}</Badge>
        </div>
      </CardContent>
      <CardFooter className="px-4 pb-4 pt-0 flex gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>
            {Number(recipe.prepTimeMinutes) + Number(recipe.cookTimeMinutes)} {t('minutes')}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="h-4 w-4" />
          <span>{Number(recipe.servings)}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
