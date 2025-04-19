import { useState } from 'react';

export function RightSidebar() {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="col-span-3">
            <div className="sticky top-0 h-screen p-4">
                <div className="flex flex-col h-full">
                    <div className="relative">
                        <input
                            type="search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search posts..."
                            className="w-full px-4 py-2 rounded-full bg-background border border-border text-text-primary focus:outline-none focus:border-primary"
                        />
                        <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>

                    <div className="mt-4 bg-surface rounded-lg shadow-md p-4">
                        <h2 className="text-xl font-semibold text-text-primary mb-4">Coming Soon</h2>
                        <p className="text-text-secondary">
                            This space will be used for additional features and utilities.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}