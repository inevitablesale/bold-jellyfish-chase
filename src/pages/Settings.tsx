import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApiKey } from "@/hooks/use-api-key";
import { showSuccess, showError } from "@/utils/toast";
import { KeyRound, Trash2 } from "lucide-react";

const SettingsPage = () => {
  const { apiKey, saveApiKey, clearApiKey } = useApiKey();
  const [currentKey, setCurrentKey] = useState(apiKey || "");

  const handleSave = () => {
    if (!currentKey.trim()) {
      showError("API Key cannot be empty.");
      return;
    }
    saveApiKey(currentKey);
    showSuccess("API Key saved successfully!");
  };

  const handleClear = () => {
    clearApiKey();
    setCurrentKey("");
    showSuccess("API Key cleared.");
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <KeyRound className="h-5 w-5" />
            Settings
          </CardTitle>
          <CardDescription>
            Manage your API keys and other platform settings here. Your key is stored securely in your browser and never sent to our servers.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="api-key">Google Gemini API Key</Label>
            <div className="flex items-center gap-2">
              <Input
                id="api-key"
                type="password"
                placeholder="Enter your Gemini API key"
                value={currentKey}
                onChange={(e) => setCurrentKey(e.target.value)}
              />
              {apiKey && (
                <Button variant="ghost" size="icon" onClick={handleClear} aria-label="Clear API Key">
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              Providing a key enables powerful, context-aware agent matching using the Gemini model.
            </p>
          </div>
          <Button onClick={handleSave}>Save Key</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;