import { useLocation } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import { SidebarTrigger } from "./ui/sidebar";

export function Header() {

    const location = useLocation();
    const currentPath = location.pathname;

    function getPath(path:string) {
        switch (path) {
            case '/dashboard':
                return 'Dashboard'
            case '/products':
                return 'Products'
        }

        return ''
    }

    return (
        <header className="flex justify-between items-center py-2 px-5 xl:px-10 border-solid border-b border-border">
            
            <div className="flex h-5 items-center gap-6">
                <SidebarTrigger />
                <div className="h-5 w-[1px] bg-border"></div>
                <div>
                    {getPath(currentPath)}
                </div>
            </div>
            
            <ModeToggle />
        </header>
    )
}