import { KeyRound, LogIn, Mail, User } from "lucide-react";
import Input from "../../../components/Input";
import ButtonWithIcon from "../../../components/ButtonWithIcon";

const RegisterForm = () => {
  return (
    <form className="px-6 pb-4">
      <div className="md:flex gap-2">
        <Input type={"text"} placeholder={"Ime"} icon={<User />} />
        <Input type={"text"} placeholder={"Prezime"} icon={<User />} />
      </div>
      <Input type={"email"} placeholder={"E-mail adresa"} icon={<Mail />} />
      <Input type={"password"} placeholder={"Lozinka"} icon={<KeyRound />} />

      <ButtonWithIcon icon={<LogIn />}>Registruj se</ButtonWithIcon>
    </form>
  );
};

export default RegisterForm;
