import Input from "../../../components/Input";
import ButtonWithIcon from "../../../components/ButtonWithIcon";
import { BookOpenText, Pencil, Plus, X } from "lucide-react";

const TopicModal = ({
    isOpen,
    editingTopicId,
    topicName,
    topicDescription,
    loading,
    onClose,
    onSubmit,
    onTopicNameChange,
    onTopicDescriptionChange,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
            <div className="w-full max-w-md rounded-xl bg-white p-5 shadow-lg">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-800">
                        {editingTopicId ? "Izmena teme" : "Dodavanje teme"}
                    </h3>
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
                        type="text"
                        placeholder="Naziv teme"
                        icon={<BookOpenText />}
                        value={topicName}
                        onChange={(e) => onTopicNameChange(e.target.value)}
                    />
                    <Input
                        type="text"
                        placeholder="Opis teme (opciono)"
                        icon={<Pencil />}
                        value={topicDescription}
                        onChange={(e) => onTopicDescriptionChange(e.target.value)}
                    />
                    <ButtonWithIcon icon={<Plus />} onClick={onSubmit} loading={loading}>
                        {editingTopicId ? "Sačuvaj izmene" : "Dodaj temu"}
                    </ButtonWithIcon>
                </form>
            </div>
        </div>
    );
};

export default TopicModal;
