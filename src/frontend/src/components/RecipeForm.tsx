import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import PhotoAssetPicker from './PhotoAssetPicker';
import { Category, Cuisine } from '../backend';

interface RecipeFormData {
  titleEn: string;
  titleHi: string;
  descriptionEn: string;
  descriptionHi: string;
  ingredientsEn: string;
  ingredientsHi: string;
  stepsEn: string;
  stepsHi: string;
  category: string;
  cuisine: string;
  prepTimeMinutes: string;
  cookTimeMinutes: string;
  servings: string;
  photoAssetPath: string;
}

interface RecipeFormProps {
  onSubmit: (data: RecipeFormData) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export default function RecipeForm({ onSubmit, onCancel, isSubmitting }: RecipeFormProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<RecipeFormData>({
    titleEn: '',
    titleHi: '',
    descriptionEn: '',
    descriptionHi: '',
    ingredientsEn: '',
    ingredientsHi: '',
    stepsEn: '',
    stepsHi: '',
    category: '',
    cuisine: '',
    prepTimeMinutes: '',
    cookTimeMinutes: '',
    servings: '',
    photoAssetPath: '/assets/generated/recipe-samosa.dim_1200x800.png',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.titleEn || !formData.titleHi || !formData.category || !formData.cuisine || !formData.photoAssetPath) {
      return;
    }
    onSubmit(formData);
  };

  const categories = Object.keys(Category);
  const cuisines = Object.keys(Cuisine);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">English</h3>
          <div className="space-y-2">
            <Label htmlFor="titleEn">{t('titleEn')} *</Label>
            <Input
              id="titleEn"
              value={formData.titleEn}
              onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="descriptionEn">{t('descriptionEn')}</Label>
            <Textarea
              id="descriptionEn"
              value={formData.descriptionEn}
              onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ingredientsEn">{t('ingredientsEn')}</Label>
            <Textarea
              id="ingredientsEn"
              value={formData.ingredientsEn}
              onChange={(e) => setFormData({ ...formData, ingredientsEn: e.target.value })}
              rows={5}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stepsEn">{t('stepsEn')}</Label>
            <Textarea
              id="stepsEn"
              value={formData.stepsEn}
              onChange={(e) => setFormData({ ...formData, stepsEn: e.target.value })}
              rows={5}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">हिंदी</h3>
          <div className="space-y-2">
            <Label htmlFor="titleHi">{t('titleHi')} *</Label>
            <Input
              id="titleHi"
              value={formData.titleHi}
              onChange={(e) => setFormData({ ...formData, titleHi: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="descriptionHi">{t('descriptionHi')}</Label>
            <Textarea
              id="descriptionHi"
              value={formData.descriptionHi}
              onChange={(e) => setFormData({ ...formData, descriptionHi: e.target.value })}
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ingredientsHi">{t('ingredientsHi')}</Label>
            <Textarea
              id="ingredientsHi"
              value={formData.ingredientsHi}
              onChange={(e) => setFormData({ ...formData, ingredientsHi: e.target.value })}
              rows={5}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stepsHi">{t('stepsHi')}</Label>
            <Textarea
              id="stepsHi"
              value={formData.stepsHi}
              onChange={(e) => setFormData({ ...formData, stepsHi: e.target.value })}
              rows={5}
            />
          </div>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">{t('category')} *</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger id="category">
              <SelectValue placeholder={t('selectCategory')} />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {t(cat)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="cuisine">{t('cuisine')} *</Label>
          <Select value={formData.cuisine} onValueChange={(value) => setFormData({ ...formData, cuisine: value })}>
            <SelectTrigger id="cuisine">
              <SelectValue placeholder={t('selectCuisine')} />
            </SelectTrigger>
            <SelectContent>
              {cuisines.map((cui) => (
                <SelectItem key={cui} value={cui}>
                  {t(cui)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="prepTime">{t('prepTime')} ({t('minutes')})</Label>
          <Input
            id="prepTime"
            type="number"
            min="0"
            value={formData.prepTimeMinutes}
            onChange={(e) => setFormData({ ...formData, prepTimeMinutes: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cookTime">{t('cookTime')} ({t('minutes')})</Label>
          <Input
            id="cookTime"
            type="number"
            min="0"
            value={formData.cookTimeMinutes}
            onChange={(e) => setFormData({ ...formData, cookTimeMinutes: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="servings">{t('servings')}</Label>
          <Input
            id="servings"
            type="number"
            min="1"
            value={formData.servings}
            onChange={(e) => setFormData({ ...formData, servings: e.target.value })}
          />
        </div>
      </div>

      <PhotoAssetPicker
        value={formData.photoAssetPath}
        onChange={(value) => setFormData({ ...formData, photoAssetPath: value })}
      />

      <div className="flex gap-4 justify-end">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          {t('cancel')}
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? t('loading') : t('submit')}
        </Button>
      </div>
    </form>
  );
}
