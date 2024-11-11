import { FaGraduationCap, FaEnvelope, FaPhone, FaArrowRight } from 'react-icons/fa'

export default function Component({
  name = "John Doe",
  academy = "React Academy",
  email = "john@example.com",
  phone = "+1 234 567 890",
  onButtonClick = () => {},
  buttonText = "View Profile"
}) {
  return (
    <div className="w-full mx-auto mt-5">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden flex">
        <div className="flex-grow p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{name}</h2>
              <div className="space-y-2">
                <div className="flex items-center text-gray-700">
                  <FaGraduationCap className="w-5 h-5 mr-3 text-violet-500" />
                  <span>{academy}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <FaEnvelope className="w-5 h-5 mr-3 text-violet-500" />
                  <span>{email}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <FaPhone className="w-5 h-5 mr-3 text-violet-500" />
                  <span>{phone}</span>
                </div>
              </div>
            </div>
            <div className="ml-6">
              <button
                onClick={onButtonClick}
                className="px-6 py-2 bg-violet-500 hover:bg-violet-600 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50"
              >
                <span className="flex items-center justify-center">
                  {buttonText}
                  <FaArrowRight className="ml-2" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}