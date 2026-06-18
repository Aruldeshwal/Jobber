'use client'

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Sparkles, Loader2 } from "lucide-react";
import { smartSearchApplications } from "@/app/actions/search";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

export function SmartSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  async function handleSearch() {
    if (!query.trim()) return;
    setIsLoading(true);
    try {
      const data = await smartSearchApplications(query);
      setResults(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="relative group cursor-pointer w-full max-w-sm">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-muted-foreground" />
          </div>
          <Input
            placeholder="Search with AI..."
            className="pl-10 pr-10 bg-white dark:bg-slate-900 border-dashed"
            readOnly
          />
          <div className="absolute inset-y-0 right-3 flex items-center">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] h-[70vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Smart Search
          </DialogTitle>
        </DialogHeader>
        <div className="flex gap-2 py-4">
          <Input
            placeholder="e.g., 'React roles with high salary' or 'Companies in SF'"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button onClick={handleSearch} disabled={isLoading}>
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Search"}
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto space-y-4">
          {isLoading ? (
            <div className="text-center py-20 text-muted-foreground">Thinking...</div>
          ) : results.length > 0 ? (
            results.map((res) => (
              <Card key={res.id} className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                    <div className="font-bold">{res.company}</div>
                    <Badge variant="outline">{Math.round(res.similarity * 100)}% Match</Badge>
                </div>
                <div className="text-sm text-muted-foreground">{res.role}</div>
                <div className="text-xs line-clamp-2 opacity-70 italic">
                    {res.job_description}
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-20 text-muted-foreground">
              Ask me anything about your job applications.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
