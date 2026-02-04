import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { LanguageProvider } from './i18n/LanguageProvider';
import { Toaster } from '@/components/ui/sonner';
import Header from './components/Header';
import ExplorePage from './pages/ExplorePage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import NewRecipePage from './pages/NewRecipePage';

// Layout component with Header
function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div id="detail" />
      </main>
      <footer className="bg-card border-t border-border py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2026. Built with ❤️ using{' '}
          <a
            href="https://caffeine.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            caffeine.ai
          </a>
        </div>
      </footer>
    </div>
  );
}

// Define routes
const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: ExplorePage,
});

const recipeDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/recipe/$recipeId',
  component: RecipeDetailPage,
});

const newRecipeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/new',
  component: NewRecipePage,
});

const routeTree = rootRoute.addChildren([indexRoute, recipeDetailRoute, newRecipeRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <LanguageProvider>
      <RouterProvider router={router} />
      <Toaster />
    </LanguageProvider>
  );
}

export default App;
