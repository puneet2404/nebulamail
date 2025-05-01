import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SettingsTab() {
  const [azureApiKey, setAzureApiKey] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("azure_openai_api_key") || "";
    setAzureApiKey(stored);
  }, []);

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    localStorage.setItem("azure_openai_api_key", azureApiKey);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-12">
      <Card className="p-6 space-y-4">
        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <label className="text-fuchsia-200 font-medium text-sm">Azure OpenAI API Key</label>
          <Input
            type="password"
            placeholder="azure-sk-..."
            value={azureApiKey}
            onChange={e => setAzureApiKey(e.target.value)}
            className="flex-1"
            autoComplete="off"
          />
          <Button type="submit" disabled={!azureApiKey}>Save Key</Button>
          {saved && <div className="text-green-400 text-xs">Saved!</div>}
        </form>
        <div className="text-xs text-fuchsia-300 mt-2">Your key is only stored in your browser and never sent anywhere except to Azure OpenAI for your own queries.</div>
      </Card>
    </div>
  );
}
