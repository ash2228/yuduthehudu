function Navbar() {
    return(
        <>
        <nav className="flex justify-between text-white my-4">
            <div className="logo">
                <span className="font-bold text-xl mx-10 text-red-700">Yudu</span>
            </div>
            <ul className="flex gap-8 mx-10">
                <li className="hover:text-red-700 transition-all">Home</li>
                <li className="hover:text-red-700 transition-all">Your Tasks</li>
            </ul>
        </nav>
        </>
    )
}
export default Navbar;