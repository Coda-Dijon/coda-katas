#include <string.h>

#include "avengersUniqueness.h"

static int already_seen(const char **out, const int outCount, const char *name) {
    for (int i = 0; i < outCount; i++) {
        if (strcmp(out[i], name) == 0) {
            return 1;
        }
    }
    return 0;
}

int unique_avenger_names(const char **names, const int count, const char **out) {
    int outCount = 0;
    for (int i = 0; i < count; i++) {
        if (!already_seen(out, outCount, names[i])) {
            out[outCount] = names[i];
            outCount++;
        }
    }
    return outCount;
}
