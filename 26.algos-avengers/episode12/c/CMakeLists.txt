cmake_minimum_required(VERSION 4.0)
project(pymSequence C)

set(CMAKE_C_STANDARD 11)
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin)

include_directories(.)

# main program
add_executable(pymSequence
        pymSequence.c
        pymSequence.h
        main.c)

# unit tests
add_executable(pymSequence_tests
        test_pymSequence.c
        pymSequence.c
        pymSequence.h
)
