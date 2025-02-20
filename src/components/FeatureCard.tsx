
const FeatureCard = ({ icon, title, description }) => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center justify-center">{icon}</div>
        <h3 className="mt-4 text-lg font-medium text-gray-900 text-center">{title}</h3>
        <p className="mt-2 text-gray-500 text-center">{description}</p>
      </div>
    );
  }

export default FeatureCard