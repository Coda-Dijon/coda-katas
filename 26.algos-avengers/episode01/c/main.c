#include <stdio.h>

int main(int argc, char *argv[]) {
    for (int i = 1; i < argc; i++) {
        printf("%s a répondu à l'appel !\n", argv[i]);
    }
    return 0;
}