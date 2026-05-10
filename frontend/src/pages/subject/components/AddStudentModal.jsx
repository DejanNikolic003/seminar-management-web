import Input from "../../../components/Input";
import ButtonWithIcon from "../../../components/ButtonWithIcon";
import { Mail, Plus, X } from "lucide-react";

const AddStudentModal = ({
    isOpen,
    email,
    loading,
    onClose,
    onSubmit,
    onEmailChange,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
            <div className="w-full max-w-md rounded-xl bg-white p-5 shadow-lg">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-800">Dodavanje učenika</h3>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                    >
                        <X size={18} />
                    </button>
                </div>

                <form onSubmit={onSubmit}>
                    <Input
                        type="email"
                        placeholder="Email studenta"
                        icon={<Mail />}
                        value={email}
                        onChange={(e) => onEmailChange(e.target.value)}
                    />
                    <ButtonWithIcon icon={<Plus />} onClick={onSubmit} loading={loading}>
                        Dodaj studenta
                    </ButtonWithIcon>
                </form>
            </div>
        </div>
    );
};

export default AddStudentModal;
