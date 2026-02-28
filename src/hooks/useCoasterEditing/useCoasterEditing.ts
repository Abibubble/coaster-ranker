import { useState } from "react";
import { Coaster } from "../../types/data";

export interface EditableCoaster {
  name: string;
  park: string;
  manufacturer: string;
  model: string;
  material: string;
  thrillLevel: string;
  country: string;
}

export interface UseCoasterEditingReturn {
  editingCoasterId: string | null;
  editForm: EditableCoaster;
  isEditing: (coasterId: string) => boolean;
  startEditing: (coaster: Coaster) => void;
  cancelEditing: () => void;
  updateEditForm: (field: keyof EditableCoaster, value: string) => void;
  resetEditForm: () => void;
}

const initialEditForm: EditableCoaster = {
  name: "",
  park: "",
  manufacturer: "",
  model: "",
  material: "",
  thrillLevel: "",
  country: "",
};

export const useCoasterEditing = (): UseCoasterEditingReturn => {
  const [editingCoasterId, setEditingCoasterId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<EditableCoaster>(initialEditForm);

  const isEditing = (coasterId: string): boolean => {
    return editingCoasterId === coasterId;
  };

  const startEditing = (coaster: Coaster): void => {
    setEditingCoasterId(coaster.id);
    setEditForm({
      name: coaster.name,
      park: coaster.park,
      manufacturer: coaster.manufacturer,
      model: coaster.model || "",
      material: coaster.material || "",
      thrillLevel: coaster.thrillLevel || "",
      country: coaster.country,
    });
  };

  const cancelEditing = (): void => {
    setEditingCoasterId(null);
    setEditForm(initialEditForm);
  };

  const updateEditForm = (
    field: keyof EditableCoaster,
    value: string,
  ): void => {
    setEditForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetEditForm = (): void => {
    setEditForm(initialEditForm);
  };

  return {
    editingCoasterId,
    editForm,
    isEditing,
    startEditing,
    cancelEditing,
    updateEditForm,
    resetEditForm,
  };
};
