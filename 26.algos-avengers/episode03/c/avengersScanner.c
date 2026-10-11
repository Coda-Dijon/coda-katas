#include <string.h>

#include "avengersScanner.h"

bool is_avenger_present(const Avenger *team, const int count, const char *name) {
    for (int i = 0; i < count; i++) {
        if (strcmp(team[i].name, name) == 0) {
            return true;
        }
    }
    return false;
}
