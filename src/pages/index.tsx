import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Encabezado */}
      <header className="text-center py-16">
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500 animate-text">
          Taxi España
        </h1>
        <p className="mt-4 text-lg text-gray-300">
          Lleva el control de tus ingresos y gastos como taxista de manera sencilla y eficiente.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link href="/login" 
          className="px-6 py-3 bg-blue-600 text-lg font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105">
              Iniciar Sesión
          </Link>
          <Link href="/register" 
          className="px-6 py-3 bg-green-600 text-lg font-semibold rounded-full shadow-lg hover:bg-green-700 transition-transform transform hover:scale-105">
              Registrarse
          </Link>
        </div>
      </header>

      {/* Imagen Representativa */}
      <section className="relative py-10">
        {/* Fondo oscuro con superposición */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-gray-800 opacity-70"></div>
        
        {/* Imagen con ajustes de posición */}
        <Image
          src="/images/taxi-modern.jpg"
          alt="Taxi en España"
          width={1200}
          height={500}
          className="w-full h-[500px] object-cover object-center md:object-top lg:object-center"
        />
        
        {/* Texto superpuesto */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-4xl font-bold text-white drop-shadow-lg text-center">
            La mejor plataforma para taxistas en España
          </h2>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-16 px-8">
        <h2 className="text-4xl font-bold text-center mb-8 text-yellow-400">
          ¿Por qué Taxi España?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800 rounded-lg p-6 text-center shadow-lg hover:shadow-2xl transition-shadow">
            <h3 className="text-xl font-bold text-white">Fácil de Usar</h3>
            <p className="text-gray-400 mt-4">
              Una interfaz intuitiva para que cualquier taxista pueda gestionar sus ingresos y gastos sin complicaciones.
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 text-center shadow-lg hover:shadow-2xl transition-shadow">
            <h3 className="text-xl font-bold text-white">Seguridad Garantizada</h3>
            <p className="text-gray-400 mt-4">
              Tus datos están protegidos con los mejores estándares de seguridad.
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 text-center shadow-lg hover:shadow-2xl transition-shadow">
            <h3 className="text-xl font-bold text-white">Control Total</h3>
            <p className="text-gray-400 mt-4">
              Lleva el control de tus finanzas con reportes detallados y estadísticas en tiempo real.
            </p>
          </div>
        </div>
      </section>

      {/* Pie de Página */}
      <footer className="bg-gray-900 py-6 text-center text-gray-400">
        <p>&copy; 2024 Taxi España. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}