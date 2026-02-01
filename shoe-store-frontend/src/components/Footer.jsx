
export default function Footer() {
    return (
        <footer className="bg-white dark:bg-background-dark border-t border-gray-100 dark:border-gray-800 py-12">
            <div className="max-w-[1280px] mx-auto px-4 md:px-10 lg:px-40 grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="col-span-2">
                    <div className="flex items-center gap-2 text-primary mb-6">
                        <div className="size-6">
                            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z" fill="currentColor"></path>
                            </svg>
                        </div>
                        <h2 className="text-[#111418] dark:text-white text-lg font-bold leading-tight">LUXE STEP</h2>
                    </div>
                    <p className="text-[#617589] dark:text-gray-400 text-sm max-w-xs mb-4">Curating the finest footwear for those who demand excellence in every step of their journey.</p>
                    <a href="/admin/login" className="text-gray-300 hover:text-primary text-xs flex items-center gap-1 transition-colors">
                        <span className="material-symbols-outlined text-sm">lock</span> Admin Portal
                    </a>
                </div>
                <div>
                    <h4 className="text-sm font-bold mb-4 uppercase tracking-widest text-gray-400">Support</h4>
                    <ul className="flex flex-col gap-3 text-sm font-medium">
                        <li><a className="hover:text-primary transition-colors" href="#">Shipping & Returns</a></li>
                        <li><a className="hover:text-primary transition-colors" href="#">Contact Us</a></li>
                        <li><a className="hover:text-primary transition-colors" href="#">Size Guide</a></li>
                        <li><a className="hover:text-primary transition-colors" href="#">FAQs</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-sm font-bold mb-4 uppercase tracking-widest text-gray-400">Company</h4>
                    <ul className="flex flex-col gap-3 text-sm font-medium">
                        <li><a className="hover:text-primary transition-colors" href="#">About LUXE STEP</a></li>
                        <li><a className="hover:text-primary transition-colors" href="#">Careers</a></li>
                        <li><a className="hover:text-primary transition-colors" href="#">Sustainability</a></li>
                        <li><a className="hover:text-primary transition-colors" href="#">Terms of Service</a></li>
                    </ul>
                </div>
            </div>
            <div className="max-w-[1280px] mx-auto px-4 md:px-10 lg:px-40 mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 text-center md:text-left">
                <p className="text-[#617589] text-xs">© 2024 LUXE STEP. All rights reserved.</p>
            </div>
        </footer>
    );
}
