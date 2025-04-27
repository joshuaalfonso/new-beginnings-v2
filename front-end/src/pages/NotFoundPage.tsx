import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";




export function NotFoundPage() {
    return (
        <div className="h-dvh flex flex-col justify-center items-center gap-3">
            <span className="text-xl font-bold">
                Not Found 404
            </span>
            <Button>
                <Link to="/">
                    Home
                </Link>
            </Button>
        </div>
    )
}