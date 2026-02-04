import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Recipe, Category, Cuisine } from '../backend';

export function useGetAllRecipes() {
  const { actor, isFetching } = useActor();

  return useQuery<Recipe[]>({
    queryKey: ['recipes'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllRecipes();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetRecipe(id: bigint | undefined) {
  const { actor, isFetching } = useActor();

  return useQuery<Recipe | null>({
    queryKey: ['recipe', id?.toString()],
    queryFn: async () => {
      if (!actor || !id) return null;
      try {
        return await actor.getRecipe(id);
      } catch (error) {
        console.error('Error fetching recipe:', error);
        return null;
      }
    },
    enabled: !!actor && !isFetching && id !== undefined,
  });
}

export function useAddRecipe() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      titleEn: string;
      titleHi: string;
      descriptionEn: string;
      descriptionHi: string;
      ingredientsEn: string[];
      ingredientsHi: string[];
      stepsEn: string[];
      stepsHi: string[];
      cuisine: Cuisine;
      category: Category;
      prepTimeMinutes: bigint;
      cookTimeMinutes: bigint;
      servings: bigint;
      photoAssetPath: string;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addRecipe(
        data.titleEn,
        data.titleHi,
        data.descriptionEn,
        data.descriptionHi,
        data.ingredientsEn,
        data.ingredientsHi,
        data.stepsEn,
        data.stepsHi,
        data.cuisine,
        data.category,
        data.prepTimeMinutes,
        data.cookTimeMinutes,
        data.servings,
        data.photoAssetPath
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
    },
  });
}

export function useSearchRecipes(searchQuery: string, language: 'en' | 'hi') {
  const { data: recipes = [], isLoading } = useGetAllRecipes();

  const filteredRecipes = recipes.filter((recipe) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    const title = language === 'en' ? recipe.titleEn : recipe.titleHi;
    const description = language === 'en' ? recipe.descriptionEn : recipe.descriptionHi;
    return title.toLowerCase().includes(query) || description.toLowerCase().includes(query);
  });

  return { recipes: filteredRecipes, isLoading };
}
