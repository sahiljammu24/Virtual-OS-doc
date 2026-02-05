import * as React from "react"
import {
  Search,
  FileText,
  Calculator,
  Gamepad2,
  Zap,
  Wrench,
  Download,
  Lightbulb,
  Rocket
} from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { searchData, SearchItem } from "@/data/searchData"

interface SearchCommandProps {
  onNavigate: (sectionId: string) => void;
}

export function SearchCommand({ onNavigate }: SearchCommandProps) {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  const filteredItems = React.useMemo(() => {
    if (!query) return searchData;

    const lowerQuery = query.toLowerCase();
    return searchData.filter((item) =>
      item.title.toLowerCase().includes(lowerQuery) ||
      item.content.toLowerCase().includes(lowerQuery) ||
      item.keywords.some(k => k.toLowerCase().includes(lowerQuery))
    );
  }, [query]);

  // Group items by section
  const groupedItems = React.useMemo(() => {
    const groups: Record<string, SearchItem[]> = {};
    filteredItems.forEach(item => {
      if (!groups[item.section]) groups[item.section] = [];
      groups[item.section].push(item);
    });
    return groups;
  }, [filteredItems]);

  const getIcon = (id: string) => {
    switch (true) {
      case id.includes("game"): return <Gamepad2 className="mr-2 h-4 w-4" />;
      case id.includes("app"): return <Calculator className="mr-2 h-4 w-4" />;
      case id.includes("ai"): return <Zap className="mr-2 h-4 w-4" />;
      case id.includes("hardware") || id.includes("serial"): return <Wrench className="mr-2 h-4 w-4" />;
      case id.includes("install"): return <Download className="mr-2 h-4 w-4" />;
      case id.includes("challenge"): return <Lightbulb className="mr-2 h-4 w-4" />;
      case id.includes("roadmap"): return <Rocket className="mr-2 h-4 w-4" />;
      default: return <FileText className="mr-2 h-4 w-4" />;
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground bg-muted/50 border border-input rounded-md hover:bg-muted hover:text-foreground transition-colors"
      >
        <Search className="w-4 h-4" />
        <span>Search...</span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 ml-auto">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Type to search..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          {Object.entries(groupedItems).map(([section, items]) => (
            <React.Fragment key={section}>
              <CommandGroup heading={section}>
                {items.map((item) => (
                  <CommandItem
                    key={item.id}
                    onSelect={() => runCommand(() => onNavigate(item.id))}
                    value={`${item.title} ${item.content} ${item.keywords.join(" ")}`}
                  >
                    {getIcon(item.id)}
                    <div className="flex flex-col">
                      <span>{item.title}</span>
                      {query && (
                        <span className="text-xs text-muted-foreground line-clamp-1">
                          {item.content}
                        </span>
                      )}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
            </React.Fragment>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  )
}
