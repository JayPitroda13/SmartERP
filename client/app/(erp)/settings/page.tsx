export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">
        Settings
      </h1>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">
            Company Settings
          </h2>

          <p className="text-gray-600 mb-4">
            Manage company information and business details.
          </p>

          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            Configure
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">
            User Management
          </h2>

          <p className="text-gray-600 mb-4">
            Manage users, roles and permissions.
          </p>

          <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
            Manage Users
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">
            Security Settings
          </h2>

          <p className="text-gray-600 mb-4">
            Update passwords and security preferences.
          </p>

          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg">
            Security
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">
            System Preferences
          </h2>

          <p className="text-gray-600 mb-4">
            Configure application settings and defaults.
          </p>

          <button className="bg-orange-500 text-white px-4 py-2 rounded-lg">
            Preferences
          </button>
        </div>
      </div>
    </div>
  );
}