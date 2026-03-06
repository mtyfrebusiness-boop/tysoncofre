'use client'

import { useState } from 'react'

export default function SetupPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState('')

  const runSetup = async () => {
    setLoading(true)
    setError('')
    setResult(null)

    try {
      const response = await fetch('/api/setup')
      const data = await response.json()
      
      if (response.ok) {
        setResult(data)
      } else {
        setError(data.error || 'Setup failed')
      }
    } catch (err) {
      setError('Failed to connect to server')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#0A2240]">Database Setup</h1>
          <p className="text-gray-600">Tyson Cofre RE/MAX</p>
        </div>

        {!result && !error && (
          <div className="text-center">
            <p className="mb-6 text-gray-600">
              Click below to initialize the database and create the admin user.
            </p>
            <button
              onClick={runSetup}
              disabled={loading}
              className="w-full bg-[#DC1010] text-white py-3 px-4 rounded-lg hover:bg-[#b00d0d] transition-colors disabled:opacity-50"
            >
              {loading ? 'Setting up...' : 'Run Setup'}
            </button>
          </div>
        )}

        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#DC1010]"></div>
            <p className="mt-4 text-gray-600">Initializing database...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}

        {result && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            <p className="font-bold">✓ Setup Complete!</p>
            <div className="mt-2 text-sm">
              <p>Admin created: {result.adminCreated ? 'No (already exists)' : 'Yes'}</p>
              <p>Listings: {result.listingsCount}</p>
              <p>Blog posts: {result.postsCount}</p>
            </div>
            <div className="mt-4 flex gap-2">
              <a
                href="/admin/login"
                className="flex-1 bg-[#DC1010] text-white py-2 px-4 rounded-lg hover:bg-[#b00d0d] transition-colors text-center"
              >
                Go to Login
              </a>
              <a
                href="/"
                className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors text-center"
              >
                Go to Site
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
