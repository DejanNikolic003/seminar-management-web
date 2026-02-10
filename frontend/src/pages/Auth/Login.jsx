import { GraduationCap, KeyRound, LogIn, Mail } from 'lucide-react';

const Login = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-2 py-4">
            <div className="relative bg-white border border-slate-200 w-full max-w-md rounded-lg shadow-lg">
                <div className="w-12 h-12 absolute -top-5 left-1/2 -translate-x-1/2 border border-slate-200 bg-cyan-500 rounded-full flex items-center justify-center">
                    <GraduationCap  className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-xl font-bold text-center mt-10 text-slate-700">Pozdrav,</h1>
                <p className="text-center text-slate-500 mb-4">Dobrodošli nazad u sistem za upravljanje seminara!</p>
                <form className="px-6 pb-4">
                    <div className="flex items-center border border-slate-200 rounded-lg mb-2 p-2">
                        <Mail className="w-6 h-6 text-slate-500" />
                        <input type="text" placeholder="E-mail adresa" className="ml-2 w-full outline-none text-slate-500 text-sm" />
                    </div>
                    <div className="flex items-center border border-slate-200 rounded-lg mb-4 p-2">
                        <KeyRound  className="w-6 h-6 text-slate-500" />
                        <input type="password" placeholder="Lozinka" className="ml-2 w-full outline-none text-slate-500 text-sm" />
                    </div>

                    <button type="button" className="font-medium uppercase leading- w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-2 rounded-lg transition duration-200 cursor-pointer flex items-center justify-between">
                        Prijavi se
                        <LogIn className="w-5 h-5 inline-block mr-2" />
                    </button>
                </form>
                <p className="text-center text-slate-500 text-sm mb-4 leading-relaxed">Nemate nalog? <a href="/register" className="text-cyan-500 underline hover:text-cyan-600">Registrujte se</a></p>
            </div>
        </div>
    );
};

export default Login;