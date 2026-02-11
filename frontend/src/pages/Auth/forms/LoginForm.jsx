import { useState } from "react";
import { login } from "../../../api/auth";
import useAuth from "../../../hooks/useAuth";
import { GraduationCap, KeyRound, LogIn, Mail } from "lucide-react";
import Input from "../../../components/Input";
import ButtonWithIcon from "../../../components/ButtonWithIcon";

const LoginForm = () => {
  const { setAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await login({ email, password });
      setAuth({
        user: response.data.user,
        accessToken: response.data.accessToken,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="px-6 pb-4">
      <Input
        type={"text"}
        placeholder={"E-mail adresa"}
        icon={<Mail />}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type={"password"}
        placeholder={"Lozinka"}
        icon={<KeyRound />}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <ButtonWithIcon icon={<LogIn />} onClick={handleSubmit} loading={loading}>
        Prijavi se
      </ButtonWithIcon>
    </form>
  );
};

export default LoginForm;
