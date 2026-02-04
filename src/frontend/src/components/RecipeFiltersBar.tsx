import { useLanguage } from '../i18n/LanguageProvider';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';
import { Category, Cuisine } from '../backend';

interface RecipeFiltersBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  selectedCuisine: string;
  onCuisineChange: (value: string) => void;
}

export default function RecipeFiltersBar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedCuisine,
  onCuisineChange,
}: RecipeFiltersBarProps) {
  const { t } = useLanguage();

  const categories = Object.keys(Category);
  const cuisines = Object.keys(Cuisine);

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder={t('searchPlaceholder')}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      <Select value={selectedCategory} onValueChange={onCategoryChange}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder={t('allCategories')} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t('allCategories')}</SelectItem>
          {categories.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {t(cat)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={selectedCuisine} onValueChange={onCuisineChange}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder={t('allCuisines')} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t('allCuisines')}</SelectItem>
          {cuisines.map((cui) => (
            <SelectItem key={cui} value={cui}>
              {t(cui)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
