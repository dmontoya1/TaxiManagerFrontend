import React, { useState } from "react";
import { useRouter } from "next/router";
import { login } from "../../services/auth";
import Input from "../common/Input";
import Button from "../common/Button";

export default function LoginForm() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await login(formData);
      router.push("/dashboard");
    } catch (err: any) {
      setError("Credenciales incorrectas. Por favor, intenta de nuevo.");
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

      {/* Contraseña */}
      <Input
        label="Contraseña"
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        placeholder="Introduce tu contraseña"
      />

      {/* Error */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Botón */}
      <Button
        onClick={handleLogin}
        isLoading={isLoading}
        type="submit"
        variant="primary"
      >
        Entrar
      </Button>
    </form>
  );
}