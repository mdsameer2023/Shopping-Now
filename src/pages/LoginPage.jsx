import { useState } from "react";
import { BiSolidShoppingBags } from "react-icons/bi";
import { useAuth0 } from "@auth0/auth0-react";

const LoginPage = () => {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  const handleLogin = () => {
    // 👉 custom login logic (future backend ke liye)
    console.log(email, password);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* 🔥 TOP */}
      <div className="w-full h-[200px] sm:h-[230px] md:h-[260px] bg-gradient-to-r from-purple-700 to-red-500/40 flex flex-col items-center justify-center text-white rounded-b-[40px] px-4 text-center">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
          Login + Shopping-Now <BiSolidShoppingBags className="inline" />
        </h1>
        <p className="mt-2">Hello 👋 Welcome!</p>
      </div>

      {/* 🔥 CARD */}
      <div className="bg-white w-[95%] sm:w-[90%] max-w-md p-5 sm:p-6 rounded-xl shadow-xl -mt-16 z-10">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-2">
          {mode === "login" && "Login"}
          {mode === "signup" && "Sign Up"}
          {mode === "forgot" && "Forgot Password"}
        </h2>

        {isAuthenticated ? (
          <>
            <p className="text-center mb-3">Welcome {user?.name} 🎉</p>

            <button
              onClick={() =>
                logout({
                  logoutParams: { returnTo: window.location.origin },
                })
              }
              className="w-full bg-red-500 text-white py-2 rounded">
              Logout
            </button>
          </>
        ) : (
          <>
            <p className="text-center text-gray-400 text-sm mb-4">
              Please login to continue
            </p>

            {/* 🔥 EMAIL INPUT */}
            <input
              type="text"
              placeholder="Enter your Email or Mobile"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 border-green-500  px-3 py-2 rounded mb-3 text-sm text-black"
            />

            {/* 🔥 PASSWORD */}
            <input
              type="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 border-red-500 px-3 py-2 rounded text-sm text-black "
            />

            {/* 🔥 FORGOT PASSWORD */}
            <div className="text-right mt-1 mb-3">
              <button
                onClick={() => setMode("forgot")}
                className="text-xs text-purple-600">
                Forgot Password?
              </button>
            </div>

            {/* 🔥 LOGIN BUTTON */}
            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-yellow-200 to-pink-500 hover:scale-105 transition text-black  py-2 rounded-full mb-3">
              Login
            </button>

            {/* 🔥 AUTH0 LOGIN */}
            <button
              onClick={() => loginWithRedirect()}
              className="w-full bg-purple-600 text-white py-2 rounded mb-3">
              Continue with Auth0
            </button>

            {/* 🔥 SOCIAL */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => loginWithRedirect()}
                className="w-full border py-2 rounded flex items-center justify-center gap-2 hover:bg-green-100">
                <img src="https://img.icons8.com/color/24/google-logo.png" />
                Google
              </button>

              <button
                onClick={() => loginWithRedirect()}
                className="w-full border py-2 rounded flex items-center justify-center gap-2 hover:bg-blue-100">
                <img src="https://img.icons8.com/color/24/facebook.png" />
                Facebook
              </button>
            </div>
          </>
        )}

        {/* 🔁 SWITCH */}
        <div className="text-center text-sm mt-4">
          {mode === "login" ? (
            <>
              Don’t have account?{" "}
              <button
                onClick={() => setMode("signup")}
                className="text-purple-600">
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have account?{" "}
              <button
                onClick={() => setMode("login")}
                className="text-purple-600">
                Login
              </button>
            </>
          )}
        </div>
      </div>

      {/* 🔥 IMAGE */}
      <div className="hidden md:block absolute right-5 bottom-5">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
          className="w-28"
        />
      </div>
    </div>
  );
};

export default LoginPage;
