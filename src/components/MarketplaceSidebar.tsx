import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { AGENT_CATEGORIES, type AgentSource } from "@/data/agents";

interface MarketplaceSidebarProps {
  sources: AgentSource[];
  selectedCategories: string[];
  onCategoryChange: (categoryId: string, checked: boolean) => void;
  selectedSources: string[];
  onSourceChange: (source: string, checked: boolean) => void;
}

export const MarketplaceSidebar = ({
  sources,
  selectedCategories,
  onCategoryChange,
  selectedSources,
  onSourceChange,
}: MarketplaceSidebarProps) => {
  return (
    <aside className="w-full lg:w-64 lg:shrink-0">
      <div className="sticky top-20 space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">Categories</h3>
          <div className="space-y-2">
            {AGENT_CATEGORIES.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`cat-${category.id}`}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={(checked) => onCategoryChange(category.id, !!checked)}
                />
                <Label htmlFor={`cat-${category.id}`} className="font-normal cursor-pointer">
                  {category.name}
                </Label>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Sources</h3>
          <div className="space-y-2">
            {sources.map((source) => (
              <div key={source} className="flex items-center space-x-2">
                <Checkbox
                  id={`src-${source}`}
                  checked={selectedSources.includes(source)}
                  onCheckedChange={(checked) => onSourceChange(source, !!checked)}
                />
                <Label htmlFor={`src-${source}`} className="font-normal cursor-pointer">
                  {source}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};