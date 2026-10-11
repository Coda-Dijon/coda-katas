cmake_minimum_required(VERSION 4.0)
project(strongestAvenger C)

set(CMAKE_C_STANDARD 11)
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin)

include_directories(.)

# main program
add_executable(strongestAvenger
        strongestAvenger.c
        strongestAvenger.h
        main.c)

# unit tests
add_executable(strongestAvenger_tests
        test_strongestAvenger.c
        strongestAvenger.c
        strongestAvenger.h
)
