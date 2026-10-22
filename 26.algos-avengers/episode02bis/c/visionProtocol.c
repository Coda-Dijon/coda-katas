#include "visionProtocol.h"

bool is_prime(int n) {
    // Ni les nombres négatifs, ni 0, ni 1 ne sont premiers.
    if (n < 2) {
        return false;
    }
    // On cherche un diviseur de n entre 2 et sa racine carrée : si aucun n'existe,
    // n est premier. Inutile d'aller plus loin que sqrt(n) (i * i <= n) : un
    // diviseur au-delà a toujours un complément plus petit déjà testé.
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            return false;
        }
    }
    return true;
}
