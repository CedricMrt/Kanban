function controllerWrapper(middleware) {
  // controllerWrapper est exécuter avec un middleware en argument
  // cette fonction est exécuter sur nos routes express, elle doit donc retourner une fonction qui prend en argument req, res, next
  return async (req, res, next) => {
    try {
      // Lorsque la route est appelée, le middleware est exécuté
      // Si une erreur arrive, elle est catch et envoyé à notre middleware d'erreur
      await middleware(req, res, next);
    } catch (error) {
      // Je vais appeler le middleware suivant
      // Comme je passe un paramètre, express va comprendre que c'est une erreur et va appeler le middleware d'erreur
      next(error);
    }
  };
}

export default controllerWrapper;
