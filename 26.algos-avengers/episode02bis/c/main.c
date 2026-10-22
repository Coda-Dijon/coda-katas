#include <stdio.h>

#include "visionProtocol.h"

int main(void) {
    const int codes[] = {1, 2, 4, 7, 15, 17};
    const int count = sizeof(codes) / sizeof(codes[0]);

    for (int i = 0; i < count; i++) {
        if (is_prime(codes[i])) {
            printf("Code %d : accès autorisé par Vision\n", codes[i]);
        } else {
            printf("Code %d : accès refusé par Vision\n", codes[i]);
        }
    }

    return 0;
}
