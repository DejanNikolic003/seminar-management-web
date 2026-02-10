import { GraduationCap } from "lucide-react";
import LoginForm from "./forms/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="relative bg-white border border-slate-200 w-full max-w-md rounded-lg shadow-lg">
        <div className="w-12 h-12 absolute -top-5 left-1/2 -translate-x-1/2 border border-slate-200 bg-cyan-500 rounded-full flex items-center justify-center">
          <GraduationCap className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-xl font-bold text-center mt-10 text-slate-700">
          Pozdrav,
        </h1>
        <p className="text-center text-slate-500 mb-4">
          Dobrodošli nazad u sistem za upravljanje seminara!
        </p>

        <LoginForm />

        <p className="text-center text-slate-500 text-sm mb-4 leading-relaxed">
          Nemate nalog?{" "}
          <a
            href="/register"
            className="text-cyan-500 underline hover:text-cyan-600"
          >
            Registrujte se
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
