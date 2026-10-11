cmake_minimum_required(VERSION 4.0)
project(warCry C)

set(CMAKE_C_STANDARD 11)
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin)

include_directories(.)

# main program
add_executable(warCry
        warCry.c
        warCry.h
        main.c)

# unit tests
add_executable(warCry_tests
        test_warCry.c
        warCry.c
        warCry.h
)
