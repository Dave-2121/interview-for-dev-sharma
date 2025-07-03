export function LaunchTable() {
  return (
    <div className="rounded-lg border overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-3">No.</th>
            <th className="px-4 py-3">Launch Name</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Rocket</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(5)].map((_, i) => (
            <tr key={i} className="border-t">
              <td className="px-4 py-3 text-gray-400">{i + 1}</td>
              <td className="px-4 py-3 text-gray-400">Launch Name</td>
              <td className="px-4 py-3 text-gray-400">2023-01-01</td>
              <td className="px-4 py-3 text-gray-400">Falcon 9</td>
              <td className="px-4 py-3 text-gray-400">Success</td>
              <td className="px-4 py-3 text-right text-blue-500">View</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
