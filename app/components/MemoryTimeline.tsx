export default function MemoryTimeline() {
  // TODO: Implement actual timeline data fetching
  const memories = [
    { date: '2025-06-11', title: 'Project Started', description: 'Began creating our memory collection' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-semibold mb-4">Memory Timeline</h2>
      <div className="space-y-4">
        {memories.map((memory, index) => (
          <div key={index} className="border-l-2 border-purple-500 pl-4 relative">
            <div className="absolute -left-2.5 w-5 h-5 bg-purple-500 rounded-full"></div>
            <h3 className="text-lg font-semibold text-purple-800">{memory.title}</h3>
            <p className="text-gray-600">{memory.date}</p>
            <p className="text-gray-700 mt-1">{memory.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
