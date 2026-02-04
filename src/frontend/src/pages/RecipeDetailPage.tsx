import { useNavigate, useParams } from '@tanstack/react-router';
import { useLanguage } from '../i18n/LanguageProvider';
import { useGetRecipe } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import RecipeMetadata from '../components/RecipeMetadata';
import { ArrowLeft } from 'lucide-react';

export default function RecipeDetailPage() {
  const navigate = useNavigate();
  const { recipeId } = useParams({ from: '/recipe/$recipeId' });
  const { language, t } = useLanguage();
  const { data: recipe, isLoading } = useGetRecipe(BigInt(recipeId));

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-8 w-32 mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Skeleton className="h-96 w-full" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate({ to: '/' })}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('backToExplore')}
        </Button>
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">{t('noRecipes')}</p>
        </div>
      </div>
    );
  }

  const title = language === 'en' ? recipe.titleEn : recipe.titleHi;
  const description = language === 'en' ? recipe.descriptionEn : recipe.descriptionHi;
  const ingredients = language === 'en' ? recipe.ingredientsEn : recipe.ingredientsHi;
  const steps = language === 'en' ? recipe.stepsEn : recipe.stepsHi;

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" onClick={() => navigate({ to: '/' })} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t('backToExplore')}
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="aspect-[4/3] overflow-hidden rounded-lg">
          <img src={recipe.photoAssetPath} alt={title} className="w-full h-full object-cover" />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
            <p className="text-lg text-muted-foreground">{description}</p>
          </div>

          <Separator />

          <RecipeMetadata recipe={recipe} variant="detail" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>{t('ingredients')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('instructions')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-4">
              {steps.map((step, index) => (
                <li key={index} className="flex gap-3">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
