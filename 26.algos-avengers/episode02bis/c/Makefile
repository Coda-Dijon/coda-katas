CC      ?= cc
CFLAGS  ?= -std=c11 -Wall -Wextra -I.
LDLIBS  ?= -lm
BIN_DIR := build/bin

.PHONY: all run test clean

all: $(BIN_DIR)/visionProtocol $(BIN_DIR)/visionProtocol_tests

$(BIN_DIR):
	mkdir -p $@

# main program
$(BIN_DIR)/visionProtocol: main.c visionProtocol.c visionProtocol.h | $(BIN_DIR)
	$(CC) $(CFLAGS) main.c visionProtocol.c -o $@ $(LDLIBS)

# unit tests
$(BIN_DIR)/visionProtocol_tests: test_visionProtocol.c visionProtocol.c visionProtocol.h | $(BIN_DIR)
	$(CC) $(CFLAGS) test_visionProtocol.c visionProtocol.c -o $@ $(LDLIBS)

run: $(BIN_DIR)/visionProtocol
	./$(BIN_DIR)/visionProtocol

test: $(BIN_DIR)/visionProtocol_tests
	./$(BIN_DIR)/visionProtocol_tests

clean:
	rm -f $(BIN_DIR)/visionProtocol $(BIN_DIR)/visionProtocol_tests
