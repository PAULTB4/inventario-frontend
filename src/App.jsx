import { useState } from "react";

export default function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [respuesta, setRespuesta] = useState(null);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setRespuesta(null);

    if (!file) {
      setError("Selecciona un archivo .xlsx");
      return;
    }

    // Validación simple de extensión
    if (!file.name.toLowerCase().endsWith(".xlsx")) {
      setError("El archivo debe ser .xlsx");
      return;
    }

    const formData = new FormData();
    formData.append("file", file); 

    try {
      setLoading(true);

      const res = await fetch("/api/inventario/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.message || "Error al subir el archivo");
        return;
      }

      setRespuesta(data);
    } catch (err) {
      setError("No se pudo conectar al backend. ¿Está corriendo en http://localhost:3000?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "40px auto", fontFamily: "Arial, sans-serif" }}>
      <h2>Carga de Inventario</h2>
      <p>Sube un archivo Excel (.xlsx) para insertar/actualizar productos por SKU.</p>

      <form onSubmit={onSubmit} style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <input
          type="file"
          accept=".xlsx"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Subiendo..." : "Subir"}
        </button>
      </form>

      {error && (
        <p style={{ marginTop: 16 }}>
          <b>Error:</b> {error}
        </p>
      )}

      {respuesta && (
        <div style={{ marginTop: 20 }}>
          <h3>Reporte</h3>
          <pre style={{ padding: 12, border: "1px solid #ccc", borderRadius: 6 }}>
            {JSON.stringify(respuesta, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
