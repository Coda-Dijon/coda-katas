cmake_minimum_required(VERSION 4.0)
project(avengersScanner C)

set(CMAKE_C_STANDARD 11)
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin)

include_directories(.)

# main program
add_executable(avengersScanner
        avengersScanner.c
        avengersScanner.h
        main.c)

# unit tests
add_executable(avengersScanner_tests
        test_avengersScanner.c
        avengersScanner.c
        avengersScanner.h
)
