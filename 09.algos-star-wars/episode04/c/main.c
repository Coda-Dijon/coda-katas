#include <stdio.h>

#include "jediNames.h"

int main(void) {
    const char *names[] = {"Luke", "Yoda", "Luke", "Obi-Wan", "Yoda"};
    const char *unique[5];

    const int uniqueCount = unique_jedi_names(names, 5, unique);

    printf("Unique jedi names: ");
    for (int i = 0; i < uniqueCount; i++) {
        printf("%s ", unique[i]);
    }
    printf("\n");
    return 0;
}
