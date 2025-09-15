// COMPONENTS
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import SearchBar from "@/components/SearchBar";

export default function Header() {
  return (
    <header className="border-b bg-background">
      <div className="flex items-center justify-between px-6 py-4">
        <SidebarTrigger />
        <div className="flex items-center gap-6">
          <SearchBar />
          <Avatar>
            <AvatarFallback>KY</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
