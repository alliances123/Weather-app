import React from 'react'

function Drawer() {
    return (
        <div className="drawer">
            {/* <input id="my-drawer" type="checkbox" className="drawer-toggle" /> */}
            <div className="drawer-content hidden">
                {/* Page content here */}
                <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Open drawer</label>
            </div>

            {/* drawer-side */}
            <div className="h-screen drawer-side">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full p-4 w-50 pt-50">
                    {[...Array(6)].map((_, i) => (
                        <li key={i}><a>Sidebar Item 1</a></li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Drawer
