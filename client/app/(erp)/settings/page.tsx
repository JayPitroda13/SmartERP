export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">
        Settings
      </h1>

      <div className="grid grid-cols-2 gap-6">

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">
            Company Information
          </h2>

          <div className="space-y-2">
            <p>
              <strong>Company:</strong>{" "}
              TechNova Solutions Pvt Ltd
            </p>

            <p>
              <strong>GST:</strong>{" "}
              27AABCT1234K1Z5
            </p>

            <p>
              <strong>Email:</strong>{" "}
              accounts@technova.com
            </p>

            <p>
              <strong>Phone:</strong>{" "}
              +91 9876543210
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">
            Application Information
          </h2>

          <div className="space-y-2">
            <p>
              <strong>Application:</strong>
              {" "}SmartERP
            </p>

            <p>
              <strong>Version:</strong>
              {" "}1.0.0
            </p>

            <p>
              <strong>Database:</strong>
              {" "}PostgreSQL
            </p>

            <p>
              <strong>ORM:</strong>
              {" "}Prisma
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">
            Technology Stack
          </h2>

          <ul className="list-disc pl-5 space-y-2">
            <li>Next.js</li>
            <li>React</li>
            <li>TypeScript</li>
            <li>Prisma ORM</li>
            <li>PostgreSQL</li>
            <li>Tailwind CSS</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">
            System Status
          </h2>

          <div className="space-y-2">
            <p>
              🟢 Database Connected
            </p>

            <p>
              🟢 Activity Logging Enabled
            </p>

            <p>
              🟢 Reports Enabled
            </p>

            <p>
              🟢 Export Features Enabled
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}