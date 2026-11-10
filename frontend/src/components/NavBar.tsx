import { Link } from "react-router";
import { APP_NAME } from "../constants"

export default function NavBar() {
    return (
        <nav className="bg-white border-b border-gray-300">
            <div className="w-full md:max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
                <div>
                    <p className="text-3xl font-bold text-gray-900">{APP_NAME}</p>
                </div>

                <div className="flex items-center gap-4">
                    <ul className="flex items-center gap-4">
                        <Link to="https://google.com">Google</Link>
                        <Link to="https://youtube.com">Youtube</Link>
                        <Link to="https://x.com">X</Link>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
