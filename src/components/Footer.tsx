export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* TMDb Attribution */}
          <div className="flex items-center gap-4">
            <img 
              src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" 
              alt="TMDb Logo" 
              className="h-8"
            />
            <p className="text-sm text-gray-600">
              This product uses the TMDb API but is not endorsed or certified by TMDb.
            </p>
          </div>

          {/* Copyright */}
          <div className="text-sm text-gray-500">
            © 2026 CineLibre. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
