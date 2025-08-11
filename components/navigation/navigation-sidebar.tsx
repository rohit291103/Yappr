export const NavigationSidebar = () => {
    return (
        <div className="h-full w-full bg-gray-800 text-white">
            <nav className="flex flex-col items-center p-4">
                <a href="/servers" className="mb-4">Servers</a>
                <a href="/settings" className="mb-4">Settings</a>
                <a href="/help">Help</a>
            </nav>
        </div>
    )
}
export default NavigationSidebar;