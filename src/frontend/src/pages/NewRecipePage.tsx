import { useNavigate } from '@tanstack/react-router';
import { useLanguage } from '../i18n/LanguageProvider';
import { useAddRecipe } from '../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import RecipeForm from '../components/RecipeForm';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { Category, Cuisine } from '../backend';

export default function NewRecipePage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const addRecipeMutation = useAddRecipe();

  const handleSubmit = async (formData: any) => {
    try {
      await addRecipeMutation.mutateAsync({
        titleEn: formData.titleEn,
        titleHi: formData.titleHi,
        descriptionEn: formData.descriptionEn,
        descriptionHi: formData.descriptionHi,
        ingredientsEn: formData.ingredientsEn.split('\n').filter((i: string) => i.trim()),
        ingredientsHi: formData.ingredientsHi.split('\n').filter((i: string) => i.trim()),
        stepsEn: formData.stepsEn.split('\n').filter((s: string) => s.trim()),
        stepsHi: formData.stepsHi.split('\n').filter((s: string) => s.trim()),
        cuisine: formData.cuisine as Cuisine,
        category: formData.category as Category,
        prepTimeMinutes: BigInt(formData.prepTimeMinutes || 0),
        cookTimeMinutes: BigInt(formData.cookTimeMinutes || 0),
        servings: BigInt(formData.servings || 1),
        photoAssetPath: formData.photoAssetPath,
      });
      toast.success(t('recipeCreated'));
      navigate({ to: '/' });
    } catch (error) {
      console.error('Error creating recipe:', error);
      toast.error(t('recipeError'));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" onClick={() => navigate({ to: '/' })} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t('backToExplore')}
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{t('createRecipe')}</CardTitle>
        </CardHeader>
        <CardContent>
          <RecipeForm
            onSubmit={handleSubmit}
            onCancel={() => navigate({ to: '/' })}
            isSubmitting={addRecipeMutation.isPending}
          />
        </CardContent>
      </Card>
    </div>
  );
}
