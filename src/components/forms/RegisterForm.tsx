import React, { useState } from "react";
import { useRouter } from "next/router";
import { register } from "../../services/auth";
import Input from "../common/Input";
import Button from "../common/Button";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleRegister = async () => {
    if (formData.password !== formData.password2) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      await register(formData);
      alert("Registro exitoso. Por favor, inicia sesión.");
      router.push("/login");
    } catch (err: any) {
      setError("Ocurrió un error. Por favor, inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      {/* Usuario */}
      <Input
        label="Usuario"
        type="text"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        placeholder="Introduce tu usuario"
      />

      {/* Email */}
      <Input
        label="Correo Electrónico"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="Introduce tu correo electrónico"
      />

      {/* Contraseña */}
      <Input
        label="Contraseña"
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        placeholder="Introduce tu contraseña"
      />

      {/* Confirmar Contraseña */}
      <Input
        label="Confirmar Contraseña"
        type="password"
        value={formData.password2}
        onChange={(e) => setFormData({ ...formData, password2: e.target.value })}
        placeholder="Repite tu contraseña"
      />

      {/* Teléfono */}
      <Input
        label="Teléfono"
        type="text"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        placeholder="Introduce tu número de teléfono"
      />

      {/* Error */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Botón */}
      <Button
        onClick={handleRegister}
        isLoading={isLoading}
        type="submit"
        variant="primary"
      >
        Registrar
      </Button>
    </form>
  );
}