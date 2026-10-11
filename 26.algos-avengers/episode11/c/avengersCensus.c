#include <string.h>

#include "avengersCensus.h"

static int index_of(const char **out_names, const int out_count, const char *name) {
    for (int i = 0; i < out_count; i++) {
        if (strcmp(out_names[i], name) == 0) {
            return i;
        }
    }
    return -1;
}

int census(const char **names, const int count, const char **out_names, int *out_counts) {
    int out_count = 0;
    for (int i = 0; i < count; i++) {
        const int existing = index_of(out_names, out_count, names[i]);
        if (existing >= 0) {
            out_counts[existing]++;
        } else {
            out_names[out_count] = names[i];
            out_counts[out_count] = 1;
            out_count++;
        }
    }
    return out_count;
}
