cmake_minimum_required(VERSION 4.0)
project(cloneSequence C)

set(CMAKE_C_STANDARD 11)
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin)

include_directories(.)

# main program
add_executable(cloneSequence
        cloneSequence.c
        cloneSequence.h
        main.c)

# unit tests
add_executable(cloneSequence_tests
        test_cloneSequence.c
        cloneSequence.c
        cloneSequence.h
)
