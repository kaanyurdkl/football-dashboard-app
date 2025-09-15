"use client";

// LIBRARIES
import { useState } from "react";
// COMPONENTS
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
// ICONS
import { ChevronDown, ChevronUp } from "lucide-react";

interface CollapsibleDescriptionProps {
  description: string;
  maxLength?: number;
}

export default function CollapsibleDescription({
  description,
  maxLength = 300,
}: CollapsibleDescriptionProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (description.length <= maxLength) {
    return (
      <div className="prose prose-sm max-w-none mb-6">
        <p className="text-sm leading-relaxed">{description}</p>
      </div>
    );
  }

  const truncatedText = description.slice(0, maxLength);

  return (
    <div className="prose prose-sm max-w-none mb-6">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <p className="text-sm leading-relaxed">
          {isOpen ? description : `${truncatedText}...`}
        </p>
        <CollapsibleTrigger className="flex cursor-pointer hover:underline items-center gap-1 mt-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
          {isOpen ? (
            <>
              Show less <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              Read more <ChevronDown className="h-4 w-4" />
            </>
          )}
        </CollapsibleTrigger>
      </Collapsible>
    </div>
  );
}
