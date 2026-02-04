import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageProvider';
import { useGetAllRecipes } from '../hooks/useQueries';
import RecipeCard from '../components/RecipeCard';
import RecipeFiltersBar from '../components/RecipeFiltersBar';
import { Skeleton } from '@/components/ui/skeleton';

export default function ExplorePage() {
  const { language, t } = useLanguage();
  const { data: recipes = [], isLoading } = useGetAllRecipes();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCuisine, setSelectedCuisine] = useState('all');

  const filteredRecipes = recipes.filter((recipe) => {
    const query = searchQuery.toLowerCase();
    const title = language === 'en' ? recipe.titleEn : recipe.titleHi;
    const description = language === 'en' ? recipe.descriptionEn : recipe.descriptionHi;
    const matchesSearch = !query || title.toLowerCase().includes(query) || description.toLowerCase().includes(query);
    const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory;
    const matchesCuisine = selectedCuisine === 'all' || recipe.cuisine === selectedCuisine;
    return matchesSearch && matchesCategory && matchesCuisine;
  });

  return (
    <div className="min-h-screen">
      <div
        className="relative bg-gradient-to-br from-primary/20 via-accent/10 to-background py-16 md:py-24"
        style={{
          backgroundImage: 'url(/assets/generated/yammy-nevliya-hero.dim_1600x600.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground">{t('heroTitle')}</h1>
            <p className="text-lg md:text-xl text-muted-foreground">{t('heroSubtitle')}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <RecipeFiltersBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedCuisine={selectedCuisine}
          onCuisineChange={setSelectedCuisine}
        />

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : filteredRecipes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">{t('noRecipes')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id.toString()} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
