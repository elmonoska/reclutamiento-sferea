export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="bg-white border-t border-gray-200 py-6">
            <div className="max-w-md mx-auto px-4 text-center">

                <p className="text-sm text-gray-500">
                    © {year} Todos los derechos reservados.
                </p>

            </div>
        </footer>
    );
}