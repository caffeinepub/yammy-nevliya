import { useNavigate } from '@tanstack/react-router';
import { useLanguage } from '../i18n/LanguageProvider';
import { Button } from '@/components/ui/button';
import { ChefHat, Plus, Globe } from 'lucide-react';

export default function Header() {
  const navigate = useNavigate();
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <button
            onClick={() => navigate({ to: '/' })}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <img
              src="/assets/generated/yammy-nevliya-logo.dim_512x512.png"
              alt={t('appName')}
              className="h-10 w-10 rounded-full object-cover"
            />
            <span className="text-xl font-bold text-primary">{t('appName')}</span>
          </button>

          <nav className="flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={() => navigate({ to: '/' })}
              className="hidden sm:inline-flex"
            >
              <ChefHat className="mr-2 h-4 w-4" />
              {t('explore')}
            </Button>
            <Button variant="default" onClick={() => navigate({ to: '/new' })}>
              <Plus className="mr-2 h-4 w-4" />
              {t('newRecipe')}
            </Button>
            <Button variant="outline" onClick={toggleLanguage} size="icon">
              <Globe className="h-4 w-4" />
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
