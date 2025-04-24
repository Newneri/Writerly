import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';
import type { User } from '../types';

interface ProfileProps {
    onProfileUpdate?: (user: User) => void;
}

export function Profile({ onProfileUpdate }: ProfileProps) {
    const { user, updateUser } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        bio: user?.bio || '',
        location: user?.location || '',
        website: user?.website || '',
        avatar: user?.avatar || ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Reset form data when user data changes
    useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.firstName,
                lastName: user.lastName,
                bio: user.bio || '',
                location: user.location || '',
                website: user.website || '',
                avatar: user.avatar || ''
            });
        }
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        // Only include fields that have changed
        const changedFields = Object.entries(formData).reduce((acc, [key, value]) => {
            if (value !== user?.[key as keyof typeof user]) {
                acc[key as keyof typeof formData] = value;
            }
            return acc;
        }, {} as Partial<typeof formData>);

        // If no fields changed, just close the form
        if (Object.keys(changedFields).length === 0) {
            setIsEditing(false);
            return;
        }

        try {
            const response = await axios.put('/api/user/profile', changedFields, {
                withCredentials: true
            });
            updateUser(response.data.user);
            onProfileUpdate?.(response.data.user); // Call the prop function
            setIsEditing(false);
        } catch (err) {
            setError('Failed to update profile');
            console.error('Error updating profile:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="bg-surface rounded-xl border border-border p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-text-primary">Profile Settings</h1>
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="px-4 py-2 rounded-full border border-border text-text-primary hover:bg-primary hover:text-surface cursor-pointer transition-colors"
                    >
                        {isEditing ? 'Cancel' : 'Edit Profile'}
                    </button>
                </div>

                {isEditing ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-text-secondary mb-1">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.firstName}
                                    onChange={e => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                                    className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:outline-none focus:border-primary"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-text-secondary mb-1">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.lastName}
                                    onChange={e => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                                    className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:outline-none focus:border-primary"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-text-secondary mb-1">
                                Bio
                            </label>
                            <textarea
                                value={formData.bio}
                                onChange={e => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                                rows={3}
                                className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:outline-none focus:border-primary"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-text-secondary mb-1">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={e => setFormData(prev => ({ ...prev, location: e.target.value }))}
                                    className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:outline-none focus:border-primary"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-text-secondary mb-1">
                                    Website
                                </label>
                                <input
                                    type="url"
                                    value={formData.website}
                                    onChange={e => setFormData(prev => ({ ...prev, website: e.target.value }))}
                                    className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:outline-none focus:border-primary"
                                />
                            </div>
                        </div>

                        {error && (
                            <p className="text-danger text-sm">{error}</p>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full px-4 py-2 bg-primary text-white rounded-full hover:bg-primary-hover cursor-pointer transition-colors disabled:opacity-50"
                        >
                            {isLoading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </form>
                ) : (
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <img
                                src={user?.avatar}
                                alt={`${user?.username}'s avatar`}
                                className="w-20 h-20 rounded-full object-cover"
                            />
                            <div>
                                <h2 className="text-xl font-semibold text-text-primary">
                                    {user?.firstName} {user?.lastName}
                                </h2>
                                <p className="text-text-secondary">@{user?.username}</p>
                            </div>
                        </div>
                        {user?.bio && (
                            <p className="text-text-primary">{user.bio}</p>
                        )}
                        <div className="flex gap-4 text-text-secondary">
                            {user?.location && (
                                <span>📍 {user.location}</span>
                            )}
                            {user?.website && (
                                <a 
                                    href={user.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-primary transition-colors"
                                >
                                    🔗 {user.website}
                                </a>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}