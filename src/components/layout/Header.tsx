// COMPONENTS
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// ICONS
import { Search } from "lucide-react";

export default function Header() {
  return (
    <header className="border-b bg-background">
      <div className="flex items-center justify-between px-6 py-4">
        <SidebarTrigger />
        <div className="flex items-center gap-6">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search teams, leagues..."
              className="pl-10 w-full"
            />
          </div>
          <Avatar>
            <AvatarFallback>KY</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
