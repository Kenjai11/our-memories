export default function AboutUs() {
  return (
    <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
      <h2 className="text-3xl font-bold text-purple-800 mb-4 text-center">
        About Us
      </h2>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="text-center">
          <p className="text-gray-700 mb-4">
            This special place is dedicated to collecting and preserving our beautiful memories together.
          </p>
          <p className="text-gray-600">
            Created with love and care to keep our moments safe and accessible forever.
          </p>
        </div>
      </div>
    </section>
  );
}
