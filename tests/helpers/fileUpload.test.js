import { fileUpload } from "../../src/helpers/fileUpload";

describe("Pruebas en fileUpload", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("debe de subir el archivo correctamente a cloudinary", async () => {
    // Un mock para la respuesta de cloudinary
    const mockCloudinaryResponse = {
      secure_url:
        "https://res.cloudinary.com/react-curso-front/image/upload/v123456/sample.jpg",
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockCloudinaryResponse,
    });

    // Crear un archivo de test
    const file = new File(["test content"], "foto.jpg", { type: "image/jpeg" });

    // Ejecuto la cata
    const url = await fileUpload(file);

    // Verifico que el fetch fue llamado con los parámetros correctos
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://api.cloudinary.com/v1_1/react-curso-front/upload",
      expect.objectContaining({
        method: "POST",
        body: expect.any(FormData),
      })
    );

    // Verifico los resultados
    expect(typeof url).toBe("string");
    expect(url).toBe(mockCloudinaryResponse.secure_url);
  });

  test("debe de retornar null si no hay archivo", async () => {
    const result = await fileUpload();
    expect(result).toBe(null);
  });

  test("debe de manejar errores de la API", async () => {
    // Mock para respuesta de error
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
    });

    const file = new File(["test content"], "foto.jpg", { type: "image/jpeg" });

    // Expect the function to throw an error
    await expect(fileUpload(file)).rejects.toThrow();
  });
});
