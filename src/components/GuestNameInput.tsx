import { FormEvent, useState } from "react";

interface GuestNameInputProps {
  onSubmit: (name: string) => void;
}

export const GuestNameInput = ({ onSubmit }: GuestNameInputProps) => {
  const [name, setName] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(name.trim() || "Anda");
  };

  return (
    <form className="guest-form" onSubmit={handleSubmit}>
      <label htmlFor="guest-name">Nama Anda <span>(boleh dikosongkan)</span></label>
      <input id="guest-name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Tuliskan nama Anda" autoComplete="name" />
      <button className="primary-button open-button" type="submit">Lihat undangan <span aria-hidden="true">→</span></button>
    </form>
  );
};
