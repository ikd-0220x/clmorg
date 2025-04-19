import React from 'react';
import { Link } from 'react-router-dom';

const Auth = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://source.unsplash.com/random/1600x900/?logistics')" }}>
      {/* Прозрачный слой */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Модальное окно */}
      <div className="relative z-10 bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-green-600">Welcome to CLM Logistics!</h1>
        <p className="text-gray-600 text-center mb-8">
          This platform empowers you to manage logistics efficiently, earn rewards, and grow your network through referrals.
        </p>

        {/* Кнопки */}
        <div className="space-y-4">
          <Link
            to="/register"
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-full font-semibold transition duration-300 block text-center"
          >
            Register Now
          </Link>
          <Link
            to="/login"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-full font-semibold transition duration-300 block text-center"
          >
            Login
          </Link>
        </div>

        {/* Дополнительная информация */}
        <div className="mt-6 text-sm text-gray-500 text-center">
          <p>Need help? Contact us:</p>
          <br />
          <a href="https://clmgo.org" className="text-blue-500 hover:underline">
            https://clmgo.org
          </a>
        </div>
      </div>
    </div>
  );
};

export default Auth;