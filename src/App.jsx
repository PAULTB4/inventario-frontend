import { useState } from "react";
import "./App.css";

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
    <div className="app-container">
      <h2>Carga de Inventario</h2>
      <p>Sube un archivo Excel (.xlsx) para insertar/actualizar productos por SKU.</p>

      <form onSubmit={onSubmit} className="upload-form">
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
        <p className="feedback">
          <b>Error:</b> {error}
        </p>
      )}

      {respuesta && (
        <div className="report-wrapper">
          <h3>Reporte</h3>
          <pre className="report-pre">
            {JSON.stringify(respuesta, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
