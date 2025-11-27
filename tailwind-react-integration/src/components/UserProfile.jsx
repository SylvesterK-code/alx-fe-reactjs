// function UserProfile() {
//   return (
//     <div className="bg-gray-100 p-10 max-w-sm mx-auto my-20 rounded-lg shadow-lg">
//       <img
//         src="https://via.placeholder.com/150"
//         alt="User"
//         className="rounded-full w-36 h-36 mx-auto bg-red-200 pl-4 md:pl-8 lg:pl-12 pt-15"
//       />
//       <h1 className="text-xl text-blue-800 my-4">Sylvester K. Nyadzinor</h1>
//       <p className="text-gray-600 text-base">
//         Developer at Example Co. Loves to write code and explore new
//         technologies.
//       </p>
//     </div>
//   );
// }

// export default UserProfile;



// function UserProfile() {
//   return (
//     <div className="bg-white p-8 max-w-xs mx-auto my-20 rounded-xl shadow-lg text-center">
//       {/* Avatar Icon */}
//       <div className="flex justify-center mb-4">
//         <svg
//           version="1.1"
//           viewBox="0 0 512 512"
//           className="w-20 h-20 text-gray-800"
//           fill="currentColor"
//         >
//           <path
//             d="M458.159,404.216c-18.93-33.65-49.934-71.764-100.409-93.431c-28.868,20.196-63.938,32.087-101.745,32.087
//           c-37.828,0-72.898-11.89-101.767-32.087c-50.474,21.667-81.479,59.782-100.398,93.431C28.731,448.848,48.417,512,91.842,512
//           c43.426,0,164.164,0,164.164,0s120.726,0,164.153,0C463.583,512,483.269,448.848,458.159,404.216z"
//           />
//           <path
//             d="M256.005,300.641c74.144,0,134.231-60.108,134.231-134.242v-32.158C390.236,60.108,330.149,0,256.005,0
//           c-74.155,0-134.252,60.108-134.252,134.242V166.4C121.753,240.533,181.851,300.641,256.005,300.641z"
//           />
//         </svg>
//       </div>

//       {/* Name & Role */}
//       <h1 className="text-lg font-semibold text-gray-900">
//         Sylvester K. Nyadzinor
//       </h1>
//       <p className="text-sm text-gray-500 mb-4">Software Engineer</p>

//       {/* Social Links */}
//       <div className="flex justify-center space-x-4 mt-4">
//         <a href="#" className="hover:opacity-80 transition">
//           <img
//             src="https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/github.svg"
//             alt="GitHub"
//             className="w-10 h-10"
//           />
//         </a>

//         <a href="#" className="hover:opacity-80 transition">
//           <img
//             src="https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/linkedin.svg"
//             alt="LinkedIn"
//             className="w-10 h-10"
//           />
//         </a>

//         <a href="#" className="hover:opacity-80 transition">
//           <img
//             src="https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/facebook.svg"
//             alt="Facebook"
//             className="w-10 h-10"
//           />
//         </a>

//         <a href="#" className="hover:opacity-80 transition">
//           <img
//             src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/X_icon_2.svg/2048px-X_icon_2.svg.png"
//             alt="X"
//             className="w-10 h-10"
//           />
//         </a>
//       </div>
//     </div>
//   );
// }

// export default UserProfile;



// responsive user profile

function UserProfile() {
  return (
    <div
      className="
        bg-white 
        p-4 sm:p-4 md:p-8 
        max-w-xs sm:max-w-sm 
        mx-auto my-10 
        rounded-xl shadow-lg text-center
      "
    >
      {/* Avatar Icon */}
      <div className="flex justify-center mb-4">
        <svg
          viewBox="0 0 512 512"
          className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 text-gray-800"
          fill="currentColor"
        >
          <path
            d="M458.159,404.216c-18.93-33.65-49.934-71.764-100.409-93.431c-28.868,20.196-63.938,32.087-101.745,32.087
          c-37.828,0-72.898-11.89-101.767-32.087c-50.474,21.667-81.479,59.782-100.398,93.431C28.731,448.848,48.417,512,91.842,512
          c43.426,0,164.164,0,164.164,0s120.726,0,164.153,0C463.583,512,483.269,448.848,458.159,404.216z"
          />
          <path
            d="M256.005,300.641c74.144,0,134.231-60.108,134.231-134.242v-32.158C390.236,60.108,330.149,0,256.005,0
          c-74.155,0-134.252,60.108-134.252,134.242V166.4C121.753,240.533,181.851,300.641,256.005,300.641z"
          />
        </svg>
      </div>

      {/* Name */}
      <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
        Sylvester K. Nyadzinor
      </h1>

      {/* Role */}
      <p className="text-sm sm:text-base text-gray-500 mb-4">
        Software Engineer
      </p>

      {/* Social Links */}
      <div className="flex justify-center space-x-4 mt-4">
        <a href="#" className="hover:opacity-80 transition">
          <img
            src="https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/github.svg"
            alt="GitHub"
            className="w-8 h-8 sm:w-10 sm:h-10"
          />
        </a>

        <a href="#" className="hover:opacity-80 transition">
          <img
            src="https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/linkedin.svg"
            alt="LinkedIn"
            className="w-8 h-8 sm:w-10 sm:h-10"
          />
        </a>

        <a href="#" className="hover:opacity-80 transition">
          <img
            src="https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/facebook.svg"
            alt="Facebook"
            className="w-8 h-8 sm:w-10 sm:h-10"
          />
        </a>

        <a href="#" className="hover:opacity-80 transition">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/X_icon_2.svg/2048px-X_icon_2.svg.png"
            alt="X"
            className="w-8 h-8 sm:w-10 sm:h-10"
          />
        </a>
      </div>
    </div>
  );
}

export default UserProfile;
