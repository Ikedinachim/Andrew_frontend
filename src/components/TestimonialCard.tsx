import { Star, StarHalf } from "lucide-react";

const TestimonialCard = ({name, role, image, rating, text}) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
  
    return (
      <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center mb-4">
          <img src={image} alt={name} className="w-12 h-12 rounded-full object-cover" />
          <div className="ml-4">
            <h4 className="text-lg font-semibold text-gray-900">{name}</h4>
            <p className="text-sm text-gray-600">{role}</p>
          </div>
        </div>
        <div className="flex mb-4">
          {[...Array(fullStars)].map((_, i) => (
            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
          ))}
          {hasHalfStar && <StarHalf className="w-5 h-5 text-yellow-400 fill-current" />}
        </div>
        <p className="text-gray-600 italic">{text}</p>
      </div>
    );
}

export default TestimonialCard