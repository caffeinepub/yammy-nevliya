import { useLanguage } from '../i18n/LanguageProvider';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const AVAILABLE_PHOTOS = [
  '/assets/generated/recipe-samosa.dim_1200x800.png',
  '/assets/generated/recipe-pizza.dim_1200x800.png',
  '/assets/generated/recipe-sushi.dim_1200x800.png',
  '/assets/generated/recipe-chocolate-cake.dim_1200x800.png',
  '/assets/generated/recipe-tacos.dim_1200x800.png',
  '/assets/generated/recipe-ramen.dim_1200x800.png',
];

interface PhotoAssetPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export default function PhotoAssetPicker({ value, onChange }: PhotoAssetPickerProps) {
  const { t } = useLanguage();

  return (
    <div className="space-y-3">
      <Label>{t('selectPhoto')}</Label>
      <RadioGroup value={value} onValueChange={onChange} className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {AVAILABLE_PHOTOS.map((photo) => (
          <div key={photo} className="relative">
            <RadioGroupItem value={photo} id={photo} className="peer sr-only" />
            <Label
              htmlFor={photo}
              className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary cursor-pointer transition-all"
            >
              <img src={photo} alt="" className="w-full h-24 object-cover rounded mb-2" />
              <span className="text-xs text-center line-clamp-1">{photo.split('/').pop()?.split('.')[0]}</span>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
